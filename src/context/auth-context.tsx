'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from '@/libs/cookie';
import { useUserStore } from '@/store/userStore';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { jwtDecode } from '@/libs/utils';
import { hasRefreshToken, newAccessToken } from '@/services/fetch-auth';

interface AuthContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  tokenExpiry: number | null;
  setTokenExpiry: React.Dispatch<React.SetStateAction<number | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const fetchUserData = async () => {
  const response = await newAccessToken();
  if (response.response) {
    const newAccessToken = response.result.accessToken;
    const expiresIn = 2 * 60 * 60 * 1000; // 2 hours
    setCookie({ name: 'accessToken', value: newAccessToken, hours: 2, secure: true });
    const user = jwtDecode(newAccessToken);
    return {
      token: newAccessToken,
      tokenExpiry: Date.now() + expiresIn,
      user: user,
    };
  } else {
    throw new Error('Failed to refresh token');
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpiry, setTokenExpiry] = useState<number | null>(null);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (await hasRefreshToken()) {
        try {
          await refetch();
        } catch (error) {
          console.log('Refresh token not found, proceeding without login');
          clearUser();
        }
      }
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // useEffect가 한 번만 실행되도록 빈 배열을 사용

  const { refetch }: UseQueryResult<{ token: string; tokenExpiry: number; user: any }, Error> = useQuery({
    queryKey: ['refreshToken'],
    queryFn: fetchUserData,
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    const refreshUserData = async () => {
      try {
        const { data } = await refetch();
        if (data) {
          setToken(data.token);
          setTokenExpiry(data.tokenExpiry);
          if (data.user) {
            setUser(data.user);
          } else {
            clearUser();
          }
        } else {
          clearUser();
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        clearUser();
      }
    };

    refreshUserData();
  }, [refetch, setUser, clearUser, router]);

  useEffect(() => {
    if (tokenExpiry) {
      const timeout = setTimeout(() => {
        refetch().catch((error) => {
          if (error.message.includes('TokenNotFound')) {
            console.warn('Refresh token not found, proceeding without login');
          } else {
            console.error('Error refreshing token:', error);
            clearUser();
          }
        });
      }, tokenExpiry - Date.now() - 60 * 1000);

      return () => clearTimeout(timeout);
    }
  }, [tokenExpiry, refetch, clearUser]);

  return (
    <AuthContext.Provider value={{ token, setToken, tokenExpiry, setTokenExpiry }}>
      {children}
    </AuthContext.Provider>
  );
};
