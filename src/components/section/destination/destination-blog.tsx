import { BlogData, BlogPost } from '@/types/naver-blog-types';
import Title from '@/components/common/title';
import Link from 'next/link';

// 페이지를 동적으로 렌더링하도록 설정
export const dynamic = 'force-dynamic';

async function fetchBlogData(slug: string): Promise<BlogData | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search?query=${encodeURIComponent(slug)}`, {
      cache: 'force-cache',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: BlogData = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch blog data:', error);
    return null;
  }
}

function formatDate(dateStr: string) {
  return `${dateStr.slice(0, 4)}. ${dateStr.slice(4, 6)}. ${dateStr.slice(6)}`;
}

export default async function DestinationBlogPage({ params }: { params: { slug: string } }) {
  const blogData = await fetchBlogData(params.slug);

  if (!blogData) {
    return <p>Failed to load blog data</p>;
  }

  return (
    <div className='py-8'>
      <Title className='justify-between pl-2' naverImg>{params.slug} 블로그 리뷰</Title>
      <div className='border rounded-sm'>
        {blogData.items.map((item: BlogPost, index: number) => (
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
            {index < blogData.items.length - 1 && <div className='w-full border-b pt-2'></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
