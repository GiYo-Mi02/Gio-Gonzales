'use client';

import React, { useEffect } from 'react';
import gsap, { ScrollTrigger } from '@/lib/gsap';
import type { CaseStudy } from '@/types/index.ts';

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyContent({ caseStudy }: CaseStudyContentProps) {
  useEffect(() => {
    const scrollEl = document.querySelector('[data-scroll-container]');
    if (!scrollEl) return;

    // Staggered entrance animation for Process Steps
    const processItems = document.querySelectorAll('.gsap-step-card');
    if (processItems.length > 0) {
      gsap.fromTo(processItems,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#process-section',
            scroller: scrollEl,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Feature elements grid fade
    const featureItems = document.querySelectorAll('.gsap-feature-card');
    if (featureItems.length > 0) {
      gsap.fromTo(featureItems,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#features-section',
            scroller: scrollEl,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // General fade sections
    const fadeBlocks = document.querySelectorAll('.gsap-fade-block');
    fadeBlocks.forEach((block) => {
      gsap.fromTo(block,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: block,
            scroller: scrollEl,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    ScrollTrigger.refresh();
  }, [caseStudy]);

  return (
    <>
      {/* 1. THE PROBLEM SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-28 relative gsap-fade-block" data-scroll-section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c8f45e] block mb-2">
              ROOT ANALYSIS
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase text-[#f0f0f0] tracking-tighter">
              The Problem
            </h2>
          </div>

          <div className="lg:col-span-8">
            <p className="text-neutral-400 font-sans text-base sm:text-lg leading-relaxed max-w-3xl">
              {caseStudy.problem}
            </p>
          </div>

        </div>
      </section>

      {/* 2. HOW I BUILT IT SECTION */}
      <section id="process-section" className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-28 relative" data-scroll-section>
        <div className="border-t border-[#1e1e1e] pt-16">
          <div className="mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c8f45e] block mb-2">
              PROCESS &amp; LIFECYCLES
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase text-[#f0f0f0] tracking-tighter">
              How I Built It
            </h2>
          </div>

          {/* Stepped process list maps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {caseStudy.process.map((step, idx) => (
              <div 
                key={idx}
                className="gsap-step-card p-8 border border-[#1e1e1e] bg-[#111111]/30 hover:border-[#c8f45e]/20 transition-all duration-300 rounded relative group"
              >
                <div className="font-display font-extrabold text-6xl text-[#1a1a1a] group-hover:text-[#c8f45e]/10 tracking-tighter absolute top-4 right-6 transition duration-300">
                  {step.number}
                </div>
                <div className="space-y-4 relative z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#c8f45e]">
                    Step {step.number}
                  </span>
                  <h3 className="font-display font-bold text-lg uppercase text-[#f0f0f0] tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. KEY FEATURES SECTION */}
      <section id="features-section" className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-28 relative" data-scroll-section>
        <div className="border-t border-[#1e1e1e] pt-16">
          <div className="mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c8f45e] block mb-2">
              SYSTEM CORE FEATURES
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase text-[#f0f0f0] tracking-tighter">
              Key Features
            </h2>
          </div>

          {/* Grid display layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {caseStudy.features.map((feat, idx) => (
              <div 
                key={idx}
                className="p-8 border border-[#1e1e1e] bg-[#111111]/20 space-y-4 rounded hover:border-[#c8f45e]/15 hover:bg-[#111111]/30 transition duration-300 gsap-feature-card"
              >
                <div className="p-3 w-fit border border-[#1e1e1e] rounded bg-[#111111]/50 mb-2 transition">
                  {feat.icon}
                </div>
                <h3 className="font-display font-bold text-base uppercase text-[#f0f0f0] tracking-wide">
                  {feat.name}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. WHAT I LEARNED SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-32 relative gsap-fade-block" data-scroll-section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-[#1e1e1e] pt-16">
          
          <div className="lg:col-span-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c8f45e] block mb-2">
              CRITICAL INTROSPECTION
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase text-[#f0f0f0] tracking-tighter">
              What I Learned
            </h2>
          </div>

          <div className="lg:col-span-8">
            <p className="text-neutral-400 font-sans italic text-base sm:text-lg leading-relaxed max-w-3xl">
              &ldquo;{caseStudy.learned}&rdquo;
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
