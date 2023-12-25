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
  const quiz = props.quizzes[props.questionNum - 1];

  if (props.questionNum > 10) {
    return (
      <Review quizzes={props.quizzes} chosenIndices={props.chosenIndices} />
    );
  }

  return (
    <>
      <div className="container flex flex-col mx-auto border-b border-gray-200 py-3">
        <div className="mx-auto h-96 w-80 relative">
          <Image
            key={quiz.title}
            src={quiz.coverImage}
            alt="Anime Cover Image"
            fill
            className="object-contain"
          />
        </div>
        <div className="text-center font-medium text-lg mt-2">{quiz.title}</div>
      </div>

      <div className="container mx-auto flex flex-wrap">
        <SelectionBoard
          handleClick={props.handleClick}
          quiz={quiz}
          isAnswered={props.isAnswered}
          chosenIndex={props.chosenIndices[props.questionNum - 1]}
        />
      </div>
    </>
  );
};

export default QuizBoard;
