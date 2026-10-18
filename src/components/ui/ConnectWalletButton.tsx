"use client";

/**
 * ConnectWalletButton — built on RainbowKit's ConnectButton.Custom render
 * prop (not the default <ConnectButton />) so its markup and classes match
 * the site's own Button/TokenPurchaseCTA design system exactly, instead of
 * RainbowKit's own pill-shaped, self-padded default UI.
 */

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useIsCoreRoute } from "@/lib/useIsCoreRoute";

interface ConnectWalletButtonProps {
  className?: string;
  size?: "sm" | "md";
}

const sizeMap = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
};

const dangerClass = "bg-transparent border-2 border-ruby text-ruby-light hover:bg-ruby/10";

export function ConnectWalletButton({ className = "", size = "sm" }: ConnectWalletButtonProps) {
  const isCore = useIsCoreRoute();
  const sizeClass = sizeMap[size];

  const baseClass = `
    inline-flex items-center justify-center gap-2 font-semibold
    rounded-xl leading-none whitespace-nowrap
    transition-all duration-300 cursor-pointer select-none
    focus-visible:ring-2 focus-visible:ring-offset-2
    ${isCore ? "focus-visible:ring-emerald focus-visible:ring-offset-coin-black" : "focus-visible:ring-forest focus-visible:ring-offset-ivory"}
  `;

  const outlineClass = isCore
    ? "bg-transparent border-2 border-emerald text-emerald-light hover:bg-emerald/10"
    : "bg-transparent border-2 border-forest text-forest-dark hover:bg-forest/10";

  const connectedClass = isCore
    ? "bg-white/5 border border-white/10 text-white/90 hover:border-emerald/40 hover:bg-white/8"
    : "bg-ink/5 border border-ink/10 text-ink/90 hover:border-forest/40 hover:bg-ink/8";

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            className={className}
            {...(!ready && {
              "aria-hidden": true,
              style: { opacity: 0, pointerEvents: "none", userSelect: "none" },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button type="button" onClick={openConnectModal} className={`${baseClass} ${sizeClass} ${outlineClass}`}>
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button type="button" onClick={openChainModal} className={`${baseClass} ${sizeClass} ${dangerClass}`}>
                    Wrong Network
                  </button>
                );
              }

              return (
                <button type="button" onClick={openAccountModal} className={`${baseClass} ${sizeClass} ${connectedClass}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0" />
                  {account.displayName}
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
