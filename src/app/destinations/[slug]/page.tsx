import HeroSection from '@/components/common/hero-section';
import PageLayout from '@/components/layout/page-layout';
import DestinationBody from '@/components/section/destination-body';
import DestinationHeader from '@/components/section/destination-header';
import React from 'react';

interface DestinationDetailPageProps {
  params: {
    slug: string;
  };
}

export default function DestinationDetailPage({ params }: DestinationDetailPageProps) {

  return (
    <main>
      <HeroSection title='여행지' subtitle='즐거운 여정' />
      <PageLayout>
        <DestinationHeader />
        <DestinationBody/>
        
      </PageLayout>
    </main>
  );
}
