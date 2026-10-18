"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

type SubmitState = "idle" | "loading" | "success" | "error";
type RoleOption = "investor" | "community" | "partner" | "general";

/**
 * Global waitlist modal, listens for the "open-waitlist-modal" custom event
 * dispatched by TokenPurchaseCTA and any other CTA buttons.
 *
 * Mount this once in the root layout so it's available on all pages.
 */
export function WaitlistModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Listen for the custom event from TokenPurchaseCTA & other CTAs
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-waitlist-modal", handleOpen);
    return () => window.removeEventListener("open-waitlist-modal", handleOpen);
  }, []);

  // Trap focus and handle Escape key
  useEffect(() => {
    if (isOpen) {
      firstInputRef.current?.focus();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLSelectElement).value,
      // Honeypot, should be empty
      _hp: (form.elements.namedItem("_hp") as HTMLInputElement).value,
    };

    // Honeypot check (client-side)
    if (data._hp) {
      setSubmitState("idle");
      return;
    }

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
      setErrorMsg(
        "We couldn't reach our server. Please check your connection and try again."
      );
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

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSubmitState("idle");
      setErrorMsg("");
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-modal-title"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-md glass rounded-2xl border border-emerald/20 shadow-glass overflow-hidden">
              {/* Header */}
              <div className="relative p-6 border-b border-white/10">
                <div className="absolute inset-0 bg-emerald-gradient opacity-10" />
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <XMarkIcon className="w-5 h-5 pointer-events-none" />
                </button>
                <div className="relative">
                  <p className="text-emerald-light text-xs font-semibold tracking-widest uppercase mb-1">
                    Token Sale Opens Soon
                  </p>
                  <h2
                    id="waitlist-modal-title"
                    className="font-display text-2xl text-white font-bold"
                  >
                    Join the Waitlist
                  </h2>
                  <p className="text-white/60 text-sm mt-1">
                    Be the first to know when Round 1 opens on September 21, 2026.
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {submitState === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald/20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl text-white font-semibold mb-2">
                      You&apos;re on the list!
                    </h3>
                    <p className="text-white/60 text-sm">
                      Thank you for your interest in MANUMIT CORE. We&apos;ll reach out with
                      early access details before the presale opens.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-6 text-emerald-light text-sm hover:text-emerald transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Honeypot, hidden from real users */}
                    <div className="sr-only" aria-hidden="true">
                      <label htmlFor="wl-hp">Leave this empty</label>
                      <input type="text" name="_hp" id="wl-hp" tabIndex={-1} autoComplete="off" />
                    </div>

                    <div>
                      <label htmlFor="wl-name" className="block text-sm font-medium text-white/80 mb-1.5">
                        Full Name
                      </label>
                      <input
                        ref={firstInputRef}
                        id="wl-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30
                          focus:outline-none focus:border-emerald/50 focus:bg-white/8 transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="wl-email" className="block text-sm font-medium text-white/80 mb-1.5">
                        Email Address
                      </label>
                      <input
                        id="wl-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30
                          focus:outline-none focus:border-emerald/50 transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="wl-role" className="block text-sm font-medium text-white/80 mb-1.5">
                        I&apos;m interested as a… <span className="text-white/40">(optional)</span>
                      </label>
                      <select
                        id="wl-role"
                        name="role"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white
                          focus:outline-none focus:border-emerald/50 transition-colors text-sm
                          [&>option]:bg-coin-black"
                      >
                        <option value="general">General supporter</option>
                        <option value="investor">Investor / Token buyer</option>
                        <option value="community">Community member / Advocate</option>
                        <option value="partner">Partner / Organization</option>
                      </select>
                    </div>

                    {submitState === "error" && (
                      <p className="text-ruby-light text-sm bg-ruby/10 border border-ruby/20 rounded-lg px-3 py-2">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitState === "loading"}
                      className="w-full py-3.5 rounded-xl bg-emerald-gradient text-white font-semibold text-sm
                        shadow-emerald hover:brightness-110 transition-all duration-300
                        disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitState === "loading" ? "Submitting…" : "Join the Waitlist →"}
                    </button>

                    <p className="text-center text-xs text-white/30">
                      No spam. Unsubscribe anytime. Your information is never sold.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
