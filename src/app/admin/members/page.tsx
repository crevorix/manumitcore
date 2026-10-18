import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import { assertAdmin } from "@/lib/adminAuth";
import { checkStanding, GOOD_STANDING_MMC, GOOD_STANDING_USD } from "@/lib/standing";

export const metadata: Metadata = {
  title: "Members | Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface Member {
  id: string;
  member_id: string;
  /** The member's chosen name — always present, and the one to show first. */
  pseudonym: string;
  email: string;
  /** Optional: members are not required to give a legal name. */
  full_name: string | null;
  social_handle: string | null;
  wallet_address: string | null;
  good_standing: boolean;
  purchased_mmc: number | null;
  standing_checked_at: string | null;
  created_at: string;
}

/**
 * Flip Good Standing by hand — the fallback for members who never gave a
 * wallet address, and the override when someone paid by another route.
 */
async function toggleStanding(formData: FormData) {
  "use server";
  await assertAdmin();

  const id = String(formData.get("id"));
  const next = formData.get("next") === "true";

  const { error } = await getSupabaseAdmin()
    .from("members")
    .update({ good_standing: next })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/members");
}

/**
 * Read the member's wallet on-chain and grant standing if they have bought
 * their $50 of MMC. Only ever grants — a manual grant is never revoked by an
 * automated check.
 */
async function refreshStanding(formData: FormData) {
  "use server";
  await assertAdmin();

  const id = String(formData.get("id"));
  const wallet = String(formData.get("wallet"));

  const result = await checkStanding(wallet);

  const { error } = await getSupabaseAdmin()
    .from("members")
    .update({
      purchased_mmc: result.purchasedMmc,
      standing_checked_at: new Date().toISOString(),
      ...(result.qualifies ? { good_standing: true } : {}),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/members");
}

const TH =
  "px-5 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider";

export default async function AdminMembersPage() {
  let members: Member[] = [];
  let loadError = "";

  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("members")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    members = data ?? [];
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Failed to load members.";
  }

  const inGoodStanding = members.filter((m) => m.good_standing).length;

  return (
    <div className="bg-coin-black min-h-screen pt-24 pb-20">
      <div className="container-wide">
        <div className="mb-8">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">Admin</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Members</h1>
          <p className="text-white/50 text-sm mt-2">
            {members.length} {members.length === 1 ? "member" : "members"} registered
            {members.length > 0 && ` · ${inGoodStanding} in good standing`}
          </p>
          <p className="text-white/30 text-xs mt-1">
            Good standing is reached at ${GOOD_STANDING_USD} of MMC —{" "}
            {GOOD_STANDING_MMC.toLocaleString()} MMC. &ldquo;Check&rdquo; reads the
            member&rsquo;s wallet on-chain; the toggle sets it by hand.
          </p>
          <p className="text-white/30 text-xs mt-1">
            Members register under a network name. A legal name is optional and
            most will not give one — identify members by network name or member ID.
          </p>
        </div>

        {loadError ? (
          <div className="rounded-xl border border-ruby/20 bg-ruby/10 text-ruby-light text-sm px-4 py-3">
            {loadError}
          </div>
        ) : members.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/2 text-white/50 text-sm px-4 py-8 text-center">
            No members yet.
          </div>
        ) : (
          <div className="rounded-2xl border border-white/8 bg-white/2 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[1180px]">
                <thead>
                  <tr className="border-b border-white/8 text-left">
                    <th className={TH}>Member ID</th>
                    <th className={TH}>Network Name</th>
                    <th className={TH}>Email</th>
                    <th className={TH}>Legal Name</th>
                    <th className={TH}>Social Handle</th>
                    <th className={TH}>Wallet</th>
                    <th className={TH}>MMC Bought</th>
                    <th className={TH}>Good Standing</th>
                    <th className={TH}>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr
                      key={m.id}
                      className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors align-top"
                    >
                      <td className="px-5 py-3.5 font-mono text-gold-light whitespace-nowrap">
                        {m.member_id}
                      </td>
                      <td className="px-5 py-3.5 text-white whitespace-nowrap">{m.pseudonym}</td>
                      <td className="px-5 py-3.5 text-white/70">{m.email}</td>
                      <td className="px-5 py-3.5 text-white/70">
                        {m.full_name || <span className="text-white/25 text-xs">not given</span>}
                      </td>
                      <td className="px-5 py-3.5 text-white/70">{m.social_handle || "—"}</td>
                      <td className="px-5 py-3.5">
                        {m.wallet_address ? (
                          <span
                            className="font-mono text-xs text-white/60"
                            title={m.wallet_address}
                          >
                            {m.wallet_address.slice(0, 6)}…{m.wallet_address.slice(-4)}
                          </span>
                        ) : (
                          <span className="text-white/25 text-xs">not given</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        {m.purchased_mmc === null ? (
                          <span className="text-white/25 text-xs">not checked</span>
                        ) : (
                          <span className="text-white/70">
                            {Number(m.purchased_mmc).toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        )}
                        {m.standing_checked_at && (
                          <span className="block text-white/25 text-[10px] mt-0.5">
                            {new Date(m.standing_checked_at).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border whitespace-nowrap ${
                              m.good_standing
                                ? "text-emerald-light bg-emerald/10 border-emerald/25"
                                : "text-white/40 bg-white/5 border-white/10"
                            }`}
                          >
                            {m.good_standing ? "Good Standing" : "Pending"}
                          </span>

                          <form action={toggleStanding}>
                            <input type="hidden" name="id" value={m.id} />
                            <input
                              type="hidden"
                              name="next"
                              value={(!m.good_standing).toString()}
                            />
                            <button
                              type="submit"
                              className="text-[11px] px-2 py-1 rounded-md border border-white/15 text-white/50
                                hover:text-white hover:border-white/30 transition-colors cursor-pointer whitespace-nowrap"
                            >
                              {m.good_standing ? "Revoke" : "Grant"}
                            </button>
                          </form>

                          {m.wallet_address && (
                            <form action={refreshStanding}>
                              <input type="hidden" name="id" value={m.id} />
                              <input type="hidden" name="wallet" value={m.wallet_address} />
                              <button
                                type="submit"
                                className="text-[11px] px-2 py-1 rounded-md border border-emerald/25 text-emerald-light/80
                                  hover:text-emerald-light hover:border-emerald/50 transition-colors cursor-pointer"
                              >
                                Check
                              </button>
                            </form>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-white/50 whitespace-nowrap">
                        {new Date(m.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
