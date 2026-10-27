"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HospitalLogo from "./HospitalLogo";

const keys = ["", "doctor", "story", "services", "naveenam", "contact"];
const navKeys = ["home", "doctor", "story", "services", "naveenam", "contact"];

type HeaderUi = {
  lang: string;
  langLabel: string;
  theme: string;
  close: string;
  menu: string;
};

export default function Header({ lang, nav, ui }: { lang: "en" | "ml"; nav: Record<string, string>; ui: HeaderUi }) {
  const path = usePathname() || `/${lang}`;
  const [open, setOpen] = useState(false);
  const other = lang === "en" ? "ml" : "en";
  const switchHref = path.replace(/^\/(en|ml)/, `/${other}`);
  const rememberTheme = (theme: string) => {
    if (theme !== "light" && theme !== "dark") return;
    document.cookie = `theme=${theme};path=/;max-age=31536000;samesite=lax`;
    try { localStorage.setItem("theme", theme); } catch {}
  };
  const remember = (l: string) => {
    document.cookie = `lang=${l};path=/;max-age=31536000;samesite=lax`;
    try { localStorage.setItem("lang", l); } catch {}
  };
  useEffect(() => remember(lang), [lang]);
  useEffect(() => setOpen(false), [path]);
  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    rememberTheme(next);
  };
  const links = keys.map((k, i) => {
    const href = `/${lang}${k ? `/${k}` : ""}`;
    return (
      <Link key={k} href={href} aria-current={path === href ? "page" : undefined}
        className={`tap min-w-0 w-full whitespace-normal break-words rounded-full px-3 py-1.5 text-sm leading-normal transition-colors md:w-auto md:py-0 md:text-[0.95rem] ${path === href ? "bg-surface font-semibold text-accent" : "text-muted hover:bg-surface hover:text-ink"}`}>{nav[navKeys[i]]}</Link>
    );
  });
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 shadow-[0_1px_12px_-6px_rgb(11_30_33/0.25)] backdrop-blur-md">
      <div className="wrap flex items-center justify-between gap-2 py-1.5 md:gap-4 md:py-2">
        <Link href={`/${lang}`} className="tap min-w-0 flex-1">
          <HospitalLogo />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">{links}</nav>
        <div className="flex shrink-0 items-center gap-1">
          <Link href={switchHref} hrefLang={other} lang={other} aria-label={ui.langLabel} onClick={() => remember(other)}
            className="tap justify-center rounded-full border border-line px-3 text-sm font-semibold transition-colors hover:border-gold hover:text-gold md:px-4">{ui.lang}</Link>
          <button type="button" onClick={toggleTheme} aria-label={ui.theme} className="tap justify-center rounded-full transition-colors hover:bg-surface">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M10 2.5a7.5 7.5 0 0 1 0 15z" fill="currentColor" /></svg>
          </button>
          <button type="button" className="tap justify-center rounded-full border border-line px-3 text-sm font-semibold md:hidden" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
            {open ? ui.close : ui.menu}
          </button>
        </div>
      </div>
      {open && <nav id="mnav" aria-label="Main" className="wrap flex w-full flex-col gap-1 border-t border-line py-3 md:hidden">{links}</nav>}
    </header>
  );
}
