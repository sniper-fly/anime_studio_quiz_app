import { FC, useState } from "react";
import QuizBoard from "./QuizBoard";
import { AnimeStudioQuiz } from "../types/AnimeStudioQuiz";
import useSound from "use-sound";

// @ts-ignore
import atariSound from "../public/sound/atari.mp3";
// @ts-ignore
import hazureSound from "../public/sound/hazure.mp3";

type Props = {
  quizzes: AnimeStudioQuiz[];
};

const GameBoard: FC<Props> = (props) => {
  const [point, setPoint] = useState(0);
  const [questionNum, setQuestionNum] = useState(1);
  const [chosenIndices, setChosenIndices] = useState<number[]>([]);
  // 解答前、解答後の選択肢の色を変えるためのstate
  const [isAnswered, setIsAnswered] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  // 音声の再生
  const [playAtari] = useSound(atariSound);
  const [playHazure] = useSound(hazureSound);

  // ポイントの加算判定、問題数の加算、問題の切り替え
  const handleClick = (idx: number) => {
    if (questionNum > 10) {
      return;
    }

    const goNext = () => {
      setIsAnswered(false);
      setQuestionNum(questionNum + 1);
    };

    if (isAnswered) {
      if (timerId) {
        clearTimeout(timerId);
        setTimerId(null);
      }
      goNext();
    } else {
      setIsAnswered(true);
      setChosenIndices([...chosenIndices, idx]);
      // ポイントを加算
      if (props.quizzes[questionNum - 1].choices[idx].isCorrect) {
        setPoint(point + 10);
        playAtari();
      } else {
        playHazure();
      }
      const id = setTimeout(goNext, 1200);
      setTimerId(id);
    }
  };

  return (
    // ポイントと問題数を表示
    <>
      <div className="md:flex-row flex-col container flex mx-auto border-b border-gray-200 p-2">
        <div className="md:ml-5 mx-auto text-3xl">Total {point}pt</div>
        <div className="md:ml-auto md:mr-0 mx-auto text-3xl">
          {Math.min(questionNum, 10)} / 10
        </div>
      </div>

      <QuizBoard
        handleClick={handleClick}
        questionNum={questionNum}
        quizzes={props.quizzes}
        isAnswered={isAnswered}
        chosenIndices={chosenIndices}
      />
    </>
  );
};

export default GameBoard;
