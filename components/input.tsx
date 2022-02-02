import React from "react";
import { Path, UseFormRegister } from "react-react-hook-form";

interface IFormValues {
  "First Name": string;
  Age: number;
}

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
  className: string;
};

export default function Input({
  label,
  register,
  required,
  className,
  ...restProps
}: InputProps) {
  return (
    <>
      <label
        htmlFor={label}
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {label}
      </label>
      <input
        id={label}
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        {...restProps}
        {...register(label, { required })}
      />
    </>
  );
}
