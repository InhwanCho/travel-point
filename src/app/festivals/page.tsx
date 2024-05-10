import HeroSection from '@/components/common/hero-section';
import PageLayout from '@/components/layout/page-layout';
import ExploreDestinations from '@/components/section/explore-destinations';
import RegionSelection from '@/components/section/region-selection';
import { Separator } from '@/components/ui/separator';
import React from 'react';

export default function FestivalsPage() {
  return (
    <main>
      <HeroSection section='festivals' title='매혹적인 축제의 세계' subtitle='지금 시작되는 축제의 향연'/>
      <RegionSelection title='축제 지역 탐색'/>
      <Separator className='my-20'/>
      <PageLayout>
        <ExploreDestinations/>
      </PageLayout>
    </main>
  );
}
