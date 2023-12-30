import Game from "../components/Game";
import SelectTopic from "@/components/SelectTopic";
import { useState } from "react";
import { GameProps } from "@/types/GameProps";
import { useGameMode } from "@/components/GameModeContext";

export default function Home() {
  const gameMode = useGameMode();
  const [gameProps, setGameProps] = useState<GameProps>({
    query: undefined,
    extractMedium: () => undefined,
  });

  if (gameMode === "selectingTopic") {
    return <SelectTopic setGameProps={setGameProps} />;
  } else if (gameMode === "playing") {
    return <Game {...gameProps} />;
  }
}
