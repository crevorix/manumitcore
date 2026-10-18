"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";

const pillars = [
  {
    icon: "⛓️",
    title: "The Problem",
    body: "Communities fighting for justice, dignity, and equity are chronically underfunded, fragmented, and ignored by institutions. Passion exists. Resources don't reach where they're needed most.",
    color: "forest",
  },
  {
    icon: "💡",
    title: "Our Answer",
    body: "The Manumit Me Foundation leverages blockchain technology to create transparent, verifiable funding flows that reward genuine advocacy and hold institutions accountable, not just symbolically, but economically.",
    color: "gold",
  },
  {
    icon: "🌱",
    title: "The Opportunity",
    body: "Web3 offers a new social contract. MANUMIT CORE (MMC) is not just a token, it's infrastructure for communities to organize, earn, and amplify their voice with provable impact.",
    color: "emerald-dark",
  },
];

const colorMap: Record<string, string> = {
  forest: "border-forest/20 bg-forest/5 text-forest-dark",
  gold: "border-gold/20 bg-gold/5 text-gold",
  "emerald-dark": "border-emerald-dark/20 bg-emerald-dark/5 text-emerald-dark",
};

export function MissionSection() {
  return (
    <section
      id="mission"
      className="relative py-24 lg:py-32 bg-ivory overflow-hidden"
      aria-labelledby="mission-heading"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest/25 to-transparent" />

      <div className="container-wide">
        {/* Heading */}
        <SectionReveal className="text-center mb-16">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
            Why We Exist
          </p>
          <div className="section-divider" />
          <h2
            id="mission-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink max-w-3xl mx-auto leading-tight"
          >
            Freedom Is Not a Slogan.
            <br />
            <span className="text-forest-gradient">It&apos;s a System We&apos;re Building.</span>
          </h2>
        </SectionReveal>

        {/* Mission statement */}
        <SectionReveal delay={0.1} className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-ink/70 text-lg leading-relaxed">
            The word <em className="text-forest-dark not-italic font-semibold">manumit</em> means to set free.
            For centuries it described the act of liberating people from bondage. Today, we use it to
            describe the act of liberating communities from systemic neglect, through technology,
            transparency, and collective economic power.
          </p>
          <div className="mt-8 px-6 py-4 rounded-xl border border-forest/20 bg-forest/5 inline-block">
            <p className="text-forest-dark font-display text-xl font-semibold italic">
              &ldquo;Empower · Educate · Elevate · Empower Humanity&rdquo;
            </p>
          </div>
        </SectionReveal>

        {/* Three-pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <SectionReveal key={p.title} delay={i * 0.12}>
              <div
                className={`h-full rounded-2xl border p-8 transition-all duration-300
                  hover:scale-[1.02] hover:shadow-card-hover bg-white
                  ${colorMap[p.color].split(" ").slice(0, 2).join(" ")}`}
              >
                <span className="text-4xl mb-5 block">{p.icon}</span>
                <h3 className={`font-display text-xl font-bold mb-3 ${colorMap[p.color].split(" ")[2]}`}>
                  {p.title}
                </h3>
                <p className="text-ink/65 text-sm leading-relaxed">{p.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* M.A.C.T.S Framework */}
        <SectionReveal delay={0.2} className="mt-16">
          <div className="rounded-2xl border border-forest/20 bg-gradient-to-br from-forest/5 to-gold/5 p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">
                  Our Core Values
                </p>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-ink mb-2">
                  The M.A.C.T.S Framework
                </h3>
                <p className="text-forest-dark font-semibold text-sm mb-4">
                  Membership · Activity · Calculation · Tracking · System
                </p>
                <p className="text-ink/65 text-sm leading-relaxed mb-6">
                  Every action taken on our platform is measured against the M.A.C.T.S framework, the
                  five pillars that separate genuine advocacy from performative activism. MMC rewards those
                  who act on these values, not just those who post about them.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-forest/25 bg-forest/8">
                  <span className="text-forest-dark font-display font-black text-lg tracking-widest">M.A.C.T.S.</span>
                  <span className="text-ink/45 text-xs">Manumission Is the Mission</span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { letter: "M", title: "Membership", body: "We believe in supporting efforts that promote freedom, dignity, empowerment, and the removal of unjust barriers." },
                  { letter: "A", title: "Activity", body: "We believe in accepting responsibility for one's actions, decisions, and commitments." },
                  { letter: "C", title: "Calculation", body: "We believe that people must earn trust through honesty, consistency, and ethical conduct." },
                  { letter: "T", title: "Tracking", body: "We reject deliberate deception, and endeavor to engage in good-faith dialogue, and are forever in the pursuit of truth." },
                  { letter: "S", title: "System", body: "We acknowledge that meaningful change often requires personal effort, time, resources, and service." },
                ].map((item) => (
                  <div
                    key={item.letter}
                    className="flex items-start gap-4 rounded-xl border border-forest/15 bg-white/60 px-4 py-3"
                  >
                    <div className="text-xl font-display font-black text-forest-gradient shrink-0 w-6 text-center">
                      {item.letter}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink mb-0.5">{item.title}</div>
                      <div className="text-xs text-ink/55 leading-relaxed">{item.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
