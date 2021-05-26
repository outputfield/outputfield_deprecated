import styles from "./artists.module.scss";
import Artist from "../data/artist";

interface Props {
  artist: Artist;
  type: "list" | "detail";
  onClick?: (event: any) => any;
}

export const ArtistRow = ({
  artist,
  type,
  onClick = null,
}:Props) => {
  let row = (
    <div className={styles.artistHeader +" "+ styles[type]}>
      <div className={styles.icon} style={{"--iconcolor": artist.iconColor}}/>
      <div className={styles.info}>
        <h1 className={styles.name}>
          {artist.name}
        </h1><br/>
        <div className={styles.handle}>
          {artist.handle}
        </div>
        <div className={styles.separator}/>
        <div className={styles.location}>
          {artist.location}
        </div><br/>
        {type=="detail"?
          (
            <div className={styles.pronouns}>
              {artist.pronouns}
            </div>
          ):""
        }
      </div>
      <div className={styles.medium}>
        {artist.medium}
      </div>
    </div>
  )

  if(type=="detail"){
    return row;
  } else {
    return (
      <a onClick={onClick}>
        {row}
      </a>
    )
  }
}
