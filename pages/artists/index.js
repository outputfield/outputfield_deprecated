import React from 'react'
import {useRouter} from 'next/router'
import Head from 'next/head'
import {useState} from 'react'

import prisma from '../../lib/prisma';
import {ArtistRow} from '../../components/artists/artistRow.component'
import Link from 'next/link'
import {convertDataToArtists} from '../../lib/misc'

const ArtistListPage = ({ artists }) => {
  const router = useRouter()

  // const artistdata = convertDataToArtists(artists)
  // const data = artistdata.artists
  const data = artists
  // console.log(typeof data)
  // debugger

  return (
    <div>
      {
        <div>
          <div>
            <input placeholder="search" className={`focus:border-blue-500`} />
            <div>
              {data.length+' result'+(data.length==1?'':'s')}
            </div>
          </div>
          <div>
            {
              data.map((e, i)=>{
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

export async function getStaticProps() {
  const res = await prisma.artist.findMany({
    include: {
      work: true,
      links: true
    },
  });
  const artists = JSON.parse(JSON.stringify(res));
  return {
    props: {
      artists,
    },
  }
}

export default ArtistListPage
