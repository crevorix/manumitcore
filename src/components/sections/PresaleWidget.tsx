"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  useAccount,
  useChainId,
  useReadContract,
  useReadContracts,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { activeChain } from "@/lib/chain";
import { formatUnits, parseUnits, type Abi } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  ArrowTopRightOnSquareIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { usePresaleStats } from "@/lib/hooks/usePresaleStats";
import presaleAbiJson from "@/lib/presaleABI.json";
import tokenAbiJson from "@/lib/mmcTokenABI.json";
import {
  EXPLORER_NAME,
  EXPLORER_URL,
  OFFCHAIN_PAYMENT_URL,
  PAYMENT_METHODS,
  PRESALE_CONTRACT_ADDRESS,
  PRESALE_ROUNDS,
  PRESALE_TOKEN,
  PRESALE_UNLOCK_DATE,
  USD_PRICE_DECIMALS,
  type PaymentMethod,
} from "@/data/presale";

const presaleAbi = presaleAbiJson as Abi;
const erc20Abi = tokenAbiJson as Abi;
const ONE_TOKEN = 10n ** 18n;

/** Round up, so a buyer never underpays for the amount they asked for. */
function ceilDiv(a: bigint, b: bigint) {
  return a === 0n ? 0n : (a + b - 1n) / b;
}

/**
 * Always shows at least two decimals so a $0.10 price never renders as "$0.1",
 * but keeps extra precision for sub-cent values.
 */
