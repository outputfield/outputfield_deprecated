import React from 'react'
import { ChangeHandler } from 'react-hook-form'

export type Ref = HTMLInputElement

type Props = {
  label?: string;
  name: string;
  placeholder: string;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  className?: string
}

const Input = React.forwardRef<Ref, Props>(({label = '',
  name,
  placeholder,
  onChange,
  onBlur }, ref) => {
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
        name={name}
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    </>)
})

Input.displayName = 'Input'

export default Input