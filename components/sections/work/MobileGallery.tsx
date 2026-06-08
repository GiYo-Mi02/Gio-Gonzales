'use client';

import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useTransitionRouter } from '@/components/layout/PageTransition';
import { projects } from '@/lib/projects';

const IMAGE_MAP: Record<string, string> = {
  'interactive-dsa': '3.png',
  'snapnotes-ai': '2.png',
  'mr-and-ms-umak-tabulation-system': '7.png',
  'resume-ai-analyzer': '5.png',
  'logistics-management-system': '4.png',
  'web-based-photobooth-application': '6.png',
  'ccis-ticket-automation-system': '8.png',
};

function imagePath(id: string): string | null {
  const file = IMAGE_MAP[id];
  return file ? `/selected-work/${file}` : null;
}

export default function MobileGallery() {
  const isMobile = useIsMobile();
  const { transitionTo } = useTransitionRouter();

  if (!isMobile) return null;

  const firstImageIdx = projects.findIndex(p => imagePath(p.id) !== null);

  return (
    <div className="block md:hidden px-6 space-y-12 mt-16">
      {projects.map((proj, idx) => {
        const src = imagePath(proj.id);
        return (
          <div
            key={proj.id}
            onClick={() => transitionTo(`/work/${proj.id}`)}
            className="border border-[#1e1e1e] bg-[#111111]/20 rounded overflow-hidden flex flex-col cursor-pointer"
          >
            {/* Image */}
            <div className="w-full aspect-[16/10] relative bg-[#111111] border-b border-[#1e1e1e]">
              {src ? (
                <Image
                  src={src}
                  alt={proj.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={idx === firstImageIdx}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-[#111111]">
                  <span className="font-display font-bold text-lg uppercase text-[#f0f0f0] max-w-xs tracking-tight">
                    {proj.title}
                  </span>
                  <span className="font-sans text-[10px] text-[#7a7a7a] uppercase tracking-widest mt-1 block">
                    No Preview Available
                  </span>
                </div>
              )}
            </div>

            {/* Metadata */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] text-[#4a4a4a]">{proj.num}</span>
                <span className="font-mono text-[10px] text-[#4a4a4a]">{proj.year}</span>
              </div>
              <h3 className="font-display font-bold text-xl uppercase text-[#f0f0f0]">
                {proj.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {proj.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 border border-[#1e1e1e] bg-[#161616] text-[#c8f45e] text-[9px] font-mono rounded-full uppercase tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
