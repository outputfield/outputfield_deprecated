import React from 'react'
import Image from "next/legacy/image";
import Link from 'next/link'
import { ArtistWithWorkAndLinks } from '../../pages/api/artists/[name]'

export interface ArtistRowProps {
  artist: ArtistWithWorkAndLinks;
  type: 'list' | 'detail';
  className?: string;
}

export const ArtistRow = ({ artist, type }: ArtistRowProps) => {
  const uri = `/artists/${encodeURIComponent(artist?.handle || '')}`

  const row = (
    <div
      className={`${type === 'detail' ? 'border-y' : ''} ${
        type === 'list' ? 'border-t' : ''
      } border-black border-dashed w-full flex flex-col relative pt-[11px] pl-[13px] pb-[8px] pr-[11px]`}>
      <div className="grow relative flex justify-center self-start items-center">
        <div className="mx-[10px] my-[24px]">
          <Image
            alt="Artist profile pic"
            src="https://via.placeholder.com/100"
            // layout="fill"
            height={100}
            width={100}
            className="rounded-full"
          />
          {type == 'detail' && <div className="text-center font-serif">{artist?.pronoun}</div>}
        </div>
        <div className="ml-3 py-auto text-lg">
          <p className="text-[18px]">{artist?.user.name}</p>
          <span className="italic lowercase font-serif">{`'${artist?.title}'`}</span>
          {artist?.title && artist?.location && (
            <span className="text-3xl font-light mx-1 align-sub">&#9702;</span>
          )}
          <span>{artist?.location}</span>
        </div>
      </div>
      <span className="text-right text-lg uppercase absolute right-[13px] bottom-[8px]">
        {artist?.mediums}
      </span>
    </div>
  )
  if (type === 'list') {
    return (
      <Link
        href={uri}
        className="last-of-type:border last-of-type:border-black last-of-type:border-dashed"
        legacyBehavior>
        {row}
      </Link>
    );
  } 

  return row
}
