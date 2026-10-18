"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { TokenPurchaseCTA } from "@/components/ui/TokenPurchaseCTA";
import { MembershipCTA } from "@/components/ui/MembershipCTA";
import { ConnectWalletButton } from "@/components/ui/ConnectWalletButton";
import { useIsCoreRoute } from "@/lib/useIsCoreRoute";
import { siteConfig } from "@/data/site-config";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Token", href: "/token" },
  { label: "Presale", href: "/presale" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Donate", href: "/donate" },
  { label: "Whitepaper", href: "/whitepaper" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const isCore = useIsCoreRoute();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500
          ${isScrolled
            ? isCore
              ? "bg-coin-black/90 backdrop-blur-xl border-b border-emerald/10 shadow-glass py-3"
              : "bg-ivory/90 backdrop-blur-xl border-b border-forest/15 shadow-glass py-3"
            : "bg-transparent py-5"
          }`}
      >
        <nav className="container-wide flex items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Manumit Me Foundation home">
            <div className="relative w-18 h-18 flex-shrink-0">
              <Image
                src="/logos/foundation-logo.png"
                alt="Manumit Me Foundation"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className={`block font-display text-sm font-bold leading-tight transition-colors
                ${isCore ? "text-white group-hover:text-emerald-light" : "text-ink group-hover:text-forest-dark"}`}>
                MANUMIT ME
              </span>
              <span className={`block text-[10px] font-semibold tracking-widest uppercase
                ${isCore ? "text-emerald-light" : "text-forest-dark"}`}>
                Foundation
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-0.5" role="list">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                      ${isActive
                        ? isCore ? "text-emerald-light" : "text-forest-dark"
                        : isCore
                          ? "text-white/70 hover:text-white hover:bg-white/5"
                          : "text-ink/65 hover:text-ink hover:bg-ink/5"
                      }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className={`absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full
                          ${isCore ? "bg-emerald-gradient" : "bg-forest-gradient"}`}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <MembershipCTA label="Become a Member" size="sm" />
            <TokenPurchaseCTA label="Join Presale" size="sm" />
            <ConnectWalletButton />
          </div>

          {/* Mobile menu button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors
              ${isCore ? "text-white/70 hover:text-white hover:bg-white/10" : "text-ink/70 hover:text-ink hover:bg-ink/10"}`}
            onClick={() => setIsMobileOpen((v) => !v)}
            aria-expanded={isMobileOpen}
            aria-label="Toggle mobile menu"
          >
            {isMobileOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile slide-out drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              key="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={`fixed top-0 right-0 h-full w-72 z-40 lg:hidden shadow-glass overflow-y-auto overscroll-contain
                ${isCore ? "bg-coin-black border-l border-emerald/10" : "bg-ivory border-l border-forest/15"}`}
            >
              {/* Drawer header */}
              <div className={`flex items-center justify-between p-5 border-b ${isCore ? "border-white/10" : "border-ink/10"}`}>
                <span className={`font-display font-semibold text-sm tracking-wider
                  ${isCore ? "text-emerald-light" : "text-forest-dark"}`}>
                  MENU
                </span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className={`p-1.5 rounded-lg transition-colors
                    ${isCore ? "text-white/60 hover:text-white hover:bg-white/10" : "text-ink/60 hover:text-ink hover:bg-ink/10"}`}
                  aria-label="Close menu"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="p-5">
                <ul className="space-y-1" role="list">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all
                            ${isActive
                              ? isCore
                                ? "bg-emerald/10 text-emerald-light border border-emerald/20"
                                : "bg-forest/10 text-forest-dark border border-forest/20"
                              : isCore
                                ? "text-white/70 hover:text-white hover:bg-white/5"
                                : "text-ink/65 hover:text-ink hover:bg-ink/5"
                            }`}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <div className={`mt-6 pt-6 border-t space-y-3 ${isCore ? "border-white/10" : "border-ink/10"}`}>
                  <ConnectWalletButton size="md" className="w-full [&>button]:w-full" />
                  <MembershipCTA label="Become a Member" size="md" className="w-full" />
                  <TokenPurchaseCTA label="Join Presale" size="md" className="w-full" />
                </div>

                {/* Social links */}
                <div className="mt-6 pt-4">
                  <p className={`text-xs mb-3 ${isCore ? "text-white/30" : "text-ink/40"}`}>Follow us</p>
                  <div className="flex gap-3">
                    {[
                      { label: "Twitter/X", href: siteConfig.social.twitter, icon: "𝕏" },
                      { label: "Telegram", href: siteConfig.social.telegram, icon: "✈" },
                      { label: "Discord", href: siteConfig.social.discord, icon: "💬" },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all text-sm
                          ${isCore
                            ? "bg-white/5 text-white/60 border-white/8 hover:bg-emerald/10 hover:text-emerald-light"
                            : "bg-ink/5 text-ink/60 border-ink/10 hover:bg-forest/10 hover:text-forest-dark"
                          }`}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
