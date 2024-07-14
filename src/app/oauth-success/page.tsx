'use client';
import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { jwtDecode } from '@/libs/utils';
import { setCookie } from '@/libs/cookie';
import { LiaSpinnerSolid } from 'react-icons/lia';

export default function OauthSuccess() {
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  useEffect(() => {
    const handleOauthSuccess = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        const user = jwtDecode(token);
        if (user) {
          setCookie({ name: 'accessToken', value: token, hours: 2, secure: true });
          setUser(user);
          router.push('/');
        } else {
          console.error('Failed to decode token');
          router.push('/');
        }
      } else {
        console.error('Token not found in URL');
        router.push('/');
      }
    };

    const timer = setTimeout(handleOauthSuccess, 100); // 100ms 딜레이

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [router, setUser]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100/80">
      <div className="text-center">
        <LiaSpinnerSolid className="animate-spin-slow text-6xl mb-4" />
        <span className="text-xl font-semibold">로그인 중...</span>
      </div>
    </div>
  );
};