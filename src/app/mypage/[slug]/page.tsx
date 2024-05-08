import DestinationCard from '@/components/common/destination-card';
import DestinationPagination from '@/components/common/destination-pagination';
import HeroSection from '@/components/common/hero-section';
import PageLayout from '@/components/layout/page-layout';
import { Separator } from '@/components/ui/separator';
import { Camera, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from 'react';

interface MypageProps {
  params: { slug: string }
}

export default function MyPage({ params }: MypageProps) {

  return (
    <main >
      <HeroSection title='마이페이지' subtitle={`${params.slug}님 환영합니다.`} />
      <PageLayout>
        <div className='flex flex-col justify-center items-center my-16'>
          <div className='bg-red-100 size-32 rounded-full'></div>
          <div className='flex justify-center py-8 space-x-4'>
            <label className='border w-40 h-10 flex justify-center items-center space-x-2' htmlFor='inputImage'>
              <Camera className='size-6' strokeWidth={1} />
              <span>사진 변경하기</span>
              <input id='inputImage' type="file" className='hidden' />
            </label>
          </div>
          <div>조인환</div>
          <div>asdfsdf@naver.com</div>
        </div>
        <Separator />

        <Tabs defaultValue="myFavs" className="w-full">
          <TabsList className='w-full py-6 flex space-x-8'>
            <TabsTrigger value="myFavs" className='underline-link'>내가 찜한 여행지</TabsTrigger>
            <TabsTrigger value="myComments" className='underline-link'>내가 쓴 리뷰</TabsTrigger>
            <TabsTrigger value="recentDestionation" className='underline-link'>최근 본 여행지</TabsTrigger>
          </TabsList>
          <TabsContent value="myFavs">
            <div className="min-h-dvh p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 md:px-12 py-2">
                <div className='col-span-2 md:col-span-3 flex justify-between pl-5 md:px-5'>
                  <div>전체 7개</div>
                  <button className='border rounded-sm flex items-center gap-x-2 px-1'>
                    <X className='size-4'/>
                    <span className='text-sm'>전체 삭제</span>
                  </button>
                </div>
                {[...Array(7)].map((item, index) => (
                  <div key={index} className="p-4 relative">
                    <button className="absolute top-0 right-0 text-xl text-gray-500 hover:text-gray-700">×</button>
                    <DestinationCard
                      className="col-span-1 first:ml-0"
                      location='강원특별자치도 춘천시'
                      title='대관령 삼양목장'
                      description='정답게 이야기를 나눌 수 있는 정답게 이야기를 나눌 수 있는 정답게 이야기를 나눌 수 있는 정답게 이야기를 나눌 수 있는'
                    />
                  </div>
                ))}
              </div>
              <div className='flex justify-center pb-8 mt-5'>
                <DestinationPagination />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <Separator />
        <div className='flex justify-between items-start pt-5 px-6'>
          <div className='flex flex-col'>
            <button className='font-semibold inline-flex'>회원 탈퇴</button>
            <p className='text-xs'>탈퇴 후에는 복구가 불가능하니 유의해 주세요.</p>
          </div>
          <button className='font-semibold'>로그 아웃</button>
        </div>



      </PageLayout>
    </main>


  );
}
