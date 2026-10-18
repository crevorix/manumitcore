"use client";

import { motion } from "framer-motion";
import { useIsCoreRoute } from "@/lib/useIsCoreRoute";

interface MembershipCTAProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline";
  className?: string;
}

const sizeMap = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function MembershipCTA({
  label = "Become a Member",
  size = "md",
  variant = "outline",
  className = "",
}: MembershipCTAProps) {
  const isCore = useIsCoreRoute();

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("open-membership-modal"));
  };

  const baseClass = `
    inline-flex items-center justify-center gap-2 font-semibold
    rounded-xl transition-all duration-300 cursor-pointer select-none
    focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2
    ${isCore ? "focus-visible:ring-offset-coin-black" : "focus-visible:ring-offset-ivory"}
    ${sizeMap[size]}
  `;

  const variantClass =
    variant === "primary"
      ? "bg-emerald-gradient text-white shadow-emerald hover:brightness-110"
      : isCore
        ? "bg-transparent border-2 border-emerald text-emerald-light hover:bg-emerald/10"
        : "bg-transparent border-2 border-emerald-dark text-emerald-dark hover:bg-emerald-dark/10";

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleClick}
      className={`${baseClass} ${variantClass} ${className}`}
      aria-label={label}
    >
      {label}
    </motion.button>
  );
}
