import { cn } from '@/libs/utils';
import React from 'react';

interface DestinationInfoProps {
  details: {
    label: string;
    value: string;
  }[];
  className?: string
}

export default function DestinationInfo({ details, className }: DestinationInfoProps) {

  return (
    <div className={cn('py-4', className)}>
      <dl className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-10 lg:gap-y-4">
        {details.map((detail, index) => (
          <div key={index} className={`flex lg:block lg:col-span-1 last:lg:col-span-3 `}>
            <dt className="font-semibold text-base min-w-[100px] lg:pb-px">{detail.label}</dt>
            <dd className='text-sm flex items-center'>
              {detail.label === '홈페이지' ? (
                <div className='text-blue-700' dangerouslySetInnerHTML={{ __html: detail.value }} />
              ) : (
                detail.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
