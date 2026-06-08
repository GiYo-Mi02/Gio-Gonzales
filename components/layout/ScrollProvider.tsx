'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import { useLocomotive, type LocomotiveInstance } from '@/hooks/useLocomotive';

// ─── Context ─────────────────────────────────────────────────────────────────

interface ScrollContextValue {
  scroll: LocomotiveInstance | null;
  activeSection: string;
}

export const ScrollContext = createContext<ScrollContextValue | null>(null);

export function useScrollContext() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error('useScrollContext must be used inside <ScrollProvider>');
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

interface ScrollProviderProps {
  children: React.ReactNode;
}

export default function ScrollProvider({ children }: ScrollProviderProps) {
  const { instanceRef, init, destroy } = useLocomotive();
  const [scrollInstance, setScrollInstance] = useState<LocomotiveInstance | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const scrollEl = document.querySelector('[data-scroll-container]');
    if (scrollEl) {
      init(scrollEl, (loco) => {
        // ── 1. Register instance in React state ───────────────────────────────
        setScrollInstance(loco);

        // ── 2. ScrollTrigger ↔ Locomotive proxy ───────────────────────────────
        // Must happen immediately after setScrollInstance so ScrollTrigger
        // knows how to read scroll position from Locomotive's virtual scroller.
        ScrollTrigger.scrollerProxy('[data-scroll-container]', {
          scrollTop(value?: number) {
            if (arguments.length && value !== undefined) {
              (loco as any).scrollTo(value, { duration: 0, disableLerp: true });
            }
            // Wrap in try/catch — Locomotive's internal scroll.instance may
            // not be ready yet on the very first tick; fall back to 0 safely.
            try {
              return (loco as any).scroll.instance.scroll.y ?? 0;
            } catch {
              return 0;
            }
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          pinType: (() => {
            const el = document.querySelector('[data-scroll-container]') as HTMLElement;
            return el?.style.transform ? 'transform' : 'fixed';
          })(),
        });

        // ── 3. Keep both systems in sync on every scroll tick ─────────────────
        loco.on('scroll', ScrollTrigger.update);

        // ── 4. When ScrollTrigger refreshes, tell Locomotive to recalculate ───
        ScrollTrigger.addEventListener('refresh', () => loco.update());

        // ── 5. Listen for Locomotive "call" events → update active nav section
        loco.on('call', (func: any, state: any) => {
          if (state === 'enter') {
            setActiveSection(func);
          }
        });

        // ── 6. Direct URL hash scroll & browser back-button fix ───────────────
        if (typeof window !== 'undefined' && window.location.hash) {
          const hash = window.location.hash;
          setTimeout(() => {
            const targetEl = document.querySelector(hash);
            if (targetEl && loco) {
              loco.scrollTo(targetEl, {
                offset: -80,
                duration: 1.2,
                easing: [0.25, 0.0, 0.35, 1.0],
                disableLerp: false,
              });
              // Silently clear hash from URL so it doesn't loop on refresh
              window.history.replaceState(null, '', '/');
            }
          }, 300);
        }

        // ── 7. Force ScrollTrigger to remeasure after everything paints ───────
        // This ensures ScrollTrigger knows the true page height including any
        // pin-spacer divs injected by bento/pinned sections.
        setTimeout(() => ScrollTrigger.refresh(), 500);
      });
    }

    return () => {
      // Remove the refresh listener before killing everything
      ScrollTrigger.removeEventListener('refresh', () => {});
      ScrollTrigger.killAll();
      destroy();
    };
  }, [init, destroy]);

  return (
    <ScrollContext.Provider value={{ scroll: scrollInstance, activeSection }}>
      {children}
    </ScrollContext.Provider>
  );
}
