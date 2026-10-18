import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WaitlistModal } from "@/components/ui/WaitlistModal";
import { MembershipModal } from "@/components/ui/MembershipModal";
import { Web3Provider } from "@/components/providers/Web3Provider";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tokenName} (MMC) Token`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Manumit Me Foundation is harnessing Web3 to fund and amplify real-world advocacy. Join the waitlist for the MANUMIT CORE (MMC) token presale, opening September 21, 2026.",
  keywords: [
    "Manumit Me Foundation",
    "MANUMIT CORE",
    "MMC token",
    "ERC-20",
    "ICO",
    "pre-ICO",
    "Web3",
    "advocacy",
    "community",
    "blockchain",
    "cryptocurrency",
    "social impact",
  ],
  authors: [{ name: "Manumit Me Foundation" }],
  creator: "Manumit Me Foundation",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tokenName} (MMC)`,
    description:
      "Join the mission. MANUMIT CORE (MMC) is the token powering real-world community advocacy on the Ethereum blockchain.",
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Manumit Me Foundation — MANUMIT CORE Token",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | MMC Token`,
    description: "Compassion Multiplied. Join the MANUMIT CORE presale waitlist.",
    images: [`${siteConfig.url}/og-image.png`],
    creator: "@manumitme",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-coin-black text-white min-h-screen flex flex-col">
        <Web3Provider>
          <Navbar />
          <main className="flex-grow" id="main-content">
            {children}
          </main>
          <Footer />
          {/* Global waitlist modal — mounts once, listens for custom events */}
          <WaitlistModal />
          {/* Global membership modal — mounts once, listens for custom events */}
          <MembershipModal />
        </Web3Provider>
      </body>
    </html>
  );
}
