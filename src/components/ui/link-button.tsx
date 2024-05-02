import React from 'react';
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
  href: string
}

export default function LinkButton({ children, className, href, ...props }: LinkButtonProps) {
  return (
    <Link {...props} href={href}
      className={cn('rounded-full border px-4 py-1 hover:ring-2 ring-slate-700/80 ring-offset-1 transition-all', className)}>
      {children}
    </Link>
  );
}
