'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Title from '@/components/common/title';
import { Separator } from '@/components/ui/separator';
import DestinationCard from '@/components/common/destination-card';

import DestinationPagination from '../common/destination-pagination';

export default function ExploreDestinations() {

  const [divideNumber, setDivideNumber] = useState(5);

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

  return (
    <section>
      <Title>이런 여행지 어때요?</Title>
      <Separator />
      <div className="flex h-5 items-center space-x-5 text-sm m-3 pl-1">
        <div>전체</div>
        <Separator orientation="vertical" className='' />
        <div>후기순</div>
        <Separator orientation="vertical" />
        <div>별점순</div>
      </div>
      <Separator />
      <section className='p-6 grid grid-cols-2 xsm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-5 gap-y-8 pt-12'>
        <Suspense fallback='loading...'>
          {[...Array(20)].map((item, i) => (
            <React.Fragment key={i}>
              <DestinationCard
                className="col-span-1 first:ml-0"
                location='강원특별자치도 춘천시'
                title='대관령 삼양목장'
                description='정답게 이야기를 나눌 수 있는...'
              />
              {/* 경계선 */}
              <Separator className={`${(i + 1) % divideNumber === 0 ? `last:hidden` : 'hidden'}`} style={{ gridColumn: `span ${divideNumber} / span ${divideNumber}`, display: (i + 1) % divideNumber === 0 ? 'block' : 'none' }} />

            </React.Fragment>
          ))}
        </Suspense>
      </section>
      <div className='flex justify-center pb-8 mt-5'>
        <DestinationPagination />
      </div>
    </section>
  );
}
