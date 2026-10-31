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
  return pageMeta(lang, "contact", "/contact");
}
export default async function Contact({ params }: P) {
  const lang = (await params).lang as Lang;
  const d = getDict(lang);
  const x = d.contact;
  return (
    <>
      <PageHead title={x.title} lead={x.lead} />
      <section className="wrap grid gap-6 pb-16 md:grid-cols-2 md:gap-8">
        <div className="card p-7 md:p-9">
          <h2 className="text-2xl md:text-3xl">{x.hoursTitle}</h2>
          <div className="mt-4"><Hours d={d} /></div>
        </div>
        <div className="card space-y-10 p-7 md:p-9">
          <div>
            <h2 className="text-2xl md:text-3xl">{x.addressTitle}</h2>
            <p className="mt-3">{shared.address || <Txt s={x.address} />}</p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl">{x.phoneTitle}</h2>
            <p className="mt-3">{shared.phone ? <a className="tap link" href={`tel:${shared.phone.replace(/\s/g, "")}`}>{shared.phone}</a> : <Txt s={x.phone} />}</p>
          </div>
        </div>
      </section>
      <section className="wrap pb-16">
        <h2 className="text-2xl md:text-3xl">{x.mapTitle}</h2>
        <div className="mt-6 aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border border-line bg-surface md:aspect-[16/7]">
          {shared.mapEmbedUrl ? (
            <iframe src={shared.mapEmbedUrl} title={x.mapTitle} loading="lazy" className="h-full w-full border-0" />
          ) : (
            <div className="ph-photo flex h-full items-center justify-center p-6 text-center"><Txt s={x.mapMissing} /></div>
          )}
        </div>
      </section>
      <section className="bg-[#0B1E21] text-[#F3F5F0]">
        <div className="sec wrap">
          <h2 className="text-3xl md:text-4xl">{x.emergencyTitle}</h2>
          <p className="mt-4 text-lg text-[#DCE4DF]">{shared.phone ? <a className="tap link font-display text-2xl text-[#F3F5F0] md:text-3xl" href={`tel:${shared.phone.replace(/\s/g, "")}`}>{shared.phone}</a> : <Txt s={x.emergencyText} />}</p>
        </div>
      </section>
    </>
  );
}
