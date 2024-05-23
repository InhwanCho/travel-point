
import { cn } from '@/libs/utils';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';
import { MdError } from "react-icons/md";

interface DestinationCardProps {
  imageSrc?: string;
  location?: string;
  title?: string;
  description?: string;
  date?: string;
  className?: string;
  isFestival?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isSmallSize?: boolean;
  contentId?: string;
}

export default function DestinationCard({ className, imageSrc, location, title, description, date, isFestival, isLoading, isError, isSmallSize, contentId, ...props }: DestinationCardProps) {
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
  if (isError) {
    return (
      <div className={`${cn('flex-1 animate-pulse-slow ', className)}`} {...props}>
        <div className='relative bg-gray-300 aspect-[16/11] w-full rounded-sm '>
          <div className='p-2 sm:p-3'>
            <MdError className='text-red-500 size-4.5' />
            <p className='mt-2 text-sm font-semibold text-red-600'>Error</p>
            <p className='mt-1 text-xs text-red-500'>문제가 발생했습니다.</p>
            <p className='text-xs text-red-500'>잠시 후 다시 시도해주세요.</p>
          </div>
        </div>
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
          {/* 이미지 최적화가 안됨. 다시 해야됨 */}
          {isSmallSize ?
            <Image width={180} height={123} src={imageSrc || '/img/sample.avif'} alt='sample img' className='rounded-sm w-full object-cover aspect-[16/11]' />
            : <Image width={300} height={220} src={imageSrc || '/img/sample.avif'} alt='sample img' className='rounded-sm w-full object-cover aspect-[16/11]' />}

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
