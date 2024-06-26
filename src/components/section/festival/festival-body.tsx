import { lazy, Suspense } from 'react';
import { FestivalDetailType } from '@/types/destination-types';
import { MdError } from 'react-icons/md';
import Title from '@/components/common/title';
import { formatDateRange } from '@/libs/utils';
import Image from 'next/image';
import { placeholderImageBase64 } from '@/data/data';

const DestinationDescription = lazy(() => import('@/components/section/destination/destination-description'));
const KakaoMap = lazy(() => import('@/components/common/map'));
const DestinationInfo = lazy(() => import('@/components/section/destination/destination-info'));
const Nearby = lazy(() => import('@/components/section/destination/nearby'));
const DestinationBlog = lazy(() => import('@/components/section/destination/destination-blog'));
const RecentDestinations = lazy(() => import('@/components/section/destination/recent-destinations'));

interface FestivalBodyProps {
  data?: FestivalDetailType;
  isLoading?: boolean;
  isError?: boolean;
}

export default function FestivalBody({ data, isLoading, isError }: FestivalBodyProps) {
  if (isLoading) {
    return (
      <section className="w-full h-full mx-auto xl:flex-grow">
        <div className="flex w-full">
          <main className="flex p-5 flex-col sm:p-6 xl:p-0 w-full">
            <div className='w-full aspect-[16/11] animate-pulse'>
              <div className='w-full h-full bg-gray-300'></div>
              <Title className='justify-start my-8'>상세 정보</Title>
              <div>Loading ...</div>
            </div>
          </main>
          <aside className="sticky w-full min-w-[240px] max-w-[260px] hidden xl:flex top-[120px] self-start pl-10 animate-pulse">
            <div className={`border rounded-md shadow-md bg-white flex flex-col p-3 w-full`}>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">최근 본 여행지</h3>
            </div>
          </aside>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="w-full h-full mx-auto xl:flex-grow">
        <div className="flex ">
          <main className="flex p-5 flex-col sm:p-6 xl:p-0 w-full">
            <div className='w-full aspect-[16/11] animate-pulse'>
              <div className='w-full h-full bg-gray-300'>
                <div className='p-2 sm:p-3'>
                  <MdError className='text-red-500 size-4.5' />
                  <p className='mt-2 text-sm font-semibold text-red-600'>Error</p>
                  <p className='mt-1 text-xs text-red-500'>문제가 발생했습니다.</p>
                  <p className='text-xs text-red-500'>잠시 후 다시 시도해주세요.</p>
                </div>
              </div>
            </div>
          </main>
          <aside className="sticky w-full min-w-[240px] max-w-[260px] hidden xl:flex top-[120px] self-start pl-10 animate-pulse">
            <div className={`border rounded-md shadow-md bg-white flex flex-col p-3 w-full `}>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">최근 본 여행지</h3>
            </div>
          </aside>
        </div>
      </section>
    );
  }

  if (!data) {
    return null;
  }

  const destinationDetails = [
    { label: '홈페이지', value: data.homepage },
    { label: '주소', value: data.location },
    { label: '문의 및 안내', value: data.tel },
    { label: '시간', value: data.useTime.replace('<br>', ' ') },
    { label: '날짜', value: formatDateRange(data.startDate, data.endDate) },
    { label: '이용요금', value: data.charge },
  ].filter(detail => detail.value);

  const destinationData = {
    location: data.location.split(' ').slice(0, 2).join(' '),
    title: data.title,
    firstImage: data.firstImage,
    destinationDescription: data.destinationDescription ? data.destinationDescription.slice(0, 55) : '',
    contentId: data.contentId
  };


  return (
    <section className="w-full h-full mx-auto xl:flex-grow">
      <div className="flex">
        <main className="flex p-2.5 flex-col sm:p-6 xl:p-0 w-full">
          <Image
            src={data.firstImage}
            alt={`${data.title} Image`}
            width={800}
            height={550}
            className="object-cover w-full aspect-[16/11]"
            sizes="(max-width: 640px) 500px, (max-width: 1200px) 800px, 760px"
            priority
            placeholder='blur'
            blurDataURL={placeholderImageBase64}
          />
          <Suspense fallback={null}>
            <DestinationDescription description={data.destinationDescription && data.destinationDescription.replace(/<\/?[^>]+(>|$)/g, "")} festivalIntro={data.introduction} />
            <KakaoMap latitude={Number(data.mapX)} longitude={Number(data.mapY)} className='my-10' />
            <DestinationInfo details={destinationDetails} contentTypeId={data.contentId} />
            <Nearby count='4' contentId={data.contentId} latitude={Number(data.mapX)} longitude={Number(data.mapY)} />
            <DestinationBlog title={data.title} />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          {/* 최근 본 여행지 - 데이터 정제 후 데이터 넣기 */}
          <RecentDestinations newDestination={destinationData} />
        </Suspense>
      </div>
    </section>
  );
}
