import Game from "../components/Game";
import SelectRange from "@/components/SelectRange";
import { useState } from "react";
import { GameProps } from "@/types/GameProps";
import { useImmer } from "use-immer";

export default function Home() {
  const [gameMode, setGameMode] = useState<string>("selectingTopic");
  const [gameProps, updateGameProps] = useImmer<GameProps>({
    query: undefined,
    queryParams: undefined,
    extractMedium: () => undefined,
  });

  if (gameMode === "selectingTopic") {
    return (
      <SelectRange setGameMode={setGameMode} updateGameProps={updateGameProps} />
    );
  } else if (gameMode === "playing") {
    return <Game {...gameProps} />;
  }
}
