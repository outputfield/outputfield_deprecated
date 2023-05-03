import React from 'react'
import longDash from '../public/longDash.svg'

type Props = {
    className?: string,
    orientation?: 'horizontal' | 'vertical'
}

const Divider: React.FC<Props> = ({ className='', orientation='horizontal'}) => {
  return (
    <div
      style={{
        background: `center / contain repeat-x url(${longDash.src})`
      }}
      className={`w-full h-8 ${className}`}
    />
  )
}

export default Divider

