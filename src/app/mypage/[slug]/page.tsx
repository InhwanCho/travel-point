'use client';
import React, { useState, useEffect } from 'react';
import DestinationCard from '@/components/common/destination-card';
import DestinationPagination from '@/components/common/destination-pagination';
import HeroSection from '@/components/common/hero-section';
import PageLayout from '@/components/layout/page-layout';
import { Separator } from '@/components/ui/separator';
import { Camera, X, Sticker } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MypageFooter from '@/components/section/mypage/mypage-footer';
import Image from 'next/image';
import EditCharacter from '@/components/section/mypage/edit-character';

interface MypageProps {
  params: { slug: string }
}

export default function MyPage({ params }: MypageProps) {
  // 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 데이터 목록 (여기에 API 호출 로직을 추가할 수 있습니다)
  const data = [...Array(18)].map((_, i) => ({
    location: '강원특별자치도 춘천시',
    title: `대관령 삼양목장 ${i}`,
    description: '정답게 이야기를 나눌 수 있는',
  }));


  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <main>
      <HeroSection page='mypage' title='마이페이지' subtitle={`${params.slug}님 환영합니다.`} />
      <PageLayout>
        <div className='flex flex-col justify-center items-center my-16'>
          <Image src={'/assets/image/characters/m1.png'} alt='character image' width={128} height={128} className='rounded-full border'/>
          <div className='flex justify-center py-8 space-x-4'>
            <label className='border w-40 h-10 flex justify-center items-center space-x-2' htmlFor='inputImage'>
              <Camera className='size-6' strokeWidth={1} />
              <span>사진 변경하기</span>
              <input id='inputImage' type="file" className='hidden' />
            </label>
            <EditCharacter/>
          </div>
          <div>조인환</div>
          <div>asdfsdf@naver.com</div>
        </div>
        <Tabs defaultValue="myFavs" className="w-full" id='mainSection'>
          <TabsList className='w-full py-6 flex space-x-8'>
            <TabsTrigger value="myFavs" className='underline-link'>내가 찜한 여행지</TabsTrigger>
            <TabsTrigger value="myComments" className='underline-link'>내가 쓴 리뷰</TabsTrigger>
            <TabsTrigger value="recentDestionation" className='underline-link'>최근 본 여행지</TabsTrigger>
          </TabsList>
          <TabsContent value="myFavs">
            <div className="min-h-dvh p-4">
              {data ? paginatedData.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 md:px-12 py-2">
                  {paginatedData.map((item, index) => (
                    <div key={index} className="p-4 relative">
                      <button className="absolute top-0 -right-1 text-xl text-gray-500 hover:text-gray-700">×</button>
                      <DestinationCard
                        location={item.location}
                        title={item.title}
                        description={item.description}
                      />
                    </div>
                  ))}
                  <div className='flex justify-center pb-8 mt-5 col-span-2 md:col-span-3'>
                    <DestinationPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                  </div>
                </div>
              ) : (
                <div>데이터가 없습니다.</div>
              ) : <div>데이터가 없습니다.</div>}
            </div>
          </TabsContent>
        </Tabs>
        <Separator />
        <MypageFooter />

      </PageLayout>
    </main>
  );
}