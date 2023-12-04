import { FC } from "react";
import { AnimeStudioQuiz } from "../types/AnimeStudioQuiz"
import Image from "next/image";
import SelectionBoard from "./SelectionBoard";

type Props = {
  handleClick: (idx: number) => void;
  questionNum: number;
  quiz: AnimeStudioQuiz;
};

const QuizBoard: FC<Props> = (props) => {
  if (props.questionNum > 10) {
    return "終了";
  }

  return (
    <>
      <div className="container flex mx-auto border-b border-gray-200 py-3">
        <div className="mx-auto">
          <Image
            src={props.quiz.coverImage}
            alt=""
            width={300}
            height={500}
            className="mx-auto"
          />
          <div className="text-center font-medium text-lg mt-2">
            {props.quiz.title}
          </div>
        </div>
      </div>
      <SelectionBoard handleClick={props.handleClick} quiz={props.quiz} />
    </>
  );
};

export default QuizBoard;
