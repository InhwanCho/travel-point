'use client';
import React, { useState } from 'react';
import DestinationCard from '@/components/common/destination-card';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import Title from '@/components/common/title';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/custom-swiper.css';
import { Pagination, Keyboard } from "swiper/modules";
import SwiperCore from "swiper";

export default function TrendingDestinations() {
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSwiper = (newSwiper: SwiperCore) => {
    setSwiper(newSwiper);
    setIsBeginning(newSwiper.isBeginning);
    setIsEnd(newSwiper.isEnd);
  };

  const updateNavigationState = () => {
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  };
  const goPrev = () => {
    if (swiper && !isBeginning) {
      swiper.slidePrev();
    }
  };
  const goNext = () => {
    if (swiper && !isEnd) {
      swiper.slideNext();
    }
  };


  const navBtn = (<div className='flex gap-x-4 absolute z-10 right-2 md:right-0 top-1'>
    <button
      onClick={goPrev}
      aria-label="Previous slide"
      disabled={isBeginning}
      className='disabled:cursor-not-allowed'
    >
      <ChevronLeft />
    </button>
    <button
      onClick={goNext}
      aria-label="Next slide"
      disabled={isEnd}
      className='disabled:cursor-not-allowed'
    >
      <ChevronRight />
    </button>
  </div>);

  return (
    <section>
      <Title navBtn={navBtn}>주간 인기 여행지</Title>
      <Swiper
        onSwiper={handleSwiper}
        onSlideChange={updateNavigationState}
        slidesPerView={4}
        spaceBetween={30}
        loop={false}
        keyboard={true}
        watchOverflow={true}
        pagination={{
          type: "bullets",
          clickable: true,
        }}
        modules={[Pagination, Keyboard]}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          960: {
            slidesPerView: 4,
          },
        }}
      >
        {[...Array(8)].map((_, i) => (
          <SwiperSlide key={i}>
            <DestinationCard location='강원특별자치도 춘천시' title={`대관령 삼양목장 ${i + 1}`} description='정답게 이야기를 나눌 수 있는' />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
