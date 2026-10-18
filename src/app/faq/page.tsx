import type { Metadata } from "next";
import { Accordion } from "@/components/ui/Accordion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { faqItems as localFaqItems } from "@/data/faq";
import { client } from "@/sanity/lib/client";
import { faqQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "FAQ | MANUMIT CORE (MMC)",
  description:
    "Frequently asked questions about the Manumit Me Foundation, MANUMIT CORE (MMC) token, the presale, and how to participate.",
};

export const revalidate = 300; // ISR: revalidate every 5 minutes

export default async function FaqPage() {
  // Fetch from Sanity
  const sanityFaq = await client.fetch(faqQuery);

  // Use Sanity data if available, otherwise fallback to local hardcoded data
  const faqItems = sanityFaq && sanityFaq.length > 0 ? sanityFaq : localFaqItems;

  // Group FAQ items by category
  const categories = Array.from(new Set(faqItems.map((f: any) => f.category || "General")));

  return (
    <div className="bg-ivory min-h-screen pt-24">
      {/* Header */}
      <section className="relative py-16 lg:py-24 border-b border-ink/8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ivory via-cream to-forest/6" />
        <div className="container-wide relative text-center">
          <SectionReveal>
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
              Have Questions?
            </p>
            <div className="section-divider" />
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink mb-4">
              Frequently Asked
              <br />
              <span className="text-forest-gradient">Questions</span>
            </h1>
            <p className="text-ink/65 max-w-lg mx-auto text-lg">
              Transparent answers to the questions we hear most. Can&apos;t find what you&apos;re
              looking for?{" "}
              <a href="/contact" className="text-forest-dark hover:text-forest transition-colors">
                Ask us directly →
              </a>
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* FAQ by category */}
      <section className="py-20 lg:py-28">
        <div className="container-wide max-w-3xl">
          {categories.map((category: any, ci: number) => {
            const items = faqItems.filter((f: any) => (f.category || "General") === category);
            return (
              <SectionReveal key={category} delay={ci * 0.05}>
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 rounded-full bg-forest-gradient" />
                    <h2 className="font-display text-lg font-bold text-forest-dark uppercase tracking-wider">
                      {category}
                    </h2>
                  </div>
                  <Accordion items={items} />
                </div>
              </SectionReveal>
            );
          })}

          {/* Still have questions */}
          <SectionReveal delay={0.2}>
            <div className="mt-8 rounded-2xl border border-gold/15 bg-gold/5 p-8 text-center">
              <h3 className="font-display text-xl font-bold text-ink mb-3">
                Still have questions?
              </h3>
              <p className="text-ink/60 text-sm mb-6">
                Our team is happy to answer questions directly. Reach out via the contact form or
                join our community channels for real-time discussion.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-forest-gradient
                    text-white font-semibold text-sm shadow-forest hover:brightness-110 transition-all"
                >
                  Contact Us
                </a>
                <a
                  href="https://t.me/manumitme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gold/25
                    text-gold text-sm font-semibold hover:bg-gold/10 transition-all"
                >
                  Join Telegram
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
