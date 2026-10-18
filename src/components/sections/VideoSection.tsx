"use client";

import { useState } from "react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { siteConfig } from "@/data/site-config";

export function VideoSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const hasVideo = Boolean(siteConfig.videoEmbedUrl);

  return (
    <section
      id="video"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFFFF0 0%, #F1F7EC 40%, #FFFFF0 100%)" }}
      aria-labelledby="video-heading"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest/25 to-transparent" />

      <div className="container-wide">
        <SectionReveal className="text-center mb-10">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
            Our Story
          </p>
          <div className="section-divider" />
          <h2
            id="video-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-ink"
          >
            Watch the{" "}
            <span className="text-forest-gradient">Mission in Motion</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-forest/20
              shadow-glass aspect-video bg-cream">

              {hasVideo ? (
                <>
                  {/* Lazy-loaded video embed */}
                  {!isLoaded && (
                    <button
                      onClick={() => setIsLoaded(true)}
                      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center
                        group cursor-pointer bg-gradient-to-br from-cream to-white"
                      aria-label="Play explainer video"
                    >
                      <div className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center
                        shadow-gold group-hover:shadow-gold-lg group-hover:scale-110 transition-all duration-300 mb-4">
                        <svg className="w-8 h-8 text-ink ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="text-ink/60 text-sm">Click to play</span>
                    </button>
                  )}
                  {isLoaded && (
                    <iframe
                      src={`${siteConfig.videoEmbedUrl}?autoplay=1&rel=0`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Manumit Me Foundation, Explainer Video"
                      className="absolute inset-0 w-full h-full"
                    />
                  )}
                </>
              ) : (
                /* Placeholder, shown until client provides video URL in site-config.ts */
                <div className="absolute inset-0 flex flex-col items-center justify-center
                  bg-gradient-to-br from-ivory via-cream to-white">
                  {/* Circuit pattern */}
                  <div className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: "radial-gradient(circle at 2px 2px, rgba(27,122,50,0.35) 1px, transparent 0)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <div className="relative text-center">
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-forest/30
                      flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-forest/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-forest-dark text-sm font-semibold mb-1">
                      Explainer Video Coming Soon
                    </p>
                    <p className="text-ink/40 text-xs max-w-xs">
                      Add your YouTube or Vimeo embed URL to{" "}
                      <code className="text-gold/80">src/data/site-config.ts</code>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
