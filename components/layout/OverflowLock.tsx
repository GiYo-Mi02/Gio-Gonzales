'use client';

import { useEffect } from 'react';

/**
 * OverflowLock — imperatively sets overflow:hidden on <html> and <body>
 * to prevent a native scrollbar appearing alongside Locomotive's virtual scroll.
 * This is a client component so it can use useEffect without breaking the
 * Server Component boundary of layout.tsx.
 */
export default function OverflowLock() {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }, []);

  return null;
}
