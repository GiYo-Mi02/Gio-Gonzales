'use client';

import React, { useRef, useEffect } from 'react';
import gsap from '@/lib/gsap';
import { useCursor } from '@/components/layout/CustomCursor';

const TICKER_ITEMS = [
  'Next.js', 'TypeScript', 'React', 'Tailwind CSS',
  'Node.js', 'Supabase', 'MongoDB', 'AI Integration',
  'Full-Stack Engineer', 'Open to Work',
];

export default function Marquee() {
  const tickerRef  = useRef<HTMLDivElement | null>(null);
  const tweenRef   = useRef<gsap.core.Tween | null>(null);
  const { expand, collapse } = useCursor();

  useEffect(() => {
    if (!tickerRef.current) return;
    const listWidth = tickerRef.current.scrollWidth / 2;
    tweenRef.current = gsap.to(tickerRef.current, {
      x: -listWidth,
      duration: 35,
      repeat: -1,
      ease: 'none',
    });
    return () => { tweenRef.current?.kill(); };
  }, []);

  const handleHover = (paused: boolean) => {
    if (!tweenRef.current) return;
    paused ? tweenRef.current.pause() : tweenRef.current.play();
  };

  return (
    <section
      className="relative bg-[#111111] py-4 overflow-hidden border-b border-[#1e1e1e]"
      data-scroll-section
    >
      <div
        className="flex whitespace-nowrap leading-none cursor-grab active:cursor-grabbing hover:bg-[#0d0d0d] transition duration-300"
        onMouseEnter={() => { handleHover(true); expand(); }}
        onMouseLeave={() => { handleHover(false); collapse(); }}
      >
        <div
          ref={tickerRef}
          className="flex items-center gap-6 text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em] text-[#7a7a7a]"
        >
          {[1, 2, 3, 4, 5].map((_, idx) => (
            <span key={idx} className="flex items-center gap-6 shrink-0">
              {TICKER_ITEMS.map((item, i) => (
                <React.Fragment key={i}>
                  <span>{item}</span>
                  <span className="text-[#c8f45e]">•</span>
                </React.Fragment>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
