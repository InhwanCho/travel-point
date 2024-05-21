import Image from 'next/image';
import React from 'react';
import { IoMdHeartEmpty } from "react-icons/io";
import { PiSirenFill } from "react-icons/pi";
import { IoMdHeart } from "react-icons/io";

import { Separator } from '../ui/separator';
import { cn } from '@/libs/utils';
import StarRating from './star-rating';

interface CommentItemProps {
  className?: string
}

export default function CommentItem({ className }: CommentItemProps) {
  const rating = 3.5;

  const isImage = true;
  return (
    <li className={`${cn('border-t relative list-none', className)}`}>
      <div className='absolute top-0 left-0'>
        <Image src={'/assets/image/characters/m1.png'} alt='character image' width={50} height={50} />
      </div>
      <div className='w-full py-2 pl-[56px]'>
        <div className='flex justify-between'>
          <div className='flex flex-col sm:flex-row gap-x-3 text-sm text-slate-600'>
            <div className='flex sm:items-start gap-x-3'>
              <p>g@whdlsghks</p>
              <p>2024.04.29</p>
            </div>
            <span className='sm:pl-1 flex items-center'>
              <StarRating rating={rating}/>
            </span>
          </div>
          <div className='flex gap-3 pr-1.5'>
            <PiSirenFill className='size-4' />
            <IoMdHeartEmpty className='size-4 mr-1' />
          </div>
        </div>
        <div className='pt-2'>
          <p className='text-sm'>간단히 산책하기도 좋고 특히 겹벚꽃 폈을때 넘 이뻐서 사진 찍으러도 많이들 가시더라구요 ㅎㅎ 저도 앞전에 보고 왔는데 이뻤어요!간단히 산책하기도 좋고 특히 겹벚꽃 폈을때 넘 이뻐서 사진 찍으러도 많이들 가시더라구요 ㅎㅎ 저도 앞전에 보고 왔는데 이뻤어요!</p>
          {isImage &&
            <div className='py-2'>
              <Image width={420} height={300} src={'/img/sample.avif'} alt='sample img' className='max-h-[240px]' />
            </div>}
        </div>
      </div>


    </li>
  );
}
