import React from 'react'

interface Props {
  children?: string | React.ReactNode;
  onClick?: (event: any) => any;
  id?: string;
  className: string;
  buttonType?: 'button' | 'submit' | 'reset' | undefined;
  isDisabled?: boolean;
}

export const Button: React.FC<Props> = ({
  children,
  onClick,
  id,
  className,
  buttonType,
  isDisabled,
  ...props
}) => {
  return (
    <button
      className={`my-0px px-2 mx-auto flex items-center justify-center min-w-fit h-16 bg-black text-white border-box uppercase shadow-sm disabled:bg-gray disabled:shadow-none ${className}`}
      onClick={onClick}
      id={id}
      type={buttonType}
      disabled={isDisabled}
      {...props}>
      {children}
    </button>
  )
}
