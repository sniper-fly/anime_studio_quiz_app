import { FC } from "react";
import { AnimeStudioQuiz } from "./Game";
import Image from "next/image";

type Props = {
  handleClick: (idx: number) => void;
  questionNum: number;
  quiz: AnimeStudioQuiz;
};

const QuizBoard: FC<Props> = (props) => {
  if (props.questionNum > 10) {
    return "終了"
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
      <div className="container mx-auto flex flex-wrap">
        {
          // ここでprops.quiz.choicesの中身を表示する
          props.quiz.choices.map((choice, i) => (
            <div key={i} className="md:w-1/2 w-full p-4 hover:scale-105">
              <div
                className="text-center bg-gray-200 rounded-lg p-8"
                onClick={() => {props.handleClick(i)}}
              >
                {choice.name}
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default QuizBoard;
