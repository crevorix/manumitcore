import { randomInt } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { isAddress, getAddress } from "viem";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendMemberWelcomeEmail } from "@/lib/email";

/**
 * Membership Signup API Route
 *
 * ─────────────────────────────────────────────────────────────────
 * BACKEND: Supabase (Postgres)
 *
 * Required environment variables:
 *   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
 *
 * Optional, for the member ID email (see src/lib/email.ts):
 *   RESEND_API_KEY, EMAIL_FROM
 *
 * Table schema: see /docs/supabase-schema.sql
 *
 * PRIVACY: only a pseudonym and an email address are collected. A legal
 * name, a social handle and a wallet address are all optional — the form
 * must never be made to depend on them.
 *
 * Good standing starts false. A member reaches it by making their $50
 * annual purchase of MMC, which is confirmed against the wallet address
 * they gave here — see src/lib/standing.ts and /admin/members.
 * ─────────────────────────────────────────────────────────────────
 */

interface MembershipPayload {
  /** Required. The only name ever shown publicly. */
  pseudonym: string;
  /** Required. Where the member ID is delivered. */
  email: string;
  /** Optional — a legal name, given only if the member wants one on record. */
  name?: string;
  /** Optional contact handle. */
  socialHandle?: string;
  /** Optional — only needed for automatic Good Standing verification. */
  walletAddress?: string;
  _hp?: string; // honeypot
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Ten digits, from the crypto RNG rather than Math.random() — this number
 * identifies the member to the Foundation, so it should not be predictable
 * from other IDs issued around the same time.
 */
function generateMemberId(): string {
  let id = "";
  for (let i = 0; i < 10; i++) {
    id += randomInt(10);
  }
  return id;
}

/**
 * True when the failure is "the database is not there" rather than a problem
 * with the submitted data. A paused Supabase project stops resolving in DNS
 * entirely, which supabase-js surfaces as a generic fetch failure — telling
 * the visitor their membership "failed" for that is both wrong and alarming.
 */
function isDatabaseUnreachable(err: unknown): boolean {
  const message =
    err instanceof Error
      ? err.message
      : typeof err === "object" && err !== null && "message" in err
        ? String((err as { message: unknown }).message)
        : String(err ?? "");

  return /fetch failed|network|ENOTFOUND|EAI_AGAIN|getaddrinfo|ECONNREFUSED|socket hang up|timeout/i.test(
    message
  );
}

const DB_DOWN_MESSAGE =
  "We can't reach our member database at the moment. This is a problem on our side, not with the details you entered — please try again in a few minutes.";

/** Trim, and collapse an empty string down to null so the column stays clean. */
function optional(value: string | undefined, maxLength: number): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLength);
}

export async function POST(req: NextRequest) {
  try {
    const body: MembershipPayload = await req.json();
    const { _hp } = body;

    // Server-side honeypot check
    if (_hp) {
      return NextResponse.json({ ok: true });
    }

    const pseudonym = body.pseudonym?.trim() ?? "";
    const email = body.email?.trim() ?? "";

    if (!pseudonym || !email) {
      return NextResponse.json(
        { error: "A network name and an email address are required." },
        { status: 400 }
      );
    }

    if (pseudonym.length < 2 || pseudonym.length > 40) {
      return NextResponse.json(
        { error: "Your network name must be between 2 and 40 characters." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const fullName = optional(body.name, 80);
    const socialHandle = optional(body.socialHandle, 80);

    // Optional, but if given it has to be a real address — a typo here would
    // silently block the member from ever reaching Good Standing.
    let wallet: string | null = null;
    const trimmedWallet = body.walletAddress?.trim();
    if (trimmedWallet) {
      if (!isAddress(trimmedWallet)) {
        return NextResponse.json(
          { error: "That does not look like a valid wallet address." },
          { status: 400 }
        );
      }
      wallet = getAddress(trimmedWallet);
    }

    const supabaseAdmin = getSupabaseAdmin();

    // Generate a unique 10-digit member ID, retrying on the rare collision.
    let memberId = "";
    let member = null;

    for (let attempt = 0; attempt < 5; attempt++) {
      memberId = generateMemberId();

      const { data, error } = await supabaseAdmin
        .from("members")
        .insert({
          member_id: memberId,
          pseudonym,
          email,
          full_name: fullName,
          social_handle: socialHandle,
          wallet_address: wallet,
          good_standing: false,
        })
        .select()
        .single();

      if (!error) {
        member = data;
        break;
      }

      // 23505 = unique_violation
      if (error.code === "23505") {
        // A duplicate pseudonym, email or wallet is a real conflict, not a
        // collision to retry — surface a clean message instead of the raw
        // DB error.
        if (error.message.includes("members_email_key")) {
          return NextResponse.json(
            { error: "This email address is already registered as a member." },
            { status: 409 }
          );
        }
        if (error.message.includes("members_pseudonym_key")) {
          return NextResponse.json(
            { error: "That network name is already taken, please choose another." },
            { status: 409 }
          );
        }
        if (error.message.includes("members_wallet_address_key")) {
          return NextResponse.json(
            { error: "This wallet address is already registered to a member." },
            { status: 409 }
          );
        }
        // Otherwise it's the (rare) member_id collision — loop and retry
        // with a freshly generated ID.
        continue;
      }

      console.error("[Membership] Supabase error:", error);
      if (isDatabaseUnreachable(error)) {
        return NextResponse.json({ error: DB_DOWN_MESSAGE }, { status: 503 });
      }
      return NextResponse.json(
        { error: "Failed to create membership, please try again later." },
        { status: 500 }
      );
    }

    if (!member) {
      return NextResponse.json(
        { error: "Could not generate a unique member ID, please try again." },
        { status: 500 }
      );
    }

    // Addressed by pseudonym — a legal name may not have been given, and is
    // not what the member expects to be called anyway.
    const emailResult = await sendMemberWelcomeEmail(email, pseudonym, memberId);

    // Reported back so the confirmation screen only promises an email when
    // one actually went out.
    return NextResponse.json({
      ok: true,
      memberId,
      emailSent: emailResult.sent,
    });
  } catch (err) {
    console.error("[Membership] Unexpected error:", err);
    if (isDatabaseUnreachable(err)) {
      return NextResponse.json({ error: DB_DOWN_MESSAGE }, { status: 503 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
