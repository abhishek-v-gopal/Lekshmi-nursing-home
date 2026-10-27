import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { Noto_Serif, Noto_Sans, Noto_Serif_Malayalam, Noto_Sans_Malayalam } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDict, isLang, locales, shared, type Lang } from "@/lib/i18n";

const serifL = Noto_Serif({ subsets: ["latin"], variable: "--f-serif-l", display: "swap", style: ["normal", "italic"] });
const sansL = Noto_Sans({ subsets: ["latin"], variable: "--f-sans-l", display: "swap" });
const serifM = Noto_Serif_Malayalam({ subsets: ["malayalam"], variable: "--f-serif-m", display: "swap" });
const sansM = Noto_Sans_Malayalam({ subsets: ["malayalam"], variable: "--f-sans-m", display: "swap" });

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = getDict(lang as Lang);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    title: { default: d.meta.title, template: `%s | ${d.ui.name}` },
    description: d.meta.description,
    openGraph: { siteName: d.ui.name, locale: lang === "ml" ? "ml_IN" : "en_IN", type: "website" },
  };
}

const themeScript = `try{var c=document.cookie.match(/(?:^|; )theme=(dark|light)/);var t=(c&&c[1])||localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}document.documentElement.classList.add('js')`;

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const d = getDict(lang);
  const savedTheme = (await cookies()).get("theme")?.value;
  const theme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : undefined;
  const ld = {
    "@context": "https://schema.org", "@type": "Hospital", name: "Lekshmi Nursing Home", description: d.meta.description,
    areaServed: "Kuttanad, Alappuzha, Kerala",
    employee: { "@type": "Physician", name: "Dr. Naveen" },
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: shared.days, opens: shared.opens, closes: shared.closes }],
    ...(shared.address ? { address: { "@type": "PostalAddress", streetAddress: shared.address, addressRegion: "Kerala", addressCountry: "IN" } } : {}),
    ...(shared.phone ? { telephone: shared.phone } : {}),
  };
  return (
    <html lang={lang} data-theme={theme} suppressHydrationWarning className={`${serifL.variable} ${sansL.variable} ${serifM.variable} ${sansM.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-bg focus:p-3">{d.ui.skip}</a>
        <Header lang={lang} nav={d.nav} ui={d.ui} />
        <main id="main">{children}</main>
        <Footer lang={lang} d={d} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </body>
    </html>
  );
}
