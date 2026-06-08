'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import gsap from '@/lib/gsap';
import { useCursor } from '@/components/layout/CustomCursor';
import { useScrollContext } from '@/components/layout/ScrollProvider';
import meImage from '@/assets/me.jpg';

export default function HeroSection() {
  const { expand, collapse } = useCursor();
  const { scroll } = useScrollContext();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleScrollTo = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (!element || !scroll) return;
    scroll.scrollTo(element, {
      offset: -80,
      duration: 1.2,
      easing: [0.25, 0.0, 0.35, 1.0],
      disableLerp: false,
    });
  };

  // Canvas network animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width  = canvas.parentElement?.clientWidth  ?? 400;
      canvas.height = canvas.parentElement?.clientHeight ?? 600;
    };
    resize();
    window.addEventListener('resize', resize);

    const nodeCount = 50;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * (canvas.width  || 400),
      y: Math.random() * (canvas.height || 600),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width, h = canvas.height;
      ctx.strokeStyle = 'rgba(30,30,30,0.4)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy; n.pulse += 0.01;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        const r = n.radius + Math.sin(n.pulse) * 0.8;
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(0.5, r), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,244,94,${0.15 + Math.sin(n.pulse) * 0.1})`;
        ctx.fill();
      });

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 95) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(200,244,94,${(1 - dist / 95) * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen pt-20 w-full flex items-center px-6 md:px-12 lg:px-20 py-12 relative border-b border-[#1e1e1e]"
      data-scroll-section
      data-scroll
      data-scroll-call="hero"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto z-10">

        {/* Left text pane */}
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-4">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#c8f45e] uppercase block fade-in-hero-desc">
              Based in the Philippines — Web Artisan
            </span>
            <h1 className="font-display font-extrabold uppercase text-[9vw] sm:text-7xl lg:text-[80px] xl:text-[86px] tracking-tighter leading-[0.88] text-[#f0f0f0] overflow-hidden">
              {[['BUILDING', ''], ['DIGITAL', 'text-transparent bg-clip-text bg-gradient-to-r from-[#c8f45e] to-[#99cf20]'], ['PRODUCTS', '']].map(([word, extra]) => (
                <div key={word} className="block overflow-hidden h-fit py-1">
                  <span className={`inline-block fade-up-hero-word ${extra}`}>{word}</span>
                </div>
              ))}
            </h1>
          </div>

          <p className="text-lg md:text-xl text-neutral-400 max-w-xl font-normal tracking-wide leading-relaxed fade-in-hero-desc">
            Precision-engineered web applications blending bleeding-edge responsive engineering with sleek visual identity.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 fade-in-hero-cta">
            <button
              onClick={(e) => handleScrollTo(e, '#work')}
              className="bg-[#c8f45e] hover:bg-white text-[#0a0a0a] px-8 py-4 uppercase font-mono tracking-widest text-xs font-bold rounded flex items-center gap-2 group transition duration-300 cursor-none border-none outline-none"
              onMouseEnter={expand} onMouseLeave={collapse}
            >
              <span>View Projects</span>
              <ArrowUpRight className="w-4 h-4 transition duration-300 group-hover:rotate-45" />
            </button>
            <button
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="border border-[#c8f45e] text-[#c8f45e] hover:bg-[#c8f45e]/10 transition px-8 py-4 uppercase font-mono tracking-widest text-xs font-bold rounded bg-transparent cursor-none outline-none"
              onMouseEnter={expand} onMouseLeave={collapse}
            >
              Contact Me
            </button>
          </div>

          <div className="flex flex-wrap gap-3 pt-6 fade-in-hero-stats border-t border-[#1e1e1e] max-w-xl">
            {['30+ Projects Completed', '2+ Years Active Experience', 'Interactive Systems'].map((tag) => (
              <div key={tag} className="px-5 py-2.5 border border-[#1e1e1e] bg-[#111111]/50 rounded-full text-xs font-mono text-[#f0f0f0] uppercase tracking-wider flex items-center gap-1.5 hover:border-[#c8f45e]/40 transition">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f45e]" />
                <span>{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right canvas panel */}
        <div
          className="lg:col-span-4 h-[450px] lg:h-[750px] w-full border border-[#1e1e1e] border-l-4 border-l-[#c8f45e] bg-[#111111]/20 rounded relative overflow-hidden group"
          data-scroll data-scroll-speed="-0.5"
        >
          <Image src={meImage} alt="Gio Joshua Gonzales" fill className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 group-hover:brightness-[0.7] group-hover:contrast-[1.25] transition-all duration-700 pointer-events-none" priority />
          <div className="absolute inset-0 bg-[#c8f45e] mix-blend-color opacity-0 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none" />
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60 pointer-events-none" />
          <div className="absolute left-6 top-6 uppercase font-mono text-[9px] tracking-[0.25em] text-[#4a4a4a] border-l border-[#c8f45e] pl-2 pointer-events-none">
            SIMULATION ID: GJG-2025.A
          </div>
          <div className="absolute right-6 bottom-6 flex gap-1 items-center font-mono text-[9px] text-[#4a4a4a] pointer-events-none">
            <Sparkles className="w-2.5 h-2.5 text-[#c8f45e]" />
            <span>DYNAMIC GRID SYNCHRONIZED</span>
          </div>
        </div>

      </div>
    </section>
  );
}
