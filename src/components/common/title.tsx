/* eslint-disable @next/next/no-img-element */
import { cn } from '@/libs/utils';
import React from 'react';

interface TitleProps {
  children: React.ReactNode
  className?: string
  naverImg?: boolean
  navBtn?: React.ReactNode
}

export default function Title({ children, className, naverImg, navBtn }: TitleProps) {
  return (
    <header className={cn('flex justify-center mb-8 relative', className)}>
      <h2 className={`${naverImg ? 'font-semibold' : 'font-bold'} pb-1 text-lg sm:text-xl flex`}>{children}</h2>
      {naverImg && <a href='https://section.blog.naver.com' target='_blank' className='hover:cursor-pointer'>
        <img src="/assets/svg/naver_blog.svg" width={80} height={20} alt="naver blog icon" /></a>}
      {navBtn}
    </header>
  );
}
