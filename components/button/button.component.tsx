import * as React from 'react'
import Spinner from '../spinner'

interface Props {
  children?: string | React.ReactNode;
  onClick?: (event: any) => any;
  id?: string;
  role?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button'| 'reset'| 'submit';
}


export const Button = ({
  children,
  onClick,
  id,
  role,
  disabled,
  loading,
  type
}:Props) => {
  return (
    <button
      className="my-0px
        mx-auto
        flex
        items-center
        justify-center
        w-72
        h-16
        bg-black
        text-white
        border
        border-solid
        border-black
        border-box
        uppercase"
      onClick={onClick}
      id={id}
      role={role}
      disabled={disabled}
      type={type || 'button'}>
      {
        loading ? <Spinner/> : children
      }
    </button>
  )
}
Button.defaultProps = {
  type: 'button'
}