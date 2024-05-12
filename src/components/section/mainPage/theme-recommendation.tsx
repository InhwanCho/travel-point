
import React from 'react';
import Title from '@/components/common/title';
import ThemeCard from '../../common/theme-card';
import { themeImages } from '@/data/data';

export default function ThemeRecommendation() {  
  return (
    <section className='relative'>
      <Title>당신만의 여행 취향 찾기</Title>
      <div className='grid md:grid-cols-2 gap-8 grid-cols-1'>
        <ThemeCard themeImages={themeImages[0]}/>
        <ThemeCard themeImages={themeImages[1]} isSecondCard/>
      </div>
      {/* 경계선 */}
      <div className='hidden absolute md:block top-16 bottom-0 left-1/2 transform -translate-x-1/2 w-[0.5px] bg-gray-300'></div>
    </section >
  );
}