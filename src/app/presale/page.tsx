import type { Metadata } from "next";
import { PresaleWidget } from "@/components/sections/PresaleWidget";

export const metadata: Metadata = {
  title: "Presale | MANUMIT CORE (MMC)",
  description:
    "Buy $MMC tokens in the MANUMIT CORE presale — live pricing, sale progress, and phase breakdown for the Manumit Me Foundation token.",
};

export default function PresalePage() {
  return <PresaleWidget />;
}
