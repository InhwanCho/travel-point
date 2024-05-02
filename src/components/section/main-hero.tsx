import Image from 'next/image';
import React from 'react';

export default function MainHero() {
  return (
    <section className='bg-[#8EB2D6] flex justify-center items-center w-full'>
      <div className='relative max-w-[1200px] w-full h-auto max-h-[450px]'>
        <Image
          src='/img/해운대.png'          
          width={1200}
          height={450}
          className='max-h-[450px]'
          alt='해운대 hero image'
        />
      </div>
    </section>
  );
}
