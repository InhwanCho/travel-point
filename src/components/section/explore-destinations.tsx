'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Title from '@/components/common/title';
import { Separator } from '@/components/ui/separator';
import DestinationCard from '@/components/common/destination-card';
import DestinationPagination from '../common/destination-pagination';

import { DestinationType } from '@/types/att-area-types';
import { useFetchDestination } from '@/hooks/use-fetch-destination';
import { REGIONS } from '@/data/data';

export default function ExploreDestinations({ region, page }: { region?: string, page?: string }) {
  const [divideNumber, setDivideNumber] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setDivideNumber(calculateDivideNumber(window.innerWidth));

    const handleResize = () => {
      const newWidth = window.innerWidth;
      setDivideNumber(calculateDivideNumber(newWidth));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function calculateDivideNumber(width: number) {
    if (width >= 768) {
      return 5;
    } else if (width >= 640) {
      return 4;
    } else if (width >= 450) {
      return 3;
    } else {
      return 2;
    }
  }
  const regionPath = REGIONS.find((r) => r.name === region)?.path || '';

  const { data, isLoading, isError } = useFetchDestination({ areaName: regionPath, count: (itemsPerPage * 5).toString() });

  if (isLoading) {
    return (
      <section id="mainSection">
        <Title>{region ? region + ' 지역의' : ''} 이런 여행지 어때요?</Title>
        <Separator />
        <div className="flex h-5 items-center space-x-5 text-sm m-3 pl-1">
          <div>전체</div>
          <Separator orientation="vertical" />
          <div>후기순</div>
        </div>
        <Separator />
        <section className="p-6 grid grid-cols-2 xsm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-5 gap-y-8 pt-12">
          {[...Array(itemsPerPage)].map((_, i) => (
            <DestinationCard key={i} isLoading />
          ))}
        </section>
      </section>
    );
  }

  if (isError) {
    return <div>Error loading destinations.</div>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDestinations = (data as DestinationType[]).slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil((data as DestinationType[]).length / itemsPerPage);

  return (
    <section id="mainSection">
      <Title>{region ? region + ' 지역의' : ''} 이런 여행지 어때요?</Title>
      <Separator />
      <div className="flex h-5 items-center space-x-5 text-sm m-3 pl-1">
        <div>전체</div>
        <Separator orientation="vertical" />
        <div>후기순</div>
      </div>
      <Separator />
      <section className="p-6 grid grid-cols-2 xsm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-5 gap-y-8 pt-12">
        <Suspense fallback="loading...">
          {paginatedDestinations.map((destination, i) => (
            <React.Fragment key={i}>
              <DestinationCard
                className="col-span-1 first:ml-0"
                imageSrc={destination.firstimage}
                location={destination.location}
                title={destination.title}
                description={destination.destinationDescription}
              />
              <Separator
                className={`${(i + 1) % divideNumber === 0 ? 'block' : 'hidden'}`}
                style={{
                  gridColumn: `span ${divideNumber} / span ${divideNumber}`,
                }}
              />
            </React.Fragment>
          ))}
        </Suspense>
      </section>
      <div className="flex justify-center pb-8 mt-5">
        <DestinationPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
}
