import HeroSection from '@/components/common/hero-section';
import PageLayout from '@/components/layout/page-layout';
import ExploreDestinations from '@/components/section/explore-destinations';
import RegionSelection from '@/components/section/region-selection';
import TrendingDestinations from '@/components/section/trending-destinations';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { Link } from 'next-view-transitions';

export default function RegionsPage() {
  return (
    <main>
      <HeroSection title='매력적인 지역 여행지' subtitle='여러분을 기다리는 특별한 장소들' />
      <RegionSelection title='여행지 지역 탐색' />
      <Separator className='my-20' />
      <PageLayout>
        <ExploreDestinations />
        <Separator className='my-20' />
        <TrendingDestinations />
      </PageLayout>
    </main>
  );
}
