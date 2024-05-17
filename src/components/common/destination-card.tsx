import { cn } from '@/libs/utils';
import Image from 'next/image';
import React from 'react';

interface DestinationCardProps {
  imageSrc?: string;
  location?: string;
  title?: string;
  description?: string;
  date?: string;
  className?: string;
  isFestival?: boolean;
  isLoading?: boolean;
}

export default function DestinationCard({ className, imageSrc, location, title, description, date, isFestival, isLoading, ...props }: DestinationCardProps) {
  if (isLoading) {
    return (
      <div className={`${cn('flex-1 animate-pulse', className)}`} {...props}>
        <div className='relative bg-gray-300 aspect-video w-full rounded-sm'></div>
        <div className='mt-4 bg-gray-300 h-3.5 w-3/4 rounded'></div>
        <div className='mt-2 bg-gray-300 h-5 w-5/6 rounded'></div>
        <div className='mt-2 bg-gray-300 h-4 w-full rounded'></div>
        <div className='mt-2 bg-gray-300 h-4 w-full rounded'></div>
      </div>
    );
  }

  return (
    <div className={`${cn('flex-1', className)}`} {...props}>
      <div className='relative'>
        <Image width={300} height={220} src={imageSrc || '/img/sample.avif'} alt='sample img' className='rounded-sm w-full object-cover' />
        {isFestival ? <p className="absolute bottom-0 left-0 bg-slate-800/90 text-white text-xs p-1 rounded-tr-md rounded-bl-sm">
          진행중
        </p> : null}
        {isFestival ? <p className="absolute top-0 right-0 bg-slate-800/90 text-white text-xs p-1 rounded-tr-sm rounded-bl-md">
          D-1
        </p> : null}
      </div>
      <p className='mt-4 text-xs sm:text-sm'>{location}</p>
      <h3 className='text-base font-semibold sm:text-lg pt-1 pb-px sm:py-1'>{title}</h3>
      <p className='text-sm two-line-truncate'>{description}</p>
      {isFestival ? <p>{date}</p> : null}
    </div>
  );
}
