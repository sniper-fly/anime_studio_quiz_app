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
