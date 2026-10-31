"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";

type Labels = { badge: string; title: string; text: string; cta: string; details: string; close: string };

// Turns a YouTube watch / youtu.be / live link into an embeddable player URL; other links just open in a new tab.
const youtubeEmbed = (url: string) => {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|live\/|embed\/))([\w-]{11})/);
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1` : null;
};

export default function LivePopup({ lang, url, until, labels }: { lang: Lang; url: string; until: string; labels: Labels }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [playing, setPlaying] = useState(false);
  const embed = url ? youtubeEmbed(url) : null;

  useEffect(() => {
    if (Date.now() > Date.parse(until)) return;
    try { if (sessionStorage.getItem("live-popup") === "closed") return; } catch {}
    const t = window.setTimeout(() => ref.current?.showModal(), 1200);
    return () => window.clearTimeout(t);
  }, [until]);

  const close = () => {
    ref.current?.close();
    setPlaying(false);
    try { sessionStorage.setItem("live-popup", "closed"); } catch {}
  };

  return (
    <dialog ref={ref} onCancel={close} onClick={(e) => e.target === ref.current && close()} aria-labelledby="live-title"
      className="live-pop m-auto w-[min(34rem,calc(100vw-2rem))] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0B1E21] p-0 text-[#F3F5F0] shadow-2xl backdrop:bg-[#0B1E21]/70 backdrop:backdrop-blur-sm">
      {playing && embed ? (
        <div className="aspect-video w-full bg-black">
          <iframe src={embed} title={labels.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="h-full w-full border-0" />
        </div>
      ) : (
        <div aria-hidden="true" className="h-1.5 bg-gradient-to-r from-[#2F6B4F] via-[#D4AF5F] to-[#2F6B4F]" />
      )}
      <div className="relative p-7 md:p-9">
        <button type="button" onClick={close} aria-label={labels.close}
          className="tap absolute right-3 top-3 justify-center rounded-full text-[#F3F5F0]/70 transition hover:bg-white/10 hover:text-[#F3F5F0]">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <p className="inline-flex items-center gap-2 rounded-full bg-[#C8372D] px-3 py-1 text-xs font-bold tracking-[0.16em] text-white">
          <span aria-hidden="true" className="live-dot h-2 w-2 rounded-full bg-white" />{labels.badge}
        </p>
        <h2 id="live-title" className="mt-5 pr-8 text-3xl md:text-4xl">{labels.title}</h2>
        <p className="mt-4 text-[#DCE4DF]">{labels.text}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          {embed ? (
            !playing && <button type="button" onClick={() => setPlaying(true)} className="btn btn-gold">{labels.cta}</button>
          ) : url ? (
            <a href={url} target="_blank" rel="noopener noreferrer" onClick={close} className="btn btn-gold">{labels.cta}</a>
          ) : null}
          <Link href={`/${lang}/naveenam`} onClick={close} className={`btn ${url ? "btn-ghost" : "btn-gold"}`}>{labels.details}</Link>
        </div>
      </div>
    </dialog>
  );
}
