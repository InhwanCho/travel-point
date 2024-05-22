'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Title from '@/components/common/title';
import { Separator } from '@/components/ui/separator';
import DestinationCard from '@/components/common/destination-card';
import DestinationPagination from '@/components/common/destination-pagination';
import { DestinationType } from '@/types/destination-types';
import { Theme, useThemeStore } from '@/store/themeStore';
import { themeCategories } from '@/types/destination-fetch-props';

interface ExploreDestinationsProps {
  data: DestinationType[];
  region?: string;
  page: string;
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

export default function ExploreDestinations({
  data,
  region,
  page,
  isLoading,
  isError,
  currentPage,
  onPageChange,
  totalPages,
}: ExploreDestinationsProps) {
  const [divideNumber, setDivideNumber] = useState(5);
  const itemsPerPage = 10;

  const selectedTheme = useThemeStore((state) => state.selectedTheme);
  const setSelectedTheme = useThemeStore((state) => state.setSelectedTheme);

  useEffect(() => {
    const handleResize = () => {
      setDivideNumber(calculateDivideNumber(window.innerWidth));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setSelectedTheme('all');
  }, [setSelectedTheme]);

  const calculateDivideNumber = (width: number) => {
    if (width >= 768) return 5;
    if (width >= 640) return 4;
    if (width >= 450) return 3;
    return 2;
  };

  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme);
  };

  if (isLoading) {
    return (
      <section id="mainSection">
        <Title>{region && region !== 'all' ? `${region} 지역의 이런 여행지 어때요?` : '이런 여행지 어때요?'}</Title>
        <Separator />
        <div className="flex h-5 items-center space-x-5 text-sm m-3 pl-1 list-none">
          {page === 'themes' ? (
            <>
              <li>전체</li>
              {Object.keys(themeCategories).filter((theme) => theme !== 'all').map((theme, index) => (
                <React.Fragment key={index}>
                  <Separator orientation="vertical" />
                  <li>{theme}</li>
                </React.Fragment>
              ))}
            </>
          ) : (
            <>
              <li>전체</li>
              <Separator orientation="vertical" />
              <li>후기순</li>
            </>
          )}
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

  return (
    <section id="mainSection">
      <Title>{region && region !== 'all' ? `${region} 지역의 이런 여행지 어때요?` : '이런 여행지 어때요?'}</Title>
      <Separator />

      <div className="flex h-5 items-center space-x-5 text-sm m-3 pl-1 list-none">
        {page === 'themes' ? (
          <>
            <li onClick={() => handleThemeChange('all')} className={`cursor-pointer ${selectedTheme === 'all' ? 'font-semibold' : ''}`}>전체</li>
            {Object.keys(themeCategories).filter((theme) => theme !== 'all').map((theme, index) => (
              <React.Fragment key={index}>
                <Separator orientation="vertical" />
                <li onClick={() => handleThemeChange(theme as Theme)} className={`cursor-pointer ${selectedTheme === theme ? 'font-semibold' : ''}`}>{theme}</li>
              </React.Fragment>
            ))}
          </>
        ) : (
          <>
            <li>전체</li>
            <Separator orientation="vertical" />
            <li>후기순</li>
          </>
        )}
      </div>
      <Separator />

      <section className="p-6 grid grid-cols-2 xsm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-5 gap-y-8 pt-12">
        <Suspense fallback="loading...">
          {data.map((destination, i) => (
            <React.Fragment key={i}>
              <DestinationCard
                className="col-span-1 first:ml-0"
                contentId={destination.contentId}
                imageSrc={destination.firstImage}
                location={destination.location}
                title={destination.title}
                description={destination.destinationDescription}
              />
              <Separator
                className={`${(i + 1) % divideNumber === 0 ? 'block' : 'hidden'}`}
                style={{ gridColumn: `span ${divideNumber} / span ${divideNumber}` }}
              />
            </React.Fragment>
          ))}
        </Suspense>
      </section>
      <div className="flex justify-center pb-8 mt-5">
        <DestinationPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  );
}
