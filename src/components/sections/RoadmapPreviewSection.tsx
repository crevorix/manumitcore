"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { roadmapPhases } from "@/data/roadmap";

const statusStyles = {
  completed: {
    dot: "bg-gold",
    badge: "text-gold bg-gold/10 border-gold/20",
    label: "Completed",
  },
  active: {
    dot: "bg-emerald animate-pulse",
    badge: "text-emerald-dark bg-emerald/10 border-emerald/25",
    label: "In Progress",
  },
  upcoming: {
    dot: "bg-ink/20",
    badge: "text-ink/55 bg-ink/6 border-ink/12",
    label: "Upcoming",
  },
  tbd: {
    dot: "bg-ink/12",
    badge: "text-ink/35 bg-ink/4 border-ink/10",
    label: "TBD",
  },
};

// Show only first 3 phases in the preview
const previewPhases = roadmapPhases.slice(0, 3);

export function RoadmapPreviewSection() {
  return (
    <section
      id="roadmap-preview"
      className="relative py-24 lg:py-32 bg-ivory overflow-hidden"
      aria-labelledby="roadmap-preview-heading"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest/25 to-transparent" />

      <div className="container-wide">
        {/* Heading */}
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
                Roadmap
              </p>
              <div className="w-12 h-0.5 bg-gold-gradient rounded-full mb-4" />
              <h2
                id="roadmap-preview-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight"
              >
                Building With
                <br />
                <span className="text-forest-gradient">Intention.</span>
              </h2>
            </div>
            <Link
              href="/roadmap"
              className="shrink-0 inline-flex items-center gap-2 text-forest-dark font-semibold
                text-sm hover:text-forest transition-colors border-b border-forest/30 pb-0.5"
            >
              View full roadmap →
            </Link>
          </div>
        </SectionReveal>

        {/* Timeline preview */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-forest/40 via-forest/10 to-transparent hidden md:block" />

          <div className="space-y-6">
            {previewPhases.map((phase, i) => {
              const status = statusStyles[phase.status];
              return (
                <SectionReveal key={phase.phase} delay={i * 0.12}>
                  <div className="md:pl-16 relative">
                    {/* Timeline dot */}
                    <div className="absolute left-4 top-6 w-4 h-4 rounded-full border-2 border-ivory
                      hidden md:flex items-center justify-center">
                      <div className={`w-2.5 h-2.5 rounded-full ${status.dot}`} />
                    </div>

                    <div className="group rounded-2xl border border-ink/10 bg-white p-6 lg:p-8
                      hover:border-forest/20 hover:shadow-card-hover transition-all duration-300">
                      <div className="flex flex-wrap items-start gap-4">
                        {/* Phase number + icon */}
                        <div className="text-3xl">{phase.icon}</div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-gold/70 text-xs font-mono font-semibold uppercase tracking-wider">
                              Phase {phase.phase}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${status.badge}`}>
                              {status.label}
                            </span>
                          </div>

                          <h3 className="font-display text-lg font-bold text-ink mb-1 group-hover:text-forest-dark transition-colors">
                            {phase.title}
                          </h3>
                          <p className="text-gold/80 text-xs font-semibold mb-3">
                            {phase.quarter}
                          </p>
                          <p className="text-ink/60 text-sm leading-relaxed">
                            {phase.summary}
                          </p>
                        </div>

                        {/* Key milestones (first 3) */}
                        <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {phase.milestones.slice(0, 3).map((m) => (
                            <div key={m} className="flex items-start gap-2">
                              <span className="text-gold text-xs mt-0.5 shrink-0">✓</span>
                              <span className="text-ink/50 text-xs">{m}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>

          {/* See more prompt */}
          <SectionReveal delay={0.3}>
            <div className="md:pl-16 mt-6">
              <Link
                href="/roadmap"
                className="block rounded-2xl border border-dashed border-forest/20
                  hover:border-forest/35 transition-all duration-300
                  p-6 text-center group"
              >
                <span className="text-ink/45 text-sm group-hover:text-forest-dark transition-colors">
                  + 3 more phases, including Ecosystem Development, Web3 Platform & Blockchain Transition
                </span>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
