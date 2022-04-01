import Artist from './dataObjects/artist';
import Artistlist from './dataObjects/artist_list';
import Work from './dataObjects/work';
import Link from './dataObjects/link';

/**
  Converting the raw data json objects into array full ob artist objects defined in './dataObjects/artist'
  */
export function convertDataToArtists(obj: any) {
  const artistdata = new Artistlist([]);
  artistdata.artists = new Array();

  for (var i = 0; i < Object.keys(obj).length; i++) {
    let singleArtist = convertDataToSingleArtist(obj[i])
    artistdata.push(singleArtist)
  }
  return artistdata
}

/**
  Converting the raw data json object into single artist class object defined in './dataObjects/artist'
  */
export function convertDataToSingleArtist(obj: any) {

  var linksample = new Array();
  for (var m = 0; m < Object.keys(obj.links).length; m++) {
    let singlelink = obj.links[m];
    let linkobj = new Link(singlelink.type,
      singlelink.link);

    linksample.push(linkobj);
  }

  var worksample = new Array();
  for (var k = 0; k < Object.keys(obj.work).length; k++) {
    let singlework = obj.work[k];
    let workobj = new Work(singlework.type,
      singlework.link);

    worksample.push(workobj);
  }

  return new Artist(
    obj.name,
    obj.handle,
    obj.iconColor,
    obj.medium,
    obj.location,
    obj.email,
    obj.pronoun,
    worksample,
    obj.bio,
    obj.mediums,
    obj.mediumsOfInterest,
    linksample,
    ''
  )
}
