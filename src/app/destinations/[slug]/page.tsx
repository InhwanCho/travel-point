'use client';
import HeroSection from '@/components/common/hero-section';
import PageLayout from '@/components/layout/page-layout';
import DestinationBody from '@/components/section/destination/destination-body';
import DestinationHeader from '@/components/section/destination/destination-header';
import { useFetchDestinationById } from '@/hooks/use-fetch-destination';
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface DestinationDetailPageProps {
  params: {
    slug: string;
  };
}

export default function DestinationDetailPage({ params }: DestinationDetailPageProps) {
  
  const searchParams = useSearchParams();    
  const { data, isError, isLoading } = useFetchDestinationById(params.slug);
  const title = searchParams.get('title');
  const location = searchParams.get('location');

  return (
    <main>
      <HeroSection page='destination' title='여행지' subtitle='즐거운 여정' />
      <PageLayout>
        {isLoading ? (
          <>
            <DestinationHeader title={title || 'Loading...'} location={location || 'Loading...'} />
            <DestinationBody isLoading />
          </>
        ) : isError ? (
          <>
            <DestinationHeader title={title || 'Loading...'} location={location || 'Loading...'} />
            <DestinationBody isError />
          </>
        ) : (
          data && (
            <>
              <DestinationHeader title={data.title} location={data.location} />
              <DestinationBody data={data} />
            </>
          )
        )}
      </PageLayout>
    </main>
  );
}
