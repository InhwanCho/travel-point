
import PageLayout from '@/components/layout/page-layout';
import AuthPage from '@/components/section/auth/auth-page';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '로그인/회원가입',
  description: '로그인 및 회원가입 페이지입니다'
};

export default function RegisterPage() {
  return (
    <PageLayout>
      <AuthPage isModal={false}/>
    </PageLayout>
  );
}
