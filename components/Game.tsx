import { FC } from "react";
import GameBoard from "./GameBoard";
import { useQuery } from "@apollo/client";
import { SEASON_ANIME } from "../graphql/queries";
import studioNamesJson from "../public/studio_names.json";
import Loading from "./Loading";
import { AnimeStudioQuiz } from "../types/AnimeStudioQuiz";
import { MediaSeason } from "@/graphql/generates/graphql";

const randomIndices = (length: number, count: number): number[] => {
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
};

// 配列からランダムにnum個選ぶ
function narrowRandom<T>(array: T[], num: number): T[] {
  return randomIndices(array.length, num).map((index) => array[index]);
}

const currentSeason = (): MediaSeason => {
  // JavaScriptのDateオブジェクトのgetMonth()は0から始まるため、+1する
  const currentMonth = new Date().getMonth() + 1;

  if (currentMonth >= 1 && currentMonth <= 3) {
    return MediaSeason.Winter;
  } else if (currentMonth >= 4 && currentMonth <= 6) {
    return MediaSeason.Spring;
  } else if (currentMonth >= 7 && currentMonth <= 9) {
    return MediaSeason.Summer;
  } else {
    return MediaSeason.Fall;
  }
};

// studio_names.jsonから、nameと一致しないもののなかからランダムに3つ選ぶ。
// それをChoicesの配列にして返す

// stateが変わると再度Graphqlのクエリが走ってしまうので、
// クエリ結果のみをGameコンポーネントで保持するようにする
const Game: FC = () => {
  const { loading, error, data } = useQuery(SEASON_ANIME, {
    variables: {
      season: currentSeason(),
      seasonYear: new Date().getFullYear(),
    },
  });

  if (loading) return <Loading />;
  if (error) return error.message; // other error UI component
  const medium = data?.Page?.media;
  if (!medium) return "no data"; // other no data UI component

  const quizData: AnimeStudioQuiz[] = narrowRandom(medium, 10).map(
    (element) => {
      const correctNames = (element?.studios?.nodes &&
        element.studios.nodes.map((e) => e?.name)) || ["-"];
      // element.studios.nodesが複数存在する可能性があるので、
      // そのどれにも該当しないfakeChoiceをstudioNamesJsonから選ぶ
      const fakeChoiceData = studioNamesJson.filter(
        (studioName) => !correctNames.includes(studioName)
      );
      // 3つの選択肢をランダムに選び、isCorrectをfalseにして追加
      const fakeChoices = narrowRandom(fakeChoiceData, 3).map((choice) => ({
        name: choice,
        isCorrect: false,
      }));

      return {
        title: element?.title?.native ?? "-",
        coverImage: element?.coverImage?.extraLarge ?? "-",
        choices: [
          {
            name: correctNames[0] ?? "-",
            isCorrect: true,
          },
          ...fakeChoices,
        ].sort(() => Math.random() - 0.5),
      };
    }
  );

  return <GameBoard quizzes={quizData} />;
};

export default Game;
