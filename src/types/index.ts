import { StaticImageData } from "next/image";

export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};
export type Thumbnails = {
  small: Thumbnail;
  large: Thumbnail;
  full: Thumbnail;
};

export type ImageDb = {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: Thumbnails;
};

/** Cover from an Airtable attachment field (use with `next/image` + remotePatterns). */
export type RemoteCoverImage = {
  url: string;
  width: number;
  height: number;
};

export type Project = {
  id: string;
  header: string;
  tags: string;
  paragraph: string;
  image: StaticImageData | RemoteCoverImage;
  linkToGithub: string;
  linkToLive: string;
  type: string;
  paragraph_pl: string;
};

export type Detail = {
  id: string;
  header: string;
  overview: string;
  technologies: string;
  backend: string;
  keyFeatures: string;
  challenges?: string;
  slides?: ImageDb[]
};
