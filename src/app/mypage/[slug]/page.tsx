import DestinationPagination from '@/components/common/destination-pagination';
import HeroSection from '@/components/common/hero-section';
import PageLayout from '@/components/layout/page-layout';
import { Separator } from '@/components/ui/separator';
import { Camera } from 'lucide-react';
import React from 'react';

interface MypageProps {
  params: { slug: string }
}

export default function MyPage({ params }: MypageProps) {
  console.log(params);
  return (
    <main >
      <HeroSection title='마이페이지' subtitle={`${params.slug}님 환영합니다.`} />
      <PageLayout>
        <div className='flex flex-col justify-center items-center my-16'>
          <div className='bg-red-100 size-32 rounded-full'></div>
          <div className='flex justify-center py-8 space-x-4'>
            <div className='border w-40 h-10 flex justify-center items-center space-x-2'><Camera className='size-6' strokeWidth={1} /><span>사진 올리기</span></div>
          </div>
          <div>조인환</div>
          <div>asdfsdf@naver.com</div>
        </div>
        <Separator />
        <div className="flex h-5 items-center justify-evenly space-x-2 text-sm m-3 pl-1">

          <div>내가 찜한 여행지</div>
          <Separator orientation="vertical" />
          <div>내가 쓴 리뷰</div>
          <Separator orientation="vertical" />
          <div>최근 본 여행지</div>

        </div>
        <Separator />
        <div className="min-h-dvh p-4">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(7)].map((item, index) => (
              <div key={index} className="p-4 relative">
                <button className="absolute top-0 right-0 text-xl text-gray-500 hover:text-gray-700">×</button>
                <div className="content">
                  <div className="image h-40 bg-gray-300 mb-2"></div>
                  <p className="text-sm text-gray-800">
                    수요일 문화축제
                    <br />
                    정답게 이야기를 나눌 수 있는 순. 가까이에서 보고 .............
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-center pb-8 mt-5'>
            <DestinationPagination />
          </div>
        </div>

      </PageLayout>
    </main>


  );
}
