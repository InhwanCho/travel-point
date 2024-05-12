'use client';
import HeroSection from '@/components/common/hero-section';
import PageLayout from '@/components/layout/page-layout';
import ExploreDestinations from '@/components/section/explore-destinations';
import RegionSelection from '@/components/section/region-selection';
import TrendingDestinations from '@/components/section/mainPage/trending-destinations';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function RegionsPage() {
  const searchparams = useSearchParams();
  const [activeRegion, setActiveRegion] = useState('all');
  const region = searchparams.get('region');

  useEffect(() => {
    if (region) {
      setActiveRegion(region as string);
    }
  }, [region, activeRegion]);

  return (
    <main>
      <HeroSection page='regions' title='매력적인 지역 여행지' subtitle='여러분을 기다리는 특별한 장소들' />
      <RegionSelection page='regions' title='여행지 지역 탐색' activeRegion={activeRegion} />
      <Separator className='my-20' />
      <PageLayout>
        <ExploreDestinations />
        <Separator className='my-20' />
        <TrendingDestinations />
      </PageLayout>
    </main>
  );
}
