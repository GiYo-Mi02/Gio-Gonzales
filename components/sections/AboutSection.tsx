'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap, { ScrollTrigger } from '@/lib/gsap';
import { useCursor } from '@/components/layout/CustomCursor';
import anotherMeImage from '@/assets/anotherme.png';

const statsData = [
  { id: 'proj', value: 20, suffix: '+', label: 'Projects Developed' },
  { id: 'exp',  value: 2,  suffix: '+', label: 'Years Experience' },
  { id: 'usr',  value: 100,suffix: '+', label: 'Active Users Reach' },
  { id: 'tech', value: 10, suffix: '+', label: 'Core Technologies' },
];

const techStack = [
  { class: 'devicon-nextjs-plain text-4xl sm:text-5xl', label: 'Next.js' },
  { class: 'devicon-typescript-plain colored text-4xl sm:text-5xl', label: 'TypeScript' },
  { class: 'devicon-react-original colored text-4xl sm:text-5xl', label: 'React' },
  { class: 'devicon-tailwindcss-original colored text-4xl sm:text-5xl', label: 'Tailwind' },
  { class: 'devicon-nodejs-plain colored text-4xl sm:text-5xl', label: 'Node.js' },
  { class: 'devicon-express-original text-4xl sm:text-5xl', label: 'Express' },
  { class: 'devicon-supabase-plain colored text-4xl sm:text-5xl', label: 'Supabase' },
  { class: 'devicon-mongodb-plain colored text-4xl sm:text-5xl', label: 'MongoDB' },
  { class: 'devicon-postgresql-plain colored text-4xl sm:text-5xl', label: 'PostgreSQL' },
  { class: 'devicon-redis-plain colored text-4xl sm:text-5xl', label: 'Redis' },
];

export default function AboutSection() {
  const { expand, collapse } = useCursor();
  const [counters, setCounters] = useState<Record<string, number>>({ proj: 0, exp: 0, usr: 0, tech: 0 });

  useEffect(() => {
    const scrollEl = document.querySelector('[data-scroll-container]');
    if (!scrollEl) return;

    // Heading clip reveals
    const headings = document.querySelectorAll('.reveal-heading');
    headings.forEach((h) => {
      gsap.fromTo(h,
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 40 },
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: h, scroller: scrollEl, start: 'top 85%', toggleActions: 'play none none none' } }
      );
    });

    // Fade blocks
    document.querySelectorAll('.gsap-reveal-fade').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, scroller: scrollEl, start: 'top 85%', toggleActions: 'play none none none' } }
      );
    });

    // Counter trigger
    ScrollTrigger.create({
      trigger: '#counter-trigger-section',
      scroller: scrollEl,
      start: 'top 85%',
      onEnter: () => {
        const dur = 2.0, fps = 30, frames = dur * fps;
        let frame = 0;
        const iv = setInterval(() => {
          frame++;
          const p = 1 - Math.pow(1 - frame / frames, 3);
          setCounters({ proj: Math.floor(p * 30), exp: Math.floor(p * 2), usr: Math.floor(p * 200), tech: Math.floor(p * 10) });
          if (frame >= frames) { clearInterval(iv); setCounters({ proj: 30, exp: 2, usr: 200, tech: 10 }); }
        }, 1000 / fps);
      },
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative border-b border-[#1e1e1e] w-full"
      data-scroll-section
      data-scroll
      data-scroll-call="about"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto items-start">

        {/* Left sticky column */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div className="relative">
            <div className="font-display font-extrabold text-[#111111] opacity-70 text-[11rem] md:text-[14rem] select-none leading-none -mt-10 -ml-4 pointer-events-none">01</div>
            <div className="absolute top-10 left-0">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c8f45e] font-mono font-medium block mb-2">— GET TO KNOW ME</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] xl:text-[54px] uppercase text-[#f0f0f0] tracking-tighter leading-none reveal-heading">About Gio</h2>
            </div>
          </div>
          <div className="relative w-full aspect-[4/5] border border-[#1e1e1e] border-l-4 border-l-[#c8f45e] bg-[#111111]/20 rounded overflow-hidden group">
            <Image src={anotherMeImage} alt="Gio Joshua Gonzales" fill className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 group-hover:brightness-[0.7] group-hover:contrast-[1.25] transition-all duration-700 pointer-events-none" priority />
            <div className="absolute inset-0 bg-[#c8f45e] mix-blend-color opacity-0 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none" />
          </div>
        </div>

        {/* Right content column */}
        <div className="lg:col-span-8 space-y-16">
          <div className="space-y-6 gsap-reveal-fade">
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#f0f0f0]">Architect of clean web solutions.</h3>
            <p className="text-neutral-400 font-sans text-base sm:text-lg leading-relaxed max-w-3xl">
              Hello, I&apos;m <span className="text-[#f0f0f0] font-medium">Gio Joshua Gonzales</span>, a Full Stack Developer &amp; Designer based in the Philippines. I specialize in assembling high-performance, responsive ecosystems modeled around clean client specifications.
            </p>
            <p className="text-neutral-400 font-sans text-base sm:text-lg leading-relaxed max-w-3xl">
              Through custom databases, optimized server frameworks, and intricate visual orchestration libraries (such as GSAP, p5.js, and Canvas APIs), I ensure that applications not only load with hyper-performance but also captivate users through refined editorial interaction.
            </p>
          </div>

          {/* Stats */}
          <div id="counter-trigger-section" className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10">
            {statsData.map((stat) => (
              <div key={stat.id} className="p-6 border border-[#1e1e1e] bg-[#111111]/40 rounded hover:border-[#c8f45e]/20 transition duration-300">
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#c8f45e] mb-1">
                  {counters[stat.id] || 0}<span>{stat.suffix}</span>
                </div>
                <div className="text-[10px] font-mono text-[#a3a3a3] uppercase tracking-wider leading-normal">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="space-y-6 pt-6 border-t border-[#1e1e1e] gsap-reveal-fade">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#4a4a4a] block">CRAFTING TOOLS & CORE STACK</span>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {techStack.map((tech, i) => (
                <div
                  key={i}
                  className="group flex flex-col items-center gap-1.5 p-3.5 border border-[#1e1e1e] bg-[#111111]/30 hover:bg-[#111111] hover:border-[#c8f45e]/30 hover:scale-105 active:scale-95 transition-all duration-300 rounded"
                  onMouseEnter={expand} onMouseLeave={collapse}
                >
                  <i className={`${tech.class} text-[#b3b3b3] group-hover:text-[#c8f45e] transition duration-300`} />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#4a4a4a] group-hover:text-[#f0f0f0] transition duration-300">{tech.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
