'use client';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import React from 'react';


export default function MypageFooter() {
  
  const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();
  const handleDeleteUser = async () => {
    try {
      // await deleteUser(); 미구현
      // 회원 탈퇴 후 로그아웃
      clearUser();
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push('/');
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleLogout = async () => {
    try {
      clearUser();
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
            <AlertDialogFooter>
              <AlertDialogCancel>아니오</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteUser} className='bg-red-600/80 hover:bg-red-600'>예</AlertDialogAction>
            </AlertDialogFooter>
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
