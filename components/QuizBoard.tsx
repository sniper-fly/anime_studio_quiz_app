import { FC, useState } from "react";

type Props = {
  handleClick: () => void;
  questionNum: number;
};

const QuizBoard: FC<Props> = (props) => {
  if (props.questionNum > 10) {
    return "終了"
  }

  return (
    <>
      <div className="container flex mx-auto border-b border-gray-200 py-3">
        <div className="mx-auto bg-blue-100">image</div>
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
