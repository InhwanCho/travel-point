'use client';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import DestinationCard from '@/components/common/destination-card';
import { Separator } from '../ui/separator';
import Title from './title';

interface ThemeCardProps {
  isSecondCard?: boolean
}

export default function ThemeCard({ isSecondCard = false }: ThemeCardProps) {
  const router = useRouter();
  return (
    <>
      {isSecondCard &&
        <><Separator className='block md:hidden' />
          <Title className='flex md:hidden'>당신만의 여행 취향 찾기2</Title></>
      }
      <div className='relative mb-[260px] md:mb-[200px]'>
        <div className='absolute -top-7 right-0'>
          <button className='items-center cursor-pointer inline-block'
            onClick={() => { router.push(`/themes`); }}>
            <span className='flex items-center text-sm'>더보기 <ChevronRight className='size-[15px] ml-[3px]' strokeWidth={1} /></span>
          </button>
        </div>
        <Image width={420} height={300} src={'/img/sample.avif'} alt='sample img' className='md:h-[280px] w-full max-h-[300px] sm:block hidden' />
        <div className='absolute top-[75%] md:top-[85%] left-0 right-0 mx-auto bg-white w-full sm:w-[90%] p-4'>
          <div className='grid grid-cols-2 gap-8 md:gap-4 w-full'>
            {[...Array(2)].map((item, i) => (
              <DestinationCard key={i} location='강원특별자치도 춘천시' title='대관령 삼양목장' description='정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는' />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
