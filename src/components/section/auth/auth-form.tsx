'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthStore } from '@/store/authStore';
import RegisterSection from '@/components/section/auth/register-section';
import LoginSection from '@/components/section/auth/login-section';

interface IFormInput {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export default function AuthForm() {
  const { isRegister, toggleForm } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const url = isRegister ? '/api/join' : '/api/??';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Basic " + btoa(`${process.env.NEXT_PUBLIC_API_USERNAME}:${process.env.NEXT_PUBLIC_API_PASSWORD}`),
        },
        body: JSON.stringify({
          username: data.email,  // Assuming the email is used as username
          password: data.password,
          email: data.email,
        }),
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };


  return (
    <div className="space-y-6">
      {isRegister ? (
        <RegisterSection
          toggleForm={toggleForm}
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          errors={errors}
        />
      ) : (
        <LoginSection
          toggleForm={toggleForm}
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          errors={errors}
        />
      )}
    </div>
  );
}
