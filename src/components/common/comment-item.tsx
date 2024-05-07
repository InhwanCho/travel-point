import Image from 'next/image';
import React from 'react';

export default function CommentItem() {
  const isImage = true;
  return (
    <div className='flex items-start pl-2 border-b py-2'>
      <div className='min-w-[35px] flex justify-center pt-1.5'>
        <div className='bg-red-100 size-8 rounded-full'></div>
      </div>
      <div className='pl-4'>
        <div className='flex gap-x-3 text-sm text-slate-600'>
          <p>g@whdlsghks</p>
          <p>2024.04.29</p>
        </div>
        <p className='text-sm'>간단히 산책하기도 좋고 특히 겹벚꽃 폈을때 넘 이뻐서 사진 찍으러도 많이들 가시더라구요 ㅎㅎ 저도 앞전에 보고 왔는데 이뻤어요!간단히 산책하기도 좋고 특히 겹벚꽃 폈을때 넘 이뻐서 사진 찍으러도 많이들 가시더라구요 ㅎㅎ 저도 앞전에 보고 왔는데 이뻤어요!</p>
        {isImage &&
        <div className='py-2'>
          <Image width={420} height={300} src={'/img/sample.avif'} alt='sample img' className='max-h-[180px]' />
        </div>}
      </div>    
    </div>
  );
}
