import Work from './work';
import Link from './link';

export default class Artist{
  name: string;
  handle: string;
  iconColor: string;
  medium: string;
  location: string;
  email: string;
  pronouns: string;
  works: Work[];
  bio: string;
  mediums: string[];
  mediumsOfInterest: string[];
  links: Link[];
  referredBy: Artist;

  constructor(
    name: string,
    handle: string,
    iconColor: string,
    medium: string,
    location: string,
    email: string = null,
    pronouns: string = null,
    works: Work[] = null,
    bio: string = null,
    mediums: string[] = null,
    mediumsOfInterest: string[] = null,
    links: Link[] = null,
    referredBy: Artist = null,
  ){
    this.name = name;
    this.handle = handle;
    this.iconColor = iconColor;
    this.medium = medium;
    this.location = location;
    this.email = email;
    this.pronouns = pronouns;
    this.works = works;
    this.bio = bio;
    this.mediums = mediums
    this.mediumsOfInterest = mediumsOfInterest;
    this.links = links;
    this.referredBy = referredBy;
  }
}
