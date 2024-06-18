'use client';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteCookie } from '@/libs/cookie';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import InputField from '@/components/section/auth/input-field';
import { useForm, SubmitHandler } from 'react-hook-form';
import { deleteAccountApi } from '@/services/fetch-auth';

interface IFormInput {
  password: string;
  confirmPassword: string;
}

export default function MypageFooter() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInput>({ mode: 'onBlur' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();

  const handleDeleteUser: SubmitHandler<IFormInput> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await deleteAccountApi(data.password);

      if (result.response) {
        clearUser();
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        deleteCookie('user');
        router.push('/');
      } else {
        setError(`Error: ${result.errorCode} - ${result.message}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      clearUser();
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      deleteCookie('user');
      router.push('/');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <div className='flex justify-between items-start max-w-4xl xl:max-w-5xl px-4 sm:px-6 xl:px-0 mx-auto mb-6'>
      <div className='flex flex-col space-y-2'>
        <AlertDialog>
          <AlertDialogTrigger asChild className='max-w-[70px]'>
            <Button variant="outline" size={'sm'}>회원 탈퇴</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>정말로 회원 탈퇴를 하겠습니까?</AlertDialogTitle>
              <AlertDialogDescription>
                Travel-Point에서 회원 탈퇴 후에는 복구가 불가능하니 유의해 주세요.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form onSubmit={handleSubmit(handleDeleteUser)} className="space-y-6">
              <InputField
                label="비밀번호"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                register={register}
                required
                error={errors.password}
              />
              <InputField
                label="비밀번호 확인"
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                register={register}
                required
                error={errors.confirmPassword}
                watch={watch}
              />
              {error && <p className="mt-2 text-center text-red-600">{error}</p>}
              <AlertDialogFooter>
                <AlertDialogCancel>아니오</AlertDialogCancel>
                <AlertDialogAction type="submit" className='bg-red-600/80 hover:bg-red-600'>
                  {loading ? '처리 중...' : '예'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
        <p className='text-xs'>탈퇴 후에는 복구가 불가능하니 유의해 주세요.</p>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild className='max-w-[70px]'>
          <Button variant="outline" size={'sm'}>로그 아웃</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정말로 로그아웃을 하겠습니까?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>아니오</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className='bg-red-600/80 hover:bg-red-600'>예</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
