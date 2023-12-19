import { FC } from "react";
import { AnimeStudioQuiz } from "../types/AnimeStudioQuiz";

type Props = {
  handleClick: (idx: number) => void;
  quiz: AnimeStudioQuiz;
  isAnswered: boolean;
};

const SelectionBoard: FC<Props> = (props) => {
  const handleClick = (i: number) => {
    props.handleClick(i);
  };

  const selectionClassName = (isCorrect: boolean) => {
    const defaultClass = "text-center rounded-lg p-8";
    if (props.isAnswered) {
      if (isCorrect) {
        return defaultClass + " bg-green-200";
      } else {
        return defaultClass + " bg-gray-300 text-black/40";
      }
    } else {
      return defaultClass + " bg-gray-200";
    }
  };

  // ここでprops.quiz.choicesの中身を表示する
  return (
    <div className="container mx-auto flex flex-wrap">
      {props.quiz.choices.map((choice, i) => (
        <div key={i} className="md:w-1/2 w-full p-4 hover:scale-105">
          <div
            className={selectionClassName(choice.isCorrect)}
            onClick={() => handleClick(i)}
          >
            {choice.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectionBoard;
