import { useRouter } from 'next/router';
import styles from "../../components/artist/artist.module.scss";
import { ArtistRow } from "../../components/artists/artistRow.component";
import { TabView } from "../../components/tabView/tabView.component";
import { WorkPanel } from "../../components/tabView/workPanel.component";
import { InfoPanel } from "../../components/tabView/infoPanel.component";
import { ContactPanel } from "../../components/tabView/contactPanel.component";

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/artists');
  const data = await res.json();

  const paths = data.map(artist => {
    return {
      params: { id: artist.id.toString()}
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async(context) => {
  const id = context.params.id;
  const res = await fetch('http://localhost:3000/api/artists/' + id);
  const data = await res.json();

  return {
    props: { artist : data }
  }
}

const ArtistPage = ({ overlay=false, artist }) => {
  const contactTab = false;

  const router = useRouter();
  function closeArtist() {
    router.push("/artists");
  }

  if(artist==null||artist==undefined){
    /*
    // can add more detailed 404 page, or just redirect back to list?
    router.push("/artists");
    return (null);
    */
    return (
      <div style={{width:"100%",minHeight:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
        This artist does not exist
      </div>
    )
  } else {
    return (
      <div className={styles.root+(overlay?" "+styles.overlay:"")}>
        <div className={styles.exit} onClick={overlay?exitFunction:closeArtist}/>
        <ArtistRow artist={artist} type="detail"/>
        { contactTab?
          (
            <TabView headers={["work","info","contact"]} activeTab={0}>
            <WorkPanel works={artist.works}/>
            <InfoPanel artist={artist} includeContact={false} />
            <ContactPanel artist={artist} separateTab={true}/>
            </TabView>
          ) :
          (
            <TabView headers={["work","info"]} activeTab={0}>
            <WorkPanel works={artist.works}/>
            <InfoPanel artist={artist} />
            </TabView>
          )
        }
      </div>
    );
  }
};

export default ArtistPage;
