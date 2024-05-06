import React from 'react';
import Title from '../common/title';

export default function DestinationBlog() {
  return (
    <div className=''>
      <Title className='justify-start px-4'>부산 트릭아이 뮤지엄 블로그 리뷰</Title>
      <div className='border rounded-sm'>
        {[...Array(4)].map((item, i, arr) => (
          <div className='flex flex-col p-2.5' key={i}>
            <div className='flex'>
              <h3 className='truncate max-w-[400px] text-blue-700/90'>부산 아이와 가볼만한곳 트릭아이뮤지엄 실내데이트 주차 부산 아이와 가볼만한곳 트릭아이뮤지엄 실내데이트 주차</h3>
              <time className='ml-6 flex text-sm items-center text-slate-600'><span className='mr-1.5'>|</span> 2024. 02. 02</time>
            </div>
            <p className='pt-1 text-sm two-line-truncate'>부산 트릭아이뮤지엄 남자친구와 남포동 실내데이트로 부산 트릭아이뮤지엄에 다녀왔습니다. 사진찍으며 추억을 남기기 좋은 아이와 가볼만한곳으로 ...부산 트릭아이뮤지엄 남자친구와 남포동 실내데이트로 부산 트릭아이뮤지엄에 다녀왔습니다. 사진찍으며 추억을 남기기 좋은 아이와 가볼만한곳으로 ...</p>
            <p className='mt-2 text-sm text-slate-600'>홍시의 일상 블로그</p>
            {i === arr.length - 1 ? null : <div className='w-full border-b pt-2'></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
