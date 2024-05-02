import { headerMenus } from '@/config/site-config';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'next-view-transitions';

export default function MainNav() {
  return (
    <nav aria-label="Navigation menus" className="hidden sm:flex items-center sm:space-x-6 md:space-x-12 md:pr-20 " >
      {headerMenus.map((menu) => (
        <Button variant='ghost' key={menu.path} className='underline-link'>
          <Link href={menu.path} className="text-slate-800  ">
            <span>{menu.name}</span>
          </Link>
        </Button>
      ))}
    </nav>
  );
}
