import Game from "../components/Game";
import SelectRange from "@/components/SelectRange";

export default function Home() {
  return (
    <>
      {/* 出題範囲選択画面を表示する */}
      <SelectRange />
      {/* 出題範囲が選択されたら、Gameコンポーネントを表示する */}
      { true && <Game />}
    </>
  );
}
