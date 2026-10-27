"use client";
import { useEffect, useRef } from "react";
// Place inside a relative, overflow-hidden parent. Moves gently with scroll; off when reduced motion is set.
export default function Parallax({ children, speed = 0.12 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    const parent = el.parentElement!;
    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = parent.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const max = r.height * 0.12;
        el.style.transform = `translate3d(0,${Math.max(-max, Math.min(max, -r.top * speed))}px,0)`;
      });
    };
    run();
    addEventListener("scroll", run, { passive: true });
    return () => { removeEventListener("scroll", run); cancelAnimationFrame(raf); };
  }, [speed]);
  return <div ref={ref} className="absolute inset-x-0 -top-[12%] h-[124%] will-change-transform">{children}</div>;
}
