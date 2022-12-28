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
      <div className="profile-ellipse left-0"></div>
      <div className="profile-ellipse right-0"></div>
      <Image
        alt="Artist profile pic"
        src={src || 'https://via.placeholder.com/100'}
        height={80}
        width={80}
        className="profile-picture"
      />
    </div>
  )
}

export default ProfilePicture