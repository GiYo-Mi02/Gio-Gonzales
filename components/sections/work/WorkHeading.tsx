'use client';

import { useEffect } from 'react';
import gsap, { ScrollTrigger } from '@/lib/gsap';
import MobileGallery from '@/components/sections/work/MobileGallery';
import { useScrollContext } from '@/components/layout/ScrollProvider';

export default function WorkHeading() {
  const { scroll } = useScrollContext();

  useEffect(() => {
    if (!scroll) return;

    const ctx = gsap.context(() => {
      // Label fade-in
      gsap.fromTo(
        '.work-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.work-header-trigger',
            scroller: '[data-scroll-container]',
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Clip-path headline reveal
      gsap.fromTo(
        '.work-title-line',
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 40 },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.work-header-trigger',
            scroller: '[data-scroll-container]',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [scroll]);

  return (
    <section
      id="work"
      data-scroll-section
      data-scroll
      data-scroll-call="work"
      style={{ background: '#0a0a0a', paddingTop: '8rem', paddingBottom: '5rem' }}
      className="relative w-full"
    >
      {/* Header */}
      <div className="work-header-trigger max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative">
        <span className="work-label font-sans text-xs uppercase tracking-[0.25em] text-[#7a7a7a] block mb-2">
          02 — Selected Work
        </span>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase text-[#f0f0f0] tracking-tighter leading-none">
          <span className="work-title-line block overflow-hidden">Projects That</span>
          <span className="work-title-line block overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-[#c8f45e] to-[#99cf20]">
            Speak For Themselves
          </span>
        </h2>
      </div>

      {/* Mobile gallery lives inside this section so it stays out of the pinned bento section */}
      <MobileGallery />
    </section>
  );
}
