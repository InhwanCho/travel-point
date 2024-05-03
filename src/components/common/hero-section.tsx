import React from 'react';

interface HeroSectionProps{
  title:string;
  subtitle:string;
}

export default function HeroSection({title,subtitle}:HeroSectionProps) {
  return (
    <section className='h-28 bg-[#8EB2D6] w-full'>
      <div className="mx-auto max-w-[1050px] px-4 sm:px-6 lg:px-8 flex items-center h-full">
        <div className="flex items-end justify-start gap-3">
          <h2 className='font-bold text-base lg:text-xl'>{title}</h2>
          <p className='text-xs lg:text-sm'>{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
