// components/section/auth/register-section.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import InputField from '@/components/section/auth/input-field';
import SubmitButton from '@/components/section/auth/submit-button';
import OauthOptions from '@/components/section/auth/oauth-options';
import { registerApi } from '@/services/fetch-auth';
import { setCookie } from '@/libs/cookie';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';

interface RegisterSectionProps {
  toggleForm: () => void;
}

interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
}

export default function RegisterSection({ toggleForm }: RegisterSectionProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInput>();
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const result = await registerApi({
        email: data.email,
        password: data.password,
        verificationCode: data.verificationCode
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
      }

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <>
      <h2 className="text-center text-3xl font-bold">새 계정 생성</h2>
      <p className="mt-2 text-center text-sm">
        계정이 있으신가요?
        <button className="font-medium text-blue-600 hover:text-blue-500 pl-2" onClick={toggleForm}>
          로그인하기
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
          error={errors.email}
        />
        <InputField
          label="이메일 인증"
          id="verification-code"
          name="verificationCode"
          type="text"
          autoComplete="off"
          register={register}
          required
          error={errors.verificationCode}
        />
        <InputField
          label="비밀번호"
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          register={register}
          required
          error={errors.password}
        />
        <InputField
          label="비밀번호 확인"
          id="confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          register={register}
          required
          error={errors.confirmPassword}
          watch={watch}
        />
        <Separator />
        <SubmitButton text="등록하고 로그인하기" />
        <OauthOptions />
      </form>
    </>
  );
}
