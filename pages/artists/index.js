//import ArtistListPage from "../../components/artists/artists.component";
import { useState } from "react";
import styles from "../../components/artists/artists.module.scss";
import { ArtistRow } from "../../components/artists/artistRow.component";
import artistdata from "../../components/data/artist-data";
import Artist from "../../components/artist/artist.component";

import { convertDataToArtists } from '../../lib/misc'

let data = artistdata.artists;

const ArtistListPage = ({ artists }) => {

  //let artistdata = convertDataToArtists(artists);
  //let data = artistdata.artists;
  //console.log(data)

  const [overlay, setOverlay] = useState("");

  // save scroll position to return to original point in list after state change
  let scroll = 0;

  function loadArtist(handle){
    window.history.pushState({},'',"/artists/" + handle);
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

ArtistListPage.getInitialProps = async function () {
  const res = await fetch('http://localhost:3000/api/artists')
  const artists = await res.json()
  //console.log("json: " + JSON.stringify(artists));
  return { artists }
};

// ArtistListPage.getInitialProps = async ({ params }) => {
//   const res = await fetch('http://localhost:3000/api/artists/1')
//   const artists = await res.json()
//   return { props: { artists } }
// }

export default ArtistListPage;
