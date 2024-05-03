import { Github } from 'lucide-react';
import React from 'react';

export default function SiteFooter() {
  return (
    < footer className="bg-white" >
      <div className="mx-auto px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="mt-12 border-t border-gray-100 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left max-w-screen-lg mx-auto">
            <p className="text-xs text-gray-600 ">
              Copyright © {new Date().getFullYear()}{' '}
              <a href="https://twitter.com/justansub" className="underline">
                Travel Point
              </a>{' '}
            </p>
            <div className="flex gap-4">
              <Github />
              <Github />
              <Github />
              <Github />
              
            </div>

          </div>
        </div>
      </div>
    </footer >
  );
}
