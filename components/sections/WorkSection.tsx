'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import gsap, { ScrollTrigger, Flip } from '@/lib/gsap';
import { useCursor } from '@/components/layout/CustomCursor';
import { useTransitionRouter } from '@/components/layout/PageTransition';
import { useScrollContext } from '@/components/layout/ScrollProvider';
import { projects } from '@/lib/projects';

export default function WorkSection() {
  const { expand, collapse } = useCursor();
  const { transitionTo } = useTransitionRouter();
  const { scroll } = useScrollContext();

  // Helper to map project IDs to correct images dynamically
  const getProjectImagePath = (projectId: string) => {
    const mapping: Record<string, string> = {
      'interactive-dsa': '3.png',
      'snapnotes-ai': '2.png',
      'mr-and-ms-umak-tabulation-system': '7.png',
      'resume-ai-analyzer': '5.png',
      'logistics-management-system': '4.png',
      'web-based-photobooth-application': '6.png',
      'ccis-ticket-automation-system': '8.png'
    };
    const fileName = mapping[projectId];
    if (fileName) {
      return `/selected-work/${fileName}`;
    }
    return null;
  };

  const firstImageIdx = projects.findIndex(p => getProjectImagePath(p.id) !== null);

  useEffect(() => {
    const scrollEl = document.querySelector('[data-scroll-container]');
    if (!scrollEl) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop layout: Bento Grid Flip to Expanded — pins #gallery-section
      mm.add('(min-width: 768px)', () => {
        const gallery = document.querySelector('.gallery--bento');
        const gallerySection = document.querySelector('#gallery-section');
        if (!gallery || !gallerySection) return;

        // Capture initial state before final class
        const state = Flip.getState('.gallery__item');

        // Apply final class to set target state
        gallery.classList.add('gallery--final');

        // Flip animation driven by scroll — pin the isolated gallery section
        Flip.from(state, {
          ease: 'none',
          absolute: true,
          scrollTrigger: {
            trigger: '#gallery-section',
            scroller: scrollEl,
            start: 'top top',
            end: '+=250%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        });

        // Keep Locomotive height in sync whenever ScrollTrigger refreshes
        // (e.g. after pin spacer is injected)
        ScrollTrigger.addEventListener('refresh', () => {
          if (scroll) scroll.update();
        });

        // Double-refresh: force Locomotive to remeasure after pin spacer lands
        setTimeout(() => {
          if (scroll) scroll.update();
          ScrollTrigger.refresh();
        }, 200);

      });

      // Mobile layout: Standard ScrollTrigger fade-up
      mm.add('(max-width: 767px)', () => {
        const mobileCards = document.querySelectorAll('.gsap-mobile-card');
        if (mobileCards.length > 0) {
          gsap.fromTo(mobileCards,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '#work',
                scroller: scrollEl,
                start: 'top 80%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      });

      // Header animations
      gsap.fromTo('.gallery-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.gallery-header-trigger',
            scroller: scrollEl,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo('.gallery-title-line',
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 40 },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.gallery-header-trigger',
            scroller: scrollEl,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, [scroll]);

  return (
    <>
      {/* ── GLOBAL GALLERY STYLES ─────────────────────────────────────── */}
      <style>{`
        .gallery-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .gallery--bento {
          display: grid;
          grid-template-columns: repeat(3, 32.5vw);
          grid-template-rows: repeat(4, 23vh);
          justify-content: center;
          align-content: center;
          gap: 1vh;
          width: 100%;
        }
        .gallery--bento.gallery--final {
          grid-template-columns: repeat(3, 100vw);
          grid-template-rows: repeat(4, 49.5vh);
          gap: 1vh;
        }
        .gallery__item {
          position: relative;
          overflow: hidden;
          border-left: 0px solid #c8f45e;
          transition: border-left-width 0.3s ease;
          border-radius: 4px;
        }
        .gallery__item:hover {
          border-left-width: 4px;
        }
        .gallery__item-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.5rem;
          z-index: 10;
        }
        .gallery__item:hover .gallery__item-overlay {
          opacity: 1;
        }
        .item-1 { grid-area: 1 / 1 / 3 / 2; }
        .item-2 { grid-area: 1 / 2 / 2 / 3; }
        .item-3 { grid-area: 2 / 2 / 4 / 3; }
        .item-4 { grid-area: 1 / 3 / 2 / 4; }
        .item-5 { grid-area: 2 / 3 / 3 / 4; }
        .item-6 { grid-area: 3 / 1 / 5 / 2; }
        .item-7 { grid-area: 4 / 2 / 5 / 4; }
      `}</style>

      {/* ── PIECE 1: HEADING SECTION ──────────────────────────────────── */}
      <section
        id="work"
        className="pt-32 pb-20 relative w-full bg-[#0a0a0a]"
        data-scroll-section
        data-scroll
        data-scroll-call="work"
      >
        {/* Section Header */}
        <div className="gallery-header-trigger max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative">
          <span className="gallery-label font-sans text-xs uppercase tracking-[0.25em] text-[#7a7a7a] block mb-2">
            02 — Selected Work
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase text-[#f0f0f0] tracking-tighter leading-none">
            <span className="gallery-title-line block overflow-hidden">Projects That</span>
            <span className="gallery-title-line block overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-[#c8f45e] to-[#99cf20]">
              Speak For Themselves
            </span>
          </h2>
        </div>

        {/* Mobile Stack layout — lives in Piece 1 to stay out of the pinned section */}
        <div className="block md:hidden px-6 space-y-12 mt-16">
          {projects.map((proj, idx) => {
            const imagePath = getProjectImagePath(proj.id);
            return (
              <div
                key={proj.id}
                onClick={() => transitionTo(`/work/${proj.id}`)}
                className="gsap-mobile-card border border-[#1e1e1e] bg-[#111111]/20 rounded overflow-hidden flex flex-col cursor-pointer"
              >
                {/* Image box */}
                <div className="w-full aspect-[16/10] relative bg-[#111111] border-b border-[#1e1e1e]">
                  {imagePath ? (
                    <Image
                      src={imagePath}
                      alt={proj.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority={idx === firstImageIdx}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-[#111111]">
                      <span className="font-display font-bold text-lg uppercase text-[#f0f0f0] max-w-xs tracking-tight">
                        {proj.title}
                      </span>
                      <span className="font-sans text-[10px] text-[#7a7a7a] uppercase tracking-widest mt-1 block">
                        No Preview Available
                      </span>
                    </div>
                  )}
                </div>

                {/* Text metadata */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] text-[#4a4a4a]">{proj.num}</span>
                    <span className="font-mono text-[10px] text-[#4a4a4a]">{proj.year}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl uppercase text-[#f0f0f0]">
                    {proj.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="px-2.5 py-0.5 border border-[#1e1e1e] bg-[#161616] text-[#c8f45e] text-[9px] font-mono rounded-full uppercase tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PIECE 2: GALLERY SECTION (PINNED, DESKTOP ONLY) ──────────── */}
      {/* No overflow-hidden here — that would clip the ScrollTrigger pin spacer */}
      <section
        id="gallery-section"
        className="hidden md:block relative w-full bg-[#0a0a0a]"
        data-scroll-section
      >
        {/* gallery-wrap keeps its own overflow:hidden via CSS */}
        <div className="gallery-wrap">
          <div className="gallery--bento">
            {projects.map((proj, idx) => {
              const imagePath = getProjectImagePath(proj.id);
              return (
                <div
                  key={proj.id}
                  onClick={() => transitionTo(`/work/${proj.id}`)}
                  className={`gallery__item item-${idx + 1} flex items-center justify-center relative w-full h-full cursor-none`}
                  onMouseEnter={expand}
                  onMouseLeave={collapse}
                >
                  {imagePath ? (
                    <Image
                      src={imagePath}
                      alt={proj.title}
                      fill
                      className="object-cover w-full h-full"
                      sizes="50vw"
                      priority={idx === firstImageIdx}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#111111] flex flex-col items-center justify-center p-6 text-center select-none">
                      <span className="font-display font-bold text-xl sm:text-2xl uppercase text-[#f0f0f0] max-w-xs tracking-tight">
                        {proj.title}
                      </span>
                      <span className="font-sans text-[10px] text-[#7a7a7a] uppercase tracking-widest mt-2 block">
                        No Preview Available
                      </span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="gallery__item-overlay">
                    <span className="font-mono text-[10px] text-[#7a7a7a] uppercase self-start">
                      {proj.num}
                    </span>
                    <div className="flex justify-between items-end w-full">
                      <div className="space-y-2 text-left">
                        <h3 className="font-display font-extrabold text-lg uppercase text-[#f0f0f0] tracking-wide leading-tight">
                          {proj.title}
                        </h3>
                        <div className="flex flex-wrap gap-1">
                          {proj.tech.map((t, i) => (
                            <span key={i} className="px-2.5 py-0.5 border border-[#1e1e1e] bg-[#161616] text-[#c8f45e] text-[9px] font-mono rounded-full uppercase tracking-wider">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-xl text-[#c8f45e] font-sans">→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PIECE 3: CTA SECTION ─────────────────────────────────────── */}
      {/* Completely outside the pinned section — pin spacer never touches this */}
      <div
        className="w-full bg-[#0a0a0a] border-b border-[#1e1e1e] py-16 flex flex-col items-center justify-center text-center gap-3"
        data-scroll-section
      >
        <a
          href="https://github.com/GiYo-Mi02"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex flex-col items-center gap-2 text-base uppercase tracking-[0.2em] font-mono text-[#c8f45e] hover:text-[#f0f0f0] transition duration-300 cursor-none"
          onMouseEnter={expand}
          onMouseLeave={collapse}
        >
          <span>See All Projects →</span>
          <span className="block h-[1.5px] w-0 bg-[#c8f45e] group-hover:bg-[#f0f0f0] group-hover:w-full transition-all duration-300" />
        </a>
        <span className="text-[10px] text-[#4a4a4a] font-mono tracking-widest uppercase">
          7 Projects — 2025
        </span>
      </div>
    </>
  );
}
