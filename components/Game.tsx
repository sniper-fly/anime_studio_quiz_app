import { FC } from "react";
import GameBoard from "./GameBoard";
import { useQuery } from "@apollo/client";
import { gql } from "../graphql/gql";
import studioNamesJson from "../public/studio_names.json";

function getRandomIndices(length: number, count: number): number[] {
  if (count > length) {
    throw new Error("count must be less than or equal to length");
  }
  // 0からlength - 1までの連続した整数を生成
  const allIndices = Array.from({ length }, (_, index) => index);
  // Fisher-Yates シャッフルアルゴリズムを使用してシャッフル
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allIndices[i], allIndices[j]] = [allIndices[j], allIndices[i]];
  }
  // 最初のcount個を選択
  return allIndices.slice(0, count);
}

const TRENDING_ANIME = gql(/* GraphQL */ `
  query TRENDING_ANIME {
    Page(page: 1, perPage: 50) {
      media(
        season: FALL
        seasonYear: 2023
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

export interface Choice {
  name: string;
  isCorrect: boolean;
}
export interface AnimeStudioQuiz {
  title: string;
  coverImage: string;
  choices: Choice[];
}

// studio_names.jsonから、nameと一致しないもののなかからランダムに3つ選ぶ。
// それをChoicesの配列にして返す

// data.Page.media[0].studios.nodes[0].name

const useQuizData = () => {
  const { loading, error, data } = useQuery(TRENDING_ANIME);

  if (loading || error) {
    return {
      loading,
      error,
      data: undefined,
    };
  }

  const medium = data && data?.Page?.media;
  if (!medium) {
    return {
      loading,
      error,
      data: undefined,
    };
  }

  const randomIndices = getRandomIndices(medium.length, 10);
  const quizData = randomIndices.map((index) => medium[index]);
  return {
    loading,
    error,
    data: quizData,
  };
};

// stateが変わると再度Graphqlのクエリが走ってしまうので、
// クエリ結果のみをGameコンポーネントで保持するようにする
const Game: FC = () => {
  const { loading, error, data } = useQuizData();

  if (loading) return "loading"; // other loading UI component
  if (error) return error.message; // other error UI component
  if (!data) return "no anime data"; // other error UI component

  const quizData: AnimeStudioQuiz[] = data.map((element) => {
    const name =
      (element?.studios?.nodes && element.studios.nodes[0]?.name) || "";
    const fakeChoiceData = studioNamesJson.filter(
      (studioName) => studioName !== name
    );
    const randomIndices = getRandomIndices(fakeChoiceData.length, 3);
    const threeChoices = randomIndices.map((index) => fakeChoiceData[index]);
    const fakeChoices = threeChoices.map((choice) => ({
      name: choice,
      isCorrect: false,
    }));
    return {
      title: element?.title?.native || "",
      coverImage: element?.coverImage?.extraLarge || "",
      choices: [
        {
          name: name,
          isCorrect: true,
        },
        ...fakeChoices,
      ].sort(() => Math.random() - 0.5),
    };
  });

  return <GameBoard quizzes={quizData} />;
};

export default Game;
