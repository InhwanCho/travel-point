import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface DestinationCardProps {
  location?: string,
  title: string,
  description: string,
  date?: string,
  className?: string,
  isFestival?: boolean,
}

export default function DestinationCard({ className, location, title, description, date, isFestival, ...props }: DestinationCardProps) {
  return (
    <div className={`${cn('flex-1', className)}`} {...props}>
      <div className='relative'>
        <Image width={240} height={200} src={'/img/sample.avif'} alt='sample img' className='rounded-sm' />
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
      {isFestival? <p>{date}</p> : null}
    </div>
  );
}
