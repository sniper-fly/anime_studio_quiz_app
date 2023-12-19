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
    <div className="flex flex-wrap justify-around p-10">
      {props.quizzes.map((quiz, i) => (
        <>
          <div key={i} className="w-1/4">
            <Image
              src={quiz.coverImage}
              alt=""
              width={300}
              height={500}
              className="mx-auto"
            />
            {quiz.title}
          </div>
          <SelectionBoard
            handleClick={() => { /* do nothing */ }}
            quiz={quiz}
            isAnswered={true}
            chosenIndex={props.chosenIndices[i]}
          />
        </>
      ))}
    </div>
  );
};

export default Review;
