import React from 'react';
import LinkButton from '@/components/ui/link-button';
import { pageColors, REGIONS } from '@/data/data';
import { RegionName } from '@/types/region-type';

type PageName = keyof typeof pageColors;

interface RegionSelectionProps {
  page: PageName;
  title: string;
  activeRegion?: RegionName;
}

function getStyles(page: PageName, active: boolean) {
  const styles = pageColors[page];
  if (!styles.bg || !styles.ring) return '';

  return active ? `${styles.bg} ${styles.ring === 'ring-0' ? 'ring-0' : `ring-2 ring-offset-1 ${styles.ring}`}` : '';
}

export default function RegionSelection({ page, title, activeRegion }: RegionSelectionProps) {
  return (
    <nav className="mt-10 max-w-screen-md mx-auto">
      <h2 className="text-center py-8 font-semibold">{title}</h2>
      <ul className="flex flex-wrap justify-center gap-4">
        {page === 'mainpage' ? (
          REGIONS.map((item, index) => (
            <LinkButton href={`/regions?region=${item.name}`} key={index} className="text-sm">
              {item.name}
            </LinkButton>
          ))
        ) : (
          <>
            <LinkButton
              href={`/${page}?region=all`}
              className={`text-sm ${getStyles(page, activeRegion === 'all')}`}
            >
              전체
            </LinkButton>
            {REGIONS.map((item, index) => (
              <LinkButton
                href={`/${page}?region=${item.name}`}
                key={index}
                className={`text-sm ${getStyles(page, item.name === activeRegion)}`}
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
