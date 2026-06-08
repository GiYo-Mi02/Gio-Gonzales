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
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      } else {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  return null;
}
