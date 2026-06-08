'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useCursor } from '@/components/layout/CustomCursor';
import { useTransitionRouter } from '@/components/layout/PageTransition';
import { caseStudiesData, projectKeys } from '@/lib/projects';

interface NextProjectProps {
  caseStudyId: string;
}

export default function NextProject({ caseStudyId }: NextProjectProps) {
  const { expand, collapse } = useCursor();
  const { transitionTo } = useTransitionRouter();

  const currentIndex = projectKeys.indexOf(caseStudyId);
  const nextIndex = (currentIndex + 1) % projectKeys.length;
  const nextSlug = projectKeys[nextIndex];
  const nextProject = caseStudiesData[nextSlug];

  return (
    <>
      {/* NEXT PROJECT TRIGGER FLOW BAR */}
      <section className="border-t border-[#1e1e1e] py-16 px-6 md:px-12 lg:px-20 relative bg-[#0a0a0a]" data-scroll-section>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#4a4a4a] block">
              UP NEXT
            </span>
            <h4 className="font-display font-bold text-lg sm:text-xl uppercase text-neutral-400">
              {nextProject.title}
            </h4>
          </div>

          <button
            onClick={() => transitionTo(`/work/${nextProject.id}`)}
            className="group flex items-center gap-3 bg-[#c8f45e] hover:bg-white text-[#0a0a0a] font-mono tracking-widest text-xs font-bold uppercase px-8 py-4 rounded transition duration-300 cursor-none border-none outline-none"
            onMouseEnter={expand}
            onMouseLeave={collapse}
          >
            <span>Next Project</span>
            <ArrowRight className="w-4 h-4 transition duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1e1e1e] py-8 px-6 md:px-12 lg:px-20 bg-[#0a0a0a]" data-scroll-section>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[#4a4a4a]">
          <div>
            © 2025 Gio Joshua Gonzales. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 uppercase tracking-widest text-[#5e5e5e]">
            <span>Handcrafted from Philippines</span>
          </div>
        </div>
      </footer>
    </>
  );
}
