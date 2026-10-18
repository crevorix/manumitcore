import type { Metadata } from "next";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { roadmapPhases as localRoadmapPhases, milestoneEvents, RoadmapStatus } from "@/data/roadmap";
import { client } from "@/sanity/lib/client";
import { roadmapQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Roadmap | MANUMIT CORE (MMC)",
  description:
    "The full 6-phase roadmap for MANUMIT CORE (MMC) and the Manumit Me Foundation — from token creation through ecosystem development and blockchain transition.",
};

const statusConfig: Record<RoadmapStatus, { label: string; dotClass: string; cardBorder: string; tagClass: string }> = {
  completed: {
    label: "Completed",
    dotClass: "bg-gold",
    cardBorder: "border-gold/20",
    tagClass: "text-gold bg-gold/10 border-gold/20",
  },
  active: {
    label: "In Progress",
    dotClass: "bg-emerald animate-pulse",
    cardBorder: "border-emerald/25",
    tagClass: "text-emerald-dark bg-emerald/10 border-emerald/25",
  },
  upcoming: {
    label: "Upcoming",
    dotClass: "bg-ink/25 border-2 border-ink/10",
    cardBorder: "border-ink/10",
    tagClass: "text-ink/55 bg-ink/6 border-ink/12",
  },
  tbd: {
    label: "TBD",
    dotClass: "bg-ink/12",
    cardBorder: "border-ink/8",
    tagClass: "text-ink/35 bg-ink/4 border-ink/10",
  },
};

export const revalidate = 300; // ISR: revalidate every 5 minutes

export default async function RoadmapPage() {
  // Fetch from Sanity
  const sanityPhases = await client.fetch(roadmapQuery);

  // Use Sanity data if available, otherwise fallback to local hardcoded data
  const roadmapPhases = sanityPhases && sanityPhases.length > 0 ? sanityPhases : localRoadmapPhases;

  return (
    <div className="bg-ivory min-h-screen pt-24">
      {/* Page header */}
      <section className="relative py-16 lg:py-24 border-b border-ink/8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ivory via-cream to-forest/6" />
        <div className="container-wide relative text-center">
          <SectionReveal>
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">Roadmap</p>
            <div className="section-divider" />
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink mb-4">
              The Path to
              <br />
              <span className="text-forest-gradient">Freedom.</span>
            </h1>
            <p className="text-ink/65 max-w-xl mx-auto text-lg">
              Six phases. One mission. Building with intention, transparency, and accountability
              every step of the way.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Milestone banner */}
      <section className="border-b border-ink/8 bg-gold/5">
        <div className="container-wide py-4">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {milestoneEvents.map((m) => (
              <div key={m.label} className="flex items-center gap-3">
                <span className="text-gold text-sm">📅</span>
                <div>
                  <span className="text-gold font-semibold text-sm">{m.date}</span>
                  <span className="text-ink/40 mx-2">—</span>
                  <span className="text-ink/65 text-sm">{m.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28">
        <div className="container-wide max-w-4xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-forest/40 via-forest/10 to-transparent" />

            <div className="space-y-8">
              {roadmapPhases.map((phase: any, i: number) => {
                const cfg = statusConfig[phase.status as RoadmapStatus] || statusConfig.upcoming;
                return (
                  <SectionReveal key={phase.phase} delay={Math.min(i * 0.08, 0.4)}>
                    <div className="relative pl-16">
                      {/* Timeline dot */}
                      <div className="absolute left-3.5 top-8 w-5 h-5 rounded-full bg-ivory border border-ivory
                        flex items-center justify-center">
                        <div className={`w-3 h-3 rounded-full ${cfg.dotClass}`} />
                      </div>

                      {/* Card */}
                      <div className={`rounded-2xl border ${cfg.cardBorder} bg-white p-7 lg:p-9
                        hover:shadow-card-hover transition-all duration-300`}>
                        {/* Header row */}
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                          <div className="flex items-start gap-4">
                            <span className="text-4xl">{phase.icon}</span>
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="text-gold/70 text-xs font-mono font-bold uppercase tracking-widest">
                                  Phase {phase.phase}
                                </span>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${cfg.tagClass}`}>
                                  {cfg.label}
                                </span>
                              </div>
                              <h2 className="font-display text-xl lg:text-2xl font-bold text-ink leading-tight">
                                {phase.title}
                              </h2>
                              <p className="text-gold/80 text-sm mt-1 font-semibold">{phase.quarter}</p>
                            </div>
                          </div>
                        </div>

                        {/* Summary */}
                        <p className="text-ink/65 text-sm leading-relaxed mb-6">{phase.summary}</p>

                        {/* Highlight */}
                        {phase.highlight && (
                          <div className="mb-6 px-4 py-2.5 rounded-xl border border-gold/15 bg-gold/5 inline-block">
                            <span className="text-gold text-sm font-semibold">{phase.highlight}</span>
                          </div>
                        )}

                        {/* Milestones */}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="list">
                          {phase.milestones.map((m: string) => (
                            <li key={m} className="flex items-start gap-2.5">
                              <span className="text-gold text-sm shrink-0 mt-0.5">◆</span>
                              <span className="text-ink/65 text-sm">{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
