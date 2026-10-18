import type { Metadata } from "next";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Whitepaper | MANUMIT CORE (MMC)",
  description:
    "Read or download the MANUMIT CORE (MMC) whitepaper — the full technical and mission document for the Manumit Me Foundation's Web3 ecosystem.",
};

const sections = [
  {
    title: "Executive Summary",
    body: "The Manumit Me Foundation is a mission-driven organization harnessing blockchain technology to fund and amplify real-world community advocacy. MANUMIT CORE (MMC) is its native ERC-20 utility token — designed to reward verified community action, enable transparent funding flows, and provide governance rights to participants.",
  },
  {
    title: "The Problem",
    body: "Traditional philanthropy and advocacy are plagued by opacity, fragmentation, and donor fatigue. Dollars raised often don't reach front-line communities. Community members who do the most work are economically unrewarded. Institutions that cause harm face no economic consequence from communities they affect.",
  },
  {
    title: "Our Solution: The ACTS Platform",
    body: "The ACTS (Accountability, Credibility, Trust, Sacrifice) platform creates an on-chain record of community action. Verified advocacy earns MMC rewards. Petition outcomes are tracked publicly. Content creators and educators earn from their contribution. Every action is auditable, transparent, and community-governed.",
  },
  {
    title: "Token Economics",
    body: "Total supply: 6 Billion MMC, fixed at deployment — the token has no mint function, so no more can ever be created. Presale allocation: 1.5 Billion MMC, already transferred to the presale contract and sold across two rounds ($0.10, then $0.12). Tokens bought in the presale are locked until July 9, 2028. The remaining 4.5 Billion MMC is the Foundation/owner allocation, held outside the presale contract and not subject to the presale lockup.",
  },
  {
    title: "Roadmap Overview",
    body: "Phase 1 (Q2–Q3 2026): Foundation and token creation. Phase 2 (Sep 16, 2026): Presale Round 1 opens at $0.10. Phase 3 (Dec 17, 2026): Round 2 opens at $0.12. Phase 4 (Aug 2026): ACTS platform development. Phase 5 (Aug 2026): Web3 community platform. Phase 6 (TBD): Blockchain transition evaluation.",
  },
  {
    title: "Technology",
    body: "MMC is an ERC-20 token deployed on Ethereum mainnet at 0xc712dd47a3370d2787260a1b487b8c61dbabf382, with the presale contract at 0x6d1d8787849d93044943d678e2e864017de65701. Both can be inspected on Etherscan. Independent security audits of both contracts have been completed, and both are verified on Etherscan. The reports will be published here before Round 1 opens. Future phases evaluate transition to a dedicated MANUMIT CORE blockchain for full governance control.",
  },
];

export default function WhitepaperPage() {
  return (
    <div className="bg-coin-black min-h-screen pt-24">
      {/* Header */}
      <section className="relative py-16 lg:py-24 border-b border-white/6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-coin-black via-coin-near-black to-gold/5" />
        <div className="container-wide relative">
          <div className="max-w-2xl">
            <SectionReveal>
              <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">Documentation</p>
              <div className="w-12 h-0.5 bg-gold-gradient rounded-full mb-4" />
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                The{" "}
                <span className="text-gold-gradient">Whitepaper</span>
              </h1>
              <p className="text-white/55 text-lg max-w-xl mb-8">
                The full technical, economic, and mission document for the Manumit Me Foundation
                and MANUMIT CORE (MMC). Read the summary below or download the full PDF.
              </p>

              {/* Download CTA */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={siteConfig.whitepaperUrl}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-gradient text-coin-black
                    font-semibold text-sm shadow-gold hover:shadow-gold-lg hover:brightness-110 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </a>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gold/15 bg-gold/5">
                  <div className="w-2 h-2 rounded-full bg-gold/50 animate-pulse" />
                  <span className="text-gold/70 text-xs font-medium">
                    Placeholder PDF — full whitepaper coming before the presale
                  </span>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Executive summary sections */}
      <section className="py-20 lg:py-28">
        <div className="container-wide max-w-3xl">
          <SectionReveal className="mb-10">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gold/15 bg-gold/5">
              <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gold/80 text-sm">
                This is an executive summary of the whitepaper. Pricing, allocations, and technical
                specifications marked as [placeholder] will be updated before the presale opens.
              </p>
            </div>
          </SectionReveal>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <SectionReveal key={section.title} delay={i * 0.07}>
                <div className="rounded-2xl border border-white/6 bg-white/2 p-7 hover:border-gold/10 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-display text-gold/30 font-black text-2xl leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-xl font-bold text-white">{section.title}</h2>
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed">{section.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Download repeat */}
          <SectionReveal delay={0.2} className="mt-12 text-center">
            <p className="text-white/30 text-sm mb-6">
              For the complete technical specification, tokenomics model, and legal disclosures:
            </p>
            <a
              href={siteConfig.whitepaperUrl}
              download
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold-gradient text-coin-black
                font-bold text-base shadow-gold hover:shadow-gold-lg hover:brightness-110 transition-all"
            >
              Download Full Whitepaper (PDF)
            </a>
            <p className="text-white/20 text-xs mt-4">
              Have questions? <Link href="/contact" className="text-gold/50 hover:text-gold transition-colors">Contact us →</Link>
            </p>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
