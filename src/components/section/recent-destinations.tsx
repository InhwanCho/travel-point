import React from 'react';
import { X } from 'lucide-react';

export default function RecentDestinations() {
  const destinations = [
    { id: 1, title: '부산 트릭아이 뮤지엄' },
    { id: 2, title: '2024 한강 불빛 공연(드론 라이트 쇼)' }
  ];
  return (
    <aside className="sticky w-full min-w-[240px] max-w-[260px] hidden xl:flex top-[120px] self-start pl-10 mt-5">
      <div className='border rounded-md shadow-md bg-white flex flex-col p-3 w-full'>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">최근 본 여행지</h3>
        <div className='space-y-4'>
          {destinations.length === 0 ? (
            // 목록이 없을 때 표시할 내용
            <p className='text-xs text-gray-700'>최근 본 여행지가 없습니다.</p>
          ) : (
            // 목록이 있을 때 표시할 내용
            destinations.map(destination => (
              <div
                key={destination.id}
                className='flex justify-between items-center border-b border-gray-200 pb-2'
              >
                <p className='text-xs text-gray-700'>{destination.title}</p>
                <button
                  className='text-xs pl-2 text-red-500 hover:text-red-700 transition-colors'
                  title="Remove Destination"
                >
                  <X className='size-3.5'/>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
