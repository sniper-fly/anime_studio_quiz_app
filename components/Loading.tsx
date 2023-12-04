import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="flex flex-col m-3" aria-label="読み込み中">
      <div className="mx-auto animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      <div className="mx-auto">Now Loading...</div>
    </div>
  );
};

export default Loading;
