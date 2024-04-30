'use client';

import { useState } from 'react';
import { Link } from 'next-view-transitions';
import { Search } from 'lucide-react';
// import { headerMenus } from '@/config/site-config';

export const headerMenus = [
  {
    name: "지역",
    path: "/regions",
    subMenus: [
      "서울",
      "경기",
      "인천",
      "강원",
      "경북",
      "경남",
      "대구",
      "부산",
      "울산",
      "전남",
      "전북",
      "제주",
      "대전",
      "충남",
      "충북",
    ],
  },
  {
    name: "테마",
    path: "/themes",
    subMenus: ["자연", "역사", "체험", "레저", "웰니스"],
  },
  {
    name: "축제",
    path: "/festivals",
    subMenus: ["진행 중", "진행 예정"],
  },
];

export const siteConfig = {};


export default function SiteHeader() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className="sticky top-0 z-20"
    >
      <header className="bg-white border-b shadow-sm">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 justify-between transition-height duration-300 ease-in-out">
            <div className="md:flex md:items-center md:gap-12">
              <Link className="block text-teal-600" href="/">
                <span className="sr-only">Home</span>
                <h1 className="text-xl font-semibold tracking-wide">LOGO</h1>
              </Link>
            </div>
            <div className="grid grid-cols-3 w-2/3 transition-all duration-300 ease-linear" id="expandable-navbar">
              {headerMenus.map((menu) => (
                <nav aria-label="Navigation menus" className="flex items-center justify-center" key={menu.path}>
                  <Link href={menu.path} className="underline text-gray-800 hover:text-teal-600">
                    {menu.name}
                  </Link>
                </nav>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4 items-center">
                <Search className='size-[26px] hover:cursor-pointer' />
                <Link
                  className="rounded-md bg-blue-600/95 px-5 py-2.5 text-sm font-medium text-white shadow"
                  href="#"
                >
                  Login
                </Link>
              </div>
              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        className='bg-white transition-all duration-300 ease-in-out md:block hidden shadow-sm'
        style={{ height: isExpanded ? '200px' : '0', overflow: 'hidden' }}
      >
        {isExpanded &&
          <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
            <div className="flex items-center justify-between ">
              <div></div>
              <div className="grid grid-cols-3 w-2/3 transition-all" >
                {headerMenus.map((menu) => (
                  <nav aria-label="Navigation submenus" className="flex justify-center" key={menu.path}>
                    <div className={`grid ${menu.name === '지역' ? 'grid-cols-2 gap-x-4' : 'grid-cols-1'}`} >
                      {menu.subMenus.map((submenu, i) => (
                        <p className='' key={i}>{submenu}</p>
                      ))}
                    </div>
                  </nav>
                ))}
              </div>
              <div className='w-[52px]'></div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
