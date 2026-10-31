import type { Metadata } from "next";
import data from "@/content/site.json";
export const locales = ["en", "ml"] as const;
export type Lang = (typeof locales)[number];
export type Dict = typeof data.en;
export type SeoKey = keyof Dict["seo"];
export const getDict = (l: Lang) => data[l] as Dict;
export const shared = data.shared;
export const isLang = (l: string): l is Lang => (locales as readonly string[]).includes(l);

// Live domain. Set NEXT_PUBLIC_SITE_URL on the host; Vercel's production domain is used as a fallback.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export const pageMeta = (lang: Lang, key: SeoKey, path: string): Metadata => {
  const { title, description } = getDict(lang).seo[key];
  const url = `/${lang}${path}`;
  return {
    title: key === "home" ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: { en: `/en${path}`, ml: `/ml${path}`, "x-default": `/en${path}` } },
    openGraph: { title, description, url, locale: lang === "ml" ? "ml_IN" : "en_IN", alternateLocale: lang === "ml" ? "en_IN" : "ml_IN" },
    twitter: { card: "summary_large_image", title, description },
  };
};
