import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useContext,
} from "react";

const GameModeContext = createContext("");
const GameModeDispatchContext = createContext<Dispatch<string> | undefined>(
  undefined
);

export const GameModeProvider = ({ children }: { children: ReactNode }) => {
  const [gameMode, dispatch] = useReducer(reducer, "selectingTopic");

  return (
    <GameModeContext.Provider value={gameMode}>
      <GameModeDispatchContext.Provider value={dispatch}>
        {children}
      </GameModeDispatchContext.Provider>
    </GameModeContext.Provider>
  );
};

export const useGameMode = () => {
  return useContext(GameModeContext);
};

export const useGameModeDispatch = () => {
  const dispatch = useContext(GameModeDispatchContext);
  if (!dispatch)
    throw new Error(
      "useGameModeDispatch must be used within a GameModeProvider"
    );
  return dispatch;
};

const reducer = (state: string, action: string) => {
  switch (action) {
    case "selectingTopic":
      return "selectingTopic";
    case "playing":
      return "playing";
    default:
      throw new Error(`Unknown action: ${action}`);
  }
};
