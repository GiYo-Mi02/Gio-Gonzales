'use client';

import { useCursor } from '@/components/layout/CustomCursor';

export default function WorkCTA() {
  const { expand, collapse } = useCursor();

  return (
    <div
      className="w-full bg-[#0a0a0a] border-b border-[#1e1e1e] py-16 flex flex-col items-center justify-center text-center gap-3"
      data-scroll-section
    >
      <a
        href="https://github.com/GiYo-Mi02"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex flex-col items-center gap-2 text-base uppercase tracking-[0.2em] font-mono text-[#c8f45e] hover:text-[#f0f0f0] transition duration-300 cursor-none"
        onMouseEnter={expand}
        onMouseLeave={collapse}
      >
        <span>See All Projects →</span>
        <span className="block h-[1.5px] w-0 bg-[#c8f45e] group-hover:bg-[#f0f0f0] group-hover:w-full transition-all duration-300" />
      </a>
      <span className="text-[10px] text-[#4a4a4a] font-mono tracking-widest uppercase">
        7 Projects — 2025
      </span>
    </div>
  );
}
