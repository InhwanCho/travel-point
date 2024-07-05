'use client';
import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { jwtDecode } from '@/libs/utils';
import { setCookie } from '@/libs/cookie';

const OauthSuccess = () => {
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      const user = jwtDecode(token);
      if (user) {
        setCookie({ name: 'accessToken', value: token, hours: 2, secure: true });
        setUser(user);
        router.push('/');
      }
    }
  }, [router, setUser]);

  return (
    <div>
      <h1>Logging in...</h1>
    </div>
  );
};

export default OauthSuccess;
