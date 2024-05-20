'use client';
import React, { useEffect, useState } from 'react';
import Title from '@/components/common/title';
import { BlogData, BlogPost } from '@/types/naver-blog-types';
import Link from 'next/link';

export default function DestinationBlog() {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function formatDate(dateStr: string) {
    return `${dateStr.slice(0, 4)}. ${dateStr.slice(4, 6)}. ${dateStr.slice(6)}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = '부산 트릭아이 뮤지엄'; //임시 query
        const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: BlogData = await response.json();
        setBlogData(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch blog data:', error);
        setError('Failed to load blog data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='py-8'>
      <Title className='justify-between pl-2' naverImg>부산 트릭아이 뮤지엄 블로그 리뷰</Title>
      <div className='border rounded-sm'>
        {blogData && blogData.items.map((item: BlogPost, index: number) => (
          <div className='flex flex-col p-2.5' key={index}>
            <div className='flex'>
              <a dangerouslySetInnerHTML={{ __html: item.title }} target='_blank' href={item.link} className='truncate max-w-[400px] text-blue-700/90'></a>
              <time className='ml-6 flex text-sm items-center text-slate-600'>
                <span className='mr-1.5'>|</span>{formatDate(item.postdate)}
              </time>
            </div>
            <p className='pt-1 text-sm two-line-truncate' dangerouslySetInnerHTML={{ __html: item.description }} />
            <Link href={item.bloggerlink} target='_blank' className='mt-2 text-sm text-slate-600'>
              {item.bloggername}
            </Link>
            {blogData &&index < blogData.items.length - 1 && <div className='w-full border-b pt-2'></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
