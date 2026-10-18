"use client";

/**
 * TokenPurchaseCTA — site-wide CTA for the token funnel.
 * action="presale" (default) navigates to /presale, where the live presale widget lives.
 * action="waitlist" opens the waitlist signup modal in place, it does not navigate away.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import { useIsCoreRoute } from "@/lib/useIsCoreRoute";

interface TokenPurchaseCTAProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline";
  action?: "presale" | "waitlist";
  className?: string;
  children?: ReactNode;
}

const sizeMap = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const MotionLink = motion.create(Link);

export function TokenPurchaseCTA({
  label = "Join the Presale",
  size = "md",
  variant = "primary",
  action = "presale",
  className = "",
}: TokenPurchaseCTAProps) {
  const isCore = useIsCoreRoute();

  const baseClass = `
    inline-flex items-center justify-center gap-2 font-semibold
    rounded-xl transition-all duration-300 cursor-pointer select-none
    focus-visible:ring-2 focus-visible:ring-offset-2
    ${isCore ? "focus-visible:ring-emerald focus-visible:ring-offset-coin-black" : "focus-visible:ring-forest focus-visible:ring-offset-ivory"}
    ${sizeMap[size]}
  `;

  const variantClass = isCore
    ? variant === "primary"
      ? "bg-emerald-gradient text-white shadow-emerald hover:brightness-110"
      : "bg-transparent border-2 border-emerald text-emerald-light hover:bg-emerald/10"
    : variant === "primary"
      ? "bg-forest-gradient text-white shadow-forest hover:shadow-forest-lg hover:brightness-110"
      : "bg-transparent border-2 border-forest text-forest-dark hover:bg-forest/10";

  if (action === "waitlist") {
    return (
      <motion.button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent("open-waitlist-modal"))}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={`${baseClass} ${variantClass} ${className}`}
        aria-label={label}
      >
        {label}
      </motion.button>
    );
  }

  return (
    <MotionLink
      href="/presale"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`${baseClass} ${variantClass} ${className}`}
      aria-label={label}
    >
      <span className="relative">
        {label}
        {/* Live presale indicator */}
        <span className="absolute -top-1 -right-2 w-2 h-2 bg-emerald rounded-full animate-pulse" />
      </span>
    </MotionLink>
  );
}
