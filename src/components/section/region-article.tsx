'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { ChevronRight } from 'lucide-react';
import DestinationCard from '../common/destination-card';
import CardLayout from '../layout/card-layout';

export default function RegionArticle({ region }: { region: string }) {
  const router = useRouter();
  return (
    <article className='flex flex-col col-span-1 py-2 sm:border-none border-b sm:pb-0 pb-8'>
      <header className='flex flex-col'>
        <h2 className='font-bold pb-1 text-lg sm:text-xl'>{region} 여행지 추천</h2>
        <nav className='justify-end flex pb-2'>
          <button className='items-center cursor-pointer inline-block'
            onClick={() => { router.push(`/regions/${region}`); }}>
            <span className='flex items-center text-sm'>더보기 <ChevronRight className='size-[15px] ml-[3px]' strokeWidth={1} /></span>
          </button>
        </nav>
      </header>
      <CardLayout className='gap-6' isTwo>
        {[...Array(2)].map((item, i) => (
          <DestinationCard key={i} location='강원특별자치도 춘천시' title='대관령 삼양목장' description='정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는' />
        ))}
      </CardLayout>
      <nav className='flex justify-center pt-10'>
        <button onClick={() => { }}>
          <span className='flex justify-center text-sm border px-8 py-2 rounded-sm'>다른 여행지 추천 1 <span className='text-slate-400 pl-1'>/ 5</span></span>
        </button>
      </nav>
    </article >
  );
}
