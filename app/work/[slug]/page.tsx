'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ScrollProvider from '@/components/layout/ScrollProvider';
import CaseStudyHero from '@/components/work/CaseStudyHero';
import CaseStudyContent from '@/components/work/CaseStudyContent';
import NextProject from '@/components/work/NextProject';
import { caseStudiesData } from '@/lib/projects';

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const caseStudy = caseStudiesData[slug];

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center font-mono text-[#c8f45e]">
        <span>CASE STUDY NOT FOUND</span>
      </div>
    );
  }

  return (
    <ScrollProvider>
      <div data-scroll-container className="relative bg-[#0a0a0a] w-full pt-12">
        <CaseStudyHero caseStudy={caseStudy} />
        <CaseStudyContent caseStudy={caseStudy} />
        <NextProject caseStudyId={caseStudy.id} />
      </div>
    </ScrollProvider>
  );
}
