'use client';
/* eslint-disable @next/next/no-img-element */
import { Camera } from "lucide-react";
import EditCharacter from "@/components/section/mypage/edit-character";
import { useUserStore } from "@/store/userStore";

// 사용자 프로필 섹션을 렌더링하는 함수
export function UserProfile() {
  const user = useUserStore((state) => state.user);

  return (
    <div className='flex flex-col justify-center items-center my-8 sm:my-14'>
      {user && user.image ? (
        <img src={user.image} alt={`${user.name}'s profile`} className="rounded-full w-24 h-24" />
      ) : (
        <img src={'/assets/image/characters/anonymous.png'} alt='character image' width={128} height={128} className='rounded-full border' />
      )}

      <div className='flex justify-center py-8 space-x-4'>
        <label className='border w-40 h-10 flex justify-center items-center space-x-2' htmlFor='inputImage'>
          <Camera className='size-6' strokeWidth={1} />
          <span>사진 변경하기</span>
          <input id='inputImage' type="file" className='hidden' />
        </label>
        <EditCharacter />
      </div>
      <div>{user && user.name}</div>
      <div>{user && user.email}</div>
    </div>
  );
}
