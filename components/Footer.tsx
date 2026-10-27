import Link from "next/link";
import type { Dict, Lang } from "@/lib/i18n";
import Hours from "./Hours";
import HospitalLogo from "./HospitalLogo";
export default function Footer({ lang, d }: { lang: Lang; d: Dict }) {
  return (
    <footer className="border-t border-line bg-surface">
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
    </footer>
  );
}
