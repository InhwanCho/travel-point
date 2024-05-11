'use client';

import MobileNav from '@/components/nav/mobile-nav';
import MainNav from '@/components/nav/main-nav';
import Logo from '@/components/nav/logo';
import LoginBtn from '@/components/nav/login-btn';
import SearchBtn from '@/components/nav/search-btn';

export default function SiteHeader() {

  return (
    <header className="bg-white/70 backdrop-blur-sm shadow-sm sticky top-0 z-30">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between">
          <Logo />
          <MainNav />
          <div className="flex items-center gap-4">
            <div className="flex gap-3 items-center">
              {/* TODO: search, login 나중에 손보기 */}
              <SearchBtn />
              <LoginBtn />
              <MobileNav />
            </div>
          </div>
        </div>
      </div >
    </header >
  );
}

