import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/i18n";
const pages = [
  { path: "", priority: 1 }, { path: "/doctor", priority: 0.8 }, { path: "/contact", priority: 0.8 },
  { path: "/services", priority: 0.7 }, { path: "/story", priority: 0.6 }, { path: "/naveenam", priority: 0.6 },
];
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ["en", "ml"].flatMap((l) => pages.map(({ path, priority }) => ({
    url: `${siteUrl}/${l}${path}`, lastModified, changeFrequency: "monthly" as const, priority,
    alternates: { languages: { en: `${siteUrl}/en${path}`, ml: `${siteUrl}/ml${path}` } },
  })));
}
