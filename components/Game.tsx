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

// stateが変わると再度Graphqlのクエリが走ってしまうので、
// クエリ結果のみをGameコンポーネントで保持するようにする
const Game: FC = () => {
  // const { loading, error, data } = useQuizData();
  const { loading, error, data } = useQuery(TRENDING_ANIME);

  if (loading) return "loading"; // other loading UI component
  if (error) return error.message; // other error UI component
  const medium = data?.Page?.media;
  if (!medium) return "no data"; // other no data UI component

  const selectedMedium = getRandomIndices(medium.length, 10).map(
    (index) => medium[index]
  );

  const quizData: AnimeStudioQuiz[] = selectedMedium.map((element) => {
    // element.studios.nodesが複数存在する可能性があるので、
    // そのどれにも該当しないfakeChoiceをstudioNamesJsonから選ぶ
    const names = (element?.studios?.nodes &&
      element.studios.nodes.map((e) => e?.name)) || ["-"];
    const fakeChoiceData = studioNamesJson.filter(
      (studioName) => !names.includes(studioName)
    );

    const randomIndices = getRandomIndices(fakeChoiceData.length, 3);
    const threeChoices = randomIndices.map((index) => fakeChoiceData[index]);
    const fakeChoices = threeChoices.map((choice) => ({
      name: choice,
      isCorrect: false,
    }));
    return {
      title: element?.title?.native ?? "-",
      coverImage: element?.coverImage?.extraLarge ?? "-",
      choices: [
        {
          name: names[0] ?? "-",
          isCorrect: true,
        },
        ...fakeChoices,
      ].sort(() => Math.random() - 0.5),
    };
  });

  return <GameBoard quizzes={quizData} />;
};

export default Game;
