/**
 * Tokenomics data.
 *
 * Supply, allocation and pricing below are read from the deployed contracts
 * on Ethereum mainnet — they are not editorial figures:
 *
 *   TOTAL_SUPPLY()       6,000,000,000 MMC
 *   PRESALE_ALLOCATION() 1,500,000,000 MMC (held by the presale contract)
 *   ROUND1_PRICE()       100000  → $0.10   ROUND2_PRICE() 120000 → $0.12
 *
 * The split of the remaining 4,500,000,000 MMC has not been published by the
 * token issuer yet, so it is shown as a single pending segment rather than
 * invented. See docs/MMC-contract-dev-requirements.md.
 */

export const tokenomics = {
  /** Total supply, fixed at deployment — the token has no mint function. */
  totalSupply: 6_000_000_000,

  /** Held by the presale contract and sold across both rounds. */
  presaleAllocation: 1_500_000_000,

  /** Everything outside the presale. Breakdown pending. */
  unallocatedSupply: 4_500_000_000,

  /** Presale purchases are locked on-chain until 9 July 2028. */
  lockedAllocation: 1_500_000_000,

  /** Allocation breakdown, drives the donut chart and table on /token */
  breakdown: [
    {
      label: "Presale Allocation",
      percentage: 25,
      tokens: 1_500_000_000,
      color: "#00A86B",
      lockup:
        "Already transferred to the presale contract. Tokens bought in the presale cannot be transferred until July 9, 2028 — enforced by the token contract itself.",
    },
    {
      label: "Foundation / Owner",
      percentage: 75,
      tokens: 4_500_000_000,
      color: "#D4AF37",
      lockup:
        "Held by the Foundation/owner wallet, outside the presale contract. Not subject to the presale lockup — this allocation is unlocked.",
    },
  ],

  /** Sale rounds, per the ROUND1 and ROUND2 constants on the presale contract */
  saleStages: [
    {
      stage: "Round 1",
      status: "upcoming" as const,
      date: "Sep 16, 2026 – Dec 16, 2026",
      allocation: "Shared 1.5B MMC pool",
      price: "$0.10 · 0.00005 ETH",
      minPurchase: "None",
      bonus: "None",
    },
    {
      stage: "Round 2",
      status: "upcoming" as const,
      date: "Dec 17, 2026 – Jul 9, 2028",
      allocation: "Shared 1.5B MMC pool",
      price: "$0.12 · 0.00006 ETH",
      minPurchase: "None",
      bonus: "None",
    },
  ],

  /** Blockchain details */
  blockchain: {
    network: "Ethereum",
    standard: "ERC-20",
    contractAddress: "0xc712dd47a3370d2787260a1b487b8c61dbabf382",
    presaleAddress: "0x6d1d8787849d93044943d678e2e864017de65701",
    decimals: 18,
    ticker: "MMC",
  },
};
