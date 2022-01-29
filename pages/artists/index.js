import React from 'react'
import {useRouter} from 'next/router'
import Head from 'next/head'
import {useState} from 'react'

import {ArtistRow} from '../../components/artists/artistRow.component'
import Link from 'next/link'
import {convertDataToArtists} from '../../lib/misc'

const ArtistListPage = ({ artists }) => {
  const router = useRouter()

  const artistdata = convertDataToArtists(artists)
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

ArtistListPage.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/api/artists')
  const artists = await res.json()
  return {artists}
}

export default ArtistListPage
