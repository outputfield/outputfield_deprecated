import { useEffect, useState, componentWillMount } from "react";
import { NextPageContext } from 'next'
import styles from "./artists.module.scss";
import { ArtistRow } from "./artistRow.component";
import artistdata from "../data/artist-data";
import Artist from "../artist/artist.component";

let data = artistdata.artists;

// import { PrismaClient } from '@prisma/client'
// export async function getServerSideProps() {
//   const prisma = new PrismaClient();
//   const allArtists = await prisma.artist.findMany({});
//   prisma.$disconnect();
//   return {
//     props: { allArtists }, // will be passed to the page component as props
//   }
// }
//
// const getData = async () => {
//   try {
//     const res = await fetch('http://localhost:3000/api/artists/1')
//     const data = await res.json()
//     return { data }
//   } catch (err) {
//     console.error(err.message);
//   }
// };

const ArtistListPage = ({artists}) => {

  // const getServerSideProps = async({ req }: NextPageContext) => {
  //   const res = await fetch('http://localhost:3000/api/artists/1')
  //   const data = await res.json()
  //   return { stars: data }
  // }
  // console.log(props.stars)
  //
  const [testdata, setTestdata] = useState([])
  // useEffect(() => {
  //   let mounted = true;
  //   getData().then(items => {
  //       if(mounted) {
  //         setTestdata(items)
  //       }
  //   })
  //   return () => mounted = false;
  // }, [])
  console.log(artists)
  //let testtest = this.props;
  //console.log(testtest)
  //console.log(testtest.artists)
  //console.log(artists)
  // useEffect(() => {
  //   fetch.get('/api/artists/1').then(response => {
  //     const data = await response.json()
  //
  //     if (!data) {
  //       return {
  //         notFound: true,
  //       }
  //     }
  //     console.log(data)
  //   });
  // }, []);

  const [overlay, setOverlay] = useState("");

  // save scroll position to return to original point in list after state change
  let scroll = 0;

  function loadArtist(handle){
    window.history.pushState({},'',"/artists/"+handle);
    scroll = window.scrollY;
    window.scrollTo(window.scrollX,0);
    setOverlay(handle);
  }

  function closeOverlay(back=true){
    setOverlay("");
    if(back)window.history.go(-1);
    window.scrollTo(window.scrollX,scroll);
  }

  return (
    <div>
      {
        overlay==""?
        (
          <div className={styles.root}>
            <div className={styles.header}>
              <div className={styles.results}>
                {data.length+" result"+(data.length==1?"":"s")}
              </div>
            </div>
            <div className={styles.artistList}>
            {
              data.map((e,i)=>{
                return ( <ArtistRow artist={e} onClick={()=>{loadArtist(e.handle)}} type="list"/> )
              })
            }
            </div>
          </div>
        ):
        (
          <Artist overlay={true} artistid={overlay} exitFunction={closeOverlay}/>
        )
      }
    </div>
  );
};

Artist.getInitialProps = async function () {
  const res = await fetch('http://localhost:3000/api/artists/1')
  const artists = await res.json()
  return { artists }
};

export default ArtistListPage;
