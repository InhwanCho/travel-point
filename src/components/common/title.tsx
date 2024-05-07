import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface TitleProps {
  children: React.ReactNode
  className?: string
  naverImg?: boolean
}

export default function Title({ children, className, naverImg }: TitleProps) {
  return (
    <header className={cn('flex justify-center mb-8', className)}>
      <h2 className='font-bold pb-1 text-lg sm:text-xl'>{children}</h2>
      {naverImg && <Image src="/assets/naver_blog.svg" width={80} height={20} alt="naver blog icon" />}
    </header>
  );
}
