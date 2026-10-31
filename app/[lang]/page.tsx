import Link from "next/link";
import Photo from "@/components/Photo";
import HeroCarousel from "@/components/HeroCarousel";
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
      <section className="relative isolate flex min-h-[clamp(40rem,92svh,56rem)] items-end short:min-h-[calc(100svh-4rem)] overflow-hidden bg-[#0B1E21] text-[#F3F5F0]">
        <HeroCarousel lang={lang} labels={d.ui.carousel} />
        <div className="wrap w-full pb-10 pt-40 md:pb-14 short:pb-8 short:pt-28">
          <div className="max-w-4xl">
            <p className="rise eyebrow mb-6 short:mb-4 !text-[#D4AF5F]">LNH · {d.ui.footerNote}</p>
            <h1 className="rise max-w-4xl text-4xl drop-shadow-sm sm:text-5xl md:text-7xl short:text-5xl lg:short:text-6xl" style={{ animationDelay: "120ms" }}>{h.headline}</h1>
            <p className="rise mt-6 max-w-xl text-lg text-[#DCE4DF] md:text-xl short:mt-4 short:text-lg" style={{ animationDelay: "240ms" }}>{h.sub}</p>
            <div className="rise mt-9 flex flex-wrap gap-3 short:mt-6" style={{ animationDelay: "360ms" }}>
              <Link href={`/${lang}/doctor`} className="btn btn-gold">{h.teaserCta}</Link>
              <Link href={`/${lang}/contact`} className="btn btn-ghost">{d.nav.contact}</Link>
            </div>
          </div>
          <dl className="rise mt-14 grid grid-cols-1 gap-3 sm:grid-cols-3 md:mt-16 short:mt-8" style={{ animationDelay: "480ms" }}>
            {h.facts.map((f) => (
              <div key={f.n} className="glass flex flex-col-reverse px-5 py-4 md:px-6 md:py-5 short:py-3">
                <dt className="mt-1 text-sm text-[#DCE4DF] md:text-base">{f.l}</dt>
                <dd className="font-display text-4xl text-[#F3F5F0] md:text-5xl short:text-4xl">{f.n}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="sec wrap grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:gap-8">
        <Reveal className="card p-7 md:p-10">
          <p className="eyebrow mb-4">{h.opTitle}</p>
          <h2 className="text-3xl md:text-4xl">{h.opTitle}</h2>
          <div className="mt-6"><Hours d={d} /></div>
        </Reveal>
        <Reveal className="relative flex flex-col justify-end overflow-hidden rounded-[1.25rem] bg-accent p-7 text-[#F3F5F0] md:p-10 dark:text-[#0B1E21]">
          <span aria-hidden="true" className="absolute -right-6 -top-10 font-display text-[12rem] leading-none opacity-15">₹0</span>
          <h2 className="relative text-3xl md:text-5xl short:text-4xl">{h.promiseTitle}</h2>
          <p className="relative mt-6 text-lg opacity-90">{h.promiseText}</p>
          <Link href={`/${lang}/services`} className="relative mt-8 inline-flex w-fit items-center gap-2 font-semibold underline decoration-2 underline-offset-4">{d.nav.services} →</Link>
        </Reveal>
      </section>

      <section className="bg-surface">
        <div className="sec wrap grid items-center gap-12 md:grid-cols-12 md:gap-20">
          <div className="relative md:col-span-5">
            <div aria-hidden="true" className="absolute -bottom-4 -right-4 h-full w-full rounded-[1.5rem] border-2 border-gold/60" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-2xl shadow-black/20 md:aspect-[3/4]">
              <Parallax><Photo slot="doctor" lang={lang} fill sizes="(min-width:768px) 40vw, 100vw" /></Parallax>
            </div>
          </div>
          <Reveal className="md:col-span-6 md:col-start-7">
            <p className="eyebrow mb-5">{d.nav.doctor}</p>
            <h2 className="text-3xl md:text-5xl short:text-4xl">{h.teaserTitle}</h2>
            <p className="mt-6 text-lg text-muted">{h.teaser}</p>
            <Link href={`/${lang}/doctor`} className="btn mt-8">{h.teaserCta}</Link>
          </Reveal>
        </div>
      </section>

      <section className="wrap grid items-center gap-12 pt-24 md:grid-cols-12 md:gap-16 md:pt-32 short:pt-20">
        <Reveal className="md:col-span-5">
          <p className="eyebrow mb-5">{h.staffEyebrow}</p>
          <h2 className="text-3xl md:text-5xl short:text-4xl">{h.staffTitle}</h2>
          <p className="mt-6 text-lg text-muted">{h.staffText}</p>
        </Reveal>
        <div className="relative md:col-span-7">
          <div aria-hidden="true" className="absolute -bottom-4 -left-4 h-full w-full rounded-[1.5rem] border-2 border-gold/60" />
          <div className="relative overflow-hidden rounded-[1.5rem] shadow-2xl shadow-black/20">
            <Photo slot="staff" lang={lang} ratio="4 / 3" sizes="(min-width:768px) 56vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="sec wrap">
        <Reveal className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#0B1E21] px-7 py-16 text-[#F3F5F0] md:px-16 md:py-24 short:py-16">
          <div className="absolute inset-0 -z-10 opacity-45"><Photo slot="backwater" lang={lang} fill dark sizes="(min-width:1024px) 76rem, 100vw" /></div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B1E21] via-[#0B1E21]/80 to-transparent" />
          <p className="eyebrow mb-6 !text-[#D4AF5F]">{d.naveenam.details[0].v}</p>
          <h2 className="text-3xl md:text-6xl short:text-5xl">{h.bannerTitle}</h2>
          <p className="mt-6 text-lg text-[#DCE4DF] md:text-xl">{h.bannerText}</p>
          <Link href={`/${lang}/naveenam`} className="btn btn-gold mt-8">{h.bannerCta}</Link>
        </Reveal>
      </section>
    </>
  );
}
