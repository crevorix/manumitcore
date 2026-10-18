import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Fundraiser images uploaded through the Sanity Studio are served from
      // Sanity's CDN — see src/sanity/schemaTypes/fundraiser.ts.
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  // Enable static export if needed for non-Vercel hosting:
  // output: "export",
};

export default nextConfig;
