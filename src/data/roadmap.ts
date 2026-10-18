/**
 * Roadmap data, edit this file to update all phases, milestones, and dates.
 * The full Roadmap page (/roadmap) and the preview section on the landing page
 * are both rendered from this single source of truth.
 */

export type RoadmapStatus = "completed" | "active" | "upcoming" | "tbd";

export interface RoadmapPhase {
  phase: number;
  title: string;
  quarter: string;
  status: RoadmapStatus;
  icon: string; // emoji icon
  summary: string;
  milestones: string[];
  highlight?: string; // Optional date highlight
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: 1,
    title: "Foundation & Token Creation",
    quarter: "Q2–Q3 2026",
    status: "active",
    icon: "🏛️",
    summary:
      "Establishing the legal, brand, and technical foundation of the Manumit Me ecosystem.",
    milestones: [
      "Form Manumit Me Foundation",
      "Create MANUMIT CORE (MMC) ERC-20 Token",
      "Deploy MMC token and presale contracts to Ethereum mainnet",
      "Develop branding and visual identity",
      "Launch ICO website",
    ],
  },
  {
    phase: 2,
    title: "Presale Round 1",
    quarter: "September 21, 2026",
    status: "upcoming",
    icon: "🚀",
    summary:
      "Opening the presale to early supporters and community builders who share our mission.",
    milestones: [
      "Open Round 1 at $0.10 per MMC (1.5 Billion MMC presale pool)",
      "Community building and awareness campaign",
      "Publish whitepaper",
      "Expand partnerships and advisors",
      "Grow social media presence",
      "Gather early supporters and contributors",
    ],
    highlight: "📅 September 21, 2026: Presale Round 1 Opens",
  },
  {
    phase: 3,
    title: "Presale Round 2",
    quarter: "December 21, 2026",
    status: "upcoming",
    icon: "🌐",
    summary:
      "Round 2 opens at a higher price, the remaining presale pool stays available, and marketing expands globally.",
    milestones: [
      "Round 2 begins at $0.12 per MMC",
      "Remaining presale pool carries over from Round 1",
      "Continued community growth",
      "Platform development funding",
      "Marketing expansion",
      "Exchange preparation",
    ],
    highlight: "📅 December 21, 2026: Presale Round 2 Opens",
  },
  {
    phase: 4,
    title: "Ecosystem Development",
    quarter: "August 2026",
    status: "upcoming",
    icon: "⚙️",
    summary:
      "Building the ACTS platform, the accountability, credibility, and community infrastructure that gives MMC real-world utility.",
    milestones: [
      "ACTS (Accountability, Credibility, Trust, Sacrifice) platform development",
      "Community participation tools",
      "Advocacy and petition tools",
      "Content publishing platform",
      "Reward and contribution tracking systems",
      "Strategic partnerships",
    ],
  },
  {
    phase: 5,
    title: "Web3 Community Platform",
    quarter: "August 2026",
    status: "upcoming",
    icon: "🌍",
    summary:
      "ManumitMe.com rebuilt as a fully Web3-enabled platform, profiles, petitions, media, and wallet integrations.",
    milestones: [
      "Rebuild ManumitMe.com as Web3-enabled platform",
      "Community profiles",
      "Petition creation tools",
      "Media sharing",
      "Creator and advocacy tools",
      "Wallet integrations",
    ],
  },
  {
    phase: 6,
    title: "Blockchain Transition",
    quarter: "TBD",
    status: "tbd",
    icon: "⛓️",
    summary:
      "Long-term exploration of transitioning from ERC-20 to a dedicated MANUMIT CORE blockchain for full decentralized governance.",
    milestones: [
      "Evaluate transition from ERC-20 ecosystem",
      "Explore MANUMIT CORE blockchain development",
      "Expanded decentralized applications",
      "Governance framework",
      "Ecosystem growth and sustainability",
    ],
  },
];

/** Milestone events for the milestone banner */
export const milestoneEvents = [
  { date: "September 21, 2026", label: "Presale Round 1 Opens" },
  { date: "December 21, 2026", label: "Presale Round 2 Opens" },
  { date: "July 9, 2028", label: "Presale MMC Unlocks" },
];
