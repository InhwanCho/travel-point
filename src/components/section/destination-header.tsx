import React from 'react';
import { Separator } from '../ui/separator';

export default function DestinationHeader() {
  const hashtags = ['걷기좋은길', '봄여행', '공원'];
  return (
    <header className='py-8'>
      <Separator className='my-4' />
      <div className='max-w-[900px] mx-auto'>
        <div className='flex justify-between'>
          <div className='flex gap-2 items-end'>
            <h2 className='text-xl font-bold'>부산트릭아이뮤지엄</h2>
            <span className='pl-1'>⭐⭐⭐⭐⭐</span>
            <span>(352명)</span>
          </div>
          <nav className='flex gap-3'>
            <button className='rounded-full border text-sm px-4 py-1 hover:ring-2 ring-slate-700/80 ring-offset-1 transition-all'>홈페이지</button>
            <button className='rounded-full border text-sm px-4 py-1 hover:ring-2 ring-slate-700/80 ring-offset-1 transition-all'>홈페이지</button>
            <button className='rounded-full border text-sm px-4 py-1 hover:ring-2 ring-slate-700/80 ring-offset-1 transition-all'>홈페이지</button>
            <button className='rounded-full border text-sm px-4 py-1 hover:ring-2 ring-slate-700/80 ring-offset-1 transition-all'>홈페이지</button>
          </nav>
        </div>
        <div className='pt-2'>
          <p className='text-sm'>경기도 고양시 일산서구 한류월드로 300 (대화동)</p>
        </div>
      </div>
      <Separator className='my-4' />
      <div className='max-w-screen-sm flex justify-center mx-auto'>
        {hashtags.map((tag, index) => (
          <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{tag}
          </span>
        ))}
      </div>
    </header>
  );
}
