import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

/**
 * Keeps the Supabase project from idling into a pause.
 *
 * Free-tier Supabase projects are paused after 7 days without database
 * activity, and a paused project does NOT wake on the next request — its
 * hostname stops resolving entirely and it has to be restored by hand in the
 * dashboard. That has already taken membership signup down twice (23 Aug and
 * 6 Sep 2026), each time showing visitors "Failed to create membership".
 *
 * A daily cron hit runs one trivial query, which counts as activity and
 * resets the idle clock. See the `crons` entry in vercel.json.
 *
 * This only PREVENTS a pause — it cannot revive one that has already
 * happened. If the project is paused, restore it in the Supabase dashboard.
 */

export const dynamic = "force-dynamic"; // never cache; the query is the point

export async function GET(req: NextRequest) {
  // Vercel signs cron invocations when CRON_SECRET is set. Honour it if the
  // variable exists, but stay open otherwise so the job works before anyone
  // configures it — the endpoint has no side effects and returns no data.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const startedAt = Date.now();

  try {
    // head:true sends no rows back — the cheapest thing that still touches
    // Postgres rather than just PostgREST.
    const { error } = await getSupabaseAdmin()
      .from("members")
      .select("id", { count: "exact", head: true });

    if (error) throw new Error(error.message);

    return NextResponse.json({
      ok: true,
      database: "reachable",
      ms: Date.now() - startedAt,
    });
  } catch (err) {
    // Logged so a failing keep-alive is visible in the Vercel runtime logs
    // before it becomes a broken signup form.
    console.error("[Keepalive] Supabase unreachable:", err);
    return NextResponse.json(
      {
        ok: false,
        database: "unreachable",
        hint: "The Supabase project is probably paused — restore it in the dashboard.",
        ms: Date.now() - startedAt,
      },
      { status: 503 }
    );
  }
}
