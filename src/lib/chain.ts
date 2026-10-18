import { mainnet, sepolia } from "viem/chains";

/**
 * Which network the presale flow talks to.
 *
 * This build ships wired to the Sepolia deployment of the MMC token and
 * presale contracts, so Sepolia is the default. Set
 * NEXT_PUBLIC_USE_TESTNET=false to point the wallet connector, every contract
 * read and every write back at the Ethereum mainnet deployment instead.
 *
 * Imported by data modules that server components also use, so this file must
 * stay free of React and wagmi; viem/chains is plain data.
 */
export const USE_TESTNET = process.env.NEXT_PUBLIC_USE_TESTNET !== "false";

export const activeChain = USE_TESTNET ? sepolia : mainnet;

export const ACTIVE_CHAIN_ID = activeChain.id;
