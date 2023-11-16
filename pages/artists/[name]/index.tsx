import React from 'react'
import { useRouter } from 'next/router'
import { GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'

import { ArtistRow } from '../../../components/artists/artistRow.component'
import Tabs from '../../../components/tabView/tabView.component'
import WorkPanel from '../../../components/tabView/workPanel.component'
import InfoPanel from '../../../components/tabView/infoPanel.component'
import { getArtistsWithUserAndWorkAndLinks } from '../../api/artists'
import Image from 'next/legacy/image'
import { getArtistByHandle, ArtistWithUser, getArtistInviter, Inviter } from '../../api/artists/[name]'

export const getStaticPaths = async () => {
  const data = await getArtistsWithUserAndWorkAndLinks()
  const paths = data.map((artist) => {
    return {
      params: { name: artist.handle },
    }
  })
  return {
    paths,
    fallback: 'blocking',
  }
}

interface IParams extends ParsedUrlQuery {
  name: string
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { name } = context.params as IParams
  
  const artistRes = await getArtistByHandle(name)
  const artist = JSON.parse(JSON.stringify(artistRes))
  
  let inviter = null
  if (artist.invitedBy) {
    const { invitedBy: { profileType, profileId } } = artist
    const inviterRes = await getArtistInviter(profileType, profileId)
    inviter = JSON.parse(JSON.stringify(inviterRes))
  }

  return {
    props: {
      artist,
      inviter
    },
  }
}
interface Props {
  artist: ArtistWithUser,
  inviter: Inviter
}

const ArtistPage: React.FC<Props> = ({ artist, inviter }) => {
  const router = useRouter()

  const closeArtist = () => {
    router.push('/artists')
  }

  return (
    artist ? (
      <div>
        <div className="flex flex-col">
          <button onClick={closeArtist} className="place-self-end p-4">
            <Image alt='Close' src="/closeIcon.svg" width={16} height={16} />
          </button>
        </div>
        <ArtistRow artist={artist} type="detail" />
        <div className='p-6'/>
        <Tabs headers={['Work', 'Info']}>
          <WorkPanel works={artist.links.filter(({ type }) => type === 'WORK')} />
          <InfoPanel artist={artist} inviter={inviter} />
        </Tabs>
      </div>
    ) : (
      <div className="w-full min-h-full flex items-center justify-center">
          This artist does not exist
      </div>
    )
  )
}

export default ArtistPage
