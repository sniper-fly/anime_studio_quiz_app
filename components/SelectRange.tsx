import { FC, useState } from "react";

const SelectRange: FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<string>("");

  const choicesClassName =
    " mt-10 text-center rounded-lg md:w-1/3 w-2/3 bg-gray-300 p-4 hover:scale-105 ";
  const selectedClassName = " ring-2 ring-blue-700 text-blue-700 ";

  return (
    <div className="grid justify-items-center">
      <h1 className="text-3xl font-bold text-center mt-3">Select Quiz Topic</h1>
      <button className={choicesClassName}>
        <label>Generate Quizzes From Your Anilist</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 mx-auto p-2.5"
          placeholder="Your Anilist Username"
        />
      </button>
      <button className={choicesClassName}>This Season</button>
      <button className={choicesClassName}>Upcoming Next Season</button>
      <button
        id="All-Time Popular"
        onClick={(e) => {
          setSelectedCardId("All-Time Popular");
        }}
        className={
          choicesClassName +
          (selectedCardId === "All-Time Popular" ? selectedClassName : "")
        }
      >
        All-Time Popular
      </button>
      <button className={choicesClassName}>
        <label>Choose Season</label>
        <div className="flex">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 m-2"
            value={new Date().getFullYear()}
          >
            {/* 1950から現在の年+1までの連続した整数を生成 */}
            {/* 現在年をデフォルトで選択する */}
            {Array.from(
              { length: new Date().getFullYear() - 1950 + 2 },
              (_, i) => i + 1950
            ).map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 m-2">
            <option>Winter</option>
            <option>Spring</option>
            <option>Summer</option>
            <option>Fall</option>
          </select>
        </div>
      </button>
      {/* 上記のカードが選択されてから表示する */}
      <div className=" mt-10 text-center rounded-lg md:w-1/3 w-2/3 bg-green-300 p-4 hover:scale-105 ">
        Play!
      </div>
    </div>
  );
};

export default SelectRange;
