import Photo from "@/components/Photo";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import Txt from "@/components/Txt";
import Hours from "@/components/Hours";
import PageHead from "@/components/PageHead";
import { getDict, pageMeta, shared, type Lang } from "@/lib/i18n";
type P = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: P) {
  const lang = (await params).lang as Lang;
  return pageMeta(lang, getDict(lang).nav.doctor, "/doctor");
}
export default async function Doctor({ params }: P) {
  const lang = (await params).lang as Lang;
  const x = getDict(lang).doctor;
  return (
    <>
      <PageHead title={x.title} lead={x.lead} />
      <section className="wrap grid gap-12 pb-20 md:grid-cols-12 md:gap-16">
        <div className="md:order-2 md:col-span-5">
          <div className="md:sticky md:top-24">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Parallax><Photo slot="doctor" lang={lang} fill priority sizes="(min-width:768px) 40vw, 100vw" /></Parallax>
            </div>
            <p className="mt-3 text-sm text-muted"><Txt s={x.photoCaption} /></p>
            <p className="mt-1 text-sm"><Txt s={x.quals} /></p>
          </div>
        </div>
        <div className="space-y-6 text-lg md:order-1 md:col-span-7">
          {x.paras.map((p) => <p key={p}>{p}</p>)}
          <Reveal>
            <blockquote className="my-12 border-l-2 border-gold pl-6 font-display text-2xl md:text-4xl" style={{ lineHeight: "var(--lh-h)" }}>{x.quotes[0]}</blockquote>
          </Reveal>
          <Reveal>
            <h2 className="text-3xl md:text-4xl">{x.themeTitle}</h2>
            {x.themeText.map((t) => <p key={t} className="mt-4 text-muted"><Txt s={t} /></p>)}
          </Reveal>
        </div>
      </section>
      <section className="relative isolate overflow-hidden bg-[#0B1E21] text-[#F3F5F0]">
        <div className="absolute inset-0 -z-10 opacity-60"><Parallax><Photo slot="backwater" lang={lang} fill dark sizes="100vw" /></Parallax></div>
        <Reveal className="sec wrap">
          <p className="max-w-3xl font-display text-3xl md:text-5xl" style={{ lineHeight: "var(--lh-h)" }}>{x.quotes[1]}</p>
        </Reveal>
      </section>
      <section className="sec wrap">
        <h2 className="text-3xl md:text-4xl">{x.numbersTitle}</h2>
        <ul className="mt-8 max-w-2xl">
          {x.numbers.map((n) => <li key={n} className="border-b border-line py-4 font-display text-xl md:text-2xl">{n}</li>)}
        </ul>
      </section>
    </>
  );
}
