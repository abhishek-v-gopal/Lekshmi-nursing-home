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
  return pageMeta(lang, "story", "/story");
}
export default async function Story({ params }: P) {
  const lang = (await params).lang as Lang;
  const x = getDict(lang).story;
  return (
    <>
      <PageHead title={x.title} lead={x.lead} />
      <section className="wrap pb-20">
        <ol className="relative ml-2 max-w-2xl border-l border-line">
          {x.steps.map((s) => (
            <li key={s.title} className="relative pb-14 pl-8 md:pl-12">
              <span aria-hidden="true" className="absolute -left-[5px] top-3 h-2.5 w-2.5 rounded-full bg-gold" />
              <Reveal>
                <p className="text-muted"><Txt s={s.year} /></p>
                <h2 className="mt-1 text-2xl md:text-4xl">{s.title}</h2>
                <p className="mt-3 text-lg">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
      <div className="relative aspect-[16/9] max-h-[70svh] w-full overflow-hidden">
        <Parallax><Photo slot="paddy" lang={lang} fill sizes="100vw" /></Parallax>
      </div>
    </>
  );
}
