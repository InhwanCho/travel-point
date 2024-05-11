import React from 'react';
import { cn } from "@/lib/utils";

interface CustomButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function CustomButton({ children, className, ...props }: CustomButtonProps) {
  return (
    <button {...props} className={cn('rounded-full border px-4 py-1 hover:ring-2 ring-slate-700/80 ring-offset-1 transition-all', className)}>
      {children}
    </button>
  );
}
