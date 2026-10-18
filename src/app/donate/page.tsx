import type { Metadata } from "next";
import Image from "next/image";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";
import { ShareButton } from "@/components/ui/ShareButton";
import { fundraisers as localFundraisers, type Fundraiser } from "@/data/fundraisers";
import { client } from "@/sanity/lib/client";
import { fundraisersQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  // The root layout applies a "%s | Manumit Me Foundation" template, so the
  // site name must not be repeated here.
  title: "Donate",
  description:
    "Support the causes and communities that need it most. Explore the Manumit Me Foundation's current fundraising campaigns and donate through GoFundMe.",
};

export const revalidate = 300; // ISR: campaigns edited in the Studio go live within 5 minutes

export default async function DonatePage() {
  // Sanity is the source of truth; the local list is the fallback for an empty
  // dataset or a CMS outage, so the page is never blank.
  let campaigns: Fundraiser[] = localFundraisers;
  try {
    const fromSanity = await client.fetch<Fundraiser[]>(fundraisersQuery);
    if (fromSanity && fromSanity.length > 0) campaigns = fromSanity;
  } catch {
    // Keep the fallback — a donate page that renders is worth more than an error.
  }

  return (
    <div className="bg-ivory min-h-screen pt-24">
      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="relative py-16 lg:py-24 border-b border-ink/8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ivory via-cream to-forest/6" />
        <div className="container-wide relative text-center">
          <SectionReveal>
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">Donate</p>
            <div className="section-divider" />
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink mb-4">
              Make a
              <br />
              <span className="text-forest-gradient">Difference.</span>
            </h1>
            <p className="text-ink/70 max-w-xl mx-auto text-lg mb-6">
              Support the causes and communities that need it most.
            </p>
            <p className="text-ink/60 max-w-2xl mx-auto leading-relaxed mb-9">
              Manumit Me Foundation supports humanitarian, advocacy, educational, and
              community-focused initiatives. Explore our current fundraising campaigns and
              choose a cause that matters to you.
            </p>
            <Button href="#campaigns" size="lg">
              View Our Campaigns
            </Button>
          </SectionReveal>
        </div>
      </section>

      {/* ── 2. Current fundraisers ──────────────────────────────── */}
      <section id="campaigns" className="py-20 lg:py-28 scroll-mt-24">
        <div className="container-wide">
          <SectionReveal>
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-3">
                Current Fundraisers
              </h2>
              <p className="text-ink/60 max-w-xl mx-auto">
                Every campaign represents an opportunity to turn compassion into action.
              </p>
            </div>
          </SectionReveal>

          {campaigns.length === 0 ? (
            <p className="text-center text-ink/50">
              No campaigns are running right now — please check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {campaigns.map((c, i) => (
                <SectionReveal key={c.gofundmeUrl} delay={Math.min(i * 0.08, 0.4)}>
                  <article
                    className="h-full flex flex-col rounded-2xl border border-ink/10 bg-white overflow-hidden
                      hover:shadow-card-hover hover:border-forest/25 transition-all duration-300"
                  >
                    {/* Campaign image */}
                    <div className="relative aspect-[16/10] bg-cream shrink-0">
                      {c.imageUrl ? (
                        <Image
                          src={c.imageUrl}
                          alt={c.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-forest/12 via-cream to-gold/12">
                          <span className="font-display text-sm font-bold tracking-widest uppercase text-forest-dark/50">
                            Manumit Me
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="font-display text-lg font-bold text-ink leading-snug mb-2.5">
                        {c.title}
                      </h3>
                      <p className="text-ink/60 text-sm leading-relaxed mb-6">{c.description}</p>

                      {/* Pushed to the bottom so buttons line up across uneven cards */}
                      <div className="mt-auto">
                        <Button
                          href={c.gofundmeUrl}
                          isExternal
                          size="md"
                          className="w-full"
                        >
                          Donate on GoFundMe
                        </Button>
                      </div>
                    </div>
                  </article>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 3. Other ways to help ───────────────────────────────── */}
      <section className="py-20 lg:py-24 border-y border-ink/8 bg-cream/50">
        <div className="container-wide max-w-3xl text-center">
          <SectionReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
              More Than a Donation
            </h2>
            <p className="text-ink/65 leading-relaxed mb-8">
              Financial support is only one way to make a difference. Sharing a campaign can
              help it reach people who may be able to contribute, advocate, or provide
              additional support.
            </p>
            <ShareButton />
          </SectionReveal>
        </div>
      </section>

      {/* ── 4. Closing ──────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="container-wide max-w-2xl text-center">
          <SectionReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
              Compassion in Action.
            </h2>
            <p className="text-ink/65 leading-relaxed mb-10">
              Every contribution, every share, and every act of support can help move a cause
              forward.
            </p>
            <div className="section-divider" />
            <p className="font-display text-xl sm:text-2xl font-bold tracking-wide text-forest-gradient mt-6">
              MANUMISSION IS THE MISSION.
            </p>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
