'use client';
import HeroSection from '@/components/common/hero-section';
import PageLayout from '@/components/layout/page-layout';
import DestinationBody from '@/components/section/destination/destination-body';
import DestinationHeader from '@/components/section/destination/destination-header';
import { useFetchDestinationById } from '@/hooks/use-fetch-destination';
import React from 'react';

interface DestinationDetailPageProps {
  params: {
    slug: string;
  };
}

export default function DestinationDetailPage({ params }: DestinationDetailPageProps) {  
  const { data, error, isLoading } = useFetchDestinationById(params.slug);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading destination</div>;
  if (!data ) return <div>No data found</div>;
  return (
    <main>
      <HeroSection page='destination' title='여행지' subtitle='즐거운 여정' />      
      <PageLayout>                
        <DestinationHeader title={data.title} location={data.location}/>
        <DestinationBody data={data} />
      </PageLayout>
    </main>
  );
}
