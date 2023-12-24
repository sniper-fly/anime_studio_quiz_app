import Game from "../components/Game";
import SelectTopic from "@/components/SelectTopic";
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
      <SelectTopic setGameMode={setGameMode} setGameProps={setGameProps} />
    );
  } else if (gameMode === "playing") {
    return <Game {...gameProps} />;
  }
}
