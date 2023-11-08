import Image from 'next/legacy/image'
import React from 'react'
import { FieldErrors, Path, UseFormRegister } from 'react-hook-form'
import { ISignUpInputs } from './ProfileForm'
import { ErrorMessage } from '@hookform/error-message'
import { IApplyInputs } from '../pages/apply'

type InputProps = {
  register: UseFormRegister<ISignUpInputs> | UseFormRegister<IApplyInputs>;
  errors?: FieldErrors;
  name: Path<ISignUpInputs>;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: boolean;
  as?: 'textarea' | undefined;
  innerShadow?: boolean;
};

export default function FormInput({
  label,
  register,
  errors,
  name,
  placeholder,
  required,
  type,
  disabled,
  icon,
  as,
  innerShadow,
  ...restProps
}: InputProps) {
  return (
    <div className="flex w-5/6 mb-3">
      {icon && (
        <div className="mt-8 ml-3 mr-2">
          <Image
            src='/fourpointstar.svg'
            alt='*'
            width='16'
            height='16'
          />
        </div>
      )}
      <span className="w-full">
        {label && (
          <label
            htmlFor={label}
            className="block uppercase tracking-wide text-gray-700 text-sm mb-2">
            {label}
          </label>
        )}
        <div className='flex items-center justify-center relative'>
          {
            (as === 'textarea') ? (
              <textarea
                id={label}
                disabled={disabled || false}
                className={`
                  text-base
                  w-full
                  appearance-none
                  text-gray-700
                  border
                  border-black
                  py-4
                  px-3
                  leading-tight
                  focus:outline-none
                  focus:bg-white
                  ${innerShadow && 'form-input__linear-gradient'}
                `}
                placeholder={placeholder || ''}
                // type={type || ''}
                {...restProps}
                {...register(name, { required })}          
              />
            ) : (
              <input
                id={label}
                disabled={disabled || false}
                className={`
                  text-base
                  w-full
                  appearance-none
                  text-gray-700
                  border
                  border-black
                  py-4
                  px-3
                  leading-tight
                  focus:outline-none
                  focus:bg-white
                  ${innerShadow && 'form-input__linear-gradient'}
                `}
                placeholder={placeholder || ''}
                type={type || ''}
                {...restProps}
                {...register(name, { required })}          
              />
            )
          }
          {errors && errors[name] && (
            <div className='float-right absolute -right-6 top-3'>
              <Image src='/errorIcon.svg' alt={`error icon ${label}`} width={16} height={17} />
            </div>
          )}
        </div>
        {errors && <ErrorMessage
          errors={errors}
          name={name}
          message='Please fill out this field.'
          render={({message}) => (
            <p className='text-gray-dark text-base mt-1'>{message}</p>
          )}
        />}
      </span>
    </div>
  )
}
