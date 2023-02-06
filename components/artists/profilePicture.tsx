import Image from 'next/image'
import React from 'react'

type Props = {
    src?: string
}

const ProfilePicture: React.FC<Props> = ({
  src
}) => {
  return(
    <div className="relative w-24 flex justify-center items-center">
      <div className="profile-pic__ellipse left-0"></div>
      <div className="profile-pic__ellipse right-0"></div>
      <Image
        alt="Artist profile pic"
        src={src || 'https://via.placeholder.com/100'}
        height={80}
        width={80}
        className="profile-pic__image"
      />
    </div>
  )
}

export default ProfilePicture