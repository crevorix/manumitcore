"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface ShareButtonProps {
  /** Path or absolute URL to share. Defaults to the page it is rendered on. */
  url?: string;
  title?: string;
  text?: string;
  label?: string;
  className?: string;
}

/**
 * Share control for the Donate page.
 *
 * Uses the Web Share API where it exists (essentially all mobile browsers,
 * which is where sharing actually happens) and falls back to copying the link
 * on desktop. Both paths give visible confirmation — a share button that looks
 * like it did nothing is worse than no button.
 */
export function ShareButton({
  url,
  title = "Manumit Me Foundation",
  text = "Support the causes and communities that need it most.",
  label = "Share Our Mission",
  className = "",
}: ShareButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const handleShare = async () => {
    const shareUrl =
      url ?? (typeof window !== "undefined" ? window.location.href : "");

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        return;
      } catch {
        // The user dismissing the share sheet lands here too, so fall through
        // to copying rather than showing an error.
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    setTimeout(() => setStatus("idle"), 2500);
  };

  return (
    <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
      <Button variant="secondary" size="lg" onClick={handleShare}>
        {label}
      </Button>
      <span
        role="status"
        aria-live="polite"
        className={`text-sm transition-opacity duration-200 ${
          status === "idle" ? "opacity-0" : "opacity-100"
        } ${status === "failed" ? "text-ink/50" : "text-forest-dark"}`}
      >
        {status === "copied"
          ? "Link copied to clipboard"
          : status === "failed"
            ? "Could not copy — please copy the address bar"
            : " "}
      </span>
    </div>
  );
}
