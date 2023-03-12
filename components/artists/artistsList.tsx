import React, { useState, useRef } from 'react'

import { ArtistRow } from './artistRow.component'
import { ArtistWithUserAndWorkAndLinks } from '../../pages/api/artists/[name]'

interface Props {
  artists: ArtistWithUserAndWorkAndLinks[];
  fetchMore: () => any;
  isLoadingMore: boolean;
  isReachingEnd: boolean;
}

const ArtistsList: React.FC<Props> = ({
  artists,
  fetchMore, 
  isLoadingMore,
  isReachingEnd
}) => {
  const [lockScroll, setLockScroll] = useState(false)
  const listInnerRef = useRef<HTMLDivElement>(null)

  const onScroll = () => {
    if (listInnerRef.current) {
      // console.log(listInnerRef.current)
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
    <div onScroll={onScroll} ref={listInnerRef} className={`max-h-screen ${lockScroll ? 'max-h-max' : 'overflow-y-auto'}`} tabIndex={0}>
      {artists?.map((artist) => (
        <ArtistRow
          key={artist?.handle}
          artist={artist}
          type="list"
          className="group"
        />
      )
      )}
      <div
        className="w-full text-center border-long-dashed-t uppercase py-2">
        {isLoadingMore
          ? 'Loading...'
          : isReachingEnd
            ? 'End of results'
            : ''}
      </div>
    </div>
  )
}

export default ArtistsList