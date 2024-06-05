
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  register: UseFormRegister<any>;
  required: boolean;
}

export default function InputField({ label, id, name, type, autoComplete, register, required }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>
      <div className="mt-1">
        <input
          autoComplete={autoComplete}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          id={id}
          type={type}
          {...register(name, { required })}
        />
      </div>
    </div>
  );
}
