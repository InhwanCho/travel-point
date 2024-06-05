
import React from 'react';
import { UseFormRegister, SubmitHandler, FieldValues } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import InputField from '@/components/section/auth/input-field';
import SubmitButton from '@/components/section/auth/submit-button';
import OauthOptions from '@/components/section/auth/Oauth-options';


interface RegisterSectionProps {
  toggleForm: () => void;
  register: UseFormRegister<any>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;

}

export default function RegisterSection({ toggleForm, register, handleSubmit }: RegisterSectionProps) {
  return (
    <>
      <h2 className="text-center text-3xl font-bold">새 계정 생성</h2>
      <p className="mt-2 text-center text-sm">
        계정이 있으신가요?
        <button className="font-medium text-blue-600 hover:text-blue-500 pl-2" onClick={toggleForm}>
          로그인하기
        </button>
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField label="이메일 주소" id="email" name="email" type="email" autoComplete="email" register={register} required />
        <InputField label="이름" id="userName" name="userName" type="text" autoComplete="tel" register={register} required />
        <InputField label="비밀번호" id="password" name="password" type="password" autoComplete="new-password" register={register} required />
        <InputField label="비밀번호 확인" id="confirm-password" name="confirmPassword" type="password" autoComplete="new-password" register={register} required />
        <Separator />
        <SubmitButton text="등록하고 로그인하기" />
        <OauthOptions />
      </form>
    </>
  );
}
