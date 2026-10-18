import type { Metadata } from "next";
import Image from "next/image";
import { TokenomicsChart } from "@/components/ui/TokenomicsChart";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { tokenomics } from "@/data/tokenomics";
import {
  EXPLORER_NAME,
  EXPLORER_URL,
  MMC_TOKEN_ADDRESS,
  PRESALE_CONTRACT_ADDRESS,
  PRESALE_TOKEN,
} from "@/data/presale";
import { WaitlistSection } from "@/components/sections/WaitlistSection";

export const metadata: Metadata = {
  title: "Token Information | MANUMIT CORE (MMC)",
  description:
    "Learn about the MANUMIT CORE (MMC) ERC-20 token — its purpose, total supply, allocation breakdown, sale stages, and how to participate. Data from an editable config file.",
};

function formatNumber(n: number) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
  return n.toLocaleString();
}

export default function TokenPage() {
  return (
    <div className="bg-coin-black min-h-screen pt-24">
      {/* Page header */}
      <section className="relative py-16 lg:py-24 overflow-hidden border-b border-white/6">
        <div className="absolute inset-0 bg-gradient-to-br from-coin-black via-coin-near-black to-emerald-dark/10" />
        <div className="container-wide relative text-center">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald/20 bg-emerald/5 mb-6">
              <Image src="/logos/mmc-coin.png" alt="" width={20} height={20} className="object-contain" />
              <span className="text-emerald-light text-xs font-semibold tracking-widest uppercase">
                ERC-20 · {PRESALE_TOKEN.chain}
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              MANUMIT CORE
              <br />
              <span className="text-emerald-gradient">(MMC) Token</span>
            </h1>
            <p className="text-white/55 max-w-xl mx-auto text-lg">
              Not just a cryptocurrency. An economic instrument for compassion,
              accountability, and community-driven impact.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* What is MMC */}
      <section className="py-20 lg:py-28">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SectionReveal direction="left">
              <p className="text-emerald-light text-xs font-semibold tracking-widest uppercase mb-3">What It Is</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                A Token With a{" "}
                <span className="text-emerald-gradient">Real-World Purpose</span>
              </h2>
              <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                <p>
                  MANUMIT CORE (MMC) is the native ERC-20 utility token of the Manumit Me Foundation.
                  It is the economic layer that connects community participation, advocacy work,
                  and platform access into a single, transparent system.
                </p>
                <p>
                  Unlike speculative tokens with no intrinsic purpose, MMC is designed to be
                  <strong className="text-white"> earned, spent, and governed</strong> within a
                  growing ecosystem — starting with the ACTS platform and expanding through each
                  phase of the roadmap.
                </p>
                <p>
                  The token is built on Ethereum for security, composability, and broad wallet
                  compatibility. The token and presale contracts are deployed on{" "}
                  {PRESALE_TOKEN.chain} and can be inspected on {EXPLORER_NAME}; audit results
                  will be published before the presale opens.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal direction="right">
              {/* Token stat cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Total Supply", value: formatNumber(tokenomics.totalSupply), sub: "MMC tokens", color: "emerald" },
                  { label: "Presale Allocation", value: formatNumber(tokenomics.presaleAllocation), sub: "MMC", color: "cyan" },
                  { label: "Blockchain", value: PRESALE_TOKEN.chain.split(" ")[0], sub: tokenomics.blockchain.standard, color: "emerald" },
                  { label: "Locked Until 2028", value: formatNumber(tokenomics.lockedAllocation), sub: "MMC locked", color: "emerald" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-white/6 bg-white/2 p-5 hover:border-emerald/20 transition-colors"
                  >
                    <div className={`text-2xl font-display font-bold mb-1
                      ${s.color === "cyan" ? "text-cyan" : "text-emerald-light"}`}>
                      {s.value}
                    </div>
                    <div className="text-white/30 text-xs">{s.sub}</div>
                    <div className="text-white/50 text-xs mt-1 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Contract info */}
              <div className="mt-4 rounded-xl border border-emerald/10 bg-emerald/3 p-4">
                <p className="text-emerald-light text-xs font-semibold uppercase tracking-wider mb-1">
                  Contract Address
                </p>
                <a
                  href={`${EXPLORER_URL}/token/${MMC_TOKEN_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/40 text-xs font-mono break-all hover:text-emerald-light transition-colors"
                >
                  {MMC_TOKEN_ADDRESS}
                </a>
                <p className="text-emerald-light text-xs font-semibold uppercase tracking-wider mt-3 mb-1">
                  Presale Contract
                </p>
                <a
                  href={`${EXPLORER_URL}/address/${PRESALE_CONTRACT_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/40 text-xs font-mono break-all hover:text-emerald-light transition-colors"
                >
                  {PRESALE_CONTRACT_ADDRESS}
                </a>
                <p className="text-white/25 text-[10px] mt-2">
                  Ticker: {tokenomics.blockchain.ticker} · Decimals: {tokenomics.blockchain.decimals}
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Tokenomics chart */}
      <section className="py-20 border-t border-white/6" style={{ background: "linear-gradient(180deg, #0D0D0D 0%, #0A1A10 60%, #0D0D0D 100%)" }}>
        <div className="container-wide">
          <SectionReveal className="text-center mb-12">
            <p className="text-emerald-light text-xs font-semibold tracking-widest uppercase mb-3">
              Token Allocation
            </p>
            <div className="section-divider-core" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Where the Tokens Go
            </h2>
            <p className="mt-3 text-white/40 text-sm max-w-md mx-auto">
              Every figure below is read from the deployed contracts on {PRESALE_TOKEN.chain}.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <SectionReveal direction="left">
              <TokenomicsChart />
            </SectionReveal>

            <SectionReveal direction="right" delay={0.1}>
              {/* Allocation table */}
              <div className="rounded-2xl border border-white/6 overflow-hidden">
                <table className="w-full text-sm" aria-label="Token allocation breakdown">
                  <thead>
                    <tr className="border-b border-white/8 bg-white/3">
                      <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">Allocation</th>
                      <th className="text-right px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">%</th>
                      <th className="text-right px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">Tokens</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokenomics.breakdown.map((row, i) => (
                      <tr key={row.label} className={`border-b border-white/5 ${i % 2 === 0 ? "" : "bg-white/1"}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                            <span className="text-white/70 text-xs">{row.label}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right text-white/50 text-xs">{row.percentage.toFixed(2)}%</td>
                        <td className="px-4 py-3 text-right text-white/70 text-xs font-mono">
                          {formatNumber(row.tokens)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-emerald/15 bg-emerald/3">
                      <td className="px-4 py-3 text-emerald-light font-semibold text-xs">Total Supply</td>
                      <td className="px-4 py-3 text-right text-emerald-light font-semibold text-xs">100%</td>
                      <td className="px-4 py-3 text-right text-emerald-light font-semibold text-xs font-mono">
                        {formatNumber(tokenomics.totalSupply)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Lockup details */}
              <div className="mt-4 space-y-2">
                {tokenomics.breakdown.map((row) => (
                  <div key={row.label} className="text-xs text-white/30 flex gap-2">
                    <div className="w-2 h-2 rounded-full mt-0.5 shrink-0" style={{ backgroundColor: row.color }} />
                    <span><strong className="text-white/50">{row.label}:</strong> {row.lockup}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Sale stages */}
      <section className="py-20 border-t border-white/6">
        <div className="container-wide">
          <SectionReveal className="text-center mb-12">
            <p className="text-emerald-light text-xs font-semibold tracking-widest uppercase mb-3">Sale Stages</p>
            <div className="section-divider-core" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Presale Round Structure</h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {tokenomics.saleStages.map((stage, i) => (
              <SectionReveal key={stage.stage} delay={i * 0.1}>
                <div className="rounded-2xl border border-emerald/15 bg-emerald/3 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-emerald-gradient flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{i + 1}</span>
                    </div>
                    <div>
                      <p className="text-emerald-light font-bold">{stage.stage}</p>
                      <p className="text-white/40 text-xs">{stage.date}</p>
                    </div>
                  </div>
                  <dl className="space-y-3">
                    {[
                      { label: "Allocation", value: stage.allocation },
                      { label: "Token Price", value: stage.price },
                      { label: "Min. Purchase", value: stage.minPurchase },
                      { label: "Bonus", value: stage.bonus },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center border-b border-white/5 pb-2">
                        <dt className="text-white/40 text-xs">{row.label}</dt>
                        <dd className="text-white/80 text-xs font-semibold">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How to participate */}
      <section className="py-20 border-t border-white/6" style={{ background: "linear-gradient(180deg, #0D0D0D 0%, #0A1A10 50%, #0D0D0D 100%)" }}>
        <div className="container-wide max-w-3xl mx-auto">
          <SectionReveal className="text-center mb-10">
            <p className="text-emerald-light text-xs font-semibold tracking-widest uppercase mb-3">Participation</p>
            <div className="section-divider-core" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">How to Participate</h2>
            <p className="text-white/50 text-sm">
              The token sale is not yet open. Here&apos;s what to do now to be ready.
            </p>
          </SectionReveal>

          <div className="space-y-4">
            {[
              { step: "01", title: "Join the Waitlist", body: "Register your name and email below to secure priority access and be notified the moment Round 1 opens on September 21, 2026." },
              { step: "02", title: "Read the Whitepaper", body: "Understand the full mission, tokenomics, and roadmap before committing. We believe informed participants make better community members." },
              { step: "03", title: "Set Up an Ethereum Wallet", body: "You&apos;ll need an ERC-20-compatible wallet (e.g. MetaMask, Coinbase Wallet) with an Ethereum address to receive MMC tokens." },
              { step: "04", title: "Wait for the Sale Announcement", body: "Waitlist members receive detailed payment instructions and supported methods directly via email before the sale opens." },
            ].map((s, i) => (
              <SectionReveal key={s.step} delay={i * 0.1}>
                <div className="flex gap-6 rounded-xl border border-white/6 bg-white/2 p-6
                  hover:border-emerald/20 transition-all">
                  <span className="font-display text-3xl font-bold text-emerald/20 shrink-0 leading-none">{s.step}</span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">{s.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Inline waitlist form */}
      <WaitlistSection />
    </div>
  );
}
