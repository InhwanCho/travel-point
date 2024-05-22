'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Title from '@/components/common/title';
import { Separator } from '@/components/ui/separator';
import DestinationCard from '@/components/common/destination-card';
import DestinationPagination from '../common/destination-pagination';
import { DestinationType } from '@/types/destination-types';
import { Theme, useThemeStore } from '@/store/themeStore';
import { themeCategories } from '@/types/destination-fetch-props';

interface ExploreDestinationsProps {
  data: DestinationType[];
  region?: string;
  page: string;
  isLoading: boolean;
  isError: boolean;
}

export default function ExploreDestinations({ data, region, page, isLoading, isError }: ExploreDestinationsProps) {
  const [divideNumber, setDivideNumber] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Zustand 상태 가져오기
  const selectedTheme = useThemeStore((state) => state.selectedTheme);
  const setSelectedTheme = useThemeStore((state) => state.setSelectedTheme);

  useEffect(() => {
    // 윈도우 크기 변경 시 divideNumber 업데이트
    const handleResize = () => {
      setDivideNumber(calculateDivideNumber(window.innerWidth));
    };

    handleResize(); // 초기 설정
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setSelectedTheme('all');
  }, [setSelectedTheme]);

  // 화면 크기에 따라 나눌 개수 계산
  const calculateDivideNumber = (width: number) => {
    if (width >= 768) return 5;
    if (width >= 640) return 4;
    if (width >= 450) return 3;
    return 2;
  };

  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme);
  };

  // 로딩 섹션
  if (isLoading) {
    return (
      <section id="mainSection">
        <Title>{region && region !== 'all' ? `${region} 지역의 이런 여행지 어때요?` : '이런 여행지 어때요?'}</Title>
        <Separator />
        <div className="flex h-5 items-center space-x-5 text-sm m-3 pl-1 list-none">
          {page === 'themes' ? (
            <>
              <li>전체</li>
              {Object.keys(themeCategories).filter(theme => theme !== 'all').map((theme, index) => (
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDestinations = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <section id="mainSection">
      {/* 타이틀 */}
      <Title>{region && region !== 'all' ? `${region} 지역의 이런 여행지 어때요?` : '이런 여행지 어때요?'}</Title>
      <Separator />

      {/* 필터 섹션 */}
      <div className="flex h-5 items-center space-x-5 text-sm m-3 pl-1 list-none">
        {page === 'themes' ? (
          <>
            <li onClick={() => handleThemeChange('all')} className={`cursor-pointer ${selectedTheme === 'all' ? 'font-semibold' : ''}`}>전체</li>
            {Object.keys(themeCategories).filter(theme => theme !== 'all').map((theme, index) => (
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

      {/* 메인 여행지 섹션 */}
      <section className="p-6 grid grid-cols-2 xsm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-5 gap-y-8 pt-12">
        <Suspense fallback="loading...">
          {paginatedDestinations.map((destination, i) => (
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
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
}
