import Image from 'next/legacy/image'
import React from 'react'
import { Path, UseFormRegister } from 'react-hook-form'
import { ISignUpInputs } from './ProfileForm'

type InputProps = {
  register: UseFormRegister<ISignUpInputs>;
  name: Path<ISignUpInputs>;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: boolean;
};

export default function FormInput({
  label,
  register,
  name,
  placeholder,
  required,
  type,
  disabled,
  icon,
  ...restProps
}: InputProps) {
  return (
    <div className="flex w-full">
      {icon && <Image src='/fourpointstar.svg' alt='star' width='16' height='16' />}
      <span className="w-full block">
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
          className="w-full appearance-none text-gray-700 border border-black py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          placeholder={placeholder || ''}
          type={type || ''}
          {...restProps}
          {...register(name, { required })}
        />
      </span>
    </div>
  )
}
