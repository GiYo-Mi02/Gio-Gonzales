'use client';

import React, { createContext, useContext } from 'react';
import { usePageTransition } from '@/hooks/usePageTransition';

// ─── Context ─────────────────────────────────────────────────────────────────

const TransitionContext = createContext<{ transitionTo: (url: string) => void } | null>(null);

export function useTransitionRouter() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    return {
      transitionTo: (url: string) => {
        if (typeof window !== 'undefined') window.location.href = url;
      },
    };
  }
  return ctx;
}

// ─── Provider ────────────────────────────────────────────────────────────────

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const { overlayRef, lettersRef, gRef1, jRef, gRef2, svgRef, lineRef, transitionTo } =
    usePageTransition();

  return (
    <TransitionContext.Provider value={{ transitionTo }}>
      {children}

      {/* Full-screen transition overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#c8f45e',
          zIndex: 9999,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* G J G initials */}
        <div
          ref={lettersRef}
          style={{ display: 'flex', gap: '0.5vw', alignItems: 'flex-end', justifyContent: 'center' }}
        >
          {(['G', 'J', 'G'] as const).map((letter, i) => (
            <span
              key={i}
              ref={i === 0 ? gRef1 : i === 1 ? jRef : gRef2}
              style={{
                fontFamily: 'var(--font-display, "Syne", sans-serif)',
                fontWeight: 700,
                fontSize: '12vw',
                color: '#0a0a0a',
                lineHeight: 1,
                display: 'block',
                willChange: 'transform, opacity',
                opacity: 0,
                userSelect: 'none',
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Lime underline SVG */}
        <svg
          ref={svgRef}
          height="4"
          style={{ display: 'block', marginTop: '0.4vw', overflow: 'visible', opacity: 0 }}
        >
          <line
            ref={lineRef}
            x1="0"
            y1="2"
            x2="0"
            y2="2"
            stroke="#0a0a0a"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </TransitionContext.Provider>
  );
}
