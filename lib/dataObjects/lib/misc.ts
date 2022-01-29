import Artist from './dataObjects/artist';
import Artistlist from './dataObjects/artist_list';
import Work from './dataObjects/work';
import Link from './dataObjects/link';

/**
  Converting the raw data json objects into array full ob artist objects defined in './dataObjects/artist'
  */
export function convertDataToArtists(obj: any) {
  const artistdata = new Artistlist();
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
  let singleArtist = new Artist()

  singleArtist.name = obj.name;
  singleArtist.handle = obj.handle;
  singleArtist.iconColor = obj.iconColor;
  singleArtist.medium = obj.medium;
  singleArtist.location = obj.location;
  singleArtist.email = obj.email;
  singleArtist.pronouns = obj.pronoun;
  singleArtist.bio = obj.bio;
  singleArtist.mediums = obj.mediums;
  singleArtist.mediumsOfInterest = obj.mediumsOfInterest;

  var linksample = new Array();
  for (var m = 0; m < Object.keys(obj.links).length; m++) {
    let linkobj = new Link();
    let singlelink = obj.links[m];
    linkobj.title = singlelink.type;
    linkobj.link = singlelink.link;
    linksample.push(linkobj);
  }
  singleArtist.links = linksample;

  var worksample = new Array();
  for (var k = 0; k < Object.keys(obj.work).length; k++) {
    let workobj = new Work();
    let singlework = obj.work[k];
    workobj.type = singlework.type;
    workobj.link = singlework.link;
    worksample.push(workobj);
  }
  singleArtist.works = worksample;

  return singleArtist
}
