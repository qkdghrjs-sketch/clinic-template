import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/servicePages";
import { site, localPairs } from "@/lib/seo";

const STATIC_PATHS = [
  "",
  "/doctors",
  "/about/hours",
  "/about/location",
  "/about/tour",
  "/medical-info",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...STATIC_PATHS.map((p) => ({
      url: `${site}${p || "/"}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...Object.keys(servicePages).map((slug) => ({
      url: `${site}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...localPairs().map((p) => ({
      url: `${site}/local/${encodeURIComponent(p.region)}/${encodeURIComponent(p.disease)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
