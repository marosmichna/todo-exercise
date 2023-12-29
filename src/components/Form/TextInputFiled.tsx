/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface TextInputFieldProps {
    name: string,
    label: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any,
}

const TextInputField = ({ name, label, register, registerOptions, error }: TextInputFieldProps) => {

  return (
    <div className="mb-3">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        className={`mt-1 p-2 border rounded-md w-full ${error ? 'border-red-500' : ''}`}
        {...register(name, registerOptions)}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default TextInputField;


