'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer 
      className="border-t border-[#1e1e1e] py-8 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[#4a4a4a] z-10 relative"
      data-scroll-section
    >
      <div>
        © 2025 Gio Joshua Gonzales. All rights reserved.
      </div>
      <div className="flex items-center gap-1.5 uppercase tracking-widest text-[#5e5e5e]">
        <span>Handcrafted from Philippines</span>
      </div>
    </footer>
  );
}
