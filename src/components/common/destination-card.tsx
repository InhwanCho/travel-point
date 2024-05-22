
import { cn } from '@/libs/utils';
import { Link } from 'next-view-transitions';
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
  contentId?: string;
}

export default function DestinationCard({ className, imageSrc, location, title, description, date, isFestival, isLoading, contentId, ...props }: DestinationCardProps) {
  if (isLoading) {
    return (
      <div className={`${cn('flex-1 animate-pulse', className)}`} {...props}>
        <div className='relative bg-gray-300 aspect-[16/11] w-full rounded-sm'></div>
        <div className='mt-4 bg-gray-300 h-3.5 w-3/4 rounded'></div>
        <div className='mt-2 bg-gray-300 h-5 w-5/6 rounded'></div>
        <div className='mt-2 bg-gray-300 h-4 w-full rounded'></div>
        <div className='mt-2 bg-gray-300 h-4 w-full rounded'></div>
      </div>
    );
  }
  
  return (
    <div className={`${cn('flex-1', className)}`} {...props}>
      <Link href={`/destinations/${contentId}`}>
        <div className='relative'>
          <Image width={300} height={220} src={imageSrc || '/img/sample.avif'} alt='sample img' className='rounded-sm w-full object-cover aspect-[16/11]' />
          {isFestival ? <p className="absolute bottom-0 left-0 bg-slate-800/90 text-white text-xs p-1 rounded-tr-md rounded-bl-sm">
            진행중
          </p> : null}
          {isFestival ? <p className="absolute top-0 right-0 bg-slate-800/90 text-white text-xs p-1 rounded-tr-sm rounded-bl-md">
            D-1
          </p> : null}
        </div>
        <p className='mt-4 text-xs sm:text-sm'>{location && location.split(' ').slice(0, 2).join(' ')}</p>
        <h3 className='text-base font-semibold pt-1 pb-px sm:py-1'>{title && title.split('(')[0].split('/')[0]}</h3>
        <div
          className='text-sm two-line-truncate'
          dangerouslySetInnerHTML={{ __html: description || '' }}
        ></div>
        {isFestival ? <p>{date}</p> : null}
      </Link>
    </div>
  );
}
