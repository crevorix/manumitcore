import { NextRequest, NextResponse } from "next/server";

/**
 * Waitlist / Contact API Route
 *
 * ─────────────────────────────────────────────────────────────────
 * BACKEND: Google Sheets via Apps Script Web App
 *
 * HOW TO SET UP (one-time):
 *   1. Open your Google Sheet → Extensions → Apps Script
 *   2. Paste the script from /docs/google-apps-script.js
 *   3. Click Deploy → New deployment → Web App
 *      - Execute as: Me
 *      - Who has access: Anyone
 *   4. Copy the web app URL and set it as GOOGLE_SHEET_WEBHOOK_URL
 *      in your Vercel / Cloudflare environment variables.
 *
 * Required environment variables:
 *   GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_ID/exec
 *
 * FUTURE (post domain verification):
 *   Uncomment the Resend block at the bottom and add:
 *   RESEND_API_KEY=re_xxxx
 *   EMAIL_TO=your@email.com
 *   EMAIL_FROM=noreply@manumitme.com
 * ─────────────────────────────────────────────────────────────────
 */

interface WaitlistPayload {
  name: string;
  email: string;
  role?: string;
  message?: string;
  _hp?: string; // honeypot
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body: WaitlistPayload = await req.json();
    const { name, email, role, message, _hp } = body;

    // Server-side honeypot check
    if (_hp) {
      return NextResponse.json({ ok: true });
    }

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    // Dev / no-config fallback: log locally and return success
    if (!webhookUrl) {
      console.log("[Waitlist] No GOOGLE_SHEET_WEBHOOK_URL set. Submission:", {
        name,
        email,
        role: role || "general",
        message: message || "",
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json({ ok: true });
    }

    // Write to Google Sheet via Apps Script Web App
    const sheetRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        role: role || "general",
        message: message || "",
        timestamp: new Date().toISOString(),
        source: "manumitme.com waitlist",
      }),
    });

    if (!sheetRes.ok) {
      const text = await sheetRes.text();
      console.error("[Waitlist] Apps Script error:", text);
      return NextResponse.json(
        { error: "Failed to save your details, please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Waitlist] Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
