import React from 'react'
import { ChangeHandler, Path, UseFormRegister } from 'react-hook-form'

type InputProps = {
  label: Path<string>;
  register: UseFormRegister<any>;
  required: boolean;
  className: string;
};

type Props = {
  label: string;
  name: string;
  placeholder: string;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  ref: any;
  className?: string
}

export default function Input ({
  label,
  name,
  placeholder,
  onChange,
  onBlur,
  ref,
}: Props) {
  return (
    <>
      <label
        htmlFor={label}
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {label}
      </label>
      <input
        name={name}
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    </>
  )
}
