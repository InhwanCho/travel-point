import { X } from 'lucide-react';
import React from 'react';

export default function Login() {
  return (
    <div className='relative'>
      <button className={`${isModal ? 'absolute top-2 right-0' : 'hidden'}`} onClick={backbtn}>
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
  );
}
