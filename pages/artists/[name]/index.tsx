import React from 'react'
import { useRouter } from 'next/router'

import { ArtistRow } from '../../../components/artists/artistRow.component'
import Tabs from '../../../components/tabView/tabView.component'
import { WorkPanel } from '../../../components/tabView/workPanel.component'
import { InfoPanel } from '../../../components/tabView/infoPanel.component'
import { convertDataToSingleArtist } from '../../../lib/misc'
import artists, { getArtists } from '../../api/artists'

export const getStaticPaths = async () => {
  const data = await getArtists()

  const paths = data.map((artist) => {
    return {
      params: { name: artist.handle },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { name } = context.params
  const res = await prisma.artist.findUnique({
    where: {
      handle: name,
    },
    include: {
      user: true,
      work: true,
      links: true,
    },
  })
  const artistdata = JSON.parse(JSON.stringify(res))
  return {
    props: {
      artistdata,
    },
  }
}

const ArtistPage = ({ artistdata }) => {
  console.log('artistdata', artistdata)
  // const artist = convertDataToSingleArtist(artistdata)
  const artist = artistdata
  const router = useRouter()

  const closeArtist = () => {
    router.push('/artists')
  }

  if (artist == null || artist == undefined) {
    /*
      TODO: add more detailed 404 page, or just redirect back to list?
      router.push("/artists");
      return (null);
    */
    return (
      <div className="w-full min-h-full flex items-center justify-center">
        This artist does not exist
      </div>
    )
  } else {
    return (
      <div>
        <div className="flex flex-col">
          <button onClick={closeArtist} className="place-self-end p-4">
            <img src="/closeIcon.svg" />
          </button>
        </div>
        <ArtistRow artist={artist} type="detail" />
        <Tabs color="pink" headers={['Work', 'Info']}>
          <WorkPanel works={artist.work} />
          <InfoPanel artist={artist} />
        </Tabs>
      </div>
    )
  }
}

export default ArtistPage
