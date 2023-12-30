import { FC } from "react";
import { AnimeStudioQuiz } from "../types/AnimeStudioQuiz";
import Image from "next/image";
import SelectionBoard from "./SelectionBoard";

type Props = {
  quizzes: AnimeStudioQuiz[];
  chosenIndices: number[];
};

const Review: FC<Props> = (props) => {
  return (
    <>
      {/* floating buttons */}
      <div className="flex items-center justify-center">
        <div className="fixed z-50 space-x-32 bottom-10">
          <button
            type="button"
            className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center hover:scale-105"
          >
            Retry
          </button>
          <button
            type="button"
            className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center hover:scale-105"
          >
            Reselect
          </button>
        </div>{" "}
      </div>

      <h1 className="text-2xl text-center font-bold my-3">Your Score</h1>

      {props.quizzes.map((quiz, i) => (
        <div key={i} className="flex p-12">
          <div className="w-1/4">
            <Image
              src={quiz.coverImage}
              alt=""
              width={300}
              height={500}
              className="mx-auto"
            />
            <p className="text-center">{quiz.title}</p>
          </div>
          <div className="w-3/4 ml-5 flex flex-wrap items-center">
            <SelectionBoard
              handleClick={() => {
                /* do nothing */
              }}
              quiz={quiz}
              isAnswered={true}
              chosenIndex={props.chosenIndices[i]}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Review;
