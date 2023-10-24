import { FC } from "react";
import { AnimeQuiz } from "./Game";
import Image from "next/image";

type Props = {
  handleClick: () => void;
  questionNum: number;
  quiz: AnimeQuiz;
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
            width={400}
            height={600}
            className="mx-auto"
          />
          <div className="text-center font-medium text-lg mt-2">
            {props.quiz.title}
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-wrap">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="md:w-1/2 w-full p-4 hover:scale-105">
              <div
                className="text-center bg-gray-200 rounded-lg p-8"
                onClick={props.handleClick}
              >
                hoge
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default QuizBoard;
