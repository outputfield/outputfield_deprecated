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
        w-full flex flex-col relative `}>
      <DashedDivider />
      <div className="grow relative flex justify-center self-start items-center pt-[11px] pl-[13px] pb-[8px] pr-[11px]">
        <div className="mx-[10px] my-[24px]">
          <ProfilePicture />
          {type == 'detail' && <div className="text-center font-serif mt-1">{artist?.pronouns}</div>}
        </div>
        <div className="ml-3 py-auto text-lg">
          <p className="text-[18px]">{artist?.user.name}</p>
          <span className="lowercase font-serif">{`'${artist?.title}'`}</span>
          {artist?.title && artist?.location && (
            <span className="text-3xl font-light mx-1 align-sub">&#9702;</span>
          )}
          <span>{artist?.location}</span>
        </div>
      </div>
      <span className="text-right text-lg uppercase absolute right-[13px] bottom-[8px]">
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
