import { FC } from "react";
import { AnimeStudioQuiz } from "../types/AnimeStudioQuiz"

type Props = {
  handleClick: (idx: number) => void;
  quiz: AnimeStudioQuiz;
};

const SelectionBoard: FC<Props> = (props) => {
  // ここでprops.quiz.choicesの中身を表示する
  return (
    <div className="container mx-auto flex flex-wrap">
      {props.quiz.choices.map((choice, i) => (
        <div key={i} className="md:w-1/2 w-full p-4 hover:scale-105">
          <div
            className="text-center bg-gray-200 rounded-lg p-8"
            onClick={() => {
              props.handleClick(i);
            }}
          >
            {choice.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectionBoard;
