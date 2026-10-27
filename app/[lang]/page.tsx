import Link from "next/link";
import Photo from "@/components/Photo";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import Txt from "@/components/Txt";
import Hours from "@/components/Hours";
import PageHead from "@/components/PageHead";
import { getDict, pageMeta, shared, type Lang } from "@/lib/i18n";
type P = { params: Promise<{ lang: string }> };
import type { Metadata } from "next";
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  return { alternates: pageMeta(lang, "", "").alternates };
}
export default async function Home({ params }: P) {
  const lang = (await params).lang as Lang;
  const d = getDict(lang);
  const h = d.home;
  return (
    <>
      <section className="relative isolate flex min-h-[clamp(38rem,88svh,54rem)] items-end overflow-hidden bg-[#0B1E21] text-[#F3F5F0]">
        <div className="absolute inset-0 -z-10"><Parallax><Photo slot="hero" lang={lang} fill priority dark sizes="100vw" /></Parallax></div>
        <div className="absolute inset-0 -z-10 bg-[#0B1E21]/65" />
        <div className="wrap w-full pb-10 pt-32 md:pb-16">
          <div className="max-w-4xl border-l-2 border-[#D4AF5F] pl-5 md:pl-8">
            <p className="mb-6 text-xs font-semibold tracking-[0.12em] text-[#D4AF5F]">LNH · {d.ui.footerNote}</p>
            <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-7xl">{h.headline}</h1>
            <p className="mt-6 max-w-xl text-lg text-[#DCE4DF] md:text-xl">{h.sub}</p>
          </div>
          <dl className="mt-14 grid grid-cols-1 border-t border-[#F3F5F0]/30 sm:grid-cols-3">
            {h.facts.map((f, i) => (
              <div key={f.n} className={`border-b border-[#F3F5F0]/20 py-5 sm:border-b-0 sm:py-6 ${i < h.facts.length - 1 ? "sm:border-r sm:pr-6" : ""} ${i > 0 ? "sm:pl-6" : ""}`}>
                <dd className="font-display text-4xl md:text-5xl">{f.n}</dd>
                <dt className="mt-1 max-w-[16ch] text-sm text-[#DCE4DF] md:text-base">{f.l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="sec wrap grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-24">
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">{h.opTitle}</p>
          <h2 className="text-3xl md:text-5xl">{h.opTitle}</h2>
          <div className="mt-8 border-t border-line"><Hours d={d} /></div>
        </Reveal>
        <Reveal className="border-t border-line pt-6 md:pt-8">
          <h2 className="text-2xl md:text-4xl">{h.promiseTitle}</h2>
          <p className="mt-6 text-lg text-muted">{h.promiseText}</p>
        </Reveal>
      </section>

      <section className="bg-surface">
        <div className="sec wrap grid items-center gap-12 md:grid-cols-12 md:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden md:col-span-5 md:aspect-[3/4]">
            <Parallax><Photo slot="doctor" lang={lang} fill sizes="(min-width:768px) 40vw, 100vw" /></Parallax>
          </div>
          <Reveal className="md:col-span-6 md:col-start-7 md:border-t md:border-line md:pt-8">
            <h2 className="text-3xl md:text-5xl">{h.teaserTitle}</h2>
            <p className="mt-6 text-lg text-muted">{h.teaser}</p>
            <Link href={`/${lang}/doctor`} className="btn mt-8">{h.teaserCta}</Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0B1E21] text-[#F3F5F0]">
        <Reveal className="sec wrap">
          <div className="mb-8 h-0.5 w-16 bg-[#D4AF5F]" />
          <h2 className="text-3xl md:text-6xl">{h.bannerTitle}</h2>
          <p className="mt-6 text-lg text-[#DCE4DF] md:text-xl">{h.bannerText}</p>
          <Link href={`/${lang}/naveenam`} className="btn btn-gold mt-8">{h.bannerCta}</Link>
        </Reveal>
      </section>
    </>
  );
}
