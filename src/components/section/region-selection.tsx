
import React from 'react';
import LinkButton from '@/components/ui/link-button';
import { REGIONS } from '@/data/data';

interface RegionSelectionProps {
  page: 'mainpage' | 'regions' | 'themes' | 'festivals' | 'recommended';
  title: string;
  activeRegion?: string;
}

export default function RegionSelection({ page, title, activeRegion }: RegionSelectionProps) {
  return (
    <nav className='mt-10 max-w-screen-md mx-auto'>
      <h2 className='text-center py-8 font-semibold'>{title}</h2>
      <ul className='flex flex-wrap justify-center gap-4'>
        {page === 'mainpage' ? (REGIONS.map((item, index) => (
          <LinkButton
            href={`/regions?region=${item.name}`}
            key={index}
            className={`text-sm`}
          >
            {item.name}
          </LinkButton>
        ))) :
          page === 'regions' ? (<>
            <LinkButton href='/regions?region=all' className={`text-sm ${activeRegion === 'all' ? 'bg-[#8EB2D6] ring-2 ring-[#8EB2D6]/80 ring-offset-1' : ''}`}>전체</LinkButton>
            {REGIONS.map((item, index) => (
              <LinkButton
                href={`/regions?region=${item.name}`}
                key={index}
                className={`text-sm ${item.name === activeRegion ? 'bg-[#8EB2D6] ring-2 ring-[#8EB2D6]/80 ring-offset-1' : ''}`}
              >
                {item.name}
              </LinkButton>
            ))}
          </>) :
            page === 'themes' ? (<>
              <LinkButton href='/themes?region=all' className={`text-sm ${activeRegion === 'all' ? 'bg-[#E3CDA4]/80 ring-2 ring-[#E3CDA4]/70 ring-offset-1' : ''}`}>전체</LinkButton>
              {REGIONS.map((item, index) => (
                <LinkButton
                  href={`/themes?region=${item.name}`}
                  key={index}
                  className={`text-sm ${item.name === activeRegion ? 'bg-[#E3CDA4]/80 ring-2 ring-[#E3CDA4]/70 ring-offset-1' : ''}`}
                >
                  {item.name}
                </LinkButton>))}
            </>) :
              page === 'festivals' ? (<>
                <LinkButton href='/festivals?region=all' className={`text-sm ${activeRegion === 'all' ? 'bg-teal-600/40 ring-2 ring-teal-600/30 ring-offset-1' : ''}`}>전체</LinkButton>
                {REGIONS.map((item, index) => (
                  <LinkButton
                    href={`/festivals?region=${item.name}`}
                    key={index}
                    className={`text-sm ${item.name === activeRegion ? 'bg-teal-600/40 ring-2 ring-teal-600/30 ring-offset-1' : ''}`}
                  >
                    {item.name}
                  </LinkButton>))}
              </>) : 
                page === 'recommended' ? (<>
                  <LinkButton href='/recommended?region=all' className={`text-sm ${activeRegion === 'all' ? 'bg-blue-500/40 ring-2 ring-blue-500/30 ring-offset-1' : ''}`}>전체</LinkButton>
                  {REGIONS.map((item, index) => (
                    <LinkButton
                      href={`/recommended?region=${item.name}`}
                      key={index}
                      className={`text-sm ${item.name === activeRegion ? 'bg-blue-500/40 ring-2 ring-blue-500/30 ring-offset-1' : ''}`}
                    >
                      {item.name}
                    </LinkButton>))}
                </>): ''}
      </ul>
    </nav>
  );
}
