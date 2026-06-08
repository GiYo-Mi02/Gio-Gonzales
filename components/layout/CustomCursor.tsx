'use client';

import React, { createContext, useContext } from 'react';
import { useCustomCursor } from '@/hooks/useCustomCursor';

// ─── Context (so sections can call expand/collapse) ───────────────────────────

interface CursorContextValue {
  expand: () => void;
  collapse: () => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error('useCursor must be used inside <CustomCursor>');
  return ctx;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CustomCursor({ children }: { children?: React.ReactNode }) {
  const { cursorRef, cursorClasses, expand, collapse } = useCustomCursor();

  return (
    <CursorContext.Provider value={{ expand, collapse }}>
      <div
        id="custom-cursor"
        ref={cursorRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color,border-width] duration-300 ${cursorClasses}`}
      />
      {children}
    </CursorContext.Provider>
  );
}
