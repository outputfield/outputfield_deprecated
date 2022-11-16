// TODO: this should be FormInput
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
  // className,
  ...restProps
}: InputProps) {
  return (
    <>
      {label && (
        <label
          htmlFor={label}
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          {label}
        </label>
      )}
      <input
        id={label}
        disabled={disabled || false}
        // name={name}
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        placeholder={placeholder || ''}
        type={type || ''}
        {...restProps}
        {...register(label, { required })}
      />
    </>
  )
}
