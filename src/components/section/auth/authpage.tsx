/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Chrome, Github } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);

  const backbtn = useCallback(() => {
    router.back();
  }, [router]);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        backbtn();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        backbtn();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [backbtn]);

  const toggleForm = useCallback(() => {
    setIsRegister(!isRegister);
  }, [isRegister]);

  return (
    <>
      <div className="fixed w-full h-full z-50 bg-gray-500 bg-opacity-70 overflow-auto">
        <div className="sticky top-20 flex justify-center">
          <div
            className="max-w-md w-full h-auto flex flex-col text-gray-900 space-y-8 bg-white rounded-lg p-8 shadow-lg"
            ref={modalRef}
          >
            <div className="relative">
              <button className="absolute top-2 right-0" onClick={backbtn}>
                <X className="size-5 text-gray-900" />
              </button>
              {isRegister ? (
                <>
                  <h2 className="text-center text-3xl font-bold">새 계정 생성</h2>
                  <p className="mt-2 text-center text-sm">
                    계정이 있으신가요?
                    <button className="font-medium text-blue-600 hover:text-blue-500 pl-2" onClick={toggleForm}>
                      로그인하기
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-center text-3xl font-bold">계정에 로그인</h2>
                  <p className="mt-2 text-center text-sm">
                    또는
                    <button className="font-medium text-blue-600 hover:text-blue-500 pl-2" onClick={toggleForm}>
                      새로운 계정 등록
                    </button>
                  </p>
                </>
              )}
            </div>
            <form action="#" className="space-y-6" method="POST">
              {isRegister ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                      이메일 주소
                    </label>
                    <div className="mt-1">
                      <input
                        autoComplete="email"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        id="email"
                        name="email"
                        required
                        type="email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                      휴대폰 번호
                    </label>
                    <div className="mt-1">
                      <input
                        autoComplete="tel"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        id="phone"
                        name="phone"
                        required
                        type="tel"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                      비밀번호
                    </label>
                    <div className="mt-1">
                      <input
                        autoComplete="new-password"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        id="password"
                        name="password"
                        required
                        type="password"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="confirm-password">
                      비밀번호 확인
                    </label>
                    <div className="mt-1">
                      <input
                        autoComplete="new-password"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        id="confirm-password"
                        name="confirm-password"
                        required
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        id="terms"
                        name="terms"
                        required
                        type="checkbox"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="font-medium text-gray-700" htmlFor="terms">
                        서비스 약관에 동의합니다
                      </label>
                    </div>
                  </div>
                  <div>
                    <button
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      type="submit"
                    >
                      등록하고 로그인하기
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                      이메일 주소
                    </label>
                    <div className="mt-1">
                      <input
                        autoComplete="email"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        id="email"
                        name="email"
                        required
                        type="email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                      비밀번호
                    </label>
                    <div className="mt-1">
                      <input
                        autoComplete="current-password"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        id="password"
                        name="password"
                        required
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                      />
                      <label className="ml-2 block text-sm text-gray-900" htmlFor="remember-me">
                        기억하기
                      </label>
                    </div>
                    <div className="text-sm">
                      <a className="font-medium text-blue-600 hover:text-blue-500" href="#">
                        비밀번호를 잊으셨나요?
                      </a>
                    </div>
                  </div>
                  <div>
                    <button
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      type="submit"
                    >
                      로그인하기
                    </button>
                  </div>
                </>
              )}
              <div className="flex items-center">
                <div className="flex-grow border-t border-gray-300" />
                <span className="flex-shrink mx-4 text-gray-500">또는 다음으로 계속</span>
                <div className="flex-grow border-t border-gray-300" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  type="button"
                >
                  <Github className="mr-2 h-5 w-5" />
                  Github
                </button>
                <button
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  type="button"
                >
                  <Chrome className="mr-2 h-5 w-5" />
                  Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
