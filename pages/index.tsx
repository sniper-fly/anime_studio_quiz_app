import { gql, useQuery } from "@apollo/client";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
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
    />
  );
};

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center">Aniquiz</h1>
      <div
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
        style={{ maxHeight: "400px" }}
      >
        <AnimeCard />
        <AnimeCard />
        <AnimeCard />
        <AnimeCard />
        <AnimeCard />
      </div>
    </div>
    // ヘッダーにサイトのタイトル「Aniquiz」を入れる
    // 6枚のアニメのキャラクター画像を表示し、正解の画像をクリックすると得点が加算される
  );
}
