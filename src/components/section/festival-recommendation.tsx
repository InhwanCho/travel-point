import React from 'react';
import Title from '../common/title';
import CardLayout from '../layout/card-layout';
import DestinationCard from '../common/destination-card';

export default function FestivalRecommendation() {
  return (
    <section className=''>
      <Title>이런 축제 어때요?</Title>
      <CardLayout className='gap-6'>
        {[...Array(4)].map((item, i) => (
          <DestinationCard key={i} isFestival location='강원특별자치도 춘천시' title='대관령 삼양목장' description='정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는정답게 이야기를 나눌 수 있는' />
        ))}
      </CardLayout>
    </section>
  );
}