function formatUsd(value: number) {
  const decimals = value !== 0 && Math.abs(value) < 0.01 ? 4 : 2;
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

function formatCompact(n: number) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

type Accent = "emerald" | "cyan";

const statAccentStyle: Record<Accent, { text: string; dot: string; border: string }> = {
  emerald: { text: "text-emerald-light", dot: "bg-emerald", border: "hover:border-emerald/25" },
  cyan: { text: "text-cyan", dot: "bg-cyan", border: "hover:border-cyan/30" },
};

function StatCard({
  label,
  value,
  isLoading,
  accent = "emerald",
}: {
  label: string;
  value: string;
  isLoading: boolean;
  accent?: Accent;
}) {
  const style = statAccentStyle[accent];
  return (
    <div className={`rounded-2xl border border-white/8 bg-white/2 p-6 text-center transition-colors ${style.border}`}>
      <p className="flex items-center justify-center gap-1.5 text-white/55 text-xs font-semibold uppercase tracking-wider mb-2">
        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
        {label}
      </p>
      {isLoading ? (
        <div className="h-8 w-24 mx-auto rounded-lg bg-white/8 animate-pulse" />
      ) : (
        <p className={`font-display text-2xl sm:text-3xl font-bold ${style.text}`}>{value}</p>
      )}
    </div>
  );
}

const roundAccentStyle: Record<Accent, { card: string; badge: string }> = {
  emerald: { card: "border-emerald/25 bg-emerald/5", badge: "bg-emerald-gradient" },
  cyan: { card: "border-cyan/30 bg-cyan/8", badge: "bg-gradient-to-br from-cyan to-emerald-dark" },
};
const roundAccents: Accent[] = ["emerald", "cyan"];

export function PresaleWidget() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { openConnectModal } = useConnectModal();
  const { stats, isLoading, lastUpdated } = usePresaleStats();
  const shouldReduceMotion = useReducedMotion();

  const [amount, setAmount] = useState("");
  const [methodId, setMethodId] = useState(PAYMENT_METHODS[0].id);
  const [message, setMessage] = useState("");
  const [lastAction, setLastAction] = useState<"approve" | "buy" | null>(null);
  // Read once per mount; the round windows are months long, so a live clock
  // would be redundant precision.
  const [mountedAt] = useState(() => Date.now());

  const method = PAYMENT_METHODS.find((m) => m.id === methodId) ?? PAYMENT_METHODS[0];
  const isNative = Boolean(method.native);
  const isOffchain = Boolean(method.offchain);
  const wrongNetwork = isConnected && chainId !== activeChain.id;

  const erc20Methods = useMemo(
    () => PAYMENT_METHODS.filter((m) => !m.native && !m.offchain && m.address),
    [],
  );

  // One batched read of acceptedToken() across every configured ERC-20, so the
  // payment chips can show exactly which assets the sale accepts right now. A
  // token becomes payable only once the owner registers it with
  // setPaymentToken(token, true, feed); until then the chip is disabled instead
  // of letting the buy transaction revert with "Token not accepted".
  const { data: acceptedReads } = useReadContracts({
    contracts: erc20Methods.map((m) => ({
      address: PRESALE_CONTRACT_ADDRESS,
      abi: presaleAbi,
      functionName: "acceptedToken",
      args: [m.address as `0x${string}`],
      chainId: activeChain.id,
    })),
    query: { refetchInterval: 15_000 },
  });

  const acceptedByAddress = useMemo(() => {
    const map = new Map<string, boolean>();
    erc20Methods.forEach((m, i) => {
      map.set(m.address!.toLowerCase(), acceptedReads?.[i]?.result === true);
    });
    return map;
  }, [erc20Methods, acceptedReads]);

  const accepted = method.address
    ? acceptedByAddress.get(method.address.toLowerCase()) === true
    : false;

  // The native feed gates the ETH option: the contract reverts
  // currentNativePrice() when no feed is configured.
  const { data: nativePrice } = useReadContract({
    address: PRESALE_CONTRACT_ADDRESS,
    abi: presaleAbi,
    functionName: "currentNativePrice",
    chainId: activeChain.id,
    query: { refetchInterval: 15_000 },
  });
  const nativeEnabled = ((nativePrice as bigint | undefined) ?? 0n) > 0n;

  // Per-MMC price, expressed in the payment asset's smallest unit:
  //   ERC-20 → currentTokenPrice(token)
  //   native → currentNativePrice() (wei per whole MMC)
  // Both are oracle-derived on-chain, so the widget never has to assume a price.
  const { data: tokenPrice } = useReadContract({
    address: PRESALE_CONTRACT_ADDRESS,
    abi: presaleAbi,
    functionName: "currentTokenPrice",
    args: method.address ? [method.address] : undefined,
    chainId: activeChain.id,
    query: {
      enabled: Boolean(method.address) && !isNative && !isOffchain && accepted,
    },
  });

  const pricePerMmc = isNative
    ? ((nativePrice as bigint | undefined) ?? 0n)
    : ((tokenPrice as bigint | undefined) ?? 0n);

  const isMethodEnabled = (m: PaymentMethod) => {
    if (m.offchain) return Boolean(OFFCHAIN_PAYMENT_URL);
    if (m.native) return nativeEnabled;
    return acceptedByAddress.get((m.address ?? "").toLowerCase()) === true;
  };

  const methodEnabled = isMethodEnabled(method);
  const anyOnchainEnabled = PAYMENT_METHODS.some(
    (m) => !m.offchain && isMethodEnabled(m),
  );

  const { mmcBase, cost, costLabel, usdValue } = useMemo(() => {
    let base = 0n;
    try {
      base = amount ? parseUnits(amount, PRESALE_TOKEN.decimals) : 0n;
    } catch {
      base = 0n;
    }

    const usd = Number(formatUnits(base, PRESALE_TOKEN.decimals)) * stats.currentPriceUsd;

    if (isOffchain) {
      return {
        mmcBase: base,
        cost: 0n,
        costLabel: formatUsd(usd),
        usdValue: usd,
      };
    }

    // Contract maths mirrored exactly: cost = amount * pricePerMmc / 1e18.
    const c = pricePerMmc > 0n ? ceilDiv(base * pricePerMmc, ONE_TOKEN) : 0n;
    return {
      mmcBase: base,
      cost: c,
      costLabel: `${Number(formatUnits(c, method.decimals)).toLocaleString(undefined, {
        maximumFractionDigits: isNative ? 6 : method.decimals > 8 ? 6 : 2,
      })} ${method.label}`,
      usdValue: usd,
    };
  }, [amount, isNative, isOffchain, method, pricePerMmc, stats.currentPriceUsd]);

  // Allowance only matters for the ERC-20 path.
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: method.address,
    abi: erc20Abi,
    functionName: "allowance",
    args: address ? [address, PRESALE_CONTRACT_ADDRESS] : undefined,
    chainId: activeChain.id,
    query: { enabled: Boolean(address && method.address) && !isNative && !isOffchain },
  });

  const needsApproval =
    !isNative && !isOffchain && cost > 0n && ((allowance as bigint | undefined) ?? 0n) < cost;

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Once an approval lands, the cached allowance is stale — pull it again so
  // the button flips from "Approve" to "Buy" without a page refresh.
  useEffect(() => {
    if (isConfirmed && lastAction === "approve") refetchAllowance();
  }, [isConfirmed, lastAction, refetchAllowance]);

  const statusMessage = (() => {
    if (isConfirmed && lastAction === "approve")
      return "Approval confirmed — you can complete the purchase now.";
    if (isConfirmed && lastAction === "buy")
      return `Purchase confirmed. Your ${PRESALE_TOKEN.symbol} is now in your wallet.`;
    return message;
  })();

  const handleAmountChange = (raw: string) => {
    if (raw === "" || /^\d*\.?\d*$/.test(raw)) {
      setAmount(raw);
      setMessage("");
      setLastAction(null);
    }
  };

  const handleBuy = () => {
    setMessage("");
    if (!isConnected) {
      openConnectModal?.();
      return;
    }
    if (wrongNetwork) {
      switchChain?.({ chainId: activeChain.id });
      return;
    }
    if (mmcBase <= 0n) {
      setMessage("Enter an amount first.");
      return;
    }

    // Off-chain payments are settled by an authorised processor, which credits
    // MMC to the connected wallet after the payment confirms. We hand off to
    // the hosted checkout rather than calling the presale contract.
    if (isOffchain) {
      if (!OFFCHAIN_PAYMENT_URL) {
        setMessage("Off-chain checkout opens with the sale — check back soon.");
        return;
      }
      const url = new URL(OFFCHAIN_PAYMENT_URL);
      if (address) url.searchParams.set("wallet", address);
      url.searchParams.set("mmc", amount);
      url.searchParams.set("usd", usdValue.toFixed(2));
      window.open(url.toString(), "_blank", "noopener,noreferrer");
      return;
    }

    if (!methodEnabled) {
      setMessage(`${method.label} is not enabled for this presale yet.`);
      return;
    }
    if (cost <= 0n) {
      setMessage("Enter an amount first.");
      return;
    }

    if (isNative) {
      setLastAction("buy");
      writeContract({
        address: PRESALE_CONTRACT_ADDRESS,
        abi: presaleAbi,
        functionName: "buyWithNative",
        value: cost,
        chainId: activeChain.id,
      });
      return;
    }

    if (needsApproval) {
      setLastAction("approve");
      writeContract({
        address: method.address!,
        abi: erc20Abi,
        functionName: "approve",
        args: [PRESALE_CONTRACT_ADDRESS, cost],
        chainId: activeChain.id,
      });
      return;
    }

    // buy() takes the amount being PAID, not the amount of MMC wanted.
    setLastAction("buy");
    writeContract({
      address: PRESALE_CONTRACT_ADDRESS,
      abi: presaleAbi,
      functionName: "buy",
      args: [method.address!, cost],
      chainId: activeChain.id,
    });
  };

  const round1Start = new Date(PRESALE_ROUNDS[0].start);
  const notStarted = stats.round === 0 && mountedAt < round1Start.getTime();
  const busy = isPending || isConfirming;

  const buttonLabel = (() => {
    if (!isConnected) return "Connect Wallet to Purchase";
    if (wrongNetwork) return `Switch to ${activeChain.name}`;
    if (busy) return isConfirming ? "Confirming…" : "Check your wallet…";
    if (isOffchain) {
      return OFFCHAIN_PAYMENT_URL
        ? `Pay with ${method.label}`
        : `${method.label} — opening soon`;
    }
    if (stats.isSoldOut) return "Sold Out";
    if (stats.isPaused) return "Sale Paused";
    if (notStarted) return `Opens ${dateFmt.format(round1Start)}`;
    if (!stats.isLive) return "Sale Closed";
    if (!methodEnabled) return `${method.label} not enabled`;
    if (needsApproval) return `Approve ${method.label}`;
    return `Buy $${PRESALE_TOKEN.symbol}`;
  })();

  const canBuy =
    !isConnected ||
    wrongNetwork ||
    (isOffchain
      ? Boolean(OFFCHAIN_PAYMENT_URL) && mmcBase > 0n && !busy
      : stats.isLive && methodEnabled && mmcBase > 0n && !busy);

  const nativePriceLabel =
    stats.currentPriceEth > 0 ? `${stats.currentPriceEth.toFixed(6)} ETH` : "—";

  return (
    <div className="bg-coin-black min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="relative py-16 lg:py-20 overflow-hidden border-b border-white/6">
        <div className="absolute inset-0 bg-gradient-to-br from-coin-black via-coin-near-black to-emerald-dark/10" />
        <div className="container-wide relative text-center">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald/25 bg-emerald/10 mb-6">
              <span
                className={`w-2 h-2 rounded-full bg-emerald ${stats.isLive ? "animate-pulse" : ""}`}
              />
              <span className="text-emerald-light text-xs font-semibold tracking-widest uppercase">
                {stats.isLive
                  ? `Round ${stats.round} Live`
                  : notStarted
                    ? "Opening Soon"
                    : "Presale"}
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              <span className="text-emerald-gradient">${PRESALE_TOKEN.symbol}</span>{" "}
              {stats.isLive ? "Presale is Live!" : "Presale"}
            </h1>
            <p className="text-white/55 max-w-xl mx-auto text-lg">
              {PRESALE_TOKEN.name} ({PRESALE_TOKEN.symbol}) — {PRESALE_TOKEN.chain}
            </p>
            {notStarted && (
              <p className="text-white/50 text-sm mt-3">
                Round 1 opens {dateFmt.format(round1Start)}
              </p>
            )}
          </SectionReveal>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-wide max-w-4xl">
          {/* Stat cards */}
          <SectionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <StatCard
                label={stats.isLive ? "Current Price" : "Round 1 Price"}
                value={formatUsd(stats.currentPriceUsd)}
                isLoading={isLoading}
                accent="emerald"
              />
              <StatCard
                label="Next Round Price"
                value={
                  stats.nextPriceUsd === null ? "Final round" : formatUsd(stats.nextPriceUsd)
                }
                isLoading={isLoading}
                accent="cyan"
              />
              <StatCard
                label="Price in ETH"
                value={nativePriceLabel}
                isLoading={isLoading}
                accent="emerald"
              />
            </div>
          </SectionReveal>

          {/* Widget card */}
          <SectionReveal delay={0.1}>
            <div className="rounded-3xl border border-emerald/15 bg-white/2 p-6 sm:p-8">
              {/* Sold / remaining */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-white/55 text-xs font-semibold uppercase tracking-wider mb-1">
                    Tokens Sold
                  </p>
                  {isLoading ? (
                    <div className="h-6 w-28 rounded-lg bg-white/8 animate-pulse" />
                  ) : (
                    <p className="text-white font-semibold text-lg">
                      {formatCompact(stats.tokensSold)}{" "}
                      <span className="text-white/50 text-sm">{PRESALE_TOKEN.symbol}</span>
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-white/55 text-xs font-semibold uppercase tracking-wider mb-1">
                    Remaining
                  </p>
                  {isLoading ? (
                    <div className="h-6 w-24 rounded-lg bg-white/8 animate-pulse ml-auto" />
                  ) : (
                    <p className="text-white font-semibold text-lg">
                      {formatCompact(stats.tokensRemaining)}{" "}
                      <span className="text-white/50 text-sm">{PRESALE_TOKEN.symbol}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-2">
                <div className="h-3 rounded-full bg-white/8 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${isLoading ? 0 : stats.progressPct}%` }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-dark via-emerald to-cyan"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mb-8">
                <p className="text-white/55 text-xs">
                  {isLoading ? "…" : `${stats.progressPct.toFixed(2)}%`} of{" "}
                  {formatCompact(PRESALE_TOKEN.presaleAllocation)} {PRESALE_TOKEN.symbol} sold
                </p>
                {lastUpdated && (
                  <p className="text-white/50 text-[10px]">
                    Updated {lastUpdated.toLocaleTimeString()}
                  </p>
                )}
              </div>

              {/* Payment method */}
              <div className="mb-5">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <p className="block text-sm font-medium text-white/80">Pay with</p>
                  <p className="text-[11px] text-white/40">
                    {anyOnchainEnabled ? "Settles on-chain" : "On-chain methods unlock as they are enabled"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PAYMENT_METHODS.map((m) => {
                    const selected = m.id === methodId;
                    const enabled = isMethodEnabled(m);
                    const interactive = m.available && (enabled || m.offchain);
                    const status = m.offchain
                      ? m.note ?? "Off-chain"
                      : enabled
                        ? m.chain
                        : "Not enabled";
                    return (
                      <button
                        key={m.id}
                        type="button"
                        disabled={!interactive}
                        onClick={() => {
                          setMethodId(m.id);
                          setMessage("");
                        }}
                        title={m.note}
                        className={`px-3.5 py-2 rounded-xl border text-sm font-semibold transition-colors
                          focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-coin-black
                          ${
                            selected
                              ? "border-emerald/50 bg-emerald/12 text-emerald-light"
                              : "border-white/10 bg-white/4 text-white/70 hover:border-white/20"
                          }
                          disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:border-white/10`}
                      >
                        {m.label}
                        <span
                          className={`block text-[10px] font-normal ${
                            enabled || m.offchain ? "text-white/45" : "text-white/30"
                          }`}
                        >
                          {status}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {!anyOnchainEnabled && (
                  <p className="mt-2.5 text-[11px] text-white/45 leading-relaxed">
                    On-chain payment tokens aren&apos;t registered on this deployment yet. Off-chain
                    checkout is available, and the cards above light up the moment the sale owner
                    enables them.
                  </p>
                )}
              </div>

              {/* Buy input */}
              <div className="space-y-3">
                <label htmlFor="mmc-amount" className="block text-sm font-medium text-white/80">
                  Amount of {PRESALE_TOKEN.symbol} to buy
                </label>
                <div className="relative">
                  <input
                    id="mmc-amount"
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-4 pr-20 rounded-xl bg-white/5 border border-white/10 text-white text-lg
                      placeholder-white/30 focus:outline-none focus:border-emerald/50 focus:bg-white/8
                      focus:ring-2 focus:ring-emerald/50 focus:ring-offset-2 focus:ring-offset-coin-black transition-colors"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/55 text-sm font-semibold">
                    {PRESALE_TOKEN.symbol}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-white/50">You pay</span>
                  <span className="text-white/80 font-semibold">
                    {costLabel}
                    <span className="text-white/45 font-normal"> (≈ {formatUsd(usdValue)})</span>
                  </span>
                </div>

                {isOffchain && (
                  <p className="text-white/50 text-xs leading-relaxed">
                    {OFFCHAIN_PAYMENT_URL
                      ? `You'll be taken to a secure checkout. Your ${PRESALE_TOKEN.symbol} is credited to your connected wallet once the payment is confirmed.`
                      : `Off-chain payments open with the sale. Join the waitlist and we'll notify you.`}
                  </p>
                )}

                {/* Lockup notice — stated before the transaction, not after */}
                <div className="flex gap-2.5 rounded-xl border border-ruby/25 bg-ruby/8 px-3.5 py-3">
                  <LockClosedIcon className="w-4 h-4 text-ruby-light shrink-0 mt-0.5" />
                  <p className="text-ruby-light/90 text-xs leading-relaxed">
                    <span className="font-semibold">
                      Presale tokens are locked until{" "}
                      {dateFmt.format(new Date(PRESALE_UNLOCK_DATE))}.
                    </span>{" "}
                    Your {PRESALE_TOKEN.symbol} arrives in your wallet immediately, but it
                    cannot be transferred or sold until that date. This is enforced by the token
                    contract.
                  </p>
                </div>

                {!isNative && !isOffchain && needsApproval && cost > 0n && (
                  <p className="text-white/50 text-xs">
                    Paying with {method.label} takes two transactions: one to approve, one to
                    buy.
                  </p>
                )}

                {statusMessage && (
                  <p className="text-emerald-light text-sm bg-emerald/10 border border-emerald/20 rounded-lg px-3 py-2">
                    {statusMessage}
                  </p>
                )}

                <motion.button
                  whileHover={shouldReduceMotion || !canBuy ? undefined : { scale: 1.02 }}
                  whileTap={shouldReduceMotion || !canBuy ? undefined : { scale: 0.98 }}
                  onClick={handleBuy}
                  disabled={!canBuy}
                  className="inline-flex w-full items-center justify-center gap-2 py-4 rounded-xl bg-emerald-gradient text-white font-semibold text-base
                    shadow-emerald hover:brightness-110 transition-all duration-300
                    focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-coin-black
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {buttonLabel}
                  {isOffchain && methodEnabled && (
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  )}
                </motion.button>

                <p className="text-center text-xs text-white/50">
                  Token:{" "}
                  <a
                    href={`${EXPLORER_URL}/token/${PRESALE_TOKEN.tokenContractAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-white/55 hover:text-emerald-light underline underline-offset-2"
                  >
                    {PRESALE_TOKEN.tokenContractAddress.slice(0, 6)}…
                    {PRESALE_TOKEN.tokenContractAddress.slice(-4)}
                  </a>{" "}
                  · Presale:{" "}
                  <a
                    href={`${EXPLORER_URL}/address/${PRESALE_CONTRACT_ADDRESS}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-white/55 hover:text-emerald-light underline underline-offset-2"
                  >
                    {PRESALE_CONTRACT_ADDRESS.slice(0, 6)}…{PRESALE_CONTRACT_ADDRESS.slice(-4)}
                  </a>{" "}
                  <span className="text-white/35">on {EXPLORER_NAME}</span>
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Rounds */}
      <section className="py-16 lg:py-20 border-t border-white/6">
        <div className="container-wide max-w-3xl">
          <SectionReveal className="text-center mb-12">
            <p className="text-emerald-light text-xs font-semibold tracking-widest uppercase mb-3">
              Sale Structure
            </p>
            <div className="section-divider-core" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Presale Rounds
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PRESALE_ROUNDS.map((round, i) => {
              const accent = roundAccentStyle[roundAccents[i] ?? "emerald"];
              const status =
                stats.round === round.round
                  ? "Active"
                  : stats.round > round.round
                    ? "Completed"
                    : "Upcoming";
              return (
                <SectionReveal key={round.round} delay={i * 0.1}>
                  <div className={`h-full rounded-2xl border p-6 ${accent.card}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-8 h-8 rounded-full ${accent.badge} flex items-center justify-center shrink-0`}
                      >
                        <span className="text-coin-black font-bold text-xs">{round.round}</span>
                      </div>
                      <p className="font-display text-lg font-bold text-white">{round.name}</p>
                    </div>

                    <p className="text-white/50 text-xs leading-relaxed mb-5">
                      {round.description}
                    </p>

                    <dl className="space-y-2.5">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <dt className="text-white/55 text-xs">Price</dt>
                        <dd className="text-white/80 text-xs font-semibold">
                          {formatUsd(round.priceUsd)}
                        </dd>
                      </div>
                      {round.priceEth !== undefined && (
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <dt className="text-white/55 text-xs">Price in ETH</dt>
                          <dd className="text-white/80 text-xs font-semibold">
                            {round.priceEth.toFixed(5)} ETH
                          </dd>
                        </div>
                      )}
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <dt className="text-white/55 text-xs">Opens</dt>
                        <dd className="text-white/80 text-xs font-semibold">
                          {dateFmt.format(new Date(round.start))}
                        </dd>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <dt className="text-white/55 text-xs">Closes</dt>
                        <dd className="text-white/80 text-xs font-semibold">
                          {dateFmt.format(new Date(round.end))}
                        </dd>
                      </div>
                      <div className="flex justify-between items-center">
                        <dt className="text-white/55 text-xs">Status</dt>
                        <dd
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            status === "Active"
                              ? "text-emerald-light bg-emerald/10 border-emerald/25"
                              : "text-white/60 bg-white/5 border-white/10"
                          }`}
                        >
                          {status}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </SectionReveal>
              );
            })}
          </div>

          <SectionReveal delay={0.2}>
            <p className="mt-8 text-center text-white/45 text-xs max-w-xl mx-auto leading-relaxed">
              Both rounds draw on a single {formatCompact(PRESALE_TOKEN.presaleAllocation)}{" "}
              {PRESALE_TOKEN.symbol} allocation, sold first-come. Prices are fixed on-chain and
              quoted in USD at {USD_PRICE_DECIMALS} decimals; payment amounts are converted
              using live on-chain price feeds.
            </p>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
