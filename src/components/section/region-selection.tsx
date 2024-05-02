import { REGIONS } from '@/config/site-config';
import React from 'react';
import LinkButton from '@/components/ui/link-button';

export default function RegionSelection() {
  return (
    <nav className='mt-10 max-w-screen-md mx-auto'>
      <h2 className='text-center py-8 font-semibold'>다른 지역 여행지 구경가기</h2>
      <ul className='flex flex-wrap justify-center gap-4'>
        {REGIONS.map((item, index) => (
          <LinkButton href={item.path} key={index} className='text-sm'>
            {item.name}
          </LinkButton>
        ))}
      </ul>
    </nav>
  );
}