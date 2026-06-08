'use client';

import React, { useEffect } from 'react';
import gsap from '@/lib/gsap';
import { useCursor } from '@/components/layout/CustomCursor';
import { achievements } from '@/lib/achievements';

export default function AchievementsSection() {
  const { expand, collapse } = useCursor();

  useEffect(() => {
    const scrollEl = document.querySelector('[data-scroll-container]');
    if (!scrollEl) return;

    // Heading reveal
    const headings = document.querySelectorAll('#achievements .reveal-heading');
    headings.forEach((h) => {
      gsap.fromTo(h,
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 40 },
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: h, scroller: scrollEl, start: 'top 85%', toggleActions: 'play none none none' } }
      );
    });

    // Row cards reveal
    gsap.fromTo('#achievements .gsap-achievement-row',
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: '#achievements', scroller: scrollEl, start: 'top 80%', toggleActions: 'play none none none' } }
    );
  }, []);

  return (
    <section
      id="achievements"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative border-b border-[#1e1e1e] w-full bg-[#0a0a0a]"
      data-scroll-section
      data-scroll
      data-scroll-call="achievements"
    >
      {/* Large dynamic muted background watermark behind the content */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none select-none z-0 flex items-center justify-center">
        <div className="font-display font-extrabold text-[#f0f0f0] text-[40vw] leading-none">
          05
        </div>
      </div>

      <div className="max-w-7xl mx-auto z-10 relative space-y-16">
        
        {/* Header portion */}
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c8f45e] font-mono font-medium block">
            — 05 — Recognitions / Achievements
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] xl:text-[54px] uppercase text-[#f0f0f0] tracking-tighter leading-none reveal-heading">
            Earned, Not Given
          </h2>
        </div>

        {/* Tri-card flex layout for horizontal cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {achievements.map((rec, i) => (
            <div
              key={i}
              className="group gsap-achievement-row border border-[#1e1e1e] hover:border-[#c8f45e] bg-[#111111]/30 p-8 rounded flex flex-col justify-between hover:shadow-[0_0_20px_rgba(200,244,94,0.1)] transition-all duration-300 relative overflow-hidden cursor-none"
              onMouseEnter={expand}
              onMouseLeave={collapse}
            >
              
              {/* Styling stamp badge layout */}
              <div className="flex justify-between items-start mb-10">
                <div className="w-12 h-12 flex items-center justify-center border-2 border-[#c8f45e] text-[#c8f45e] rounded-full font-mono text-xs font-bold tracking-wide bg-[#0a0a0a] group-hover:shadow-[0_0_15px_#c8f45e] transition duration-300">
                  {rec.badge}
                </div>
                
                {/* Tiny watermark */}
                <span className="font-mono text-[9px] text-[#2c2c2c] group-hover:text-[#c8f45e]/20 transition-colors duration-300">
                  HON_05_00{i+1}
                </span>
              </div>

              {/* Text details content */}
              <div className="space-y-4">
                <span className="text-[#c8f45e] font-mono font-extrabold tracking-widest text-sm uppercase block">
                  {rec.result}
                </span>

                <h3 className="font-display font-bold text-xl uppercase text-[#f0f0f0] tracking-wide leading-tight group-hover:text-[#c8f45e] transition-colors duration-300">
                  {rec.competition}
                </h3>

                <p className="font-sans text-xs text-neutral-400 font-medium">
                  {rec.org}
                </p>

                <p className="font-sans text-xs text-[#7a7a7a] group-hover:text-neutral-400 transition-colors duration-300 leading-relaxed border-t border-[#1e1e1e]/60 pt-4 mt-2">
                  {rec.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Centered line paragraph context */}
        <p className="text-center font-sans italic text-neutral-500 text-xs sm:text-sm tracking-wide pt-6 transition hover:text-neutral-300">
          &ldquo;Competing not for the trophy — but to prove the work speaks.&rdquo;
        </p>

      </div>
    </section>
  );
}
