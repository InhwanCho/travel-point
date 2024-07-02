'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie, getCookie } from '@/libs/cookie';
import { useUserStore } from '@/store/userStore';
import { fetchFromAuthApi } from '@/services/fetch-api';
import { useQuery } from '@tanstack/react-query';
import { jwtDecode } from '@/libs/utils';

interface AuthContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  tokenExpiry: number | null;
  setTokenExpiry: React.Dispatch<React.SetStateAction<number | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const fetchUserData = async () => {
  const refreshToken = getCookie('refreshToken');
  if (refreshToken) {
    const response = await fetchFromAuthApi('/refresh', { refreshToken }, 'POST');
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
  } else {
    throw new Error('No refresh token found');
  }
};

export const AuthProvider = ({ children }: {children: React.ReactNode;}) => {
  const [token, setToken] = useState<string | null>(getCookie('accessToken'));
  const [tokenExpiry, setTokenExpiry] = useState<number | null>(null);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();

  const { refetch } = useQuery({
    queryKey: ['refreshToken'],
    queryFn: fetchUserData,
    enabled: false,
  });

  useEffect(() => {
    const refreshUserData = async () => {
      try {
        const data = await refetch();
        if (data.data) {
          setToken(data.data.token);
          setTokenExpiry(data.data.tokenExpiry);
          if (data.data.user) {
            setUser(data.data.user);
          } else {
            clearUser();
            router.push('/auth');
          }
        } else {
          clearUser();
          router.push('/auth');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        clearUser();
        router.push('/auth');
      }
    };

    refreshUserData();
  }, [refetch, setUser, clearUser, router]);

  // Schedule a query to refresh the token 1 minute before it expires
  useEffect(() => {
    if (tokenExpiry) {
      const timeout = setTimeout(() => {
        refetch();
      }, tokenExpiry - Date.now() - 60 * 1000);

      return () => clearTimeout(timeout);
    }
  }, [tokenExpiry, refetch]);

  return (
    <AuthContext.Provider value={{ token, setToken, tokenExpiry, setTokenExpiry }}>
      {children}
    </AuthContext.Provider>
  );
};
