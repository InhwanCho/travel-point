import HeroSection from '@/components/common/hero-section';
import PageLayout from '@/components/layout/page-layout';
import RegionSelection from '@/components/section/region-selection';
import { Separator } from '@/components/ui/separator';
import React from 'react';

export default function RecommendedPage() {
  return (
    <main>
      <HeroSection section='recommended' title='여행지 추천' subtitle='당신만의 완벽한 여행지를 발견하세요' />
      <Separator className='my-20' />
      <PageLayout>
        <div>123</div>
      </PageLayout>
    </main>
  );
}
