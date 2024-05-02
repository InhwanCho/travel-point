import { Link } from 'next-view-transitions';
import React from 'react';

export default function Logo() {
  return (
    <div className="flex items-center">
      <Link className="block text-blue-800/90 md:pr-12" href="/">
        <span className="sr-only">Home</span>
        <h1 className="md:text-xl font-semibold tracking-wide text-base">Travel Point</h1>
      </Link>
    </div>
  );
}
