'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Code, Terminal, Database, Cpu, Layers, ChevronDown } from 'lucide-react';
import gsap, { ScrollTrigger } from '@/lib/gsap';
import { useCursor } from '@/components/layout/CustomCursor';

interface AccordionItem {
  category: string;
  skills: string[];
  icon: React.ReactNode;
  summary: string;
}

const expertiseItems: AccordionItem[] = [
  {
    category: 'Frontend',
    skills: ['React.js', 'Next.js 14/15', 'TypeScript', 'Tailwind CSS', 'GSAP', 'p5.js', 'Canvas API', 'Redux Toolkit'],
    icon: <Code className="w-5 h-5 text-[#c8f45e]" />,
    summary: 'I build responsive, high-fidelity user interfaces characterized by pixel-perfect designs, modular React structures, fluid layout composition, and interactive GSAP animations.',
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'Serverless Actions', 'WebSockets (Socket.io)'],
    icon: <Terminal className="w-5 h-5 text-[#c8f45e]" />,
    summary: 'I formulate robust API infrastructure, secure routing endpoints, system integrations, and multi-user synchronized server structures tailored for optimized latency.',
  },
  {
    category: 'Database',
    skills: ['Supabase', 'PostgreSQL', 'Mongoose', 'MongoDB', 'Redis Cloud Storage'],
    icon: <Database className="w-5 h-5 text-[#c8f45e]" />,
    summary: 'Specialized in structural database organization, key-value quick fetches, persistent pipeline caching, and relational schemas mapping secure user session states.',
  },
  {
    category: 'AI Integration',
    skills: ['Gemini AI SDK', 'GPT-3.5/4 Integration', 'OpenAI Embeddings', 'AI Agents Workflow'],
    icon: <Cpu className="w-5 h-5 text-[#c8f45e]" />,
    summary: 'Pioneering interactive artificial intelligence bridges, text indexing automation pipelines, and localized vector storage mappings to enrich standard productivity platforms.',
  },
  {
    category: 'DevOps',
    skills: ['Vercel Hosting', 'Git / GitHub Versioning', 'GitHub Actions CI/CD', 'Docker Containers'],
    icon: <Layers className="w-5 h-5 text-[#c8f45e]" />,
    summary: 'Ensuring structured automated pipelines, rapid live hosting, custom environment tracking configuration, container containerizations, and resilient fallback states.',
  },
];

export default function ExpertiseSection() {
  const { expand, collapse } = useCursor();
  const [activeAccordion, setActiveAccordion] = useState<string | null>('Frontend');
  const accordionContentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const scrollEl = document.querySelector('[data-scroll-container]');
    if (!scrollEl) return;

    // Heading clip reveals
    const headings = document.querySelectorAll('#expertise .reveal-heading');
    headings.forEach((h) => {
      gsap.fromTo(h,
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 40 },
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: h, scroller: scrollEl, start: 'top 85%', toggleActions: 'play none none none' } }
      );
    });

    // Fade blocks
    document.querySelectorAll('#expertise .gsap-reveal-fade').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, scroller: scrollEl, start: 'top 85%', toggleActions: 'play none none none' } }
      );
    });

    ScrollTrigger.refresh();
  }, []);

  const handleAccordionToggle = (catName: string) => {
    const isCurrentlyActive = activeAccordion === catName;
    const nextActive = isCurrentlyActive ? null : catName;

    setActiveAccordion(nextActive);

    // Apply smooth height tween for elements
    Object.keys(accordionContentRefs.current).forEach((key) => {
      const el = accordionContentRefs.current[key];
      if (el) {
        if (key === nextActive) {
          gsap.fromTo(el,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
        } else {
          gsap.to(el, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.in' });
        }
      }
    });

    // Refresh scrolltrigger metrics
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 550);
  };

  return (
    <section
      id="expertise"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative border-b border-[#1e1e1e] w-full bg-[#0d0d0d]"
      data-scroll-section
      data-scroll
      data-scroll-call="expertise"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Watermark & heading label */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="relative">
            <div className="font-display font-extrabold text-[#111111] opacity-70 text-[11rem] md:text-[14rem] select-none leading-none -mt-10 -ml-4 pointer-events-none">
              03
            </div>
            <div className="absolute top-10 left-0">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c8f45e] font-mono font-medium block mb-2">
                — CAPABILITIES
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] xl:text-[54px] uppercase text-[#f0f0f0] tracking-tighter leading-none reveal-heading">
                My Expertise
              </h2>
            </div>
          </div>

          <div className="pt-8 gsap-reveal-fade">
            <p className="text-neutral-400 font-sans text-base leading-relaxed max-w-sm">
              Drawing from standard structural frameworks combined with modern interactive animations, my coding philosophy translates into ultra-stable web logic.
            </p>
          </div>
        </div>

        {/* Right Expansion Accordions */}
        <div className="lg:col-span-7 space-y-4">
          {expertiseItems.map((item) => {
            const isActive = activeAccordion === item.category;
            return (
              <div
                key={item.category}
                className={`border border-[#1e1e1e] hover:border-[#c8f45e]/20 transition-all duration-300 rounded ${
                  isActive ? 'bg-[#111111]/40 border-[#c8f45e]/20' : 'bg-[#111111]/10'
                }`}
              >
                {/* Header trigger node */}
                <button
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left uppercase transition-all whitespace-nowrap cursor-none bg-transparent border-none outline-none"
                  onClick={() => handleAccordionToggle(item.category)}
                  onMouseEnter={expand}
                  onMouseLeave={collapse}
                >
                  <div className="flex items-center gap-4">
                    {item.icon}
                    <h3 className="font-display font-bold text-lg md:text-xl tracking-wider text-[#f0f0f0]">
                      {item.category}
                    </h3>
                  </div>
                  
                  {/* Animated rotating Arrow icon */}
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-500 hover:text-[#c8f45e] transition-transform duration-300 ${
                      isActive ? 'rotate-180 text-[#c8f45e]' : ''
                    }`}
                  />
                </button>

                {/* Expandable Body Container */}
                <div
                  ref={(el) => {
                    accordionContentRefs.current[item.category] = el;
                  }}
                  className="overflow-hidden transition-all duration-300 px-6 md:px-8"
                  style={{ 
                    height: isActive ? 'auto' : 0,
                    opacity: isActive ? 1 : 0
                  }}
                >
                  <div className="pb-8 space-y-6 pt-1 border-t border-[#1e1e1e]/40">
                    {/* Summary */}
                    <p className="text-neutral-400 text-[14px] sm:text-base leading-relaxed font-sans max-w-3xl">
                      {item.summary}
                    </p>
                    
                    {/* Interactive items */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-[#5c5c5c] tracking-[0.25em] block uppercase">
                        Technologies Mastered:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((pill, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 border border-[#1e1e1e]/80 hover:border-[#c8f45e]/40 bg-[#161616] text-[#c8f45e] hover:text-white text-[11px] font-mono rounded tracking-wider transition duration-300"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
