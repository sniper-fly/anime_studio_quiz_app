export type Medium = Array<{
  __typename?: "Media";
  title?: { __typename?: "MediaTitle"; native?: string | null } | null;
  coverImage?: {
    __typename?: "MediaCoverImage";
    extraLarge?: string | null;
  } | null;
  studios?: {
    __typename?: "StudioConnection";
    nodes?: Array<{ __typename?: "Studio"; name: string } | null> | null;
  } | null;
} | null>;
