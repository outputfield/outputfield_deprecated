import Image from 'next/image'
import React from 'react'
import { Path, UseFormRegister } from 'react-hook-form'
import { ISignUpInputs } from './profileForm'

type InputProps = {
  label: Path<ISignUpInputs>;
  register: UseFormRegister<ISignUpInputs>;
  placeholder?: string;
  required?: boolean;
  className?: string;
  type?: string;
  disabled?: boolean;
};

export default function FormInput({
  label,
  register,
  placeholder,
  required,
  type,
  disabled,
  ...restProps
}: InputProps) {
  return (
    <div className="flex w-full">
      <Image src='/fourpointstar.svg' alt='star' width='16' height='16' />
      <span>
        {label && (
          <label
            htmlFor={label}
            className="block uppercase tracking-wide text-gray-700 text-xs mb-2">
            {label}
          </label>
        )}
        <input
          id={label}
          disabled={disabled || false}
          className="appearance-none block text-gray-700 border border-black py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          placeholder={placeholder || ''}
          type={type || ''}
          {...restProps}
          {...register(label, { required })}
        />
      </span>
      
    </div>
  )
}
