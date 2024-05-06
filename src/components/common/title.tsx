import { cn } from '@/lib/utils';
import React from 'react';

interface TitleProps {
  children: React.ReactNode
  className?: string
}

export default function Title({ children, className }: TitleProps) {
  return (
    <header className={cn('flex justify-center mb-8', className)}>
      <h2 className='font-bold pb-1 text-lg sm:text-xl'>{children}</h2>
    </header>
  );
}
