import KakaoMap from '@/components/common/map';
import DestinationInfo from '@/components/section/destination/destination-info';
import RecentDestinations from '@/components/section/destination/recent-destinations';
import DestinationDescription from '@/components/section/destination/destination-description';
import Nearby from '@/components/section/destination/nearby';
import DestinationComment from '@/components/section/destination/destination-comment';
import DestinationBlog from '@/components/section/destination/destination-blog';
import { Separator } from '@/components/ui/separator';
import DestinationImages from '@/components/section/destination/destination-images';
import { DestinationDetailType, DestinationType } from '@/types/destination-types';
import { filterArray } from '@/libs/utils';
import { MdError } from 'react-icons/md';

interface DestinationBodyProps {
  data?: DestinationDetailType;
  isLoading?: boolean;
  isError?: boolean;
}

export default function DestinationBody({ data, isLoading, isError }: DestinationBodyProps) {  
  if (isLoading) {
    return (
      <section className="w-full h-full mx-auto xl:flex-grow">
        <div className="flex w-full">
          <main className="flex p-5 flex-col sm:p-6 xl:p-0 w-full">
            <div className='w-full aspect-[16/11] animate-pulse'>
              <div className='w-full h-full bg-gray-300'></div>
            </div>
          </main>
          <aside className="sticky w-full min-w-[240px] max-w-[260px] hidden xl:flex top-[120px] self-start pl-10 "></aside>
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
          <aside className="sticky w-full min-w-[240px] max-w-[260px] hidden xl:flex top-[120px] self-start pl-10 "></aside>
        </div>
      </section>
    );
  }

  if (!data) {
    return null;
  }

  const filteredImages = filterArray([data.firstImage, data.firstImage2, data.firstImage3, data.firstImage4, data.firstImage5]);
  const destinationDetails = [
    { label: '홈페이지', value: data.homepage },
    { label: '주소', value: data.location },
    { label: '문의 및 안내', value: data.tel },
    { label: '시간', value: data.use_time },
    { label: '주차', value: data.parking },
    // { label: '이용요금', value: data.?? },
    // { label: '행사내용', value: data.destinationDescription },
  ].filter(detail => detail.value);

  const destinationData = {
    location: data.location.split(' ').slice(0, 2).join(' '),
    title: data.title,
    firstImage: data.firstImage,
    destinationDescription: data.destinationDescription.slice(0,55),
    contentId: data.contentId
  };

  return (
    <section className="w-full h-full mx-auto xl:flex-grow">
      <div className="flex">
        <main className="flex p-5 flex-col sm:p-6 xl:p-0 w-full">
          <DestinationImages images={filteredImages} />
          <DestinationDescription description={data.destinationDescription} />
          <KakaoMap latitude={Number(data.mapY)} longitude={Number(data.mapX)} className='my-10' />
          <DestinationInfo details={destinationDetails} contentTypeId={data.contentTypeId} />
          <Nearby />
          <Separator />
          <DestinationComment />
          <DestinationBlog title={data.title} />
        </main>
        <RecentDestinations newDestination={destinationData}/>
      </div>
    </section>
  );
}
