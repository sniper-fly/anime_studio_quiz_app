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
  // randomIndices(medium.length, medium.length)でまず要素をランダムに取得する
  // 順番に走査して、制作会社一覧の配列が以下の条件を満たす要素をquizNum個取得する
  // 1. 制作会社の情報がある
  // 2. studio_names.jsonに存在するstudioのみに絞った時、制作会社一覧配列が空でない
  const quizData: AnimeStudioQuiz[] = [];
  const indices = randomIndices(medium.length, medium.length);
  for (let i = 0; i < indices.length && quizData.length < quizNum; ++i) {
    const idx = indices[i];
    const media = medium[idx];

    const studioNames = media?.studios?.nodes?.map((e) => e?.name);
    if (!studioNames) continue;

    const actualStudioNames = studioNames.filter(
      (studio) => studio && studioNamesJson.includes(studio)
    ) as string[];
    if (actualStudioNames.length === 0) continue;

    const title = media?.title?.native;
    if (!title) continue;

    const coverImage = media?.coverImage?.extraLarge;
    if (!coverImage) continue;

    quizData.push({
      title,
      coverImage,
      choices: [
        {
          // 制作会社が複数ある場合はその中からランダムに選ぶ
          name: narrowRandom(actualStudioNames, 1)[0],
          isCorrect: true,
        },
        ...narrowRandom(
          studioNamesJson.filter(
            (studioName) => !actualStudioNames.includes(studioName)
          ),
          3
        ).map((fakeStudioName) => ({
          name: fakeStudioName,
          isCorrect: false,
        })),
      ].sort(() => Math.random() - 0.5),
    });
  }

  return quizData;
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
  if (quizData.length === 0) return "No quiz available"; // other no data UI component
  return <GameBoard quizzes={quizData} />;
};

export default Game;
