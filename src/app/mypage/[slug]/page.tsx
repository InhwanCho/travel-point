'use client';
import React, { useState } from 'react';
import HeroSection from '@/components/common/hero-section';
import PageLayout from '@/components/layout/page-layout';
import { Separator } from '@/components/ui/separator';
import MypageFooter from '@/components/section/mypage/mypage-footer';
import { UserProfile } from '@/components/section/mypage/user-profile';
import { MypageTabSection } from '@/components/section/mypage/mypage-tab-section';

interface MypageProps {
  params: { slug: string }
}

// 페이지네이션을 위한 데이터를 처리하는 함수
function usePaginatedData(data: any[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return { currentPage, setCurrentPage, totalPages, paginatedData };
}

// 기본 데이터 생성 함수 - 임시
function generateData() {
  return [...Array(16)].map((_, i) => ({
    location: '강원특별자치도 춘천시',
    title: `대관령 삼양목장 ${i}`,
    description: '정답게 이야기를 나눌 수 있는',
  }));
}

export default function MyPage({ params }: MypageProps) {
  const itemsPerPage = 6;

  // 데이터 목록 (나중에 데이터 API 추가해야됨.)
  const data = generateData();
  const { currentPage, setCurrentPage, totalPages, paginatedData } = usePaginatedData(data, itemsPerPage);

  return (
    <main>
      <HeroSection page='mypage' title='마이페이지' subtitle={`${params.slug}님 환영합니다.`} />
      <PageLayout>
        <UserProfile params={params} />
        <MypageTabSection 
          data={data} 
          paginatedData={paginatedData} 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
        <Separator />
        <MypageFooter />
      </PageLayout>
    </main>
  );
}


