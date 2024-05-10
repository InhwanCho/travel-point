'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DestinationCard from '@/components/common/destination-card';
import { Separator } from '@/components/ui/separator';
import Title from '@/components/common/title';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Keyboard, Pagination } from 'swiper/modules';
import SwiperCore from "swiper";


interface ThemeCardProps {
  themeImages: {
    title: string;
    image: string;
  }
  isSecondCard?: boolean;
}

export default function ThemeCard({ themeImages, isSecondCard = false }: ThemeCardProps) {
  const router = useRouter();
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (swiper) {
      // 'slidesPerView'가 'undefined'일 경우 기본값 1을 사용
      const slidesPerView = typeof swiper.params.slidesPerView === 'number' ? swiper.params.slidesPerView : 1;

      // 총 페이지 수 계산
      setTotalPages(Math.ceil(swiper.slides.length / slidesPerView));

      // 슬라이드 변경 시 현재 페이지 계산
      swiper.on('slideChange', () => {
        setCurrentPage(Math.floor(swiper.realIndex / slidesPerView));
      });
    }
  }, [swiper]);

  const handlePageClick = (index: number) => {
    // 'slidesPerView'가 'undefined'일 경우 기본값 1을 사용
    const slidesPerView = typeof swiper?.params.slidesPerView === 'number' ? swiper.params.slidesPerView : 1;

    // 페이지 이동
    swiper?.slideTo(index * slidesPerView);
  };

  return (
    <>
      {isSecondCard && (
        <>
          <Separator className='block md:hidden' />
          <Title className='flex md:hidden'>당신만의 여행 취향 찾기2</Title>
        </>
      )}
      <div className='relative mb-[260px] md:mb-[200px]'>
        <div className='absolute -top-7 right-0 flex items-center'>
          {/* 페이지네이션 버튼 */}
          <div className="flex gap-1.5 mr-6">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index)}
                className={`size-5 text-sm transition-all font-semibold rounded-full ${currentPage === index ? 'bg-slate-800/95 text-slate-100' : 'text-slate-600'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          {/* "더보기" 버튼 */}
          <button
            className='items-center cursor-pointer inline-block'
            onClick={() => router.push(`/themes`)}
          >
            <span className='flex items-center text-sm'>더보기 <ChevronRight className='size-[15px] ml-[3px]' strokeWidth={1} /></span>
          </button>
        </div>
        <Image width={496} height={300} src={themeImages.image} alt={themeImages.title} className='md:h-[280px] w-full max-h-[300px] sm:block hidden' />
        <div className='absolute top-[75%] md:top-[85%] left-0 right-0 mx-auto bg-white w-full sm:w-[90%] p-4'>
          <Swiper
            onSwiper={setSwiper}
            slidesPerView={2}
            slidesPerGroup={2}
            spaceBetween={20}
            loop={false}
            keyboard={true}
            watchOverflow={true}
            modules={[Pagination, Keyboard]}
            breakpoints={{
              640: {
                spaceBetween: 20,
              },
            }}
          >
            {[...Array(6)].map((_, i) => (
              <SwiperSlide key={i}>
                <DestinationCard location='강원특별자치도 춘천시' title='대관령 삼양목장' description='정답게 이야기를 나눌 수 있는' />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
