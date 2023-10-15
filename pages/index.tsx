import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { FC } from "react";

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

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center">Aniquiz</h1>
      <div className="container flex flex-wrap mx-auto">
        {
          Array(6).fill(null).map((_, i) => (
            <div className="md:w-1/3 p-4">
              <AnimeCard key={i} />
            </div>
          ))
        }
      </div>
    </div>
    // ヘッダーにサイトのタイトル「Aniquiz」を入れる
    // 6枚のアニメのキャラクター画像を表示し、正解の画像をクリックすると得点が加算される
  );
}
