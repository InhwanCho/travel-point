'use client';

import React, { useEffect, useState } from 'react';
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

// 브라우저 창 크기에 따라 카드 나누는 수를 계산하는 함수
function calculateDivideNumber(width: number): number {
  if (width >= 768) return 5;
  if (width >= 640) return 4;
  if (width >= 450) return 3;
  return 2;
}

// 필터 - 테마 변경함수
function handleThemeChange(theme: Theme, setSelectedTheme: (theme: Theme) => void) {
  setSelectedTheme(theme);
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
    // 창 크기 변경 시 divideNumber를 업데이트하는 함수
    const handleResize = () => {
      setDivideNumber(calculateDivideNumber(window.innerWidth));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // 컴포넌트 마운트 시 테마를 'all'로 설정
    setSelectedTheme('all');
  }, [setSelectedTheme]);

  return (
    <section id="mainSection">
      <Title>{region && region !== 'all' ? `${region} 지역의 이런 여행지 어때요?` : '이런 여행지 어때요?'}</Title>
      <Separator />

      <div className="flex h-5 items-center space-x-5 text-sm m-3 pl-1 list-none">
        {page === 'themes' ? (
          <>
            <li
              onClick={() => handleThemeChange('all', setSelectedTheme)}
              className={`cursor-pointer ${selectedTheme === 'all' ? 'font-semibold' : ''}`}
            >
              전체
            </li>
            {Object.keys(themeCategories).filter((theme) => theme !== 'all').map((theme, index) => (
              <React.Fragment key={index}>
                <Separator orientation="vertical" />
                <li
                  onClick={() => handleThemeChange(theme as Theme, setSelectedTheme)}
                  className={`cursor-pointer ${selectedTheme === theme ? 'font-semibold' : ''}`}
                >
                  {theme}
                </li>
              </React.Fragment>
            ))}
          </>
        ) : (
          // 나중에 수정해야됨
          <>
            <li>전체</li>
            <Separator orientation="vertical" />
            <li>후기순</li>
          </>
        )}
      </div>
      <Separator />

      <section className="p-6 grid grid-cols-2 xsm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-5 gap-y-8 pt-12">
        {isLoading ?
          [...Array(itemsPerPage)].map((_, i) => (
            <DestinationCard key={i} isLoading />
          )) : isError ?
            [...Array(itemsPerPage)].map((_, i) => (
              <DestinationCard key={i} isError />
            ))
            : data.map((destination, i) => (
              <React.Fragment key={i}>
                <DestinationCard
                  isSmallSize
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
      </section>

      <DestinationPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </section>
  );
}
