'use client';

import { useRef, useCallback } from 'react';
import { ScrollTrigger } from '@/lib/gsap';

export interface LocomotiveInstance {
  on: (event: string, cb: (...args: any[]) => void) => void;
  scrollTo: (target: any, options?: any) => void;
  scroll: { instance: { scroll: { y: number } } };
  update: () => void;
  destroy: () => void;
  stop: () => void;
  start: () => void;
}

/**
 * Raw Locomotive Scroll init/teardown logic.
 * Called only by ScrollProvider — no other file uses this hook directly.
 * NOTE: ScrollTrigger proxy setup lives in ScrollProvider's init callback so
 *       the exact initialization order is explicit and easy to audit.
 */
export function useLocomotive() {
  const instanceRef = useRef<LocomotiveInstance | null>(null);

  const init = useCallback((scrollEl: Element, onLoad?: (loco: LocomotiveInstance) => void) => {
    import('locomotive-scroll').then((LocomotiveScroll) => {
      const loco = new (LocomotiveScroll as any).default({
        el: scrollEl as HTMLElement,
        smooth: true,
        multiplier: 1,
        lerp: 0.08,
        class: 'is-inview',
        scrollbarClass: 'c-scrollbar',
        scrollingClass: 'has-scroll-scrolling',
        draggingClass: 'has-scroll-dragging',
        smoothClass: 'has-scroll-smooth',
        initClass: 'has-scroll-init',
        reloadOnContextChange: false,
        touchMultiplier: 2,
        // Disable smooth on touch devices — native touch + Locomotive smooth
        // conflicts and causes entire sections to disappear on mobile.
        smartphone: { smooth: false },
        tablet: { smooth: false, breakpoint: 768 },
      }) as LocomotiveInstance;

      instanceRef.current = loco;

      if (onLoad) {
        onLoad(loco);
      }
    });
  }, []);

  const destroy = useCallback(() => {
    if (instanceRef.current) {
      instanceRef.current.destroy();
      instanceRef.current = null;
    }
    // Kill all ScrollTrigger instances to prevent ghost triggers on route change.
    ScrollTrigger.killAll();
  }, []);

  return { instanceRef, init, destroy };
}
