import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import React, { FC } from "react";

const GET_MEDIA = gql(/* GraphQL */ `
  query {
    Page(page: 1, perPage: 5) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(search: "けいおん", type: ANIME) {
        id
        title {
          native
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
`);

const AnimeCard: FC = () => {
  const { loading, error, data } = useQuery(GET_MEDIA, {
    variables: { id: 2001 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Image
      src={data.Page.media[0].coverImage.extraLarge}
      alt=""
      width={230}
      height={345}
      className="mx-auto hover:scale-105"
    />
  );
};

const KonCards: FC = () => {
  return (
    <div className="container flex flex-wrap mx-auto">
      {Array(6)
        .fill(null)
        .map((_, i) => (
          <div className="md:w-1/3 p-4" key={i}>
            <AnimeCard />
          </div>
        ))}
    </div>
  );
};

export default KonCards;
