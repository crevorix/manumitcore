import { createPublicClient, http, formatUnits, isAddress, getAddress } from "viem";
import type { Abi } from "viem";
import presaleAbiJson from "@/lib/presaleABI.json";
import { activeChain } from "@/lib/chain";
import { PRESALE_CONTRACT_ADDRESS, PRESALE_ROUNDS } from "@/data/presale";

const presaleAbi = presaleAbiJson as Abi;

/**
 * A member reaches Good Standing by making their $50 annual purchase of MMC.
 *
 * The presale contract tracks purchases per wallet in `purchased(address)`,
 * which returns cumulative MMC — a single cheap read, no log scanning and no
 * RPC block-range limits. It does not record what was paid, so the threshold
 * is expressed in MMC at the round 1 price: $50 / $0.10 = 500 MMC.
 *
 * Valuing at round 1 (the cheapest tier, so the most MMC per dollar) is the
 * strict reading — nobody is granted standing for less than $50 of spend.
 * Someone who bought at the round 2 price crosses the line a little later
 * than they strictly need to; that is the safe direction to be wrong in.
 */
export const GOOD_STANDING_USD = 50;

export const GOOD_STANDING_MMC =
  GOOD_STANDING_USD / PRESALE_ROUNDS[0].priceUsd;

export interface StandingCheck {
  wallet: `0x${string}`;
  purchasedMmc: number;
  qualifies: boolean;
}

function client() {
  return createPublicClient({
    chain: activeChain,
    // A dedicated endpoint avoids the aggressive rate limits on the public
    // fallback; without it viem uses the chain's default RPC.
    transport: http(process.env.RPC_URL || undefined),
  });
}

/**
 * How much MMC this wallet has bought from the presale.
 * Throws if the address is malformed or the RPC is unreachable, so callers
 * can tell "no purchases" apart from "could not check".
 */
export async function checkStanding(wallet: string): Promise<StandingCheck> {
  if (!isAddress(wallet)) {
    throw new Error("Not a valid wallet address.");
  }

  const address = getAddress(wallet);

  const purchased = (await client().readContract({
    address: PRESALE_CONTRACT_ADDRESS,
    abi: presaleAbi,
    functionName: "purchased",
    args: [address],
  })) as bigint;

  const purchasedMmc = Number(formatUnits(purchased, 18));

  return {
    wallet: address,
    purchasedMmc,
    qualifies: purchasedMmc >= GOOD_STANDING_MMC,
  };
}
