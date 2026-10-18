"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";

const partners = [
  { name: "Partner Organization A", type: "Strategic Partner" },
  { name: "Partner Organization B", type: "Technology Partner" },
  { name: "Partner Organization C", type: "Advocacy Partner" },
  { name: "Press Feature D", type: "Media" },
  { name: "Partner Organization E", type: "Community Partner" },
  { name: "Partner Organization F", type: "Advisory Partner" },
];

export function SocialProofSection() {
  return (
    <section
      id="partners"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFFFF0 0%, #F1F7F0 50%, #FFFFF0 100%)" }}
      aria-labelledby="partners-heading"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest/25 to-transparent" />

      <div className="container-wide">
        <SectionReveal className="text-center mb-12">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
            Partners &amp; Recognition
          </p>
          <div className="section-divider" />
          <h2
            id="partners-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-ink"
          >
            Building Alongside People Who{" "}
            <span className="text-forest-gradient">Believe in the Mission</span>
          </h2>
          <p className="mt-3 text-ink/50 text-sm max-w-md mx-auto">
            Partnership details will be announced ahead of the presale.
            Contact us to explore collaboration opportunities.
          </p>
        </SectionReveal>

        {/* Partner placeholder grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {partners.map((p, i) => (
            <SectionReveal key={p.name} delay={i * 0.07}>
              <div className="group rounded-xl border border-ink/10 bg-white px-6 py-8
                flex flex-col items-center justify-center text-center gap-3 h-28
                hover:border-forest/20 hover:shadow-card-hover transition-all duration-300">
                {/* Placeholder logo area */}
                <div className="w-10 h-10 rounded-lg border border-forest/15 bg-forest/5
                  flex items-center justify-center text-forest/50 text-xs font-mono font-bold">
                  {p.name[0]}
                </div>
                <div>
                  <p className="text-ink/40 text-xs font-medium">{p.name}</p>
                  <p className="text-gold/60 text-[10px] mt-0.5">{p.type}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Press mention placeholder strip */}
        <SectionReveal delay={0.3} className="mt-10">
          <div className="rounded-xl border border-forest/15 bg-white px-6 py-4
            flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <span className="text-ink/35 text-xs font-semibold uppercase tracking-widest">
              As Seen In
            </span>
            <div className="flex flex-wrap justify-center gap-6">
              {["Media Outlet A", "Media Outlet B", "Media Outlet C"].map((m) => (
                <span key={m} className="text-ink/30 text-sm font-display font-semibold">{m}</span>
              ))}
            </div>
            <span className="text-gold/70 text-xs italic">
             , Placeholder until press coverage confirmed
            </span>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
