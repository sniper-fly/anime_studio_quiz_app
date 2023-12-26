import newNames from "../../names.json" assert { type: "json" };
import oldNames from "../../public/studio_names.json" assert { type: "json" };
import * as fs from "fs";

// newNamesとoldNamesは以下のような配列
// [
//   "MADHOUSE",
//   "Wit Studio",
//   "CloverWorks",
//   "Kinema Citrus"
// ]
// newNamesとoldNamesから取得した配列の差分をとる
// newNamesにあってoldNamesにない要素を取得
const diff = newNames.filter((e) => !oldNames.includes(e));
// console.log(diff);
// console.log(diff.length);

const outputFilePath = "./diff.json";
fs.promises
  .writeFile(
    outputFilePath,
    JSON.stringify(Array.from(diff), null, 2),
    "utf8"
  )
  .then(() => {
    console.log("JSONファイルにデータを出力しました:");
  })
  .catch((err) => {
    console.error("JSONファイルへの書き込みエラー:", err);
  });
