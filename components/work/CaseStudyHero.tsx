'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, ChevronLeft } from 'lucide-react';
import { useCursor } from '@/components/layout/CustomCursor';
import { useTransitionRouter } from '@/components/layout/PageTransition';
import type { CaseStudy } from '@/types/index.ts';

interface CaseStudyHeroProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  const { expand, collapse } = useCursor();
  const { transitionTo } = useTransitionRouter();

  return (
    <>
      {/* TOP LAYOUT CONTROL AREA (Back button) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-8 pt-8 z-10 relative">
        <button
          onClick={() => transitionTo('/')}
          className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#7a7a7a] hover:text-[#c8f45e] transition duration-300 bg-transparent border-0 outline-none cursor-none"
          onMouseEnter={expand}
          onMouseLeave={collapse}
        >
          <ChevronLeft className="w-4 h-4 transition duration-300 group-hover:-translate-x-1" />
          <span>← Back to Work</span>
        </button>
      </div>

      {/* HERO BANNER BLOCK */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-16 relative" data-scroll-section>
        <div className="space-y-8">
          {/* Project Title displaying high-impact display Syne */}
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-[90px] uppercase text-[#f0f0f0] tracking-tighter leading-[0.9] max-w-5xl">
            {caseStudy.title}
          </h1>

          {/* Muted pills metadata underneath */}
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="px-5 py-2.5 border border-[#1e1e1e] bg-[#111111]/60 text-xs font-mono text-[#c8f45e] uppercase tracking-widest rounded-full">
              {caseStudy.type}
            </span>
            {caseStudy.tech.map((pill, i) => (
              <span key={i} className="px-5 py-2.5 border border-[#1e1e1e] bg-[#111111]/30 text-xs font-mono text-[#a3a3a3] uppercase tracking-widest rounded-full">
                {pill}
              </span>
            ))}
            <span className="px-5 py-2.5 border border-[#1e1e1e] bg-[#111111]/30 text-xs font-mono text-[#4a4a4a] uppercase tracking-widest rounded-full">
              YEAR: {caseStudy.year}
            </span>
          </div>
        </div>
      </section>

      {/* FULL PORT PARALLAX MOCKUP SCREENSHOT */}
      <section className="w-full relative px-6 md:px-12 lg:px-20 mb-20 overflow-hidden" data-scroll-section>
        <div 
          className="w-full h-[380px] sm:h-[550px] lg:h-[700px] relative border border-[#1e1e1e] rounded overflow-hidden"
          data-scroll
          data-scroll-speed="-0.8"
        >
          <Image
            src={caseStudy.image}
            alt={caseStudy.title}
            fill
            className="object-cover opacity-90 scale-110"
            referrerPolicy="no-referrer"
            priority
          />
          {/* Beautiful visual cover grid */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 uppercase font-mono text-[9px] tracking-[0.25em] text-[#4a4a4a]">
            SPECIFICATION_PREVIEW // GJG-{caseStudy.id.toUpperCase()}
          </div>
        </div>
      </section>

      {/* TWO-COLUMN METADATA CORE BAR */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-24 relative" data-scroll-section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-10 border-t border-b border-[#1e1e1e] bg-[#111111]/20 px-6 md:px-10 rounded">
          
          {/* Left Col: Labeled fields */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#4a4a4a] block">
                ROLE
              </span>
              <p className="font-sans text-xs md:text-sm font-semibold uppercase text-neutral-200">
                {caseStudy.role}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#4a4a4a] block">
                TIMELINE
              </span>
              <p className="font-sans text-xs md:text-sm font-semibold uppercase text-neutral-200">
                {caseStudy.timeline}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#4a4a4a] block">
                TECH STACK
              </span>
              <p className="font-mono text-xs text-neutral-300">
                {caseStudy.tech.join(', ')}
              </p>
            </div>
          </div>

          {/* Right Col: Lime links */}
          <div className="md:col-span-4 flex flex-row md:flex-col justify-start md:justify-center items-start md:items-end gap-6 border-t md:border-t-0 md:border-l border-[#1e1e1e] pt-6 md:pt-0 md:pl-10">
            {caseStudy.link !== 'GitHub' && (
              <a
                href={caseStudy.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs lg:text-sm font-bold uppercase tracking-widest text-[#c8f45e] hover:text-white transition duration-300 cursor-none"
                onMouseEnter={expand}
                onMouseLeave={collapse}
              >
                <span>LIVE SITE</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            <a
              href={caseStudy.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs lg:text-sm font-bold uppercase tracking-widest text-[#c8f45e] hover:text-white transition duration-300 cursor-none"
              onMouseEnter={expand}
              onMouseLeave={collapse}
            >
              <span>GITHUB REPO</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
