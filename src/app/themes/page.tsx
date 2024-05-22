'use client';
import HeroSection from '@/components/common/hero-section';
import PageLayout from '@/components/layout/page-layout';
import ExploreDestinations from '@/components/section/explore-destinations';
import RegionSelection from '@/components/section/region-selection';
import { Separator } from '@/components/ui/separator';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { useFetchThemeDestinationByCat } from '@/hooks/use-fetch-destination';
import { useThemeStore } from '@/store/themeStore';
import { themeCategories } from '@/types/destination-fetch-props';
import { REGIONS } from '@/data/data';

function ThemesContent() {
  const searchparams = useSearchParams();
  const [activeRegion, setActiveRegion] = useState<keyof typeof themeCategories>('all');
  const region = searchparams.get('region') ?? 'all';
  const regionPath = REGIONS.find((r) => r.name === region)?.path || '';

  const selectedTheme = useThemeStore((state) => state.selectedTheme);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useFetchThemeDestinationByCat({ areaName: regionPath, count: '10', page: currentPage.toString(), theme: selectedTheme });

  useEffect(() => {
    if (region) {
      setActiveRegion(region as keyof typeof themeCategories);
    }
  }, [region, activeRegion]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <RegionSelection title='테마 여행 지역 탐색' page='themes' activeRegion={activeRegion} />
      <Separator className='my-20' />
      <PageLayout>
        <ExploreDestinations
          data={data || []}
          region={region}
          page='themes'
          isLoading={isLoading}
          isError={isError}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={10}
        />
      </PageLayout>
    </>
  );
}

export default function ThemesPage() {
  return (
    <main>
      <HeroSection page='themes' title='테마로 떠나는 여행스토리' subtitle='개성 넘치는 테마 여행과 함께하세요' />
      <Suspense fallback={<div>loading ...</div>}>
        <ThemesContent />
      </Suspense>
    </main>
  );
}
