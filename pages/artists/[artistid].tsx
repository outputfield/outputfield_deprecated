import { useRouter } from 'next/router';
import Artist from "../../components/artist/artist.component";

const ArtistPage = () => {
  const router = useRouter();
  let {artistid} = router.query;

  if(artistid==null||artistid==undefined){
    return (<div/>)
  } else {
    return (
      <Artist artistid={""+artistid[0]}/>
    );
  }
};

// ArtistPage.getInitialProps = async function () {
//   return {}
// };

export default ArtistPage;
