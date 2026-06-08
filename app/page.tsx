'use client';

import React, { useState, useEffect } from 'react';
import ScrollProvider from '@/components/layout/ScrollProvider';
import Navbar from '@/components/layout/Navbar';
import IntroSequence from '@/components/intro/IntroSequence';
import HeroSection from '@/components/sections/HeroSection';
import Marquee from '@/components/layout/Marquee';
import AboutSection from '@/components/sections/AboutSection';
import WorkSection from '@/components/sections/WorkSection';
import ExpertiseSection from '@/components/sections/ExpertiseSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import { useIntroPlayed } from '@/hooks/useIntroPlayed';

export default function Home() {
  const { hasPlayed, markPlayed } = useIntroPlayed();
  const [mounted, setMounted] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (hasPlayed) {
      setIntroFinished(true);
    }
  }, [hasPlayed]);

  if (!mounted) {
    return <div className="min-h-screen bg-[#0a0a0a]" />;
  }

  return (
    <>
      {/* Cinematic Intro sequence */}
      {!introFinished && (
        <IntroSequence 
          onComplete={() => {
            markPlayed();
            setIntroFinished(true);
          }} 
        />
      )}

      {/* Main scrolling page container */}
      <ScrollProvider>
        <div 
          data-scroll-container 
          className={`relative bg-[#0a0a0a] w-full transition-opacity duration-700 ${
            introFinished ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Fixed navbar */}
          <Navbar />

          {/* Sections assembly */}
          <HeroSection />
          <Marquee />
          <AboutSection />
          <WorkSection />
          <ExpertiseSection />
          <AchievementsSection />
          <ContactSection />
          <Footer />
        </div>
      </ScrollProvider>
    </>
  );
}
