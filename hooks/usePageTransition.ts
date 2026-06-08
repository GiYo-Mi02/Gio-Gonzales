'use client';

import { useRef, useCallback, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from '@/lib/gsap';

/**
 * All GSAP overlay animation logic for page transitions.
 * Returns refs for the overlay DOM elements and the transitionTo function.
 * Used only by PageTransition.tsx.
 */
export function usePageTransition() {
  const router   = useRouter();
  const pathname = usePathname();

  const overlayRef  = useRef<HTMLDivElement | null>(null);
  const lettersRef  = useRef<HTMLDivElement | null>(null);
  const gRef1       = useRef<HTMLSpanElement | null>(null);
  const jRef        = useRef<HTMLSpanElement | null>(null);
  const gRef2       = useRef<HTMLSpanElement | null>(null);
  const svgRef      = useRef<SVGSVGElement | null>(null);
  const lineRef     = useRef<SVGLineElement | null>(null);
  const isAnimating = useRef(false);
  const isFirstMount = useRef(true);

  const prepareLine = useCallback(() => {
    if (!lettersRef.current || !svgRef.current || !lineRef.current) return;
    const w = lettersRef.current.getBoundingClientRect().width;
    const safeW = w > 0 ? w : window.innerWidth * 0.36;
    svgRef.current.setAttribute('width', String(safeW));
    lineRef.current.setAttribute('x2', String(safeW));
    lineRef.current.style.strokeDasharray  = String(safeW);
    lineRef.current.style.strokeDashoffset = String(safeW);
  }, []);

  const playEnter = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const letters = [gRef1.current, jRef.current, gRef2.current];
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { yPercent: 100, pointerEvents: 'none' });
        isAnimating.current = false;
      },
    });
    tl.to([...letters, lineRef.current], { opacity: 0, duration: 0.2, ease: 'power2.out' });
    tl.to(overlay, { yPercent: -100, duration: 0.5, ease: 'power3.inOut' });
  }, []);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      gsap.set(overlayRef.current, { yPercent: 100, pointerEvents: 'none' });
      return;
    }
    playEnter();
  }, [pathname, playEnter]);

  const transitionTo = useCallback(
    (url: string) => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      const overlay = overlayRef.current;
      if (!overlay) { router.push(url); return; }
      const letters = [gRef1.current, jRef.current, gRef2.current];
      gsap.set(overlay, { pointerEvents: 'all' });
      gsap.set(letters, { y: 40, opacity: 0 });
      gsap.set(lineRef.current, { opacity: 0 });
      const tl = gsap.timeline();
      tl.fromTo(overlay, { yPercent: 100 }, {
        yPercent: 0, duration: 0.5, ease: 'power3.inOut',
        onComplete: () => { prepareLine(); gsap.set(lineRef.current, { opacity: 1 }); },
      });
      tl.to(letters, { y: 0, opacity: 1, duration: 0.13, stagger: 0.08, ease: 'power3.out' });
      tl.to(lineRef.current, { strokeDashoffset: 0, duration: 0.3, ease: 'power2.inOut' });
      tl.call(() => { router.push(url); });
    },
    [router, prepareLine]
  );

  return { overlayRef, lettersRef, gRef1, jRef, gRef2, svgRef, lineRef, transitionTo };
}
