'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from '@/lib/gsap';

/**
 * Mouse tracking + hover class state for the custom cursor.
 * Used only by CustomCursor.tsx.
 */
export function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [cursorClasses, setCursorClasses] = useState('w-2 h-2 bg-[#f0f0f0] border-0');

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const expand = useCallback(() => {
    setCursorClasses('w-12 h-12 bg-transparent border-2 border-[#c8f45e]');
  }, []);

  const collapse = useCallback(() => {
    setCursorClasses('w-2 h-2 bg-[#f0f0f0] border-0');
  }, []);

  return { cursorRef, cursorClasses, expand, collapse };
}
