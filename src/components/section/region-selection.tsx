import React from 'react';
import LinkButton from '@/components/ui/link-button';
import { pageColors, REGIONS } from '@/data/data';
import { RegionName } from '@/types/region-type';

type PageName = keyof typeof pageColors;

interface RegionSelectionProps {
  page: PageName;
  title: string;
  activeRegion?: RegionName;
  onRegionChange?: (region: string) => void;
}

export function getStyles(page: PageName, active: boolean) {
  const { bg, ring } = pageColors[page];
  if (!bg || !ring) return '';
  
  const baseRing = ring === 'ring-0' ? 'ring-0' : `${ring} ring-2 ring-offset-1`;
  return active ? `${bg} ${baseRing} hover:${ring}` : ring;
}

export default function RegionSelection({ page, title, activeRegion, onRegionChange }: RegionSelectionProps) {
  return (
    <nav className="mt-10 max-w-screen-md mx-auto">
      <h2 className="text-center py-8 font-semibold">{title}</h2>
      <ul className="flex flex-wrap justify-center gap-4">
        {page === 'mainpage' ? (
          REGIONS.map((item, index) => (
            <LinkButton href={`/regions?region=${item.name}`} key={index} className="hover:ring-slate-500/80 ">
              {item.name}
            </LinkButton>
          ))
        ) :
          page === 'recommended' ?
            (<>
              <button
                className={`text-sm ${getStyles(page, activeRegion === 'all')} rounded-full border px-4 py-1 hover:ring-2 ring-offset-1 transition-all`}
                onClick={() => onRegionChange && onRegionChange('all')}
              >
                전체
              </button>
              {REGIONS.map((item, index) => (
                <button
                  key={index}
                  className={`text-sm ${getStyles(page, item.name === activeRegion)} rounded-full border px-4 py-1 hover:ring-2 ring-offset-1 transition-all`}
                  onClick={() => onRegionChange && onRegionChange(item.name)}
                >
                  {item.name}
                </button>
              ))}
            </>)
            : (
              <>
                <LinkButton
                  href={`/${page}?region=all`}
                  className={`${getStyles(page, activeRegion === 'all')}`}
                >
                  전체
                </LinkButton>
                {REGIONS.map((item, index) => (
                  <LinkButton
                    href={`/${page}?region=${item.name}`}
                    key={index}
                    className={`${getStyles(page, item.name === activeRegion)}`}
                  >
                    {item.name}
                  </LinkButton>
                ))}
              </>
            )}
      </ul>
    </nav>
  );
}
