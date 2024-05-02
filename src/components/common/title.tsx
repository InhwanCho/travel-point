import React from 'react';

interface TitleProps {
  children: React.ReactNode
}

export default function Title({ children }: TitleProps) {
  return (
    <header className='flex justify-center pb-8'>
      <h2 className='font-bold pb-1 text-lg sm:text-xl'>{children}</h2>
    </header>
  );
}
