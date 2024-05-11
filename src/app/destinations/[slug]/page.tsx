import HeroSection from '@/components/common/hero-section';
import PageLayout from '@/components/layout/page-layout';
import DestinationBody from '@/components/section/destination/destination-body';
import DestinationHeader from '@/components/section/destination/destination-header';
import React from 'react';

interface DestinationDetailPageProps {
  params: {
    slug: string;
  };
}

export default function DestinationDetailPage({ params }: DestinationDetailPageProps) {
  const decodedSlug = decodeURIComponent(params.slug);
  return (
    <main>
      <HeroSection title='여행지' subtitle='즐거운 여정' />
      <PageLayout>
        <DestinationHeader slug={decodedSlug} />
        <DestinationBody slug={decodedSlug} />
      </PageLayout>
    </main>
  );
}
