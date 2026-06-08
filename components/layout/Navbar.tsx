'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useCursor } from '@/components/layout/CustomCursor';
import { useScrollContext } from '@/components/layout/ScrollProvider';
import { useTransitionRouter } from '@/components/layout/PageTransition';

export default function Navbar() {
  const { expand, collapse } = useCursor();
  const { scroll, activeSection } = useScrollContext();
  const { transitionTo } = useTransitionRouter();
  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    if (pathname !== '/') {
      // Transition to homepage with target hash
      transitionTo('/' + target);
      return;
    }
    const element = document.querySelector(target);
    if (!element || !scroll) return;
    scroll.scrollTo(element, {
      offset: -80,
      duration: 1.2,
      easing: [0.25, 0.0, 0.35, 1.0],
      disableLerp: false,
    });
  };

  const navItems = [
    { target: '#work', label: 'Work', id: 'work' },
    { target: '#about', label: 'About', id: 'about' },
    { target: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <header
      id="navbar-fixed"
      className="fixed top-0 w-full z-40 px-6 py-5 md:px-12 flex justify-between items-center transition-all duration-300 nav-slide-down"
    >
      <div
        className="font-display font-bold tracking-wider text-xl flex items-center gap-1 text-[#f0f0f0]"
        onMouseEnter={expand}
        onMouseLeave={collapse}
      >
        <span>GJG</span>
        <span className="text-[#c8f45e] text-2xl font-extrabold leading-3">.</span>
      </div>

      {/* Availability badge */}
      <div className="hidden sm:flex items-center gap-2.5 px-4 py-2 border border-[#1e1e1e] bg-[#111111]/60 rounded-full backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8f45e] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8f45e]" />
        </span>
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#f0f0f0]">
          AVAILABLE FOR WORK
        </span>
      </div>

      <nav className="flex items-center gap-6 sm:gap-8 font-sans text-xs uppercase tracking-widest font-normal text-[#e5e5e5]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={(e) => handleNavClick(e, item.target)}
            className={`transition bg-transparent hover:text-[#c8f45e] inline-block font-sans text-xs uppercase tracking-widest cursor-none border-none outline-none ${
              activeSection === item.id ? 'text-[#c8f45e]' : 'text-[#e5e5e5]'
            }`}
            onMouseEnter={expand}
            onMouseLeave={collapse}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
