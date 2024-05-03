import { REGIONS } from '@/config/site-config';
import React from 'react';
import LinkButton from '@/components/ui/link-button';

interface RegionSelectionProps {
  title: string
  hasTotal?: boolean
}

export default function RegionSelection({ title, hasTotal }: RegionSelectionProps) {

  return (
    <nav className='mt-10 max-w-screen-md mx-auto'>
      <h2 className='text-center py-8 font-semibold'>{title}</h2>
      <ul className='flex flex-wrap justify-center gap-4'>
        {REGIONS.map((item, index) => (
          <LinkButton href={'/regions'} key={index} className='text-sm' >
            {item.name}
          </LinkButton>
        ))}
      </ul>
    </nav>
  );
}