import { FC } from "react";
import { AnimeStudioQuiz } from "../types/AnimeStudioQuiz";
import Image from "next/image";
import SelectionBoard from "./SelectionBoard";
import Review from "./Review";

type Props = {
  handleClick: (idx: number) => void;
  questionNum: number;
  quizzes: AnimeStudioQuiz[];
  isAnswered: boolean;
  chosenIndices: number[];
};

const QuizBoard: FC<Props> = (props) => {
  // current quiz
  const quiz = props.quizzes[props.questionNum - 1];

  if (props.questionNum > 10) {
    return (
      <Review quizzes={props.quizzes} chosenIndices={props.chosenIndices} />
    );
  }

  return (
    <>
      <div className="container flex mx-auto border-b border-gray-200 py-3">
        {/* Imageを囲うdivのサイズを固定すれば、画像のサイズが変わっても
        画像の位置がずれない */}
        <div className="mx-auto">
          <Image
            src={quiz.coverImage}
            alt=""
            width={300}
            height={500}
            className="mx-auto"
          />
          <div className="text-center font-medium text-lg mt-2">
            {quiz.title}
          </div>
        </div>
      </div>
      <SelectionBoard
        handleClick={props.handleClick}
        quiz={quiz}
        isAnswered={props.isAnswered}
      />
    </>
  );
};

export default QuizBoard;
