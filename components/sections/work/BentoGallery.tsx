'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import gsap from '@/lib/gsap';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useCursor } from '@/components/layout/CustomCursor';
import { useTransitionRouter } from '@/components/layout/PageTransition';
import { useScrollContext } from '@/components/layout/ScrollProvider';
import { projects } from '@/lib/projects';

// ─── Image mapping ───────────────────────────────────────────────────────────

const IMAGE_MAP: Record<string, string> = {
  'interactive-dsa': '3.png',
  'snapnotes-ai': '2.png',
  'mr-and-ms-umak-tabulation-system': '7.png',
  'resume-ai-analyzer': '5.png',
  'logistics-management-system': '4.png',
  'web-based-photobooth-application': '6.png',
  'ccis-ticket-automation-system': '8.png',
};

function imagePath(id: string): string | null {
  const file = IMAGE_MAP[id];
  return file ? `/selected-work/${file}` : null;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function BentoGallery() {
  const isMobile = useIsMobile();
  const { expand, collapse } = useCursor();
  const { transitionTo } = useTransitionRouter();
  const { scroll } = useScrollContext();

  // ── GSAP fade-in animation ─────────────────────────────────────────────────
  useEffect(() => {
    if (!scroll) return;

    const scrollEl = document.querySelector('[data-scroll-container]');
    if (!scrollEl) return;

    const ctx = gsap.context(() => {
      const items = document.querySelectorAll('.bento-item');
      if (!items.length) return;

      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.85, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '#bento-section',
            scroller: '[data-scroll-container]',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [scroll]);

  // ── Mobile bail-out ────────────────────────────────────────────────────────
  if (isMobile) return null;

  const firstImageIdx = projects.findIndex((p) => imagePath(p.id) !== null);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Scoped CSS — lives exclusively inside this component */}
      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 32.5vw);
          grid-template-rows: repeat(4, 23vh);
          justify-content: center;
          align-content: center;
          gap: 1vh;
          width: 100%;
          height: 100%;
        }
        .bento-item {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          border-left: 0px solid #c8f45e;
          transition: border-left-width 0.3s ease;
        }
        .bento-item:hover {
          border-left-width: 4px;
        }
        .bento-item--1 { grid-area: 1 / 1 / 3 / 2; }
        .bento-item--2 { grid-area: 1 / 2 / 2 / 3; }
        .bento-item--3 { grid-area: 2 / 2 / 4 / 3; }
        .bento-item--4 { grid-area: 1 / 3 / 2 / 4; }
        .bento-item--5 { grid-area: 2 / 3 / 4 / 4; }
        .bento-item--6 { grid-area: 3 / 1 / 5 / 2; }
        .bento-item--7 { grid-area: 4 / 2 / 5 / 4; }
        .bento-overlay {
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
        .bento-item:hover .bento-overlay {
          opacity: 1;
        }
      `}</style>

      <section
        id="bento-section"
        data-scroll-section
        style={{ background: '#0a0a0a', padding: '5rem 0' }}
      >
        <div className="bento-grid">
          {projects.map((proj, idx) => {
            const src = imagePath(proj.id);
            return (
              <div
                key={proj.id}
                className={`bento-item bento-item--${idx + 1}`}
                onClick={() => transitionTo(`/work/${proj.id}`)}
                onMouseEnter={expand}
                onMouseLeave={collapse}
                style={{ cursor: 'none' }}
              >
                {/* Image or fallback */}
                {src ? (
                  <Image
                    src={src}
                    alt={proj.title}
                    fill
                    className="object-cover"
                    sizes="33vw"
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
                <div className="bento-overlay">
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
                          <span
                            key={i}
                            className="px-2.5 py-0.5 border border-[#1e1e1e] bg-[#161616] text-[#c8f45e] text-[9px] font-mono rounded-full uppercase tracking-wider"
                          >
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
      </section>
    </>
  );
}
