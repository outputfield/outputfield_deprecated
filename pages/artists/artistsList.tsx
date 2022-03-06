import React, { useRef } from 'react'

import Artist from '../data/artist'
import { ArtistRow } from '../../components/artists/artistRow.component'
import { useState } from 'react'

interface Props {
  artists: Artist;
  fetchMore: (event: any) => any;
  isLoadingMore: boolean;
  isReachingEnd: boolean;
}

function ArtistsList({
  artists, 
  fetchMore, 
  isLoadingMore,
  isReachingEnd
}: Props) {
  const [lockScroll, setLockScroll] = useState(false)
  const listInnerRef = useRef()

  const onScroll = () => {
    if (listInnerRef.current) {
      console.log(listInnerRef.current)
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current
      const isBottom = Math.floor(scrollTop + clientHeight) === scrollHeight
      const isTop = scrollTop === 0
      if (isBottom && !isReachingEnd) {
        fetchMore()
      }
      if (isTop) {
        setLockScroll(!lockScroll)
      }
    }
  }
  return (
    <div onScroll={onScroll} ref={listInnerRef} className={`max-h-screen ${lockScroll ? 'max-h-max' : 'overflow-auto'}`}>
      {artists?.map((artist) => (
        <ArtistRow
          key={artist.handle}
          artist={artist}
          type="list"
          className="group"
        />
      )
      )}
      <button
        disabled={isLoadingMore || isReachingEnd}
        onClick={fetchMore} className="w-full text-center border-t border-dashed uppercase py-2">
        {isLoadingMore
          ? 'Loading...'
          : isReachingEnd
            ? 'End'
            : ''}
      </button>
    </div>
  )
}

export default ArtistsList