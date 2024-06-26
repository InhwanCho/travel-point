import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { fetchFromAuthApi } from '@/services/fetch-api'; // fetchFromAuthApi 경로를 맞춰주세요
import { deleteCookie, setCookie } from '@/libs/cookie';
import { useUserStore } from '@/store/userStore';

export default async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const clearUser = useUserStore.getState().clearUser;

  // Access Token이 없고 Refresh Token이 있을 때 Access Token 갱신 시도
  if (!accessToken && refreshToken) {
    try {
      const response = await fetchFromAuthApi('/refresh', { refreshToken }, 'POST');
      if (response.accessToken) {
        const newAccessToken = response.accessToken;

        // 갱신된 Access Token을 쿠키에 저장
        setCookie({
          name: 'accessToken',
          value: newAccessToken,
          hours: 2,
          secure: true,
        });
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Refresh Token 갱신 실패 시 쿠키 삭제 및 로그인 페이지로 리디렉션
      deleteCookie('accessToken', 'refreshToken', 'user');
      clearUser();
      const loginUrl = new URL('/', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Access Token이 없으면 로그인 페이지로 리디렉션
  if (!accessToken) {
    clearUser();
    const loginUrl = new URL('/', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Access Token이 있으면 요청을 계속 처리
  return NextResponse.next();
}

// 특정 경로에 대해서만 미들웨어가 작동하도록 설정합니다.
export const config = {
  matcher: ['/mypage/:path*'],
};
