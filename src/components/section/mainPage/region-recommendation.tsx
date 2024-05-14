
import React from 'react';
import RegionArticle from './region-article';

export default function RegionRecommendation() {
  return (
    <section className='flex flex-col sm:grid sm:grid-cols-2 gap-12 relative mt-10 mx-2 xsm:mx-6 sm:mx-0'>
      <RegionArticle region='강원도' />
      <RegionArticle region='부산' />

      {/* 경계선 */}
      <div className='hidden absolute sm:block top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-[0.5px] bg-gray-300'></div>
    </section>
  );
}
