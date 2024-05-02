import React from 'react';
import DestinationCard from '../common/destination-card';
import CardLayout from '../layout/card-layout';
import Title from '../common/title';


export default function TrendingDestinations() {
  return (
    <section>
      <Title>주간 인기 여행지</Title>
      <CardLayout className='gap-6'>
        {[0, 0, 0, 0].map((item, i) => (
          <DestinationCard key={i} location='강원특별자치도 춘천시' title='대관령 삼양목장' description='정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는' />
        ))}
      </CardLayout>
    </section>
  );
}
