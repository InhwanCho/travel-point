import HeroSection from '@/components/common/hero-section';
import PageLayout from '@/components/layout/page-layout';
import ExploreDestinations from '@/components/section/explore-destinations';
import RegionSelection from '@/components/section/region-selection';
import { Separator } from '@/components/ui/separator';
import React from 'react';

export default function ThemesPage() {
  return (
    <main>
      <HeroSection title='테마로 떠나는 여행스토리' subtitle='개성 넘치는 테마 여행과 함께하세요'/>
      <RegionSelection title='테마 여행 지역 탐색'/>
      <Separator className='my-20'/>
      <PageLayout>
        <ExploreDestinations/>
      </PageLayout>
    </main>
  );
}
