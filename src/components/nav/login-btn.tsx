'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PopoverClose } from '@radix-ui/react-popover';
import { X } from 'lucide-react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginBtn() {
  const session = false;
  const router = useRouter();
  const openModal = () => { router.push('/auth'); };
  return (
    <>
      {session ?
        <Popover>
          <PopoverTrigger>
            <div className='bg-red-100 size-8 rounded-full'></div>
          </PopoverTrigger>
          <PopoverContent className='mt-2 mx-2 bg-slate-100/90 relative' >
            <PopoverClose className='absolute top-2.5 right-2.5'>
              <X className='size-4' />
            </PopoverClose>
            <div className='flex justify-center flex-col items-center space-y-4 '>
              <p>asdfasdf@naver.com</p>
              <div className='bg-red-100 size-16 rounded-full'></div>
              <p>안녕하세요, 인환님.</p>
              <div className='flex justify-evenly w-full'>
                <Link href={`/mypage/${'abcd'}`}><Button variant='outline' className='rounded-full'>마이 페이지</Button></Link>
                <Button variant='outline' className='rounded-full'>로그 아웃</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>


        :
        // <Button onClick={openModal}>Login</Button>
        <Link href='/auth'>로그인</Link>


      }
    </>

  );
}
