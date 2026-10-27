import data from "@/content/site.json";
export const locales = ["en", "ml"] as const;
export type Lang = (typeof locales)[number];
export type Dict = typeof data.en;
export const getDict = (l: Lang) => data[l] as Dict;
export const shared = data.shared;
export const isLang = (l: string): l is Lang => (locales as readonly string[]).includes(l);
export const pageMeta = (lang: Lang, title: string, path: string) => ({
  title,
  alternates: { canonical: `/${lang}${path}`, languages: { en: `/en${path}`, ml: `/ml${path}` } },
});
