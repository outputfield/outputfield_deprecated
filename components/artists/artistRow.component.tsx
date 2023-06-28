import React from 'react'
import Link from 'next/link'
import { ArtistWithInviterAndUserAndLinks } from '../../pages/api/artists/[name]'
import ProfilePicture from './profilePicture'
import DashedDivider from '../dashedDivider'

export interface ArtistRowProps {
  artist: ArtistWithInviterAndUserAndLinks;
  type: 'list' | 'detail';
  className?: string;
}

export const ArtistRow = ({ artist, type }: ArtistRowProps) => {
  const uri = `/artists/${encodeURIComponent(artist?.handle || '')}`

  const row = (
    <div
      data-testid='artistRow'
      className={`
        w-full
        min-h-40
        flex
        flex-col
        relative
      `}
    >
      <DashedDivider />
      <div className="grow relative flex justify-center self-start items-center">
        <div className="py-9 mx-3 relative">
          <ProfilePicture />
          {type == 'detail' && (
            <div className="absolute text-center w-full font-serif mt-1 left">{artist?.pronouns}</div>
          )}
        </div>
        <div className="ml-3 py-auto text-med">
          <p className="text-[18px]">{artist?.user.name}</p>
          <span className="lowercase font-serif">{`'${artist?.title}'`}</span>
          {artist?.title && artist?.location && (
            <span className="text-3xl font-light mx-1 align-sub">&#9702;</span>
          )}
          <span>{artist?.location}</span>
        </div>
      </div>
      <span className="text-med text-right uppercase absolute bottom-2 right-3">
        {artist?.mediums}
      </span>
      {type === 'detail' && <DashedDivider />}
    </div>
  )
  if (type === 'list') {
    return (
      <Link
        href={uri}
        className='cursor-pointer'
        legacyBehavior>
        {row}
      </Link>
    )
  } 

  return row
}
