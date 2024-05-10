import React from 'react';

interface HeroSectionProps {
  section: 'regions' | 'themes' | 'festivals' | 'recommended' | 'mypage';
  title: string;
  subtitle: string;
}

export default function HeroSection({ title, subtitle, section }: HeroSectionProps) {
  return (
    <section className={`h-28 w-full ${section === 'regions' ? 'bg-[#8EB2D6]' :
      section === 'themes' ? 'bg-[#E3CDA4]/80' :
        section === 'festivals' ? 'bg-teal-600/40' :
          section === 'recommended' ? 'bg-blue-500/40' :
            section === 'mypage' ? 'bg-[#8EB2D6]' : ''}`}>
      <div className="mx-auto max-w-[1050px] px-4 sm:px-6 lg:px-8 flex items-center h-full">
        <div className="flex items-end justify-start gap-3">
          <h2 className='font-bold text-base lg:text-xl'>{title}</h2>
          <p className='text-xs lg:text-sm'>{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
