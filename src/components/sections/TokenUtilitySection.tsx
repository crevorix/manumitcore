"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";

const utilities = [
  {
    icon: "🗳️",
    title: "Governance & Voice",
    description:
      "MMC holders gain proportional voting rights on Foundation initiatives, platform priorities, and community fund allocations, turning passive supporters into active decision-makers.",
    tag: "On-chain Voting",
    tagColor: "text-gold border-gold/20 bg-gold/5",
  },
  {
    icon: "🏆",
    title: "Contribution Rewards",
    description:
      "Petition signatures, advocacy campaigns, peer education, and verified community impact actions are tracked and rewarded with MMC, making compassion economically rational.",
    tag: "ACTS Platform",
    tagColor: "text-forest-dark border-forest/20 bg-forest/5",
  },
  {
    icon: "🎓",
    title: "Access & Education",
    description:
      "Token holders unlock premium platform features including creator tools, educational resources, advanced analytics, and early access to community programs.",
    tag: "Platform Access",
    tagColor: "text-gold border-gold/15 bg-gold/3",
  },
  {
    icon: "🤝",
    title: "Ecosystem Funding",
    description:
      "A portion of all token activity flows into a community treasury, transparently governed, publicly auditable, and directed toward advocacy campaigns and partner nonprofits.",
    tag: "Treasury Funded",
    tagColor: "text-forest-dark border-forest/15 bg-forest/3",
  },
];

export function TokenUtilitySection() {
  return (
    <section
      id="utility"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFFFF0 0%, #F1F7F0 50%, #FFFFF0 100%)" }}
      aria-labelledby="utility-heading"
    >
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest/25 to-transparent" />

      <div className="container-wide">
        {/* Heading */}
        <SectionReveal className="text-center mb-16">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
            Token Utility
          </p>
          <div className="section-divider" />
          <h2
            id="utility-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink max-w-3xl mx-auto leading-tight"
          >
            MMC Is Not Just a Token.
            <br />
            <span className="text-forest-gradient">It&apos;s a Tool for Change.</span>
          </h2>
          <p className="mt-4 text-ink/65 max-w-xl mx-auto text-base">
            Four core utility pillars ensure MMC holders have real, meaningful ways to participate
            in the Manumit Me ecosystem, beyond simply holding.
          </p>
        </SectionReveal>

        {/* Utility cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {utilities.map((u, i) => (
            <SectionReveal key={u.title} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
              <div
                className="group h-full rounded-2xl border border-ink/10 bg-white p-8
                  hover:border-forest/25 transition-all duration-400
                  hover:shadow-card-hover relative overflow-hidden"
              >
                {/* Hover gradient accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-forest/6 rounded-full blur-3xl
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Icon */}
                  <span className="text-4xl mb-5 block">{u.icon}</span>

                  {/* Tag */}
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold
                    border tracking-wider uppercase mb-4 ${u.tagColor}`}>
                    {u.tag}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-ink mb-3 group-hover:text-forest-dark transition-colors">
                    {u.title}
                  </h3>

                  {/* Description */}
                  <p className="text-ink/65 text-sm leading-relaxed">{u.description}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <SectionReveal delay={0.3}>
          <div className="mt-12 rounded-2xl border border-forest/20 bg-gradient-to-r from-forest/5 via-transparent to-gold/5 p-8 text-center">
            <p className="text-ink/65 text-sm mb-2">
              Token utility expands across each phase of the roadmap
            </p>
            <a
              href="/token"
              className="text-forest-dark text-sm font-semibold hover:text-forest transition-colors inline-flex items-center gap-1"
            >
              View full tokenomics →
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
