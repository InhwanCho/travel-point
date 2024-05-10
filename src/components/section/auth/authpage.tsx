/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { useEffect, useRef } from 'react';


export default function AuthPage() {
  const router = useRouter();
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


  return (
    <div className='absolute w-full h-full z-50 flex items-center justify-center bg-slate-900 bg-opacity-60 left-0 top-0'>
      <div className='max-w-screen-sm h-1/2 flex justify-center text-slate-200' ref={modalRef}>
        <div className="w-[400px] rounded-lg bg-gradient-to-br from-indigo-500 to-purple-700 backdrop-blur-md p-8">
          <div className='flex justify-end'>
            <button onClick={backbtn}>X</button>
          </div>
          {/* <p>{Date.now()}</p> */}
          <div className="flex flex-col items-center">
            <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-200">

            </div>
            <div className="mb-4 w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="username">
                Username
              </label>
              <div className="flex items-center rounded-md bg-white p-2 shadow-sm">
                <UserIcon className="h-5 w-5 text-gray-500" />
                <input
                  className="ml-2 flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                  id="username"
                  placeholder="Username"
                  type="text"
                />
              </div>
            </div>
            <div className="mb-4 w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <div className="flex items-center rounded-md bg-white p-2 shadow-sm">
                <LockIcon className="h-5 w-5 text-gray-500" />
                <input
                  className="ml-2 flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                  id="password"
                  placeholder="************"
                  type="password"
                />
              </div>
            </div>
            <div className="mb-4 flex w-full items-center justify-between">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  id="remember-me"
                  type="checkbox"
                />
                <label className="ml-2 block text-sm text-gray-700" htmlFor="remember-me">
                  Remember me
                </label>
              </div>
              <a className="text-sm text-indigo-600 hover:underline" href="#">
                Forgot Password?
              </a>
            </div>
            <button className="w-full rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              LOGIN
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
{/* <div className='flex-col bg-red-300 text-slate-200 rounded-md flex justify-center items-center'>
  <h2 className='text-center py-4 text-slate-200'>Login</h2>
  <button className='bg-blue-300 p-3 rounded-full mx-4 w-40' onClick={backbtn}>닫기 버튼</button>
  <FormInput name='username' placeholder='username' minLength={2} />
  <FormInput name='password' placeholder='password' minLength={2} />
  <FormButton />
</div> */}
function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}


function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
