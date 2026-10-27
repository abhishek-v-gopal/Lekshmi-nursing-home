import type { MetadataRoute } from "next";
const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["en", "ml"].flatMap((l) => ["", "/doctor", "/story", "/services", "/naveenam", "/contact"].map((p) => ({ url: `${base}/${l}${p}` })));
}
