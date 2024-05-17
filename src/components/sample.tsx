'use client';
import { useFetchDestination } from '@/hooks/use-fetch-destination';
import React from 'react';

export default function Sample() {
  const{data} = useFetchDestination();
  
  return (
    <div>{data[0].title}</div>
  );
}
