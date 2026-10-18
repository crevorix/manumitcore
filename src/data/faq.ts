/**
 * FAQ data, add, edit, or reorder questions here without touching any
 * component code. The FAQ page renders this array as an accordion.
 */

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export const faqItems: FaqItem[] = [
  // Token Basics
  {
    category: "Token Basics",
    question: "What is MANUMIT CORE (MMC)?",
    answer:
      "MANUMIT CORE (MMC) is an ERC-20 utility token built on the Ethereum blockchain. It is the economic backbone of the Manumit Me Foundation ecosystem, designed to reward compassion, fund community advocacy, and enable participation in a decentralized platform for real-world impact.",
  },
  {
    category: "Token Basics",
    question: "What does 'Manumit' mean?",
    answer:
      "Manumit comes from the Latin word meaning 'to set free', the act of liberating someone from bondage or constraint. Our mission carries this spirit forward: liberating communities through education, advocacy, economic empowerment, and collective action.",
  },
  {
    category: "Token Basics",
    question: "What can I use MMC tokens for?",
    answer:
      "MMC tokens are designed to power the Manumit Me ecosystem. They will be used to access the ACTS (Accountability, Credibility, Trust, Sacrifice) platform, reward community contributions and advocacy, participate in governance decisions, support charitable campaigns, and access premium features on the ManumitMe.com platform once it launches.",
  },
  {
    category: "Token Basics",
    question: "Is MMC a speculative/trading coin?",
    answer:
      "MMC has real-world utility tied to the Manumit Me Foundation's community and advocacy platform. While tokens may eventually be listed on exchanges, the project's primary focus is mission-driven utility, not speculation. We are building infrastructure for lasting impact, not short-term hype.",
  },

  // Participation
  {
    category: "Participation",
    question: "How do I participate in the presale?",
    answer:
      "Round 1 opens on September 21, 2026 and runs to December 21, 2026. Round 2 follows immediately, from December 21, 2026 to July 9, 2028. When a round is open, connect an Ethereum wallet on the presale page, choose ETH, USDT or USDC, enter the amount of MMC you want, and confirm the transaction. Join our waitlist to be notified the moment Round 1 opens.",
  },
  {
    category: "Participation",
    question: "When can I sell or transfer the MMC I buy?",
    answer:
      "Tokens purchased in the presale are delivered to your wallet immediately, but they cannot be transferred or sold until July 9, 2028. This lockup is enforced by the token contract itself, not by policy — any transfer attempted before that date will be rejected on-chain. Please make sure you are comfortable with that before purchasing.",
  },
  {
    category: "Participation",
    question: "Is there a minimum purchase amount?",
    answer:
      "No. The presale contract does not enforce a minimum purchase or a maximum per wallet — you can buy any amount while a round is open and tokens remain. You will still need enough ETH in your wallet to cover the network gas fee for the transaction.",
  },
  {
    category: "Participation",
    question: "What payment methods are accepted?",
    answer:
      "The presale contract accepts ETH, USDT and USDC on Ethereum. Paying with a stablecoin takes two transactions: one to approve the presale contract to spend your USDT or USDC, and one to complete the purchase. Support for USDT and USDC on BNB Smart Chain has been announced and will be enabled on this page once it is live.",
  },
  {
    category: "Participation",
    question: "Will I need to complete KYC/AML verification?",
    answer:
      "The presale contract itself has no whitelist or KYC gate — any wallet can purchase while a round is open. Any KYC/AML obligations that apply under the regulations in force at launch will be communicated to waitlist members and published on this site before they take effect. We are committed to operating in a transparent, compliant manner.",
  },

  // Mission & Foundation
  {
    category: "Mission",
    question: "Who is behind the Manumit Me Foundation?",
    answer:
      "The Manumit Me Foundation is being formally established as a mission-driven nonprofit organization. The founding team and board details will be published in the whitepaper and on the site as the Foundation is formally incorporated. Transparency and accountability are core values, we will not ask for your trust without earning it.",
  },
  {
    category: "Mission",
    question: "How does token funding support the mission?",
    answer:
      "Revenue from the MMC token sale goes directly toward building and sustaining the ACTS platform, funding community advocacy campaigns, developing the ManumitMe.com Web3 platform, and supporting the Foundation's operational costs. A detailed fund allocation breakdown is included in the whitepaper.",
  },
  {
    category: "Mission",
    question: "What is the ACTS platform?",
    answer:
      "ACTS stands for Accountability, Credibility, Trust, and Sacrifice, the four pillars of meaningful community advocacy. It is a platform being built to enable community members to create and sign petitions, track advocacy outcomes, publish content, earn MMC rewards for participation, and hold institutions accountable. Development begins in Phase 4 (August 2026).",
  },

  // Technical
  {
    category: "Technical",
    question: "Which blockchain is MMC on?",
    answer:
      "MMC is an ERC-20 token deployed on the Ethereum mainnet. Ethereum was chosen for its security, broad ecosystem compatibility, and the large developer community supporting it. In Phase 6, we will evaluate a potential transition to a dedicated MANUMIT CORE blockchain as the ecosystem matures.",
  },
  {
    category: "Technical",
    question: "Has the smart contract been audited?",
    answer:
      "Yes. Independent security audits have been completed for both the MMC token and the presale contract. Both contracts are also source-verified on Etherscan, so anyone can read the exact code that is running. The full audit reports will be published on this site before Round 1 opens.",
  },
  {
    category: "Technical",
    question: "Where can I find the contract address?",
    answer:
      "MANUMIT CORE (MMC) is deployed on Ethereum mainnet at 0xc712dd47a3370d2787260a1b487b8c61dbabf382, and the presale contract is at 0x6d1d8787849d93044943d678e2e864017de65701. Both are source-verified on Etherscan and linked from the token and presale pages, so you can read the exact code that is running. Never trust a contract address shared via DMs or unofficial channels, always verify on this official website.",
  },

  // Legal / Risk
  {
    category: "Legal",
    question: "Is purchasing MMC an investment?",
    answer:
      "Purchasing MMC tokens is not the same as purchasing a security, equity, or guaranteed investment. Tokens are utility assets designed for use within the Manumit Me ecosystem. As with any digital asset, their value may fluctuate. Please read our full legal disclaimer before participating, and consider consulting a financial advisor.",
  },
  {
    category: "Legal",
    question: "Are there geographic restrictions on participation?",
    answer:
      "Depending on local regulations, residents of certain jurisdictions may be restricted from participating in the token sale. Geographic restriction details will be published in the terms and conditions before the presale opens. If you are unsure about your local regulations, please consult legal counsel.",
  },
];
