
import React from 'react';
import { FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';
import InputField from '@/components/section/auth/input-field';
import RememberMeCheckbox from '@/components/section/auth/remember-check';
import SubmitButton from '@/components/section/auth/submit-button';
import ForgotPasswordLink from '@/components/section/auth/forget-password';
import OauthOptions from '@/components/section/auth/oauth-options';

interface LoginSectionProps {
  toggleForm: () => void;
  register: UseFormRegister<any>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<any>;
}

export default function LoginSection({ toggleForm, register, handleSubmit, errors }: LoginSectionProps) {
  return (
    <>
      <h2 className="text-center text-3xl font-bold">계정에 로그인</h2>
      <p className="mt-2 text-center text-sm">
        또는
        <button className="font-medium text-blue-600 hover:text-blue-500 pl-2" onClick={toggleForm}>
          새로운 계정 등록
        </button>
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField label="이메일 주소" id="email" name="email" type="email" autoComplete="email" register={register} required error={errors.email as FieldError} />
        {errors.email && <p className="text-red-600 text-xs">{String(errors.email.message)}</p>}
        <InputField label="비밀번호" id="password" name="password" type="password" autoComplete="new-password" register={register} required error={errors.password as FieldError}/>
        {errors.password && <p className="text-red-600 text-xs">{String(errors.password.message)}</p>}
        <div className="flex items-center justify-between">
          <RememberMeCheckbox />
          <ForgotPasswordLink />
        </div>
        <SubmitButton text="로그인하기" />
        <OauthOptions />
      </form>
    </>
  );
}
