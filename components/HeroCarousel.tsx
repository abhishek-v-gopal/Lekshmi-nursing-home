"use client";

import { useState } from "react";
import Photo from "./Photo";
import Parallax from "./Parallax";
import images from "@/content/images.json";
import type { Lang } from "@/lib/i18n";

const slides = ["hero", "hospital", "paddy", "backwater"] as const;
// Autoplay advances when the .hero-progress animation (globals.css) ends,
// so pausing freezes the bar and reduced-motion users get no autoplay.

export default function HeroCarousel({ lang, labels }: {
  lang: Lang;
  labels: { previous: string; next: string; slide: string; pause: string; play: string };
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (i: number) => setActive((i + slides.length) % slides.length);
  const pad = (n: number) => String(n).padStart(2, "0");
  const ctrl = "tap justify-center rounded-full border border-white/25 bg-white/10 text-[#F3F5F0] backdrop-blur-md transition hover:bg-white/25";

  return (
    <>
      <div className="absolute inset-0 -z-10" aria-roledescription="carousel" aria-label={labels.slide}>
        {slides.map((slot, i) => (
          <div key={slot} aria-hidden={active !== i}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${active === i ? "opacity-100" : "opacity-0"}`}>
            <Parallax>
              <div className={`absolute inset-0 ${active === i ? "hero-kb" : ""}`}>
                <Photo slot={slot} lang={lang} fill priority={i === 0} dark sizes="100vw" />
              </div>
            </Parallax>
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E21] via-[#0B1E21]/55 to-[#0B1E21]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E21]/70 via-[#0B1E21]/20 to-transparent" />
      </div>

      <div className="absolute right-5 top-6 z-10 flex flex-col items-end gap-3 md:right-8 md:top-8">
        <div className="flex items-center gap-2">
          <button type="button" className={ctrl} aria-label={labels.previous} onClick={() => go(active - 1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" className={ctrl} aria-label={paused ? labels.play : labels.pause} aria-pressed={paused} onClick={() => setPaused(!paused)}>
            {paused
              ? <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12-7.5z" fill="currentColor" /></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h3.5v16H7zM13.5 4H17v16h-3.5z" fill="currentColor" /></svg>}
          </button>
          <button type="button" className={ctrl} aria-label={labels.next} onClick={() => go(active + 1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[#F3F5F0]/85">
          <span aria-live={paused ? "polite" : "off"}>{pad(active + 1)} / {pad(slides.length)}</span>
          <div className="flex gap-1.5">
            {slides.map((slot, i) => (
              <button key={slot} type="button" onClick={() => go(i)} aria-label={`${labels.slide} ${i + 1}`} aria-current={active === i}
                className="group flex h-6 items-center">
                <span className="relative block h-[3px] w-8 overflow-hidden rounded-full bg-white/30 transition group-hover:bg-white/50 md:w-10">
                  {i < active && <span className="absolute inset-0 bg-[#D4AF5F]" />}
                  {i === active && (
                    <span key={active} className="hero-progress absolute inset-0 origin-left bg-[#D4AF5F]"
                      style={{ animationPlayState: paused ? "paused" : "running" }}
                      onAnimationEnd={() => go(active + 1)} />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
        <p className="hidden text-right text-xs text-[#F3F5F0]/70 sm:block">{images[slides[active]].alt[lang]}</p>
      </div>
    </>
  );
}
