/**
 * Content for /not-a-security.
 *
 * Supplied by the client (Not Security.docx, 31 Aug 2026) and reproduced here
 * with only light copy-editing for the web — headings title-cased, sentences
 * tidied, no substantive change to the position being stated.
 *
 * This is a legal-positioning page. Any edit to the wording should go back
 * through the client and their counsel, not be made ad hoc.
 */

export type HoweyMark = "check" | "caution" | "cross";

export const notASecurity = {
  eyebrow: "Not Security",
  heading:
    "Membership Structure, Marketing & Token Rights",
  subheading:
    "Why This Is Not Considered A Security Offering",
  intro:
    "This page describes how the MANUMIT CORE project and the Manumit Open Network are structured so as not to constitute a security offering regulated by the SEC.",

  structure: {
    heading: "Structure — Focus on Membership and Token Utility",
    points: [
      "The token has a clearly defined utility within a functioning or soon-to-function decentralized network.",
      "No promise of profits, dividends, interest, or share in revenues.",
      "The token is not sold as an investment. It is positioned as access to a product, service, and network participation.",
      "Funds are used to build and grow the ecosystem, not to generate returns for token holders.",
      "A “SAFT-free” membership offer is available at no cost, creating no investment contract.",
    ],
  },

  marketing: {
    heading: "Marketing — Avoid Securities Language",
    points: [
      "We do not market MANUMIT CORE as an investment opportunity.",
      "We avoid phrases such as “high return”, “profit”, “appreciation”, and “earn”.",
      "We focus on the technology, utility, adoption, membership, and ecosystem growth.",
      "We do not highlight the team or management as a reason to join or to purchase.",
      "We avoid price speculation, and we do not present exchange listing as a benefit.",
      "Disclaimers are used prominently across all channels.",
    ],
  },

  tokenRights: {
    heading: "Token Rights — Pure Utility Design",
    dos: {
      heading: "What the token does",
      points: [
        "Provides access to platform features and services.",
        "Is used to pay fees, access content, hold Good Standing status, and participate in the network.",
        "Carries no claim on profits, revenues, or assets.",
        "Carries transfer restrictions only where required by law, such as KYC and AML obligations.",
      ],
    },
    donts: {
      heading: "What the token does not do",
      points: [
        "No dividends, revenue share, or profit distribution.",
        "No buybacks or price support mechanism.",
        "No equity-like rights.",
        "No guaranteed returns.",
        "No reliance on the efforts of a specific team or entity.",
      ],
    },
    keyPrinciple:
      "Value comes from the utility, the members, and the adoption of the network — not from the efforts of a central entity.",
  },

  foundation: {
    heading: "Foundation & Whitepaper Structure",
    entityHeading: "The Foundation (Non-Profit Entity)",
    roles: [
      {
        label: "Oversight",
        body: "Aligned with the mission, transparency, and the community interest.",
      },
      {
        label: "Steward",
        body: "Long-term guardian of the protocol, the brand, and the network.",
      },
      {
        label: "Development",
        body: "Supports the ecosystem, growth, tools, and infrastructure.",
      },
    ],
    qa: [
      {
        question: "What is the Foundation's role in the Manumit Open Network?",
        answer:
          "Manumit Me Foundation serves a stewardship and ecosystem-support role in connection with the Manumit Open Network. The Foundation's involvement is intended to advance its mission and support the development of the ecosystem. The Foundation does not promise investment returns or guarantee an increase in the value of Manumit Core (MMC).",
      },
      {
        question: "How is the whitepaper owner viewed?",
        answer:
          "The individuals remain the authors and creators of the whitepaper, and grant rights and licensing to the Foundation. The Foundation does not sell the whitepaper or the tokens. It governs the mission and the ecosystem.",
      },
    ],
    bestPractices: {
      heading: "Best Practices",
      points: [
        "The whitepaper clearly states token utility, not investment.",
        "The ownership and licensing agreement between author and Foundation is documented.",
        "The Foundation is tasked with building the Network.",
      ],
    },
  },

  geography: {
    heading: "Member Geography — Global Compliance by Design",
    allow: {
      heading: "Open Access",
      points: [
        "Membership is open to all individuals who agree to the MON Constitution & By-Laws.",
        "Membership is open in most jurisdictions.",
        "Geoblocking is conducted at the point of sale.",
      ],
    },
    howey: {
      heading: "The United States Howey Test",
      intro:
        "For an arrangement to qualify as an investment contract, and therefore a security, all four of the following must be present:",
      prongs: [
        { mark: "check" as HoweyMark, text: "An investment of money" },
        { mark: "check" as HoweyMark, text: "In a common enterprise" },
        { mark: "caution" as HoweyMark, text: "With an expectation of profit" },
        { mark: "cross" as HoweyMark, text: "Produced by the efforts of others" },
      ],
      conclusion:
        "The success of MON is directly tied to the efforts of each member under the MON Constitution & By-Laws. The fourth element is therefore not satisfied, and all four must be present for an investment contract to exist.",
      citation:
        "SEC v. W.J. Howey Co., 328 U.S. 293, 301, 66 S. Ct. 1100, 90 L. Ed. 1244 (1946)",
    },
    restricted: {
      heading: "Restricted & Excluded Jurisdictions",
      body: "Canada, China, and other high-risk jurisdictions where the token could be deemed a security are restricted from access. Local legal advice is followed in each case.",
    },
  },

  /** Update whenever the wording changes; shown at the foot of the page. */
  lastUpdated: "31 August 2026",
};
