'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from '@/lib/gsap';
import { useCursor } from '@/components/layout/CustomCursor';
import { achievements } from '@/lib/achievements';
import { useScrollContext } from '@/components/layout/ScrollProvider';
import type { Achievement } from '@/types/index';

export default function AchievementsSection() {
  const { expand, collapse } = useCursor();
  const { scroll } = useScrollContext();
  const [mounted, setMounted] = useState(false);
  
  // Modal states
  const [isOpen, setIsOpen] = useState(false);
  const [activeRec, setActiveRec] = useState<Achievement | null>(null);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const openModal = (rec: Achievement) => {
    setActiveRec(rec);
    // Use setTimeout to allow state propagation before triggering open transitions
    setTimeout(() => {
      setIsOpen(true);
      setCurrentImgIdx(0);
    }, 20);
    scroll?.stop();
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setActiveRec(null);
      scroll?.start();
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
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
                onClick={() => openModal(rec)}
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

      {/* Portal Modal */}
      {mounted && activeRec && createPortal(
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-opacity duration-300 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeModal}
        >
          {/* Custom style for scrollbars inside the modal */}
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
              display: block !important;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #1e1e1e;
              border-radius: 2px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #c8f45e;
            }
          `}</style>

          <div
            className={`w-full max-w-5xl h-[85vh] md:h-[600px] bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-12 transform transition-all duration-300 ${
              isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Media Column */}
            <div className="flex-shrink-0 h-[45%] md:h-full md:col-span-7 bg-[#070707] flex items-center justify-center relative select-none overflow-hidden">
              {activeRec.youtubeEmbed ? (
                <div className="w-full h-full p-4 flex items-center justify-center">
                  <iframe
                    src={activeRec.youtubeEmbed}
                    title={activeRec.competition}
                    className="w-full h-full border-0 rounded-lg shadow-lg aspect-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : activeRec.images && activeRec.images.length > 0 ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={activeRec.images[currentImgIdx]}
                    alt={activeRec.competition}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                    className="object-contain"
                  />

                  {/* Navigation Arrows (if > 1 image) */}
                  {activeRec.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImgIdx((prev) => (prev === 0 ? activeRec.images!.length - 1 : prev - 1));
                        }}
                        className="absolute left-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-[#1e1e1e] text-neutral-400 hover:text-[#c8f45e] hover:border-[#c8f45e] transition duration-300 z-10 cursor-none"
                        onMouseEnter={expand}
                        onMouseLeave={collapse}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImgIdx((prev) => (prev === activeRec.images!.length - 1 ? 0 : prev + 1));
                        }}
                        className="absolute right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-[#1e1e1e] text-neutral-400 hover:text-[#c8f45e] hover:border-[#c8f45e] transition duration-300 z-10 cursor-none"
                        onMouseEnter={expand}
                        onMouseLeave={collapse}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Indicators / Dot pagination */}
                  {activeRec.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/60 px-3 py-1.5 rounded-full border border-white/5">
                      {activeRec.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImgIdx(idx);
                          }}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-none ${
                            currentImgIdx === idx ? 'bg-[#c8f45e] w-3.5' : 'bg-neutral-600 hover:bg-neutral-400'
                          }`}
                          onMouseEnter={expand}
                          onMouseLeave={collapse}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {/* Right Information Column */}
            <div className="flex-1 overflow-hidden flex flex-col p-6 md:p-8 bg-[#0d0d0d] justify-between border-t md:border-t-0 md:border-l border-[#1e1e1e] md:col-span-5">
              
              {/* Header Info */}
              <div className="border-b border-[#1e1e1e] pb-4 mb-4 flex-shrink-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 border border-[#c8f45e]/30 bg-[#c8f45e]/10 text-[#c8f45e] font-mono text-[10px] rounded uppercase font-bold tracking-wider">
                    {activeRec.badge}
                  </span>
                  <span className="text-[#c8f45e] font-mono text-[10px] tracking-widest uppercase font-extrabold">
                    {activeRec.result}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl uppercase text-[#f0f0f0] tracking-wide leading-tight">
                  {activeRec.competition}
                </h3>
                <p className="font-sans text-[11px] text-neutral-400 font-medium mt-1">
                  {activeRec.org}
                </p>
              </div>

              {/* Caption Description Scrollable Panel */}
              <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                {activeRec.whatIDid && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-[#c8f45e] tracking-[0.2em] block uppercase font-bold">
                      // What I Did
                    </span>
                    <p className="font-sans text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-normal">
                      {activeRec.whatIDid}
                    </p>
                  </div>
                )}

                {activeRec.howIDid && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-[#c8f45e] tracking-[0.2em] block uppercase font-bold">
                      // How I Did It
                    </span>
                    <p className="font-sans text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-normal">
                      {activeRec.howIDid}
                    </p>
                  </div>
                )}

                {activeRec.whatILearned && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-[#c8f45e] tracking-[0.2em] block uppercase font-bold">
                      // What I Learned
                    </span>
                    <p className="font-sans text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-normal">
                      {activeRec.whatILearned}
                    </p>
                  </div>
                )}
              </div>

              {/* Close Button / Bottom Area */}
              <div className="border-t border-[#1e1e1e]/60 pt-4 mt-4 flex items-center justify-between flex-shrink-0">
                <span className="font-mono text-[9px] text-neutral-600">
                  RECOGNITION STAMP: RM_2026
                </span>
                <button
                  onClick={closeModal}
                  className="text-xs uppercase font-mono tracking-widest text-neutral-400 hover:text-[#c8f45e] transition duration-300 bg-transparent border-0 outline-none p-2 cursor-none flex items-center gap-1.5"
                  onMouseEnter={expand}
                  onMouseLeave={collapse}
                >
                  Close <X className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
