// src/sample/page.tsx
'use client';

import { useFetchDestination } from '@/hooks/use-fetch-destination';
import React from 'react';

export default function Sample() {
  const { data, isLoading, isError } = useFetchDestination({ location: "서울", count: "10" });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  if (!data) {
    return <div>No data available.</div>;
  }

  return (
    <div>
      <h1>Destination Data</h1>
      <ul>
        {data.map((destination: any, index: number) => (
          <li key={index}>
            <h2>{destination.title}</h2>
            <p>{destination.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
