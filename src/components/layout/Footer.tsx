"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { useIsCoreRoute } from "@/lib/useIsCoreRoute";

const footerNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Token", href: "/token" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Donate", href: "/donate" },
  { label: "Whitepaper", href: "/whitepaper" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Not Security", href: "/not-a-security" },
];

const socialLinks = [
  { label: "Twitter / X", href: siteConfig.social.twitter },
  { label: "Telegram", href: siteConfig.social.telegram },
  { label: "Discord", href: siteConfig.social.discord },
  { label: "Instagram", href: siteConfig.social.instagram },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "YouTube", href: siteConfig.social.youtube },
];

export function Footer() {
  const year = new Date().getFullYear();
  const isCore = useIsCoreRoute();

  const accentText = isCore ? "text-emerald-light" : "text-forest-dark";
  const heading = isCore ? "text-white/90" : "text-ink/85";
  const bodyMuted = isCore ? "text-white/50" : "text-ink/60";
  const linkMuted = isCore ? "text-white/50 hover:text-emerald-light" : "text-ink/60 hover:text-forest-dark";

  return (
    <footer
      className={`border-t ${isCore ? "bg-coin-black border-emerald/10" : "bg-ivory border-forest/15"}`}
      role="contentinfo"
    >
      {/* Main footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4" aria-label="Manumit Me Foundation">
              <div className="relative w-12 h-12">
                <Image
                  src="/logos/foundation-logo.png"
                  alt="Manumit Me Foundation"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className={`block font-display text-lg font-bold ${isCore ? "text-white" : "text-ink"}`}>
                  MANUMIT ME
                </span>
                <span className={`block text-xs tracking-widest font-semibold uppercase ${accentText}`}>
                  Foundation
                </span>
              </div>
            </Link>
            <p className={`text-sm leading-relaxed max-w-sm mb-4 ${bodyMuted}`}>
              {siteConfig.foundationTagline}, building a Web3-powered ecosystem for community
              advocacy, accountability, and real-world impact.
            </p>
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image
                  src="/logos/mmc-coin.png"
                  alt="MANUMIT CORE token"
                  fill
                  className="object-contain"
                />
              </div>
              <span className={`font-semibold text-sm ${accentText}`}>
                MMC, {siteConfig.tokenTagline}
              </span>
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className={`font-display text-sm font-semibold mb-4 uppercase tracking-wider ${heading}`}>
              Navigation
            </h3>
            <ul className="space-y-2" role="list">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${linkMuted}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social column */}
          <div>
            <h3 className={`font-display text-sm font-semibold mb-4 uppercase tracking-wider ${heading}`}>
              Community
            </h3>
            <ul className="space-y-2" role="list">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm transition-colors ${linkMuted}`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Legal disclaimer */}
      <div className={`border-t ${isCore ? "border-white/6" : "border-ink/8"}`}>
        <div className="container-wide py-8">
          <div className={`rounded-xl border p-5 mb-6 ${isCore ? "border-emerald/10 bg-white/2" : "border-forest/15 bg-forest/3"}`}>
            <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${accentText}`}>
              Important Legal Disclaimer
            </p>
            <p className={`text-xs leading-relaxed ${isCore ? "text-white/35" : "text-ink/50"}`}>
              {/* ⚠️ CLIENT: Have legal counsel review and replace this placeholder before launch */}
              This website is for informational purposes only and does not constitute financial,
              investment, legal, or tax advice. MANUMIT CORE (MMC) tokens are utility tokens intended
              for use within the Manumit Me ecosystem and are not securities. Purchasing MMC tokens
              involves risk, including the possible loss of all funds. The token sale is not open to
              residents of certain jurisdictions, full restrictions will be published in the terms
              and conditions prior to sale launch. Past performance of any digital asset is not
              indicative of future results. This site makes no guarantee of returns or token value.
              Please consult a qualified financial and legal advisor before participating.
            </p>
            <Link
              href="/not-a-security"
              className={`inline-block mt-3 text-xs font-semibold transition-colors ${
                isCore
                  ? "text-emerald-light/80 hover:text-emerald-light"
                  : "text-forest-dark/80 hover:text-forest-dark"
              }`}
            >
              Read our full position on why MMC is not a security →
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className={`text-xs ${isCore ? "text-white/30" : "text-ink/40"}`}>
              © {year} Manumit Me Foundation. All rights reserved.
            </p>
            <p className={`text-xs ${isCore ? "text-white/30" : "text-ink/40"}`}>
              Token sale powered by&nbsp;
              <span className={isCore ? "text-emerald-light/70" : "text-forest-dark/80"}>MANUMIT CORE (MMC), ERC-20</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
