import React from 'react'

interface Props {
  children?: string | React.ReactNode;
  onClick?: (event: any) => any;
  id?: string;
  className: string;
}

export const Button: React.FC<Props> = ({
  children,
  onClick,
  id,
  className,
  ...props
}) => {
  return (
    <button
      className={`my-0px px-2 mx-auto flex items-center justify-center min-w-fit h-16 bg-black text-white border-box uppercase shadow-sm disabled:bg-gray disabled:shadow-none ${className}`}
      onClick={onClick}
      id={id}
      {...props}>
      {children}
    </button>
  )
}
