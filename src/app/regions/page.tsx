'use client';
import HeroSection from '@/components/common/hero-section';
import PageLayout from '@/components/layout/page-layout';
import ExploreDestinations from '@/components/section/explore-destinations';
import RegionSelection from '@/components/section/region-selection';
import { Separator } from '@/components/ui/separator';
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFetchDestination } from '@/hooks/use-fetch-destination';
import { REGIONS } from '@/data/data';


function RegionsContent() {
  const searchparams = useSearchParams();
  const [activeRegion, setActiveRegion] = useState('all');
  const region = searchparams.get('region') ?? 'all';
  const regionPath = region === 'all' ? '' : REGIONS.find((r) => r.name === region)?.path || '';
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (region) {
      setActiveRegion(region);
    }
  }, [region, activeRegion]);

  const { data, isLoading, isError } = useFetchDestination({ areaName: regionPath, count: '10', page: currentPage.toString() });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <RegionSelection page='regions' title='여행지 지역 탐색' activeRegion={activeRegion} />
      <Separator className='my-10 sm:my-20' />
      <PageLayout>
        <ExploreDestinations
          data={data || []}
          region={region}
          page='regions'
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

export default function RegionsPage() {
  return (
    <main>
      <HeroSection page='regions' title='매력적인 지역 여행지' subtitle='여러분을 기다리는 특별한 장소들' />
      <Suspense fallback={<div>Loading...</div>}>
        <RegionsContent />
      </Suspense>
    </main>
  );
}
