import Artist from './dataObjects/artist';
import Artistlist from './dataObjects/artist_list';

/**
  Converting the raw data json objects into array full ob artist objects defined in './dataObjects/artist'
  */
export function convertDataToArtists(obj: any) {
  const artistdata = new Artistlist();
  artistdata.artists = new Array();

  for (var i = 0; i < Object.keys(obj).length; i++) {
    let tmpObject = obj[i]

    let singleArtist = new Artist()
    singleArtist.name = obj[i].name;
    singleArtist.handle = obj[i].handle;
    singleArtist.iconColor = obj[i].iconColor;
    singleArtist.medium = obj[i].medium;
    singleArtist.location = obj[i].location;
    singleArtist.email = obj[i].email;
    singleArtist.pronouns = obj[i].pronoun;
    singleArtist.bio = obj[i].bio;

    artistdata.push(singleArtist)
  }
  return artistdata
}
