"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

type SubmitState = "idle" | "loading" | "success" | "error";

const FIELD =
  "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 " +
  "focus:outline-none focus:border-emerald/50 transition-colors text-sm";

const LABEL = "block text-sm font-medium text-white/80 mb-1.5";

/**
 * Global membership signup modal, listens for the "open-membership-modal"
 * custom event dispatched by MembershipCTA and any other CTA buttons.
 *
 * Mount this once in the root layout so it's available on all pages.
 *
 * PRIVACY: the form asks for two things — a pseudonym and an email address.
 * Legal name, social handle and wallet are behind a collapsed "optional"
 * section so the default experience is visibly minimal. Do not promote any
 * of them into the required set.
 */
export function MembershipModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [memberId, setMemberId] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [showOptional, setShowOptional] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-membership-modal", handleOpen);
    return () => window.removeEventListener("open-membership-modal", handleOpen);
  }, []);

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
    // The optional fields are unmounted while the section is collapsed, so
    // read defensively rather than asserting they exist.
    const value = (fieldName: string) => {
      const el = form.elements.namedItem(fieldName);
      return el instanceof HTMLInputElement ? el.value.trim() : "";
    };

    if (value("_hp")) {
      setSubmitState("idle");
      return;
    }

    const data = {
      pseudonym: value("pseudonym"),
      email: value("email"),
      name: value("name"),
      socialHandle: value("socialHandle"),
      walletAddress: value("walletAddress"),
    };

    // The network request and the response are handled as separate failure
    // modes. A dropped connection throws a raw browser-level error (Chrome's
    // wording is literally "Failed to fetch") that means nothing to a
    // visitor, so it must never reach the screen — only messages our own API
    // wrote for a human are shown.
    let res: Response;
    try {
      res = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      setSubmitState("error");
      setErrorMsg(
        "We couldn't reach our server. Please check your connection and try again — if this keeps happening, your details may already be saved, so try refreshing before resubmitting."
      );
      return;
    }

    let json: { memberId?: string; emailSent?: boolean; error?: string } = {};
    try {
      json = await res.json();
    } catch {
      // Non-JSON response body; fall through to the generic message below.
    }

    if (!res.ok) {
      setSubmitState("error");
      setErrorMsg(json.error || "Something went wrong. Please try again.");
      return;
    }

    setMemberId(json.memberId ?? "");
    setEmailSent(Boolean(json.emailSent));
    setSubmitState("success");
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSubmitState("idle");
      setErrorMsg("");
      setMemberId("");
      setEmailSent(false);
      setShowOptional(false);
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
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

          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="membership-modal-title"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-md glass rounded-2xl border border-emerald/20 shadow-glass overflow-hidden max-h-[92vh] flex flex-col">
              {/* Header */}
              <div className="relative p-6 border-b border-white/10 shrink-0">
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
                    Manumit Open Network
                  </p>
                  <h2
                    id="membership-modal-title"
                    className="font-display text-2xl text-white font-bold"
                  >
                    Become a Member
                  </h2>
                  <p className="text-white/60 text-sm mt-1">
                    Two details, nothing more. Register under a name of your choosing.
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto">
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
                      Welcome to Manumit Me!
                    </h3>
                    <p className="text-white/60 text-sm mb-4">
                      {emailSent
                        ? "A confirmation email with your member ID is on its way."
                        : "Your membership is registered. Please save your member ID below."}
                    </p>
                    <div className="rounded-xl border border-emerald/25 bg-emerald/5 py-3 px-4 inline-block">
                      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Your Member ID</p>
                      <p className="font-display text-2xl font-bold text-emerald-light tracking-wider">
                        {memberId}
                      </p>
                    </div>
                    <p className="text-white/30 text-xs mt-4">Keep this ID for your records.</p>
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
                      <label htmlFor="mem-hp">Leave this empty</label>
                      <input type="text" name="_hp" id="mem-hp" tabIndex={-1} autoComplete="off" />
                    </div>

                    <div>
                      <label htmlFor="mem-pseudonym" className={LABEL}>
                        Network Name
                      </label>
                      <input
                        ref={firstInputRef}
                        id="mem-pseudonym"
                        name="pseudonym"
                        type="text"
                        required
                        autoComplete="off"
                        placeholder="e.g. Xys231"
                        className={FIELD}
                      />
                      <p className="text-white/40 text-xs mt-1.5">
                        A pseudonym of your choosing. This is the only name shown
                        publicly — referrals and rewards are announced by it.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="mem-email" className={LABEL}>
                        Email Address
                      </label>
                      <input
                        id="mem-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={FIELD}
                      />
                      <p className="text-white/40 text-xs mt-1.5">
                        Used only to send your member ID. A private or forwarding
                        address is perfectly acceptable.
                      </p>
                    </div>

                    {/* Everything below is optional and stays collapsed until
                        asked for, so the form reads as two fields by default. */}
                    {showOptional ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-4 overflow-hidden"
                      >
                        <div className="pt-1">
                          <label htmlFor="mem-name" className={LABEL}>
                            Legal Name{" "}
                            <span className="text-white/40 font-normal">(optional)</span>
                          </label>
                          <input
                            id="mem-name"
                            name="name"
                            type="text"
                            autoComplete="off"
                            placeholder="Leave blank to stay anonymous"
                            className={FIELD}
                          />
                        </div>

                        <div>
                          <label htmlFor="mem-social" className={LABEL}>
                            Social Media Address{" "}
                            <span className="text-white/40 font-normal">(optional)</span>
                          </label>
                          <input
                            id="mem-social"
                            name="socialHandle"
                            type="text"
                            autoComplete="off"
                            placeholder="@yourhandle"
                            className={FIELD}
                          />
                        </div>

                        <div>
                          <label htmlFor="mem-wallet" className={LABEL}>
                            Wallet Address{" "}
                            <span className="text-white/40 font-normal">(optional)</span>
                          </label>
                          <input
                            id="mem-wallet"
                            name="walletAddress"
                            type="text"
                            spellCheck={false}
                            autoComplete="off"
                            placeholder="0x…"
                            className={`${FIELD} font-mono`}
                          />
                          <p className="text-white/40 text-xs mt-1.5">
                            Add the wallet you buy $MMC with and your Good Standing is
                            confirmed automatically. You can add it later instead.
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowOptional(true)}
                        className="w-full text-left text-sm text-white/50 hover:text-white/80 border border-dashed
                          border-white/15 hover:border-white/25 rounded-xl px-4 py-3 transition-colors cursor-pointer"
                      >
                        + Add optional details
                        <span className="block text-xs text-white/30 mt-0.5">
                          Legal name, social handle, wallet address — none required
                        </span>
                      </button>
                    )}

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
                      {submitState === "loading" ? "Submitting…" : "Become a Member →"}
                    </button>

                    <p className="text-center text-xs text-white/30">
                      We never ask for your real identity. Your information is never
                      sold or shared.
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
