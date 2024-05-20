'use client';
import HeroSection from '@/components/common/hero-section';
import PageLayout from '@/components/layout/page-layout';
import ExploreDestinations from '@/components/section/explore-destinations';
import RegionSelection from '@/components/section/region-selection';
import { Separator } from '@/components/ui/separator';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

function FestivalsContent() {
  const searchparams = useSearchParams();
  const [activeRegion, setActiveRegion] = useState('all');
  const region = searchparams.get('region');

  useEffect(() => {
    if (region) {
      setActiveRegion(region as string);
    }
  }, [region, activeRegion]);
  return (
    <>
      <HeroSection page='festivals' title='매혹적인 축제의 세계' subtitle='지금 시작되는 축제의 향연' />
      <RegionSelection title='축제 지역 탐색' page='festivals' activeRegion={activeRegion}/>
      <Separator className='my-20' />
      {/* <PageLayout>
        <ExploreDestinations />
      </PageLayout> */}
    </>
  );
}

export default function FestivalsPage() {
  return (
    <main>
      <Suspense fallback={<div>loading ...</div>}>
        <FestivalsContent/>
      </Suspense>
    </main>
  );
}
