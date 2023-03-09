import React, { BaseSyntheticEvent } from 'react'
import Spinner from './spinner'

interface Props {
  children?: string | React.ReactNode;
  onClick?: (event: BaseSyntheticEvent) => void;
  id?: string;
  role?: string;
  disabled?: boolean;
  loading?: boolean;
  as?: 'a' | undefined;
}

export const Button = ({
  children,
  onClick,
  id,
  role,
  disabled,
  loading,
  as,
}: Props) => {
  if (as === 'a') {
    return (
      <a
        className={`
          my-0px
          mx-auto
          py-4
          px-16
          flex
          items-center
          justify-center
          w-52
          h-14
          bg-black
          text-white
          border
          border-solid
          border-black
          border-box
          uppercase
          disabled:cursor-not-allowed
          disabled:bg-gray-light
          disabled:border-gray-med
          disabled:text-gray-dark
        `}
        id={id}
      >
        {
          loading ? <Spinner /> : children
        }
      </a>)
  }
  return (
    <button
      className={`
        my-0px
        mx-auto
        py-4
        px-16
        flex
        items-center
        justify-center
        w-52
        h-14
        bg-black
        text-white
        border
        border-solid
        border-black
        border-box
        uppercase
        disabled:cursor-not-allowed
        disabled:bg-gray-light
        disabled:border-gray-med
        disabled:text-gray-dark
      `}
      onClick={onClick}
      id={id}
      role={role}
      disabled={disabled || loading || false}
    >
      {
        loading ? '...' : children
      }
    </button>
  )
}

Button.defaultProps = {
  type: 'button'
}