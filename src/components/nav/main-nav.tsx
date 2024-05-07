import { headerMenus } from '@/config/site-config';
import React from 'react';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';

export default function MainNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Navigation menus" className="hidden sm:flex items-center sm:space-x-8 md:space-x-16 md:pr-20 " >
      {headerMenus.map((menu) => (
        <Link key={menu.path} href={menu.path} className={`text-slate-800 underline-link text-sm`}>
          <span className={`${pathname === menu.path? 'underline-link-active': ''}`}>{menu.name}</span>
        </Link>
      ))}
    </nav>
  );
}
