import type {Metadata} from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css'; // Global styles
import PageTransitionProvider from '@/components/layout/PageTransition';
import CustomCursor from '@/components/layout/CustomCursor';
import OverflowLock from '@/components/layout/OverflowLock';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gio Joshua Gonzales | Full Stack Developer & Designer',
  description: 'Gio Joshua Gonzales is a Full Stack Developer & Designer based in the Philippines, specialized in building precision-built web applications.',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} antialiased selection:bg-[#c8f45e] selection:text-[#0a0a0a]`}>
      <head>
        {/* Link for Locomotive Scroll CSS */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.css"
        />
        {/* Link for Devicons CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="bg-[#0a0a0a] text-[#f0f0f0] min-h-screen overflow-x-hidden" suppressHydrationWarning>
        {/* Ensures html & body always have overflow:hidden so only Locomotive scrolls */}
        <OverflowLock />
        <PageTransitionProvider>
          <CustomCursor>
            {children}
          </CustomCursor>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
