"use client";

import { usePathname } from "next/navigation";

/**
 * MANUMIT CORE / $MMC pages (token info + presale) use the dark,
 * emerald/cyan "Core" palette. Every other page uses the light,
 * forest/gold "Foundation" palette. Shared components that render
 * in both contexts (nav, footer, CTA buttons) key off this.
 */
export function useIsCoreRoute() {
  const pathname = usePathname();
  return pathname?.startsWith("/token") || pathname?.startsWith("/presale") || false;
}
