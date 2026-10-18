"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { useIsCoreRoute } from "@/lib/useIsCoreRoute";

type SubmitState = "idle" | "loading" | "success" | "error";

/**
 * Inline waitlist form, embedded mid-page as a second capture point.
 * Uses the same /api/waitlist endpoint as the modal. Renders in the
 * light Foundation palette on the homepage and the dark Core palette
 * when embedded at the bottom of the token page.
 */
export function WaitlistSection() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const isCore = useIsCoreRoute();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState("loading");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("wl-inline-name") as HTMLInputElement).value,
      email: (form.elements.namedItem("wl-inline-email") as HTMLInputElement).value,
      role: (form.elements.namedItem("wl-inline-role") as HTMLSelectElement).value,
      _hp: (form.elements.namedItem("_hp") as HTMLInputElement).value,
    };
    if (data._hp) { setSubmitState("idle"); return; }

    // Network failures and server error responses are handled separately —
    // a dropped connection throws a raw browser-level error (Chrome's
    // wording is literally "Failed to fetch") that must never be shown
    // as-is; only messages our own API wrote for a human reach the screen.
    let res: Response;
    try {
      res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      setSubmitState("error");
      setErrorMsg("We couldn't reach our server. Please check your connection and try again.");
      return;
    }

    if (!res.ok) {
      let json: { error?: string } = {};
      try {
        json = await res.json();
      } catch {
        // Non-JSON response body; fall through to the generic message.
      }
      setSubmitState("error");
      setErrorMsg(json.error || "Something went wrong. Please try again.");
      return;
    }

    setSubmitState("success");
  };

  const heading = isCore ? "text-white" : "text-ink";
  const bodyMuted = isCore ? "text-white/55" : "text-ink/70";
  const label = isCore ? "text-white/70" : "text-ink/75";
  const inputClass = isCore
    ? "bg-white/5 border border-white/10 text-white placeholder-white/25 focus:border-emerald/40"
    : "bg-white border border-ink/15 text-ink placeholder-ink/35 focus:border-forest/50";
  const accentText = isCore ? "text-emerald-light" : "text-gold";
  const submitBtn = isCore
    ? "bg-emerald-gradient text-white shadow-emerald hover:brightness-110"
    : "bg-forest-gradient text-white shadow-forest hover:shadow-forest-lg hover:brightness-110";

  return (
    <section
      id="waitlist"
      className={`relative py-24 lg:py-32 overflow-hidden ${isCore ? "bg-coin-black" : "bg-ivory"}`}
      aria-labelledby="waitlist-heading"
    >
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent
        ${isCore ? "via-emerald/20" : "via-forest/25"}`} />

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute left-1/4 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl
          ${isCore ? "bg-emerald/6" : "bg-gold/6"}`} />
        <div className={`absolute right-1/4 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl
          ${isCore ? "bg-cyan/6" : "bg-forest/6"}`} />
      </div>

      <div className="container-wide relative">
        <div className="max-w-2xl mx-auto text-center">
          <SectionReveal>
            <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${accentText}`}>
              Early Access
            </p>
            <div className={isCore ? "section-divider-core" : "section-divider"} />
            <h2
              id="waitlist-heading"
              className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${heading}`}
            >
              Be First.
              <br />
              <span className={isCore ? "text-emerald-gradient" : "text-forest-gradient"}>Join the Waitlist.</span>
            </h2>
            <p className={`text-base mb-10 max-w-lg mx-auto ${bodyMuted}`}>
              Presale access, whitepaper early release, and priority onboarding, reserved for
              waitlist members. Round 1 opens{" "}
              <span className={`font-semibold ${accentText}`}>September 21, 2026</span>.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className={`rounded-2xl border p-8 lg:p-10 backdrop-blur-sm
              ${isCore ? "border-emerald/20 bg-white/3" : "border-forest/20 bg-white"}`}>
              {submitState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald/15 border border-emerald/30
                    flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className={`font-display text-2xl font-bold mb-2 ${heading}`}>You&apos;re on the list!</h3>
                  <p className={`text-sm ${bodyMuted}`}>
                    Watch your inbox, we&apos;ll send early access details before September 21, 2026.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot */}
                  <div className="sr-only" aria-hidden="true">
                    <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="text-left">
                      <label htmlFor="wl-inline-name" className={`block text-sm font-medium mb-1.5 ${label}`}>
                        Full Name
                      </label>
                      <input
                        id="wl-inline-name"
                        name="wl-inline-name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        className={`w-full px-4 py-3 rounded-xl transition-colors text-sm focus:outline-none ${inputClass}`}
                      />
                    </div>
                    <div className="text-left">
                      <label htmlFor="wl-inline-email" className={`block text-sm font-medium mb-1.5 ${label}`}>
                        Email Address
                      </label>
                      <input
                        id="wl-inline-email"
                        name="wl-inline-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={`w-full px-4 py-3 rounded-xl transition-colors text-sm focus:outline-none ${inputClass}`}
                      />
                    </div>
                  </div>

                  <div className="text-left mb-6">
                    <label htmlFor="wl-inline-role" className={`block text-sm font-medium mb-1.5 ${label}`}>
                      I&apos;m joining as a… <span className={isCore ? "text-white/30" : "text-ink/40"}>(optional)</span>
                    </label>
                    <select
                      id="wl-inline-role"
                      name="wl-inline-role"
                      className={`w-full px-4 py-3 rounded-xl transition-colors text-sm focus:outline-none
                        ${inputClass} ${isCore ? "[&>option]:bg-coin-black" : "[&>option]:bg-white"}`}
                    >
                      <option value="general">General supporter</option>
                      <option value="investor">Investor / Token buyer</option>
                      <option value="community">Community member / Advocate</option>
                      <option value="partner">Partner / Organization</option>
                    </select>
                  </div>

                  {submitState === "error" && (
                    <p className="text-ruby-light text-sm mb-4 bg-ruby/10 border border-ruby/20 rounded-lg px-4 py-2">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitState === "loading"}
                    className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300
                      disabled:opacity-60 disabled:cursor-not-allowed ${submitBtn}`}
                  >
                    {submitState === "loading" ? "Submitting…" : "Secure My Spot → "}
                  </button>

                  <p className={`text-center text-xs mt-3 ${isCore ? "text-white/25" : "text-ink/40"}`}>
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
