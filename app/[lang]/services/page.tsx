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
  return pageMeta(lang, getDict(lang).nav.services, "/services");
}
export default async function Services({ params }: P) {
  const lang = (await params).lang as Lang;
  const x = getDict(lang).services;
  return (
    <>
      <PageHead title={x.title} lead={x.lead} />
      <section className="wrap pb-12">
        <div className="mb-16 max-w-3xl overflow-hidden rounded-[1.5rem] shadow-xl shadow-black/10"><Photo slot="hospital" lang={lang} ratio="3 / 2" sizes="(min-width:768px) 48rem, 100vw" /></div>
        <ul className="grid gap-6 md:grid-cols-2">
          {x.items.map((i) => (
            <li key={i.title} className="card p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 md:p-9">
              <span aria-hidden="true" className="mb-5 block h-1 w-10 rounded-full bg-gold" />
              <h2 className="text-2xl md:text-3xl">{i.title}</h2>
              <p className="mt-3 text-muted"><Txt s={i.text} /></p>
            </li>
          ))}
        </ul>
      </section>
      <section className="sec wrap">
        <p className="max-w-3xl border-l-2 border-gold pl-6 font-display text-2xl md:text-4xl" style={{ lineHeight: "var(--lh-h)" }}>{x.closing}</p>
      </section>
    </>
  );
}
