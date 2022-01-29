import { useRouter } from 'next/router';
import { ArtistRow } from "../../components/artists/artistRow.component";
import { TabView } from "../../components/tabView/tabView.component";
import { WorkPanel } from "../../components/tabView/workPanel.component";
import { InfoPanel } from "../../components/tabView/infoPanel.component";
import { ContactPanel } from "../../components/tabView/contactPanel.component";
import { convertDataToSingleArtist } from '../../lib/misc'

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/artists');
  const data = await res.json();

  const paths = data.map(artist => {
    return {
      params: { name: artist.handle}
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async(context) => {
  const name = context.params.name;
  const res = await fetch('http://localhost:3000/api/artists/' + name);
  const data = await res.json();

  return {
    props: { artistdata : data }
  }
}

const ArtistPage = ({ overlay=false, artistdata }) => {
  const contactTab = false;

  let artist = convertDataToSingleArtist(artistdata);

  const router = useRouter();
  function closeArtist() {
    router.push("/artists");
  }

  if(artist==null||artist==undefined){
    /*
      can add more detailed 404 page, or just redirect back to list?
      router.push("/artists");
      return (null);
    */
    return (
      <div style={{
        width: "100%",
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        This artist does not exist
      </div>
    )
  } else {
    return (
      <div>
        <div onClick={overlay ? exitFunction : closeArtist}/>
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
