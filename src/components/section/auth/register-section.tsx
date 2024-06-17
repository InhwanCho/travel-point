// components/section/auth/register-section.tsx
import React, { useRef, useState } from 'react';
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
  verificationCode?: string;
}

export default function RegisterSection({ toggleForm }: RegisterSectionProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInput>();
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const emailRef = useRef<string>('');
  const passwordRef = useRef<string>('');
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const handleRegister: SubmitHandler<IFormInput> = async (data) => {
    try {
      emailRef.current = data.email;
      passwordRef.current = data.password;
      // 이메일과 비밀번호를 이용해 임시 등록 처리
      const result = await registerApi({ // 수정해야됨
        email: data.email,
        password: data.password,
      });

      if (result.response) {
        setIsVerificationStep(true);
      } else {
        console.error('Register failed:', result.message);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleVerification: SubmitHandler<IFormInput> = async (data) => {
    try {
      const result = await registerApi({ // 수정해야됨
        email: emailRef.current,
        password: passwordRef.current,
        verificationCode: data.verificationCode,
      });

      if (result.response) {
        const { accessToken, refreshToken, user } = result.result.token;
        setCookie('accessToken', accessToken, 7);
        setCookie('refreshToken', refreshToken, 7);
        setCookie('user', JSON.stringify(user), 7);
        setUser(user); // Zustand 스토어에 사용자 정보 저장
        console.log('Verification successful:', result);
        router.back();
      } else {
        console.error('Verification failed:', result.message);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <>
      <h2 className="text-center text-3xl font-bold">{isVerificationStep ? '이메일 인증' : '새 계정 생성'}</h2>
      {!isVerificationStep ? (
        <>
          <p className="mt-2 text-center text-sm">
            계정이 있으신가요?
            <button className="font-medium text-blue-600 hover:text-blue-500 pl-2" onClick={toggleForm}>
              로그인하기
            </button>
          </p>
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
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
            <SubmitButton text="회원가입" />
            <OauthOptions />
          </form>
        </>
      ) : (
        <>
          <p className="mt-2 text-center text-sm">
            입력하신 이메일로 전송된 인증번호를 입력해주세요.
          </p>
          <form onSubmit={handleSubmit(handleVerification)} className="space-y-6">
            <InputField
              label="이메일 인증번호"
              id="verification-code"
              name="verificationCode"
              type="text"
              autoComplete="off"
              register={register}
              required
              error={errors.verificationCode}
            />
            <Separator />
            <SubmitButton text="인증하기" />
          </form>
        </>
      )}
    </>
  );
}
