import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1.0 },
    { path: "/token", priority: 0.9 },
    { path: "/roadmap", priority: 0.9 },
    { path: "/donate", priority: 0.9 },
    { path: "/whitepaper", priority: 0.8 },
    { path: "/faq", priority: 0.8 },
    { path: "/contact", priority: 0.7 },
    { path: "/not-a-security", priority: 0.6 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority,
  }));
}
