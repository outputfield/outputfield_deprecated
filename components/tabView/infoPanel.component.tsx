import * as React from "react";
import styles from "./infoPanel.module.scss";
import Artist from "../data/artist";
import { ContactPanel } from "../tabView/contactPanel.component";
import { Button } from "../button/button.component";

interface Props {
  artist: Artist;
  className?: string;
  includeContact?: boolean;
}

export const InfoPanel = ({
  artist,
  className,
  includeContact = true
}:Props) => {
  function openContact(){
    let t = document.querySelector("#infoPanel");
    t.querySelector("."+styles.info).classList.remove(styles.active);
    t.querySelector("."+styles.contact).classList.add(styles.active);
  }
  function closeContact(){
    let t = document.querySelector("#infoPanel");
    t.querySelector("."+styles.contact).classList.remove(styles.active);
    t.querySelector("."+styles.info).classList.add(styles.active);
  }

  return (
    <div className={className+" "+styles.root} id="infoPanel">
      <div className={styles.info+" "+styles.active}>
        <div className={styles.bio}>
          {artist.bio}
        </div>
        <div className={styles.mediums}>
          <div className={styles.mediumCircle}></div>
          {
            artist.mediums.length==0?
            (<div className={styles.mediumTop}/>)
            :
            (
              <div className={styles.mediumTop}>
                Mediums:<br/>
                {artist.mediums.join(", ")}
              </div>
            )
          }
          {
            artist.mediumsOfInterest.length==0?
            (<div className={styles.mediumBottom}/>)
            :
            (
              <div className={styles.mediumBottom}>
                Mediums Of Interest:<br/>
                {artist.mediumsOfInterest.join(", ")}
              </div>
            )
          }
        </div>
        <div className={styles.links}>
          {
            artist.links.map((e,i)=>{
              return (<div key={"link_"+i} className={styles.linkRow}><a href={e.link}>{e.title}</a></div>)
            })
          }
        </div>
        <div className={styles.referral+(includeContact?"":" "+styles.noPad)}>
          <div className={styles.referredBy}>
            Referred By:<br/>
            <a href={"../artists/"+artist.referredBy.handle}>{artist.referredBy.name}</a>
          </div>
        </div>
        {includeContact?
          (
            <Button onClick={openContact}>
              contact
            </Button>
          )
          : ""
        }
      </div>
      {includeContact?
        (
          <div className={styles.contact}>
            <ContactPanel artist={artist} onClick={closeContact}/>
          </div>
        )
        : ""
      }
    </div>
  );
}
