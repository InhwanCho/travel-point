'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Title from '../common/title';
import { BlogData, BlogPost } from '@/types/naver-blog-types';
import Link from 'next/link';
import Image from 'next/image';

export default function DestinationBlog() {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  function formatDate(dateStr: string) {
    return `${dateStr.slice(0, 4)}. ${dateStr.slice(4, 6)}. ${dateStr.slice(6)}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use search parameters directly in the API request URL
        const query = '부산 트릭아이 뮤지엄'; // Example search query
        const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: BlogData = await response.json();
        setBlogData(data);
      } catch (error) {
        console.error('Failed to fetch blog data:', error);
      }
    };

    fetchData(); // Call the fetch function
  }, []);
  if (!blogData) {
    return <p>Loading...</p>;
  }

  return (
    <div className='py-8'>
      <Title className='justify-between pl-2' naverImg>부산 트릭아이 뮤지엄 블로그 리뷰</Title>      
      <div className='border rounded-sm'>
        {blogData.items.map((item: BlogPost, index: number) => (
          <div className='flex flex-col p-2.5' key={index}>
            <div className='flex'>
              <a dangerouslySetInnerHTML={{ __html: item.title }} target='_blank' href={`${item.link}`} className='truncate max-w-[400px] text-blue-700/90'></a>
              <time className='ml-6 flex text-sm items-center text-slate-600'>
                <span className='mr-1.5'>|</span>{formatDate(item.postdate)}
              </time>
            </div>
            <p className='pt-1 text-sm two-line-truncate' dangerouslySetInnerHTML={{ __html: item.description }} />
            <Link target='_blank' href={`https://${item.bloggerlink}`} className='mt-2 text-sm text-slate-600'>
              {item.bloggername}
            </Link>
            {index < blogData.items.length - 1 && <div className='w-full border-b pt-2'></div>}
          </div>
        ))}
      </div>
    </div>
  );
}


