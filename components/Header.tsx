"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HospitalLogo from "./HospitalLogo";

const keys = ["", "doctor", "story", "services", "naveenam", "contact"];
const navKeys = ["home", "doctor", "story", "services", "naveenam", "contact"];

export default function Header({ lang, nav, ui }: { lang: "en" | "ml"; nav: Record<string, string>; ui: Record<string, string> }) {
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
        className={`tap min-w-0 w-full whitespace-normal break-words px-1 py-1.5 text-sm leading-normal md:w-auto md:py-0 md:text-base ${path === href ? "link" : "hover:text-accent"}`}>{nav[navKeys[i]]}</Link>
    );
  });
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="wrap flex items-center justify-between gap-2 py-1.5 md:gap-4 md:py-2">
        <Link href={`/${lang}`} className="tap min-w-0 flex-1">
          <HospitalLogo />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-5 md:flex">{links}</nav>
        <div className="flex shrink-0 items-center gap-1">
          <Link href={switchHref} hrefLang={other} lang={other} aria-label={ui.langLabel} onClick={() => remember(other)}
            className="tap justify-center border border-line px-2 text-sm font-semibold md:px-3 md:text-base">{ui.lang}</Link>
          <button type="button" onClick={toggleTheme} aria-label={ui.theme} className="tap justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M10 2.5a7.5 7.5 0 0 1 0 15z" fill="currentColor" /></svg>
          </button>
          <button type="button" className="tap justify-center px-1.5 text-sm md:hidden" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
            {open ? ui.close : ui.menu}
          </button>
        </div>
      </div>
      {open && <nav id="mnav" aria-label="Main" className="wrap flex w-full flex-col border-t border-line py-1 md:hidden">{links}</nav>}
    </header>
  );
}
