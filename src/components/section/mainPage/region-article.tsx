'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import DestinationCard from '@/components/common/destination-card';
import CardLayout from '@/components/layout/card-layout';

export default function RegionArticle({ region }: { region: string }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2; // 한 페이지에 표시할 아이템 수
  const totalItems = 10; // 총 아이템 수, 실제 데이터 배열 길이로 대체 가능
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 데이터 예시
  const destinations = [...Array(totalItems)].map((_, i) => ({
    location: '강원특별자치도 춘천시',
    title: `대관령 삼양목장${i}`,
    description: '정답게 이야기를 나눌 수 있는 정답게 이야기를 나눌 수 있는 정답게 이야기를 나눌 수 있는 정답게 이야기를 나눌 수 있는 정답게 이야기를 나눌 수 있는'
  }));

  // 다음 페이지로 이동
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(0); // 마지막 페이지에서는 다시 처음으로
    }
  };
  
  return (
    <article className='flex flex-col col-span-1 py-2 sm:border-none border-b sm:pb-0 pb-8'>
      <header className='flex flex-col'>
        <h2 className='font-bold pb-1 text-lg sm:text-xl'>{region} 여행지 추천</h2>
        <nav className='justify-end flex pb-2'>
          <button className='items-center cursor-pointer inline-block'
            onClick={() => { router.push(`/regions`); }}>
            <span className='flex items-center text-sm'>더보기 <ChevronRight className='size-[15px] ml-[3px]' strokeWidth={1} /></span>
          </button>
        </nav>
      </header>
      <CardLayout className='gap-6' isTwo>
        {destinations.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((item, i) => (
          <DestinationCard key={i} location={item.location} title={item.title} description={item.description} />
        ))}
      </CardLayout>
      <nav className='flex justify-center pt-10'>
        <button onClick={handleNextPage}>
          <span className='flex justify-center text-sm border px-8 py-2 rounded-sm'>다른 여행지 추천 {currentPage + 1} <span className='text-slate-400 pl-1'>/ {totalPages}</span></span>
        </button>
      </nav>
    </article>
  );
}
