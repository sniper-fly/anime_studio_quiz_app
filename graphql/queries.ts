import { gql } from "./generates/gql";

export const SEASON_ANIME = gql(/* GraphQL */ `
  query SEASON_ANIME($season: MediaSeason!, $seasonYear: Int!) {
    Page(page: 1, perPage: 50) {
      media(
        season: $season
        seasonYear: $seasonYear
        type: ANIME
        format: TV
        sort: POPULARITY_DESC
      ) {
        title {
          native
        }
        coverImage {
          extraLarge
        }
        studios(isMain: true) {
          nodes {
            name
          }
        }
      }
    }
  }
`);

export const ALL_TIME_POPULAR = gql(/* GraphQL */ `
  query ALL_TIME_POPULAR {
    Page(page: 1, perPage: 50) {
      media(type: ANIME, format: TV, sort: POPULARITY_DESC) {
        title {
          native
        }
        coverImage {
          extraLarge
        }
        studios(isMain: true) {
          nodes {
            name
          }
        }
      }
    }
  }
`);

export const USER_LISTS = gql(/* GraphQL */ `
  query USER_LISTS($userName: String!) {
    MediaListCollection(userName: $userName, type: ANIME) {
      lists {
        entries {
          media {
            title {
              native
            }
            coverImage {
              extraLarge
            }
            studios(isMain: true) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  }
`);
