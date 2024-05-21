import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Share2, Home, Siren, Bookmark } from 'lucide-react';

interface DestinationHeaderProps {
  title: string;
  location:string;
}

const hashtags = ['걷기좋은길', '봄여행', '공원'];
export default function DestinationHeader({ title,location }: DestinationHeaderProps) {
  
  return (
    <header className='py-8'>
      <Separator className='my-4' />
      <div className='max-w-[900px] mx-auto'>
        <div className='flex justify-between'>
          <div className='flex gap-2 items-end'>
            <h2 className='sm:text-xl font-bold'>{title}</h2>
            <span className='pl-1'>⭐⭐⭐⭐⭐</span>
            <span className='text-sm'>(352명)</span>
          </div>
          <nav className='flex space-x-2 sm:space-x-4'>
            <div className='p-1.5 bg-slate-200/60 rounded-full'><Bookmark className='size-[18px]' /></div>
            <div className='p-1.5 bg-slate-200/60 rounded-full'><Siren className='size-[18px]' /></div>            
            <div className='p-1.5 bg-slate-200/60 rounded-full'><Share2 className='size-[18px]' /></div>
          </nav>
        </div>
        <div className='pt-2'>
          <p className='text-sm'>{location}</p>
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
