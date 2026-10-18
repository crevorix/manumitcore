/**
 * Fallback fundraiser list for /donate.
 *
 * The live page renders whatever is in Sanity; this is only used when the
 * CMS returns nothing (a fresh dataset, or an outage). Keep it in step with
 * the campaigns that actually exist so the page is never empty.
 *
 * To add a campaign for real, use the Studio at /studio — not this file.
 */

export interface Fundraiser {
  title: string;
  description: string;
  gofundmeUrl: string;
  /** Sanity CDN URL once uploaded; null falls back to a branded placeholder. */
  imageUrl?: string | null;
}

export const fundraisers: Fundraiser[] = [
  {
    title: "Equip 1,000 Students With School Supplies",
    description:
      "Helping students start the school year prepared, with the supplies they need to learn and succeed.",
    gofundmeUrl: "https://gofund.me/f45cc9092",
    imageUrl: null,
  },
  {
    title: "Join Us: Prevent Overdoses and Save Lives",
    description:
      "Supporting overdose prevention efforts and the resources that help save lives in affected communities.",
    gofundmeUrl: "https://gofund.me/b54f006c2",
    imageUrl: null,
  },
];
