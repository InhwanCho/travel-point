'use client';
import React from 'react';
import { cn } from "@/lib/utils";

interface CustomButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (childText: React.ReactNode) => void;
}

export default function CustomButton({ children, className, onClick, ...props }: CustomButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(children);
    }
  };

  return (
    <button
      {...props}
      className={cn(
        'rounded-full text-sm border px-4 py-1 hover:ring-2 ring-slate-700/80 ring-offset-1 transition-all active:ring-blue-500/30', // active 상태 스타일 추가
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
