import Link from "next/link";
import type { Dict, Lang } from "@/lib/i18n";
import Hours from "./Hours";
import HospitalLogo from "./HospitalLogo";
export default function Footer({ lang, d }: { lang: Lang; d: Dict }) {
  return (
    <footer className="border-t border-line bg-surface">
      <div aria-hidden="true" className="h-1 bg-gradient-to-r from-accent via-gold to-accent" />
      <div className="wrap grid gap-12 py-16 md:grid-cols-2">
        <div>
          <HospitalLogo />
          <p className="mt-2 text-muted">{d.ui.footerNote}</p>
          <p className="mt-6 flex flex-wrap gap-x-6">
            <Link className="tap link" href={`/${lang}/naveenam`}>{d.nav.naveenam}</Link>
            <Link className="tap link" href={`/${lang}/contact`}>{d.nav.contact}</Link>
          </p>
        </div>
        <Hours d={d} />
      </div>
      <div className="wrap flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line py-5 text-sm text-muted">
        <span>© {new Date().getFullYear()} {d.ui.name}</span>
        <span>Made with love by <a className="font-medium text-ink hover:text-accent" href="https://abhishekvgopal.com" target="_blank" rel="noopener noreferrer">Abhishek V Gopal</a> · Powered by <a className="font-medium text-ink hover:text-accent" href="https://devmorphix.com" target="_blank" rel="noopener noreferrer">DevMorphix</a></span>
      </div>
    </footer>
  );
}
