import { FC, useState } from "react";
import QuizBoard from "./QuizBoard";

const Game: FC = () => {
  const [point, setPoint] = useState(0);
  const [questionNum, setQuestionNum] = useState(1);
  // 制作会社の情報を50件取得(こっちはどこかに保存しておいても良い)
  // アニメ情報を50件ぐらい取得
  // そこからランダムに10件選ぶ

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
