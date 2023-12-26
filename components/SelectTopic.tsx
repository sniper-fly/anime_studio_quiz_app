import { ALL_TIME_POPULAR, SEASON_ANIME, USER_LISTS } from "@/graphql/queries";
import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import { All_Time_PopularQuery, MediaSeason, Season_AnimeQuery, User_ListsQuery } from "@/graphql/generates/graphql";
import { GameProps } from "@/types/GameProps";
import { Medium } from "@/types/Medium";

const diffMonth = (date: Date, diffMonth: number): Date => {
  const resultDate = date;
  resultDate.setMonth(date.getMonth() + diffMonth);
  return resultDate;
};

const findMediaSeason = (date: Date): MediaSeason => {
  const month = date.getMonth() + 1;
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
  setGameProps: Dispatch<SetStateAction<GameProps>>;
};

const TopicCard: FC<TopicCardProps> = (props) => {
  const choicesClassName =
    " mt-10 text-center rounded-lg md:w-1/3 w-2/3 bg-gray-300 p-4 hover:scale-105 ";
  const selectedClassName = " ring-2 ring-blue-700 text-blue-700 ";

  return (
    <button
      onClick={() => {
        props.setSelectedCardId(props.cardId);
        props.setGameProps(props.gameProps);
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

type SelectTopicProps = {
  setGameMode: (gameMode: string) => void;
  setGameProps: Dispatch<SetStateAction<GameProps>>;
};

const SelectTopic: FC<SelectTopicProps> = (props) => {
  const [selectedCardId, setSelectedCardId] = useState<string>("");
  const [chosenDate, setChosenDate] = useState<Date>(new Date());
  const now = new Date();

  return (
    <div className="grid justify-items-center">
      <h1 className="text-3xl font-bold text-center mt-3">Select Quiz Topic</h1>

      <TopicCard
        cardId="Generate Quizzes From Your AniList"
        selectedId={selectedCardId}
        setSelectedCardId={setSelectedCardId}
        gameProps={{
          query: USER_LISTS,
          extractMedium: (data: User_ListsQuery) => {
            return data?.MediaListCollection?.lists?.flatMap((list) =>
              list?.entries?.map((entry) => entry?.media)
            ) as Medium;
          },
        }}
        setGameProps={props.setGameProps}
      >
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 mx-auto p-2.5"
          placeholder="Your AniList Username"
          onChange={(e) => {
            props.setGameProps((prev) => ({
              ...prev,
              queryParams: {
                variables: {
                  userName: e.target.value,
                },
              },
            }));
          }}
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
              season: findMediaSeason(now),
              seasonYear: now.getFullYear(),
            },
          },
          extractMedium: (data: Season_AnimeQuery) => data?.Page?.media,
        }}
        setGameProps={props.setGameProps}
      />

      <TopicCard
        cardId="Upcoming Next Season"
        selectedId={selectedCardId}
        setSelectedCardId={setSelectedCardId}
        gameProps={{
          query: SEASON_ANIME,
          queryParams: {
            variables: {
              season: findMediaSeason(diffMonth(now, +3)),
              seasonYear: diffMonth(now, +3).getFullYear(),
            },
          },
          extractMedium: (data: Season_AnimeQuery) => data?.Page?.media,
        }}
        setGameProps={props.setGameProps}
      />

      <TopicCard
        cardId="All-Time Popular"
        selectedId={selectedCardId}
        setSelectedCardId={setSelectedCardId}
        gameProps={{
          query: ALL_TIME_POPULAR,
          extractMedium: (data: All_Time_PopularQuery) => data?.Page?.media,
        }}
        setGameProps={props.setGameProps}
      />

      <TopicCard
        cardId="Choose Season"
        selectedId={selectedCardId}
        setSelectedCardId={setSelectedCardId}
        gameProps={{
          query: SEASON_ANIME,
          queryParams: {
            variables: {
              season: findMediaSeason(chosenDate),
              seasonYear: chosenDate.getFullYear(),
            },
          },
          extractMedium: (data: Season_AnimeQuery) => data?.Page?.media,
        }}
        setGameProps={props.setGameProps}
      >
        <div className="flex">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 m-2"
            // 未選択状態の時に現在年を選択する
            defaultValue={chosenDate.getFullYear()}
            onChange={(e) => {
              const year = parseInt(e.target.value);
              const month = chosenDate.getMonth();
              setChosenDate(new Date(year, month, 1));
            }}
          >
            {/* 1950から現在の年+1までの連続した整数を生成 */}
            {Array.from(
              { length: new Date().getFullYear() - 1970 + 2 },
              (_, i) => i + 1970
            ).map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 m-2"
            onChange={(e) => {
              const year = chosenDate.getFullYear();
              const month = parseInt(e.target.value);
              setChosenDate(new Date(year, month, 1));
            }}
          >
            <option value="1">Winter (1 ~ 3)</option>
            <option value="4">Spring (4 ~ 6)</option>
            <option value="7">Summer (7 ~ 9)</option>
            <option value="10">Fall (10 ~ 12)</option>
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

export default SelectTopic;
