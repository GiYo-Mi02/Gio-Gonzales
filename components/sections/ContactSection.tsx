'use client';

import React, { useEffect } from 'react';
import { ArrowUpRight, Github, Linkedin, Instagram } from 'lucide-react';
import gsap from '@/lib/gsap';
import { useCursor } from '@/components/layout/CustomCursor';

export default function ContactSection() {
  const { expand, collapse } = useCursor();

  useEffect(() => {
    const scrollEl = document.querySelector('[data-scroll-container]');
    if (!scrollEl) return;

    // Fade elements reveal
    document.querySelectorAll('#contact .gsap-reveal-fade').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, scroller: scrollEl, start: 'top 85%', toggleActions: 'play none none none' } }
      );
    });
  }, []);

  return (
    <section
      id="contact"
      className="min-h-[80vh] py-24 md:py-32 px-6 md:px-12 lg:px-20 relative flex flex-col justify-center w-full"
      data-scroll-section
      data-scroll
      data-scroll-call="contact"
    >
      {/* Subtle decoration elements */}
      <div className="absolute right-0 top-0 w-2/3 h-full opacity-10 pointer-events-none overflow-hidden select-none">
        <div className="font-display font-extrabold text-[#111111] text-[20vw] select-none leading-none text-right">
          CONTACT
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center items-center text-center space-y-12 py-10 z-10 relative">
        
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#c8f45e] font-mono font-medium block">
            04 — LET&apos;S WORK TOGETHER
          </span>
          <h2 className="font-display font-extrabold text-5xl sm:text-7xl xl:text-8xl tracking-tighter uppercase text-[#f0f0f0] leading-none max-w-4xl max-w-7xl py-1 md:-h-fit">
            START A PROJECT
          </h2>
        </div>

        <p className="text-neutral-400 font-sans text-base sm:text-lg max-w-md leading-relaxed">
          Open to freelance commissions, contract commitments, and full-time opportunities. Send me a message anytime.
        </p>

        {/* Email Action button */}
        <div className="pt-4 gsap-reveal-fade">
          <a
            href="mailto:ggiojoshua2006@gmail.com"
            className="inline-flex items-center gap-3 bg-[#c8f45e] hover:bg-white text-[#0a0a0a] font-mono tracking-widest text-sm font-bold uppercase px-10 py-5 rounded-full transition duration-300 shadow-xl shadow-lime-950/25 active:scale-95 cursor-none"
            onMouseEnter={expand}
            onMouseLeave={collapse}
          >
            <span>Send a Message</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>

        {/* Structured Bordered Icon Row Grid */}
        <div className="flex items-center justify-center gap-5 pt-8 gsap-reveal-fade">
          {[
            { icon: <Github className="w-5 h-5" />, url: 'https://github.com/giojoshua', label: 'GitHub' },
            { icon: <Linkedin className="w-5 h-5" />, url: 'https://www.linkedin.com/in/giyomi/', label: 'LinkedIn' },
            { icon: <Instagram className="w-5 h-5" />, url: 'https://www.instagram.com/ggio_joshua/', label: 'Instagram' }
          ].map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-[#1e1e1e] bg-[#111111]/30 hover:border-[#c8f45e] hover:text-[#c8f45e] rounded transform hover:-translate-y-1 transition duration-300 text-neutral-400 flex items-center gap-2 group cursor-none"
              onMouseEnter={expand}
              onMouseLeave={collapse}
            >
              {social.icon}
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#7a7a7a] group-hover:text-[#c8f45e] transition duration-300">
                {social.label}
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
