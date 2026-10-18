"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "gold-outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  href?: string;
  isExternal?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-forest-gradient text-white font-semibold shadow-forest hover:shadow-forest-lg hover:brightness-110",
  secondary:
    "bg-transparent border border-forest text-forest-dark hover:bg-forest hover:text-white",
  ghost:
    "bg-transparent text-ink/80 hover:text-forest-dark hover:bg-ink/5",
  "gold-outline":
    "bg-transparent border-2 border-gold text-gold hover:bg-gold/10 hover:text-ink",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

/**
 * Core button component. All variants share the same motion wrapper.
 * Pass `href` to render as a Next.js Link.
 */
export function Button({
  variant = "primary",
  size = "md",
  children,
  href,
  isExternal,
  isLoading,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: ButtonProps) {
  const baseClass = `
    inline-flex items-center justify-center gap-2 font-medium
    transition-all duration-300 ease-out cursor-pointer select-none
    focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `;

  const content = (
    <>
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Processing…
        </span>
      ) : (
        children
      )}
      {rightIcon && !isLoading && <span className="shrink-0">{rightIcon}</span>}
    </>
  );

  if (href) {
    const linkProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Link href={href} className={baseClass} {...linkProps}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={baseClass}
      disabled={isLoading}
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
}
