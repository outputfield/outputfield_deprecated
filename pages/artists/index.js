import React from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {useState} from 'react';

import styles from '../../components/artists/artists.module.scss';
import {ArtistRow} from '../../components/artists/artistRow.component';
import Link from 'next/link';
import {convertDataToArtists} from '../../lib/misc';
import useAuth from '../../hooks/useAuth';

const ArtistListPage = ({artists}) => {
  const router = useRouter();
  const {user, loading} =useAuth();

  const artistdata = convertDataToArtists(artists);
  const data = artistdata.artists;

  return (
    <div>
      {loading ? 'Loading...' : user.email}

      <button onClick={() => router.push('/login')}>Login</button>
      {
        <div className={styles.root}>
          <div className={styles.header}>
            <div className={styles.results}>
              {data.length+' result'+(data.length==1?'':'s')}
            </div>
          </div>
          <div className={styles.artistList}>
            {
              data.map((e, i)=>{
                return (
                  <ArtistRow key={e.handle} artist={e} onClick={()=>{
                    router.push('/artists/' + e.handle);
                  }} type="list"/>
                );
              })
            }
          </div>
        </div>
      }
    </div>
  );
};

ArtistListPage.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/api/artists');
  const artists = await res.json();
  return {artists};
};

export default ArtistListPage;
