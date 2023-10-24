import { FC, useState } from "react";
import QuizBoard from "./QuizBoard";
import {  useQuery } from "@apollo/client";
import { gql } from "../graphql/gql";

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

// data.Page.media[0].studios.nodes[0].name

const chooseQuiz = (): any => {
  const { loading, error, data } = useQuery(TRENDING_ANIME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const medium = data && data?.Page?.media;
  if (!medium) return <p> Media is null </p>

  const randomIndices = getRandomIndices(medium.length, 10);
  const selectedElements = randomIndices.map((index) => medium[index]);
  console.log(selectedElements);
  return "hoge";
};

const Game: FC = () => {
  const [point, setPoint] = useState(0);
  const [questionNum, setQuestionNum] = useState(1);
  // 制作会社の情報を50件取得(こっちはどこかに保存しておいても良い)
  // アニメ情報を50件ぐらい取得
  // そこからランダムに10件選ぶ
  chooseQuiz();

  // ポイントの加算判定、問題数の加算、問題の切り替え
  const handleClick = () => {
    if (questionNum > 10) {
      return;
    }
    // ポイントを加算
    setPoint(point + 10);
    // 問題数を加算
    setQuestionNum(questionNum + 1);
  };

  return (
    <>
      {/* ポイントと問題数を表示 */}
      <div className="md:flex-row flex-col container flex mx-auto border-b border-gray-200 p-2">
        <div className="md:ml-5 mx-auto text-3xl">Total {point}pt</div>
        <div className="md:ml-auto md:mr-0 mx-auto text-3xl">
          {Math.min(questionNum, 10)} / 10
        </div>
      </div>
      <QuizBoard handleClick={handleClick} questionNum={questionNum} />
    </>
  );
};

export default Game;