import React from 'react'
import longDash from '../public/longDash.svg'
import longDashVertical from '../public/longDashVertical.svg'

type Props = {
    className?: string,
    orientation?: 'horizontal' | 'vertical'
}

const DashedDivider: React.FC<Props> = ({ className='', orientation='horizontal'}) => {
  switch (orientation) {
  case 'vertical':
    return (
      <div
        style={{
          background: `center / contain repeat-y url(${longDashVertical.src})`
        }}
        className={`w-8 h-full ${className}`}
      />
    )
  default:
    return (
      <div
        style={{
          background: `center / contain repeat-x url(${longDash.src})`
        }}
        className={`w-full h-8 -my-4 ${className}`}
      />
    )
  }
}

export default DashedDivider

