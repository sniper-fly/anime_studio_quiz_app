import Game from "../components/Game";
import SelectRange from "@/components/SelectRange";
import { useState } from "react";
import { GameProps } from "@/types/GameProps";

export default function Home() {
  const [gameMode, setGameMode] = useState<string>("selectingTopic");
  const [gameProps, setGameProps] = useState<GameProps>({ 
    query: undefined,
    extractMedium: () => undefined,
  });

  if (gameMode === "selectingTopic") {
    return (
      <SelectRange
        setGameMode={setGameMode}
        setGameProps={setGameProps}
      />
    );
  } else if (gameMode === "playing") {
    return <Game {...gameProps} />;
  }
}
