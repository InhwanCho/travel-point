'use client';
import { useAttractionsByArea } from '@/hooks/use-att-by-area';

import { Attraction, TouristAttractionsViewProps } from '@/types/att-area-types';
import Image from 'next/image';
import React, { Suspense } from 'react';



function TouristAttractionsComponent() {
  const params = {
    areaCode: '4',
    sigunguCode: '4',
    contentTypeId: '12',
    cat1: 'A01',
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TouristAttractionsView params={params} />
    </Suspense>
  );
}

function TouristAttractionsView({ params }: TouristAttractionsViewProps) {
  const query = useAttractionsByArea(params);

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.error) {
    return <div>Error: {query.error.message}</div>;
  }

  return (
    <div>
      {query.data.response.header.resultMsg === 'OK' ? (
        query.data.response.body.items.item.length > 0 ? (
          query.data.response.body.items.item.map((attraction: Attraction, index: number) => (
            <div key={index} className="card">
              {attraction.firstimage && <Image src={attraction.firstimage} alt='attraction image' width={300} height={250} placeholder='blur' blurDataURL={attraction.firstimage}/>}

              {/* <img src={attraction.firstimage || attraction.firstimage2} alt={attraction.title} width={300} /> */}
              <div className="card-body">
                <h5 className="card-title">{attraction.title}</h5>
                <p className="card-text">{attraction.addr1}</p>
                <p className="card-text">{attraction.tel}</p>
                <p>
                  <span>위도 : {attraction.mapx}</span>
                  <span>경도 : {attraction.mapy}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>데이터가 없습니다.</div>
        )
      ) : (
        <div>데이터를 불러오는 데 실패했습니다.</div>
      )}
    </div>
  );
}

export default TouristAttractionsComponent;

