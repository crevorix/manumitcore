import type { Metadata } from "next";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { notASecurity as c, type HoweyMark } from "@/data/not-a-security";

export const metadata: Metadata = {
  title: "Not Security",
  description:
    "How MANUMIT CORE and the Manumit Open Network are structured — membership, token utility, and marketing — so as not to constitute a security offering.",
};

/** Bulleted list in the Foundation palette. */
function PointList({
  points,
  bullet = "◆",
  bulletClass = "text-gold",
}: {
  points: string[];
  bullet?: string;
  bulletClass?: string;
}) {
  return (
    <ul className="space-y-3" role="list">
      {points.map((p) => (
        <li key={p} className="flex items-start gap-3">
          <span className={`${bulletClass} text-sm shrink-0 mt-1`}>{bullet}</span>
          <span className="text-ink/70 leading-relaxed">{p}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({
  heading,
  children,
  tone = "default",
}: {
  heading: string;
  children: React.ReactNode;
  tone?: "default" | "emphasis";
}) {
  return (
    <SectionReveal>
      <section
        className={`rounded-2xl border p-7 lg:p-9 ${
          tone === "emphasis" ? "border-gold/25 bg-gold/5" : "border-ink/10 bg-white"
        }`}
      >
        <h2 className="font-display text-xl lg:text-2xl font-bold text-ink mb-6">
          {heading}
        </h2>
        {children}
      </section>
    </SectionReveal>
  );
}

/**
 * The Howey prong markers. The client specified a green check, a yellow
 * caution triangle and a red cross against the four elements — the point of
 * the section is that the fourth is not met, so the marks carry the argument
 * and need to be unambiguous rather than decorative.
 */
function HoweyIcon({ mark }: { mark: HoweyMark }) {
  const common = "w-6 h-6 shrink-0";
  if (mark === "check") {
    return (
      <svg className={`${common} text-forest-dark`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.12" />
        <path d="M7 12.5l3.2 3.2L17 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (mark === "caution") {
    return (
      <svg className={`${common} text-gold`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3.5l9 15.5H3l9-15.5z" fill="currentColor" opacity="0.15" />
        <path d="M12 3.5l9 15.5H3l9-15.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 9.5v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16.4" r="1.1" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg className={`${common} text-ruby`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.12" />
      <path d="M8.2 8.2l7.6 7.6M15.8 8.2l-7.6 7.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

const MARK_LABEL: Record<HoweyMark, string> = {
  check: "Present",
  caution: "Qualified",
  cross: "Not satisfied",
};

export default function NotASecurityPage() {
  return (
    <div className="bg-ivory min-h-screen pt-24">
      {/* Header */}
      <section className="relative py-16 lg:py-24 border-b border-ink/8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ivory via-cream to-forest/6" />
        <div className="container-wide relative text-center">
          <SectionReveal>
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
              {c.eyebrow}
            </p>
            <div className="section-divider" />
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mb-4 max-w-3xl mx-auto leading-tight">
              {c.heading}
            </h1>
            <p className="font-display text-lg sm:text-xl text-forest-gradient font-semibold mb-6">
              {c.subheading}
            </p>
            <p className="text-ink/65 max-w-2xl mx-auto leading-relaxed">{c.intro}</p>
          </SectionReveal>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 lg:py-24">
        <div className="container-wide max-w-3xl space-y-6">
          <Section heading={c.structure.heading}>
            <PointList points={c.structure.points} />
          </Section>

          <Section heading={c.marketing.heading}>
            <PointList points={c.marketing.points} />
          </Section>

          {/* Token rights — do's and don'ts side by side */}
          <Section heading={c.tokenRights.heading} tone="emphasis">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-forest-dark mb-4">
                  {c.tokenRights.dos.heading}
                </h3>
                <PointList
                  points={c.tokenRights.dos.points}
                  bullet="✓"
                  bulletClass="text-forest-dark"
                />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ruby mb-4">
                  {c.tokenRights.donts.heading}
                </h3>
                <PointList
                  points={c.tokenRights.donts.points}
                  bullet="✕"
                  bulletClass="text-ruby"
                />
              </div>
            </div>
            <p className="mt-8 pt-6 border-t border-gold/20 text-ink font-semibold leading-relaxed">
              {c.tokenRights.keyPrinciple}
            </p>
          </Section>

          {/* Foundation */}
          <Section heading={c.foundation.heading}>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-forest-dark mb-4">
              {c.foundation.entityHeading}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {c.foundation.roles.map((r) => (
                <div key={r.label} className="rounded-xl border border-ink/10 bg-cream/40 p-5">
                  <p className="font-display font-bold text-ink mb-1.5">{r.label}</p>
                  <p className="text-ink/60 text-sm leading-relaxed">{r.body}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {c.foundation.qa.map((item) => (
                <div key={item.question}>
                  <p className="font-display font-bold text-ink mb-2">{item.question}</p>
                  <p className="text-ink/70 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-ink/8">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-forest-dark mb-4">
                {c.foundation.bestPractices.heading}
              </h3>
              <PointList points={c.foundation.bestPractices.points} />
            </div>
          </Section>

          {/* Geography + Howey */}
          <Section heading={c.geography.heading}>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-forest-dark mb-4">
              {c.geography.allow.heading}
            </h3>
            <PointList points={c.geography.allow.points} />

            {/* Howey test */}
            <div className="mt-8 pt-8 border-t border-ink/8">
              <h3 className="font-display text-lg font-bold text-ink mb-2">
                {c.geography.howey.heading}
              </h3>
              <p className="text-ink/65 leading-relaxed mb-5">{c.geography.howey.intro}</p>

              <ol className="space-y-3 mb-6" role="list">
                {c.geography.howey.prongs.map((p, i) => (
                  <li
                    key={p.text}
                    className="flex items-center gap-4 rounded-xl border border-ink/10 bg-cream/40 px-5 py-4"
                  >
                    <HoweyIcon mark={p.mark} />
                    <span className="text-ink/75 flex-1">
                      <span className="text-ink/40 font-mono text-sm mr-2">({i + 1})</span>
                      {p.text}
                    </span>
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap ${
                        p.mark === "check"
                          ? "text-forest-dark"
                          : p.mark === "caution"
                            ? "text-gold"
                            : "text-ruby"
                      }`}
                    >
                      {MARK_LABEL[p.mark]}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="rounded-xl border border-forest/20 bg-forest/5 p-5">
                <p className="text-ink/75 leading-relaxed">{c.geography.howey.conclusion}</p>
              </div>

              <p className="text-ink/45 text-sm italic mt-4">
                See {c.geography.howey.citation}
              </p>
            </div>

            {/* Restricted */}
            <div className="mt-8 pt-6 border-t border-ink/8">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ruby mb-3">
                {c.geography.restricted.heading}
              </h3>
              <p className="text-ink/70 leading-relaxed">{c.geography.restricted.body}</p>
            </div>
          </Section>

          <SectionReveal>
            <p className="text-center text-ink/40 text-sm pt-4">
              Last updated {c.lastUpdated}
            </p>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
