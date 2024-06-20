'use client';
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Camera } from "lucide-react";
import { LiaSpinnerSolid } from "react-icons/lia";
import EditCharacter from "@/components/section/mypage/edit-character";
import { useUserStore } from "@/store/userStore";
import { uploadImage } from "@/services/fetch-auth";
import { setCookie } from "@/libs/cookie";

export function UserProfile() {
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (loading) return;
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    try {
      const response = await fetch('/api/upload-image', { method: 'POST' });
      const { ok, id, uploadURL, error } = await response.json();

      if (!ok) {
        console.error("Error fetching upload URL:", error);
        setLoading(false);
        return;
      }

      const form = new FormData();
      form.append('file', files[0], files[0].name);

      const uploadResponse = await fetch(uploadURL, {
        method: 'POST',
        body: form,
      });

      const uploadResult = await uploadResponse.json();
      if (uploadResult.success) {
        const VARIANT = 'profile';
        const USERIMAGE = `https://imagedelivery.net/ftV1RpijrL892iGuP8Q6zQ/${uploadResult.result.id}/${VARIANT}`;

        // Use the uploadImage function to update the user's profile image
        const responseData = await uploadImage(USERIMAGE);
        if (responseData.response) {
          if (user) {
            const updatedUser = { ...user, userImgUrl: USERIMAGE };
            setUser(updatedUser);
            setCookie({ name: 'user', value: JSON.stringify(updatedUser), hours: 2 });
          }
          event.target.value = '';
          setLoading(false);
        } else {
          console.error('Failed to update profile:', responseData.message);
          setLoading(false);
        }
      } else {
        console.error('Image upload failed:', uploadResult.errors);
        setLoading(false);
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      setLoading(false);
    }
  };
  
  return (
    <div className='flex flex-col justify-center items-center my-8 sm:my-14'>
      {user && user.userImgUrl ? (
        <img src={user.userImgUrl} alt={`${user.username}'s profile`} className="rounded-full w-24 h-24" />
      ) : (
        <img src={'/assets/image/characters/anonymous.png'} alt='character image' width={128} height={128} className='rounded-full border' />
      )}

      <div className='flex justify-center py-8 space-x-4'>
        <label className='border w-40 h-10 flex justify-center items-center space-x-2' htmlFor='inputImage'>
          {loading ? (
            <div className="flex items-center">
              <LiaSpinnerSolid className="animate-spin-slow size-5 mr-1.5 text-slate-500" />
              <span className="text-[10px]">Loading...</span>
            </div>
          ) : (
            <>
              <Camera className='size-6' strokeWidth={1} />
              <span>사진 변경하기</span>
              <input id='inputImage' type="file" className='hidden' onChange={handleImageChange} />
            </>
          )}
        </label>
        <EditCharacter />
      </div>
      <div>{user && user.username}</div>
      <div>{user && user.email}</div>
    </div>
  );
}
