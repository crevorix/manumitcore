import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { MissionSection } from "@/components/sections/MissionSection";
import { TokenUtilitySection } from "@/components/sections/TokenUtilitySection";
import { RoadmapPreviewSection } from "@/components/sections/RoadmapPreviewSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { WaitlistSection } from "@/components/sections/WaitlistSection";
import { VideoSection } from "@/components/sections/VideoSection";

export const metadata: Metadata = {
  title: "Manumit Me Foundation | MANUMIT CORE (MMC) Token — Empowering Compassion Through Action",
  description:
    "Join the mission. MANUMIT CORE (MMC) is the ERC-20 token powering real-world community advocacy, accountability, and collective action. The presale opens September 21, 2026.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <TokenUtilitySection />
      <RoadmapPreviewSection />
      <VideoSection />
      <SocialProofSection />
      <WaitlistSection />
    </>
  );
}
