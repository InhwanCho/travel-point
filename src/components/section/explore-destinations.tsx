'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Title from '@/components/common/title';
import { Separator } from '@/components/ui/separator';
import DestinationCard from '@/components/common/destination-card';
import DestinationPagination from '../common/destination-pagination';

const destinations = [
  { location: '강원특별자치도 춘천시', title: '대관령 삼양목장', description: '정답게 이야기를 나눌 수 있는' },
  { location: '서울특별시', title: 'N서울타워', description: '도시 전망을 즐길 수 있는' },
  { location: '부산광역시', title: '해운대 해수욕장', description: '멋진 해변 경치를 가진' },
  { location: '경상북도 경주시', title: '불국사', description: '문화 유산을 경험할 수 있는' },
  { location: '제주특별자치도', title: '한라산', description: '자연 경관을 감상할 수 있는' },
  { location: '전라남도 여수시', title: '여수 엑스포', description: '바다와 문화를 체험할 수 있는' },
  { location: '충청북도 단양군', title: '단양 도담삼봉', description: '자연이 아름다운' },
  { location: '전라북도 군산시', title: '군산 선유도', description: '해양 풍경을 만끽할 수 있는' },
  { location: '제주특별자치도', title: '한라산', description: '자연 경관을 감상할 수 있는' },
  { location: '전라남도 여수시', title: '여수 엑스포', description: '바다와 문화를 체험할 수 있는' },
  { location: '충청북도 단양군', title: '단양 도담삼봉', description: '자연이 아름다운' },
  { location: '전라북도 군산시', title: '군산 선유도', description: '해양 풍경을 만끽할 수 있는' },
  { location: '제주특별자치도', title: '한라산', description: '자연 경관을 감상할 수 있는' },
  { location: '전라남도 여수시', title: '여수 엑스포', description: '바다와 문화를 체험할 수 있는' },
  { location: '충청북도 단양군', title: '단양 도담삼봉', description: '자연이 아름다운' },
  { location: '전라북도 군산시', title: '군산 선유도', description: '해양 풍경을 만끽할 수 있는' },
];

export default function ExploreDestinations() {
  const [divideNumber, setDivideNumber] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // 클라이언트 사이드에서만 실행되도록 보장
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDestinations = destinations.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(destinations.length / itemsPerPage);

  return (
    <section id="mainSection">
      <Title>이런 여행지 어때요?</Title>
      <Separator />
      <div className="flex h-5 items-center space-x-5 text-sm m-3 pl-1">
        <div>전체</div>
        <Separator orientation="vertical" />
        <div>후기순</div>
        <Separator orientation="vertical" />
        <div>별점순</div>
      </div>
      <Separator />
      <section className="p-6 grid grid-cols-2 xsm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-5 gap-y-8 pt-12">
        <Suspense fallback="loading...">
          {paginatedDestinations.map((destination, i) => (
            <React.Fragment key={i}>
              <DestinationCard
                className="col-span-1 first:ml-0"
                location={destination.location}
                title={destination.title}
                description={destination.description}
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
