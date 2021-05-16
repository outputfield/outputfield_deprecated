import { useState } from "react";
import styles from "./artists.module.scss";
import { ArtistRow } from "./artistRow.component";
import artistdata from "../data/artist-data";
import Artist from "../artist/artist.component";

let data = artistdata.artists;

const ArtistListPage = (props) => {
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

// Artist.getInitialProps = async function () {
//   return {}
// };

export default ArtistListPage;
