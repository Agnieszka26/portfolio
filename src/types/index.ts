export type {
  Detail,
  Project,
  ProjectDetails,
  RemoteCoverImage,
  SanityImage,
  SanityImageAsset,
  SlideImage,
} from "./project";

export {
  projectSlug,
  toRemoteCoverImage,
  toSlideImages,
} from "./project";

/** Legacy Airtable thumbnail shapes — unused after Sanity migration. */
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

/** @deprecated Prefer `SlideImage` from `@/types/project`. */
export type ImageDb = {
  id: string;
  width: number;
  height: number;
  url: string;
  filename?: string;
  size?: number;
  type?: string;
  thumbnails?: Thumbnails;
};
