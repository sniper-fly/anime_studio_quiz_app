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
