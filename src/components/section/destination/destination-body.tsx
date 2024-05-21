
import KakaoMap from '@/components/common/map';
import DestinationInfo from '@/components/section/destination/destination-info';
import RecentDestinations from '@/components/section/destination/recent-destinations';
import DestinationDescription from '@/components/section/destination/destination-description';
import Nearby from '@/components/section/destination/nearby';
import DestinationComment from '@/components/section/destination/destination-comment';
import DestinationBlog from '@/components/section/destination/destination-blog';
import { Separator } from '@/components/ui/separator';
import DestinationImages from '@/components/section/destination/destination-images';
import { DestinationDetailType } from '@/types/destination-types';
import { filterArray } from '@/libs/utils';

interface DestinationBodyProps {
  data: DestinationDetailType
}

export default function DestinationBody({ data }: DestinationBodyProps) {
  const filteredImages= filterArray([data.firstImage, data.firstImage2, data.firstImage3, data.firstImage4, data.firstImage5]);
  const destinationDetails = [
    { label: '홈페이지', value: data.homepage },
    { label: '주소', value: data.location },
    { label: '문의 및 안내', value: data.tel },
    { label: '행사장소', value: data.location },
    { label: '시간', value: data.use_time },
    // { label: '이용요금', value: data.?? },
    // { label: '행사내용', value: data.destinationDescription },
  ].filter(detail => detail.value); 
  return (
    <section className="w-full h-full mx-auto xl:flex-grow">
      <div className="flex">
        <main className="flex p-5 flex-col sm:p-6 xl:p-0 w-full">
          <DestinationImages images={filteredImages} />
          <DestinationDescription description={data.destinationDescription} />
          <KakaoMap latitude={Number(data.mapY)} longitude={Number(data.mapX)} className='my-10' />
          <DestinationInfo details={destinationDetails} />
          <Nearby />
          <Separator />
          <DestinationComment />
          <DestinationBlog title={data.title} />
        </main>
        <RecentDestinations />
      </div>
    </section>
  );
}
