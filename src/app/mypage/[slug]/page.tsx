import React from 'react';
import HeroSection from '@/components/common/hero-section';
import PageLayout from '@/components/layout/page-layout';
import { Separator } from '@/components/ui/separator';
import MypageFooter from '@/components/section/mypage/mypage-footer';
import { UserProfile } from '@/components/section/mypage/user-profile';

import { Metadata } from 'next';
import MypageTabSection from '@/components/section/mypage/mypage-tab-section';

export const metadata: Metadata = {
  title: '마이페이지',
  description: '내 정보 확인, 찜한 여행지, 리뷰, 최근 본 여행지 확인 및 회원 탈퇴가 가능한 마이페이지 페이지입니다'
};

interface MypageProps {
  params: { slug: string }
}

export default function MyPage({ params }: MypageProps) {
  return (
    <main>
      <HeroSection page='mypage' title='마이페이지' subtitle={`${params.slug}님 환영합니다.`} />
      <PageLayout>
        <UserProfile params={params} />        
        <MypageTabSection />
        <Separator />
        <MypageFooter />
      </PageLayout>
    </main>
  );
}
