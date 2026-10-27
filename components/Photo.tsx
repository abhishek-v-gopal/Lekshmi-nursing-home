import Image from "next/image";
import images from "@/content/images.json";
import type { Lang } from "@/lib/i18n";

export default function Photo({ slot, lang, ratio = "4 / 5", fill, priority, dark, sizes = "(min-width:1024px) 50vw, 100vw" }: {
  slot: keyof typeof images; lang: Lang; ratio?: string; fill?: boolean; priority?: boolean; dark?: boolean; sizes?: string;
}) {
  const s = images[slot];
  const alt = s.alt[lang];
  return (
    <div className={`${fill ? "absolute inset-0" : "relative w-full"} overflow-hidden ${dark ? "bg-[#16373B]" : "bg-surface"}`}
         style={fill ? undefined : { aspectRatio: ratio }}>
      {s.src ? (
        <Image src={s.src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      ) : (
        <div role="img" aria-label={alt} className={`ph-photo flex h-full w-full items-end p-6 text-sm ${dark ? "text-[#BFD0CB]" : "text-muted"}`}>
          Photo slot “{slot}”: {s.hint}
        </div>
      )}
    </div>
  );
}
