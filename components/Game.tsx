import { FC } from "react";
import GameBoard from "./GameBoard";
import { useQuery } from "@apollo/client";
import studioNamesJson from "../public/studio_names.json";
import Loading from "./Loading";
import { AnimeStudioQuiz } from "../types/AnimeStudioQuiz";
import { Medium } from "@/types/Medium";
import { GameProps } from "@/types/GameProps";

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

const genQuizData = (
  medium: Medium,
  quizNum: number = 10
): AnimeStudioQuiz[] => {
  return narrowRandom(medium, quizNum).map((element) => {
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
          // 複数のスタジオが関わっている可能性があるので、その中からランダムに1つ選ぶ
          name: narrowRandom(correctNames, 1)[0] ?? "-",
          isCorrect: true,
        },
        ...fakeChoices,
      ].sort(() => Math.random() - 0.5),
    };
  });
};

// stateが変わると再度Graphqlのクエリが走ってしまうので、
// クエリ結果のみをGameコンポーネントで保持するようにする
const Game: FC<GameProps> = ({ query, queryParams, extractMedium }) => {
  const { loading, error, data } = useQuery(query, queryParams);

  if (loading) return <Loading />;
  if (error) return error.message; // other error UI component
  const medium: Medium | null | undefined = extractMedium(data);
  if (!medium) return "no data"; // other no data UI component

  const quizData = genQuizData(medium);
  return <GameBoard quizzes={quizData} />;
};

export default Game;
