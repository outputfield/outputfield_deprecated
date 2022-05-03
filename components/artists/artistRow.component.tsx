import React from 'react'
import Image from 'next/image'
import Artist from '../data/artist'

import Link from 'next/link'

export interface ArtistRowProps {
  artist: Artist;
  type: 'list' | 'detail';
  onClick?: (event: any) => any;
}

export const ArtistRow = ({ artist, type, onClick = null }: Props) => {
  const { name, title = 'painter', location, pronouns, medium } = artist
  const uri = `/artists/${encodeURIComponent(artist.handle)}`

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
          {type == 'detail' && <div className="text-center font-serif">{pronouns}</div>}
        </div>
        <div className="ml-3 py-auto text-lg">
          <p className="text-[18px]">{name}</p>
          <span className="italic lowercase font-serif">{`'${title}'`}</span>
          {title && location && (
            <span className="text-3xl font-light mx-1 align-sub">&#9702;</span>
          )}
          <span>{location}</span>
        </div>
      </div>
      <span className="text-right text-lg uppercase absolute right-[13px] bottom-[8px]">
        {medium}
      </span>
    </div>
  )
  if (type === 'list') {
    return (<Link
      href={`/artists/${encodeURIComponent(artist.handle)}`}
      className="last-of-type:border last-of-type:border-black last-of-type:border-dashed"
    >
      {row}
    </Link>)
  } else if (type === 'detail') {
    return row
  }
}
