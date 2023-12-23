import { FC, ReactNode, useState } from "react";

type TopicCardProps = {
  cardId: string;
  selectedId: string;
  children?: ReactNode;
  handleClick: (cardId: string) => void;
};

const TopicCard: FC<TopicCardProps> = (props) => {
  const choicesClassName =
    " mt-10 text-center rounded-lg md:w-1/3 w-2/3 bg-gray-300 p-4 hover:scale-105 ";
  const selectedClassName = " ring-2 ring-blue-700 text-blue-700 ";

  return (
    <button
      onClick={() => props.handleClick(props.cardId)}
      className={
        choicesClassName +
        (props.cardId === props.selectedId ? selectedClassName : "")
      }
    >
      <label>{props.cardId}</label>
      {props.children}
    </button>
  );
};

const SelectRange: FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<string>("");

  return (
    <div className="grid justify-items-center">
      <h1 className="text-3xl font-bold text-center mt-3">Select Quiz Topic</h1>

      <TopicCard
        cardId="Generate Quizzes From Your Anilist"
        selectedId={selectedCardId}
        handleClick={setSelectedCardId}
      >
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 mx-auto p-2.5"
          placeholder="Your Anilist Username"
        />
      </TopicCard>
      <TopicCard
        cardId="This Season"
        selectedId={selectedCardId}
        handleClick={setSelectedCardId}
      />
      <TopicCard
        cardId="Upcoming Next Season"
        selectedId={selectedCardId}
        handleClick={setSelectedCardId}
      />
      <TopicCard
        cardId="All-Time Popular"
        selectedId={selectedCardId}
        handleClick={setSelectedCardId}
      />
      <TopicCard
        cardId="Choose Season"
        selectedId={selectedCardId}
        handleClick={setSelectedCardId}
      >
        <div className="flex">
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 m-2">
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
      </TopicCard>

      {selectedCardId !== "" && (
        <div className=" mt-10 text-center rounded-lg md:w-1/3 w-2/3 bg-green-300 p-4 hover:scale-105 ">
          Play!
        </div>
      )}
    </div>
  );
};

export default SelectRange;
