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
  return pageMeta(lang, getDict(lang).nav.naveenam, "/naveenam");
}
export default async function Naveenam({ params }: P) {
  const lang = (await params).lang as Lang;
  const x = getDict(lang).naveenam;
  return (
    <>
      <PageHead title={x.title} lead={x.lead} />
      <section className="wrap grid gap-12 pb-20 md:grid-cols-2 md:gap-20">
        <div>
          <dl>
            {x.details.map((i) => (
              <div key={i.k} className="flex justify-between gap-6 border-b border-line py-4">
                <dt className="text-muted">{i.k}</dt>
                <dd className="font-display text-xl"><Txt s={i.v} /></dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-muted"><Txt s={x.about} /></p>
        </div>
        <div className="card p-8 md:p-12">
          <h2 className="text-3xl">{x.rsvpTitle}</h2>
          <p className="mt-4 text-muted">{x.rsvpText}</p>
          <div className="mt-8">
            <a href={x.rsvpUrl} target="_blank" rel="noopener noreferrer" className="btn">{x.rsvpCta}</a>
          </div>
        </div>
      </section>
      <div className="wrap pb-24"><div className="overflow-hidden rounded-[1.5rem]"><Photo slot="doctorWide" lang={lang} ratio="3 / 2" sizes="(min-width:1024px) 64rem, 100vw" /></div></div>
    </>
  );
}
