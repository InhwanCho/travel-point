'use client';
import React from 'react';
import Title from './common/title';
import DestinationCard from './common/destination-card';
import Image from 'next/image';
import { Separator } from './ui/separator';

export default function ThemeRecommendation() {
  return (
    <section className='relative'>
      <Title>당신만의 여행 취향 찾기</Title>
      <div className='grid md:grid-cols-2 gap-8 grid-cols-1'>
        <div className='relative mb-[260px] md:mb-[200px]'>
          <Image width={420} height={300} src={'/img/sample.avif'} alt='sample img' className='md:h-[280px] w-full max-h-[300px] sm:block hidden' />
          <div className='absolute top-[65%] md:top-[85%] left-0 right-0 mx-auto bg-white w-[90%] p-4'>
            <div className='grid grid-cols-2 gap-8 w-full'>
              <DestinationCard location='강원특별자치도 춘천시' title='대관령 삼양목장' description='정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는' />
              <DestinationCard location='강원특별자치도 춘천시' title='대관령 삼양목장' description='정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는' />
            </div>
          </div>
        </div>
        <Separator className='block md:hidden'/>
        <Title className='flex md:hidden'>당신만의 여행 취향 찾기2</Title>
        <div className='relative mb-[260px] md:mb-[200px]'>
          <Image width={420} height={300} src={'/img/sample.avif'} alt='sample img' className='md:h-[280px] w-full max-h-[300px] sm:block hidden' />
          <div className='absolute top-[65%] md:top-[85%] left-0 right-0 mx-auto bg-white w-[90%] p-4'>
            <div className='grid grid-cols-2 gap-8 w-full'>
              <DestinationCard location='강원특별자치도 춘천시' title='대관령 삼양목장' description='정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는' />
              <DestinationCard location='강원특별자치도 춘천시' title='대관령 삼양목장' description='정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는' />
            </div>
          </div>
        </div>
      </div>

      {/* 경계선 */}
      <div className='hidden absolute md:block top-16 bottom-0 left-1/2 transform -translate-x-1/2 w-[0.5px] bg-gray-300'></div>
    </section >
  );
}