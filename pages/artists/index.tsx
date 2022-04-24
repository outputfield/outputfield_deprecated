import React from 'react'
import {useRouter} from 'next/router'
import {NextPage, GetStaticProps} from 'next'

import {ArtistRow} from '../../components/artists/artistRow.component'
import {convertDataToArtists} from '../../lib/misc'
import { getArtists } from '../api/artists'
import { BASE_URL } from '../../lib/constants'
import { Prisma } from '@prisma/client'

type ArtistsWithWorkAndLinks = Prisma.ArtistGetPayload<{
  include: {
    work: true,
    links: true,
  }
}>

const ArtistListPage = ({ artists }: any) => {
  const router = useRouter()

  // const artistdata = convertDataToArtists(artists)
  const artistdata = {artists: []}
  const data = artistdata.artists

  return (
    <div>
      {
        <div>
          <div>
            <div>
              {data.length+' result'+(data.length==1?'':'s')}
            </div>
          </div>
          <div>
            {
              data.map((e: any, i)=>{
                return (
                  <ArtistRow key={e.handle} artist={e} onClick={()=>{
                    router.push('/artists/' + e.handle)
                  }} type="list"/>
                )
              })
            }
          </div>
        </div>
      }
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // const res = await fetch('http://localhost:3000/api/artists')
  // const artists = await res.json()
  // const artists = await getArtists()
  const items = await fetch(`${BASE_URL}/api/artists`)
  console.log(items)

  // return {artists}
  return {
    props: { items }
  }
}

// ArtistListPage.getInitalProps = getInitialProps

export default ArtistListPage
