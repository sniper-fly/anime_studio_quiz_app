/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query SEASON_ANIME($season: MediaSeason!, $seasonYear: Int!) {\n    Page(page: 1, perPage: 50) {\n      media(\n        season: $season\n        seasonYear: $seasonYear\n        type: ANIME\n        format: TV\n        sort: POPULARITY_DESC\n      ) {\n        title {\n          native\n        }\n        coverImage {\n          extraLarge\n        }\n        studios(isMain: true) {\n          nodes {\n            name\n          }\n        }\n      }\n    }\n  }\n": types.Season_AnimeDocument,
    "\n  query ALL_TIME_POPULAR {\n    Page(page: 1, perPage: 50) {\n      media(type: ANIME, format: TV, sort: POPULARITY_DESC) {\n        title {\n          native\n        }\n        coverImage {\n          extraLarge\n        }\n        studios(isMain: true) {\n          nodes {\n            name\n          }\n        }\n      }\n    }\n  }\n": types.All_Time_PopularDocument,
    "\n  query USER_LISTS($userName: String!) {\n    MediaListCollection(userName: $userName, type: ANIME) {\n      lists {\n        entries {\n          media {\n            title {\n              native\n            }\n            coverImage {\n              extraLarge\n            }\n            studios(isMain: true) {\n              nodes {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.User_ListsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SEASON_ANIME($season: MediaSeason!, $seasonYear: Int!) {\n    Page(page: 1, perPage: 50) {\n      media(\n        season: $season\n        seasonYear: $seasonYear\n        type: ANIME\n        format: TV\n        sort: POPULARITY_DESC\n      ) {\n        title {\n          native\n        }\n        coverImage {\n          extraLarge\n        }\n        studios(isMain: true) {\n          nodes {\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SEASON_ANIME($season: MediaSeason!, $seasonYear: Int!) {\n    Page(page: 1, perPage: 50) {\n      media(\n        season: $season\n        seasonYear: $seasonYear\n        type: ANIME\n        format: TV\n        sort: POPULARITY_DESC\n      ) {\n        title {\n          native\n        }\n        coverImage {\n          extraLarge\n        }\n        studios(isMain: true) {\n          nodes {\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ALL_TIME_POPULAR {\n    Page(page: 1, perPage: 50) {\n      media(type: ANIME, format: TV, sort: POPULARITY_DESC) {\n        title {\n          native\n        }\n        coverImage {\n          extraLarge\n        }\n        studios(isMain: true) {\n          nodes {\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ALL_TIME_POPULAR {\n    Page(page: 1, perPage: 50) {\n      media(type: ANIME, format: TV, sort: POPULARITY_DESC) {\n        title {\n          native\n        }\n        coverImage {\n          extraLarge\n        }\n        studios(isMain: true) {\n          nodes {\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query USER_LISTS($userName: String!) {\n    MediaListCollection(userName: $userName, type: ANIME) {\n      lists {\n        entries {\n          media {\n            title {\n              native\n            }\n            coverImage {\n              extraLarge\n            }\n            studios(isMain: true) {\n              nodes {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query USER_LISTS($userName: String!) {\n    MediaListCollection(userName: $userName, type: ANIME) {\n      lists {\n        entries {\n          media {\n            title {\n              native\n            }\n            coverImage {\n              extraLarge\n            }\n            studios(isMain: true) {\n              nodes {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;