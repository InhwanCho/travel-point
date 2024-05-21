
import KakaoMap from '@/components/common/map';
import DestinationInfo from '@/components/section/destination/destination-info';
import RecentDestinations from '@/components/section/destination/recent-destinations';
import DestinationDescription from '@/components/section/destination/destination-description';
import Nearby from '@/components/section/destination/nearby';
import DestinationComment from '@/components/section/destination/destination-comment';
import DestinationBlog from '@/components/section/destination/destination-blog';
import { Separator } from '@/components/ui/separator';
import DestinationImages from '@/components/section/destination/destination-images';


interface DestinationBodyProps {
  slug: string
}

const destinationDetails = [
  { label: '홈페이지', value: 'http://www.bcj.co.kr' },
  { label: '주소', value: '경기도 파주시 광탄면 부흥로 242' },
  { label: '문의 및 안내', value: '031-957-2004' },
  { label: '행사장소', value: '벽초지수목원' },
  { label: '시간', value: '09:00~18:00' },
  { label: '이용요금', value: '성인: 10,500원, 경로: 8,500원, 청소년: 8,500원, 어린이: 7,500원' },
  { label: '행사내용', value: '벽초지수목원 화원에서는 봄의 전령꽃인 튤립심기체험 및 튤립화분, 봄꽃화분을 판매한다... 먼치먼치 푸드코트에서는...및 튤립화분, 봄꽃화분을 판매한다... 먼치먼치 푸드코트에서는및 튤립화분, 봄꽃화분을 판매한다... 먼치먼치 푸드코트에서는및 튤립화분, 봄꽃화분을 판매한다... 먼치먼치 푸드코트에서는' }
];


export default function DestinationBody({ slug }: DestinationBodyProps) {
  
  return (
    <section className="w-full h-full mx-auto xl:flex-grow">
      <div className="flex">
        <main className="flex p-5 flex-col sm:p-6 xl:p-0 w-full">
          <DestinationImages />          
          <DestinationDescription description='일산서구 한류월드 및 킨텍스 지원 부지 내에 위치한 원마운트는 지하 2층, 지상 9층 연면적 16만 1천602㎡ 규모의 3개 건물로 조성된 수도권 북서부 지역 최대 규모의 복합 문화 공간이다. 원마운트는 지상 최고의 놀이터를 모토로 쇼핑몰, 스노우파크, 워터파크, 멤버십 전용 럭셔리 스포츠 클럽 등의 문화 공간을 비롯, 각종 공연 및 이벤트, 파티 등 연중 끊이지 않는 즐길 거리를 제공하고 있다. * 스노우파크 원마운트 스노우파크는 국내 최초로 겨울을 주제로 한 실내형 테마파크로서 눈과 얼음 위에서 다양한 엔터테인먼트를 한 번에 즐길 수 있는 공간이다. 북유럽의 산타마을 콘셉트로 디자인된 부조물과 이색썰매, 동물썰매 등의 101가지의 펀(Fun) 아이템을 즐길 수 있는 아이스 레이크, 7개의 테마 동굴을 지나며 때로는 아찔하게 때로는 몽환적으로 이색적인 체험을 할 수 있는 아이스로드, 1년 내내 영하의 온도에서 하얗게 흩날리는 눈을 맞으며 눈썰매를 탈 수 있는 스노우힐 등으로 구성된다. 얼음으로 만든 동화마을에서 오로라쇼와 아이스쇼를 볼 수 있는 세계 최초의 테마 공간으로, 내국인뿐 아니라 외국인들에게도 매력적인 관광지가 될 것으로 보인다.' />
          <KakaoMap latitude={35.8753} longitude={128.62767} className='my-8' />
          <DestinationInfo details={destinationDetails} />
          <Nearby />
          <Separator />
          <DestinationComment />
          <DestinationBlog params={{slug:slug}}/>
        </main>
        <RecentDestinations />
      </div>
    </section>
  );
}
