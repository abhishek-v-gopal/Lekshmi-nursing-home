import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { Noto_Serif, Noto_Sans, Noto_Serif_Malayalam, Noto_Sans_Malayalam } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LivePopup from "@/components/LivePopup";
import Analytics from "@/components/Analytics";
import { getDict, isLang, locales, shared, siteUrl, type Lang } from "@/lib/i18n";

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
    metadataBase: new URL(siteUrl),
    title: { default: d.seo.home.title, template: `%s | ${d.ui.name}` },
    description: d.seo.home.description,
    applicationName: d.ui.name,
    openGraph: { siteName: d.ui.name, locale: lang === "ml" ? "ml_IN" : "en_IN", type: "website" },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } } : {}),
  };
}

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#F3F5F0" }, { media: "(prefers-color-scheme: dark)", color: "#0B1E21" }],
};

const themeScript = `try{var c=document.cookie.match(/(?:^|; )theme=(dark|light)/);var t=(c&&c[1])||localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}document.documentElement.classList.add('js')`;

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const d = getDict(lang);
  const savedTheme = (await cookies()).get("theme")?.value;
  const theme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : undefined;
  // Hospital details for Google (schema.org). The Google Maps listing spells the name "Lakshmi".
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Hospital", "@id": `${siteUrl}/#hospital`,
        name: "Lekshmi Nursing Home", alternateName: ["Lakshmi Nursing Home", "ലക്ഷ്മി നഴ്സിംഗ് ഹോം", "LNH"],
        description: d.seo.home.description, url: `${siteUrl}/${lang}`, image: `${siteUrl}/images/hospital.png`,
        foundingDate: "1977", isAcceptingNewPatients: true, currenciesAccepted: "INR", priceRange: "₹",
        areaServed: ["Ramankari", "Kuttanad", "Alappuzha"],
        address: { "@type": "PostalAddress", streetAddress: "Mampuzhakari, SH11", addressLocality: "Ramankari", addressRegion: "Kerala", postalCode: "689595", addressCountry: "IN" },
        geo: { "@type": "GeoCoordinates", latitude: 9.42212, longitude: 76.47199 },
        hasMap: "https://maps.google.com/?cid=8906025812130561198",
        ...(shared.phone ? { telephone: shared.phone.replace(/\s/g, "") } : {}),
        openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: shared.days, opens: shared.opens, closes: shared.closes }],
        employee: { "@id": `${siteUrl}/#doctor` }, founder: { "@id": `${siteUrl}/#doctor` },
      },
      {
        "@type": "Person", "@id": `${siteUrl}/#doctor`, name: "Dr. M S Naveenan", honorificPrefix: "Dr.", honorificSuffix: "MBBS",
        jobTitle: "Doctor", url: `${siteUrl}/${lang}/doctor`, image: `${siteUrl}/images/dr.png`, worksFor: { "@id": `${siteUrl}/#hospital` },
      },
      { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "Lekshmi Nursing Home", alternateName: "Lakshmi Nursing Home", url: siteUrl, inLanguage: ["en", "ml"] },
    ],
  };
  return (
    <html lang={lang} data-theme={theme} suppressHydrationWarning className={`${serifL.variable} ${sansL.variable} ${serifM.variable} ${sansM.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-bg focus:p-3">{d.ui.skip}</a>
        <Header lang={lang} nav={d.nav} ui={d.ui} />
        <main id="main">{children}</main>
        <Footer lang={lang} d={d} />
        <LivePopup lang={lang} url={shared.live.url} until={shared.live.until} labels={d.ui.live} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <Analytics />
      </body>
    </html>
  );
}
