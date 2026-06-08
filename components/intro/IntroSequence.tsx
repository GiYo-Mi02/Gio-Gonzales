'use client';

import React, { useRef, useEffect } from 'react';
import gsap from '@/lib/gsap';
import { useIntroPlayed } from '@/hooks/useIntroPlayed';

interface IntroSequenceProps {
  onComplete: () => void;
}

const nameText = 'Gio Joshua Gonzales';
const nameLetters = nameText.split('');

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const { hasPlayed, markPlayed } = useIntroPlayed();

  const loaderRef            = useRef<HTMLDivElement | null>(null);
  const progressFillerRef    = useRef<HTMLDivElement | null>(null);
  const introRef             = useRef<HTMLElement | null>(null);
  const vignetteRef          = useRef<HTMLDivElement | null>(null);
  const buildingRef          = useRef<HTMLHeadingElement | null>(null);
  const digitalRef           = useRef<HTMLHeadingElement | null>(null);
  const productsRef          = useRef<HTMLHeadingElement | null>(null);
  const phase2Ref            = useRef<HTMLDivElement | null>(null);
  const nameContainerRef     = useRef<HTMLDivElement | null>(null);
  const svgLineRef           = useRef<SVGLineElement | null>(null);
  const subtitleRef          = useRef<HTMLDivElement | null>(null);
  const scrollHintRef        = useRef<HTMLDivElement | null>(null);
  const nameLetterRefs       = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (hasPlayed) {
      gsap.set(loaderRef.current, { display: 'none' });
      gsap.set(introRef.current, { display: 'none' });
      onComplete();
      return;
    }

    let isMounted = true;
    let introTimeline: gsap.core.Timeline | null = null;
    let handleWheel: ((e: WheelEvent) => void) | null = null;

    const completeIntro = () => {
      if (handleWheel) window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = '';
      markPlayed();
      gsap.set(introRef.current, { display: 'none' });
      onComplete();
    };

    const playMobileIntro = () => {
      const activeLetters = nameLetterRefs.current.filter((l): l is HTMLSpanElement => l !== null);
      activeLetters.forEach((l) => gsap.set(l, { opacity: 0, y: 20, scale: 0.9 }));

      gsap.timeline({
        onComplete: () => {
          gsap.to(introRef.current, {
            opacity: 0, duration: 0.5, ease: 'power2.inOut',
            onComplete: completeIntro,
          });
        },
      })
        .to(activeLetters, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.02, ease: 'power3.out' })
        .to(svgLineRef.current, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.3')
        .to(subtitleRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2');
    };

    const playDesktopIntro = () => {
      const activeLetters = nameLetterRefs.current.filter((l): l is HTMLSpanElement => l !== null);
      activeLetters.forEach((l) => {
        gsap.set(l, {
          x: gsap.utils.random(-300, 300),
          y: gsap.utils.random(-200, 200),
          rotation: gsap.utils.random(-90, 90),
          scale: 0, opacity: 0,
        });
      });

      const w = window.innerWidth;
      const scaleCap = w < 480 ? 2.5 : w < 768 ? 4 : 8;
      introTimeline = gsap.timeline({ paused: true });

      introTimeline
        .fromTo(buildingRef.current,
          { opacity: 0, filter: 'blur(20px)', scale: 0.8 },
          { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 2.5, ease: 'power2.out' }, 0)
        .to(scrollHintRef.current, { opacity: 0, y: 20, duration: 2.0, ease: 'power2.in' }, 0.5)
        .to(buildingRef.current, { scale: scaleCap, opacity: 0, duration: 1.5, ease: 'power2.in' }, 2.5)
        .fromTo(digitalRef.current,
          { x: '-120vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 1.5, ease: 'power2.out' }, 2.5)
        .fromTo(productsRef.current,
          { x: '120vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 1.5, ease: 'power2.out' }, 2.5)
        .fromTo(vignetteRef.current, { opacity: 0 }, { opacity: 0.8, duration: 1.0, ease: 'power1.inOut' }, 2.5)
        .to(vignetteRef.current, { opacity: 0, duration: 1.0, ease: 'power1.inOut' }, 3.5)
        .to(phase2Ref.current, { scale: scaleCap, opacity: 0, duration: 1.5, ease: 'power2.in' }, 4.0)
        .to(activeLetters, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 2.2, stagger: 0.03, ease: 'power3.out' }, 5.5)
        .to(svgLineRef.current, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, 6.5)
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, 7.0)
        .to(nameContainerRef.current, { y: -100, opacity: 0, duration: 1.8, ease: 'power2.in' }, 8.2)
        .to(introRef.current, { opacity: 0, duration: 1.8, ease: 'power2.inOut' }, 8.2);

      let progress = 0;
      let cooldown = false;
      handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        if (cooldown) return;
        cooldown = true;
        setTimeout(() => { cooldown = false; }, 50);
        progress = Math.min(1, Math.max(0, progress + e.deltaY * 0.0003));
        gsap.to(introTimeline!, {
          progress,
          duration: 1.2,
          ease: 'power3.out',
          overwrite: true,
          onComplete: () => { if (progress >= 1.0) completeIntro(); },
        });
      };
      document.body.style.overflow = 'hidden';
      window.addEventListener('wheel', handleWheel, { passive: false });
    };

    const tlLoader = gsap.timeline({
      onComplete: () => {
        gsap.timeline().to(loaderRef.current, {
          yPercent: -100, duration: 1.2, ease: 'power4.inOut',
          onComplete: () => {
            if (!isMounted) return;
            if (window.innerWidth < 768) playMobileIntro();
            else playDesktopIntro();
          },
        });
      },
    });
    tlLoader.fromTo(progressFillerRef.current, { width: '0%' }, { width: '100%', duration: 2.0, ease: 'power1.inOut' });

    return () => {
      isMounted = false;
      if (handleWheel) window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Loader screen */}
      <div ref={loaderRef} className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col justify-center items-center px-6">
        <div className="text-center space-y-12 max-w-md w-full">
          <div className="font-display font-extrabold text-[#f0f0f0] tracking-wider text-7xl sm:text-8xl">
            GJG<span className="text-[#c8f45e]">.</span>
          </div>
          <div className="space-y-4">
            <div className="w-full h-[1.5px] bg-[#1e1e1e] relative overflow-hidden rounded">
              <div ref={progressFillerRef} className="absolute left-0 top-0 bottom-0 bg-[#c8f45e]" />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.2em] text-[#4a4a4a]">
              <span>Gio Joshua Gonzales Portfolio</span>
              <span>Loading Engine</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic intro */}
      <section
        ref={introRef}
        id="intro"
        className="fixed top-0 left-0 bg-[#0a0a0a] z-[100] flex flex-col justify-center items-center"
        style={{ width: '100vw', height: '100vh', overflow: 'hidden', boxSizing: 'border-box', perspective: '800px' }}
      >
        <div ref={vignetteRef} className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.95)_80%)] opacity-0 pointer-events-none z-10" />

        {/* Phase 1 — BUILDING */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-20" style={{ width: '100vw', overflow: 'hidden', boxSizing: 'border-box' }}>
          <h2
            ref={buildingRef}
            className="font-display font-extrabold uppercase text-[#f0f0f0] tracking-tighter opacity-0 select-none pointer-events-none text-center"
            style={{ fontSize: '10vw', whiteSpace: 'nowrap', width: '100vw', textAlign: 'center', overflow: 'hidden', boxSizing: 'border-box', filter: 'blur(20px)' }}
          >
            BUILDING
          </h2>
        </div>

        {/* Phase 2 — DIGITAL / SOLUTIONS */}
        <div ref={phase2Ref} className="absolute flex flex-col items-center select-none pointer-events-none z-20" style={{ width: '100vw', overflow: 'hidden', boxSizing: 'border-box' }}>
          <h2
            ref={digitalRef}
            className="font-display font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#c8f45e] to-[#99cf20] tracking-tighter opacity-0 text-center"
            style={{ fontSize: '7vw', whiteSpace: 'nowrap', width: '100vw', textAlign: 'center', overflow: 'hidden', boxSizing: 'border-box', lineHeight: 0.9, transform: 'translateX(-120vw)' }}
          >
            DIGITAL
          </h2>
          <h2
            ref={productsRef}
            className="font-display font-extrabold uppercase text-[#f0f0f0] tracking-tighter opacity-0 text-center"
            style={{ fontSize: '7vw', whiteSpace: 'nowrap', width: '100vw', textAlign: 'center', overflow: 'hidden', boxSizing: 'border-box', lineHeight: 0.9, transform: 'translateX(120vw)' }}
          >
            SOLUTIONS
          </h2>
        </div>

        {/* Phase 3 & 4 — Name + subtitle */}
        <div ref={nameContainerRef} className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-30" style={{ width: '100vw', overflow: 'hidden', boxSizing: 'border-box' }}>
          <div className="flex flex-wrap justify-center items-center leading-none" style={{ width: '100vw', overflow: 'hidden', boxSizing: 'border-box', padding: '0 4vw' }}>
            {nameLetters.map((char, index) => {
              if (char === ' ') return <span key={index} className="inline-block" style={{ width: '2.5vw' }}>&nbsp;</span>;
              return (
                <span
                  key={index}
                  ref={(el) => { nameLetterRefs.current[index] = el; }}
                  className="inline-block font-display font-extrabold uppercase text-[#f0f0f0] tracking-tighter leading-none select-none pointer-events-none"
                  style={{ opacity: 0, fontSize: '8vw' }}
                >
                  {char}
                </span>
              );
            })}
          </div>

          <div className="w-96 h-[2px] my-6 overflow-hidden relative">
            <svg className="w-full h-full" viewBox="0 0 100 2" preserveAspectRatio="none">
              <line ref={svgLineRef} x1="0" y1="1" x2="100" y2="1" stroke="#c8f45e" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100" />
            </svg>
          </div>

          <div
            ref={subtitleRef}
            className="font-mono uppercase tracking-[0.3em] text-[#7a7a7a] opacity-0 select-none pointer-events-none text-center"
            style={{ fontSize: '1.4vw', whiteSpace: 'nowrap', width: '100vw', textAlign: 'center', boxSizing: 'border-box' }}
          >
            Software Engineer &amp; Web Developer
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="pointer-events-none z-30 font-mono uppercase text-[#4a4a4a] flex flex-col items-center gap-2 absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ fontSize: '0.75rem', letterSpacing: '0.15em' }}
        >
          <span>Scroll to explore ↓</span>
        </div>
      </section>
    </>
  );
}
