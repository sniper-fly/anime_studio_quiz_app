import { ALL_TIME_POPULAR, SEASON_ANIME, USER_LISTS } from "@/graphql/queries";
import { FC, ReactNode, useState } from "react";
import { MediaSeason, User_ListsQuery } from "@/graphql/generates/graphql";
import { GameProps } from "@/types/GameProps";

const findMediaSeason = (month: number): MediaSeason => {
  if (month >= 1 && month <= 3) {
    return MediaSeason.Winter;
  } else if (month >= 4 && month <= 6) {
    return MediaSeason.Spring;
  } else if (month >= 7 && month <= 9) {
    return MediaSeason.Summer;
  } else {
    return MediaSeason.Fall;
  }
};

type TopicCardProps = {
  cardId: string;
  selectedId: string;
  children?: ReactNode;
  setSelectedCardId: (cardId: string) => void;
  gameProps: GameProps;
  updateGameProps: (gameProps: GameProps) => void;
};

const TopicCard: FC<TopicCardProps> = (props) => {
  const choicesClassName =
    " mt-10 text-center rounded-lg md:w-1/3 w-2/3 bg-gray-300 p-4 hover:scale-105 ";
  const selectedClassName = " ring-2 ring-blue-700 text-blue-700 ";

  return (
    <button
      onClick={() => {
        props.setSelectedCardId(props.cardId)
        props.updateGameProps(props.gameProps)
      }}
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

type SelectRangeProps = {
  setGameMode: (gameMode: string) => void;
  updateGameProps: (gameProps: GameProps) => void;
};

const SelectRange: FC<SelectRangeProps> = (props) => {
  const [selectedCardId, setSelectedCardId] = useState<string>("");
  const now = new Date();

  return (
    <div className="grid justify-items-center">
      <h1 className="text-3xl font-bold text-center mt-3">Select Quiz Topic</h1>

      <TopicCard
        cardId="Generate Quizzes From Your Anilist"
        selectedId={selectedCardId}
        setSelectedCardId={setSelectedCardId}
        gameProps={{
          query: USER_LISTS,
          queryParams: {
            variables: {
              userName: "", // ここに入力されたユーザー名を入れる
            },
          },
          extractMedium: (data: User_ListsQuery) => {
            return data?.MediaListCollection?.lists?.flatMap((list) =>
              list?.entries?.map((entry) => entry?.media)
            );
          },
        }}
        updateGameProps={props.updateGameProps}
      >
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 mx-auto p-2.5"
          placeholder="Your Anilist Username"
        />
      </TopicCard>

      <TopicCard
        cardId="This Season"
        selectedId={selectedCardId}
        setSelectedCardId={setSelectedCardId}
        gameProps={{
          query: SEASON_ANIME,
          queryParams: {
            variables: {
              season: findMediaSeason(now.getMonth() + 1),
              seasonYear: now.getFullYear(),
            },
          },
          extractMedium: (data) => data?.Page?.media,
        }}
        updateGameProps={props.updateGameProps}
      />

      <TopicCard
        cardId="Upcoming Next Season"
        selectedId={selectedCardId}
        setSelectedCardId={setSelectedCardId}
        gameProps={{
          query: SEASON_ANIME,
          queryParams: {
            variables: {
              season: findMediaSeason(now.getMonth() + 1 + 3),
              seasonYear: now.getFullYear(),
            },
          },
          extractMedium: (data) => data?.Page?.media,
        }}
        updateGameProps={props.updateGameProps}
      />

      <TopicCard
        cardId="All-Time Popular"
        selectedId={selectedCardId}
        setSelectedCardId={setSelectedCardId}
        gameProps={{
          query: ALL_TIME_POPULAR,
          extractMedium: (data) => data?.Page?.media,
        }}
        updateGameProps={props.updateGameProps}
      />

      <TopicCard
        cardId="Choose Season"
        selectedId={selectedCardId}
        setSelectedCardId={setSelectedCardId}
        gameProps={{
          query: SEASON_ANIME,
          extractMedium: (data) => data?.Page?.media,
        }}
        updateGameProps={props.updateGameProps}
      >
        <div className="flex">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 m-2"
            // 未選択状態の時に現在年を選択する
            defaultValue={selectedCardId === "" ? now.getFullYear() : undefined}
            onChange={(e) => {
              const year = e.target.value;
            }}
          >
            {/* 1950から現在の年+1までの連続した整数を生成 */}
            {Array.from(
              { length: new Date().getFullYear() - 1950 + 2 },
              (_, i) => i + 1950
            ).map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 m-2"
            onChange={(e) => {
              const season = e.target.value;
            }}
          >
            <option>Winter</option>
            <option>Spring</option>
            <option>Summer</option>
            <option>Fall</option>
          </select>
        </div>
      </TopicCard>

      {selectedCardId !== "" && (
        <div
          onClick={() => {
            props.setGameMode("playing");
          }}
          className=" mt-10 text-center rounded-lg md:w-1/3 w-2/3 bg-green-300 p-4 hover:scale-105 "
        >
          Play!
        </div>
      )}
    </div>
  );
};

export default SelectRange;
