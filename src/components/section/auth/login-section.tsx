'use client';
// components/section/auth/login-section.tsx
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FieldError } from 'react-hook-form';
import InputField from '@/components/section/auth/input-field';
import RememberMeCheckbox from '@/components/section/auth/remember-check';
import SubmitButton from '@/components/section/auth/submit-button';
import ForgotPasswordLink from '@/components/section/auth/forget-password';
import OauthOptions from '@/components/section/auth/oauth-options';
import { loginApi } from '@/services/fetch-auth';
import { useUserStore } from '@/store/userStore';
import { setCookie, getCookie, deleteCookie } from '@/libs/cookie';
import { useRouter } from 'next/navigation';

interface LoginSectionProps {
  toggleForm: () => void;
}

interface IFormInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginSection({ toggleForm }: LoginSectionProps) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>();
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  useEffect(() => {
    const savedEmail = getCookie('rememberEmail');
    if (savedEmail) {
      setValue('email', savedEmail);
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.rememberMe) {
      setCookie('rememberEmail', data.email, 7);
    } else {
      deleteCookie('rememberEmail');
    }

    try {
      const result = await loginApi({
        email: data.email,
        password: data.password,
      });

      if (result.response) {
        const { accessToken, refreshToken } = result.result.token;
        const user = result.result.user;
        setCookie('accessToken', accessToken, 7);
        setCookie('refreshToken', refreshToken, 7);
        setCookie('user', JSON.stringify(user), 7);
        setUser(user); // Zustand 스토어에 사용자 정보 저장
        console.log('Login successful:', result);
        router.back();
      } else {
        console.error('Login failed:', result.message);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <>
      <h2 className="text-center text-3xl font-bold">계정에 로그인</h2>
      <p className="mt-2 text-center text-sm">
        또는
        <button className="font-medium text-blue-600 hover:text-blue-500 pl-2" onClick={toggleForm}>
          새로운 계정 등록
        </button>
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          label="이메일 주소"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          register={register}
          required
          error={errors.email as FieldError}
        />
        <InputField
          label="비밀번호"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          register={register}
          required
          error={errors.password as FieldError}
        />
        <div className="flex items-center justify-between">
          <RememberMeCheckbox register={register} />
          <ForgotPasswordLink />
        </div>
        <SubmitButton text="로그인하기" />
        <OauthOptions />
      </form>
    </>
  );
}
