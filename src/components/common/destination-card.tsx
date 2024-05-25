import { cn, formatDateRange, getEventStatus } from '@/libs/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdError } from "react-icons/md";

interface DestinationCardProps {
  imageSrc?: string;
  location?: string;
  title?: string;
  description?: string;
  className?: string;
  isLoading?: boolean;
  isError?: boolean;
  isSmallSize?: boolean;
  contentId?: string;
  FestivalDate?: {
    startDate: string;
    endDate: string;
  }
  priority?: boolean;
}


export default function DestinationCard({
  className,
  imageSrc,
  location,
  title,
  description,
  FestivalDate,
  isLoading,
  isError,
  isSmallSize,
  contentId,
  priority,
  ...props
}: DestinationCardProps) {

  if (isLoading) {
    return (
      <div className={`${cn('flex-1 animate-pulse', className)}`}>
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
      <div className={`${cn('flex-1 animate-pulse-slow', className)}`}>
        <div className='relative bg-gray-300 aspect-[16/11] w-full rounded-sm'>
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

  const eventStatus = FestivalDate ? getEventStatus(FestivalDate.startDate, FestivalDate.endDate) : null;
  const formattedDateRange = FestivalDate ? formatDateRange(FestivalDate.startDate, FestivalDate.endDate) : null;

  return (
    <div className={`${cn('flex-1', className)}`} {...props}>
      <Link href={`/destinations/${contentId}?title=${title}&location=${location}`}>
        <div className='relative'>
          {isSmallSize ?
            <Image width={180} height={123} src={imageSrc || '/img/sample.avif'} alt='sample img' className='rounded-sm w-full object-cover aspect-[16/11]' quality={40} priority={priority}/>
            : <Image width={300} height={220} src={imageSrc || '/img/sample.avif'} alt='sample img' className='rounded-sm w-full object-cover aspect-[16/11]' quality={50} priority={priority}/>}
          {FestivalDate && (
            <div>
              {eventStatus?.dDay && (
                <p className="absolute top-0 right-0 bg-slate-50/90 text-slate-800 text-[10px] p-1 font-semibold rounded-bl-md rounded-tr-[3px]">
                  {eventStatus?.dDay}
                </p>
              )}
              {eventStatus?.status && (
                <p className="absolute px-1.5 bottom-0 left-0 bg-slate-50/90 text-slate-800 text-xs p-1 font-semibold rounded-tr-md rounded-bl-[3px]">
                  {eventStatus?.status}
                </p>
              )}
            </div>
          )}
        </div>
        <p className='mt-4 text-xs sm:text-sm'>{location && location.split(' ').slice(0, 2).join(' ')}</p>
        <h3 className='text-sm sm:text-base font-semibold pt-1 pb-px sm:py-1 truncate'>{title && title.split('(')[0].split('/')[0]}</h3>
        {/* html태그 제거 */}
        <div
          className='text-sm two-line-truncate'
        >{description && description.replace(/<\/?[^>]+(>|$)/g, "")}</div>
        {formattedDateRange && <p className='pt-1.5 text-xs sm:text-sm text-slate-700/90'>{formattedDateRange}</p>}
      </Link>
    </div>
  );
}
