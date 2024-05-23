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
  className?: string;
  isLoading?: boolean;
  isError?: boolean;
  isSmallSize?: boolean;
  contentId?: string;
  FestivalDate?: {
    startDate: string;
    endDate: string;
  }
}

// 날짜 포맷을 변경하는 함수
function formatDateRange(startDate: string, endDate: string): string {
  const formatDate = (date: string) => {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    return `${year}.${month}.${day}`;
  };

  return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
}

// 이벤트 상태를 반환하는 함수
function getEventStatus(startDate: string, endDate: string): { status: string, dDay: string } {
  const currentDate = new Date();
  const start = new Date(`${startDate.substring(0, 4)}-${startDate.substring(4, 6)}-${startDate.substring(6, 8)}`);
  const end = new Date(`${endDate.substring(0, 4)}-${endDate.substring(4, 6)}-${endDate.substring(6, 8)}`);

  if (currentDate >= start && currentDate <= end) {
    return { status: '진행중', dDay: '' };
  } else if (currentDate < start) {
    const diffTime = start.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return { status: '진행 예정', dDay: `D-${diffDays}` };
  } else {
    const diffTime = currentDate.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return { status: '종료', dDay: `D-${365 - diffDays}` };
  }
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
  ...props
}: DestinationCardProps) {

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
      <div className={`${cn('flex-1 animate-pulse-slow', className)}`} {...props}>
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
      <Link href={`/destinations/${contentId}`}>
        <div className='relative'>
          {isSmallSize ?
            <Image width={180} height={123} src={imageSrc || '/img/sample.avif'} alt='sample img' className='rounded-sm w-full object-cover aspect-[16/11]' />
            : <Image width={300} height={220} src={imageSrc || '/img/sample.avif'} alt='sample img' className='rounded-sm w-full object-cover aspect-[16/11]' />}
          {FestivalDate && (
            <div>
              <p className="absolute top-0 right-0 bg-slate-50/80 text-slate-800 text-[10px] p-1 rounded-bl-md rounded-tr-[3px]">
                {eventStatus?.dDay}
              </p>
              <p className="absolute bottom-0 left-0 bg-slate-50/80 text-slate-800 text-xs p-1 rounded-tr-md rounded-bl-[3px]">
                {eventStatus?.status}
              </p>
            </div>
          )}
        </div>
        <p className='mt-4 text-xs sm:text-sm'>{location && location.split(' ').slice(0, 2).join(' ')}</p>
        <h3 className='text-sm sm:text-base font-semibold pt-1 pb-px sm:py-1 truncate'>{title && title.split('(')[0].split('/')[0]}</h3>
        <div
          className='text-sm two-line-truncate'
          dangerouslySetInnerHTML={{ __html: description || '' }}
        ></div>
        {formattedDateRange && <p className='pt-1.5 text-xs sm:text-sm text-slate-700/90'>{formattedDateRange}</p>}
      </Link>
    </div>
  );
}
