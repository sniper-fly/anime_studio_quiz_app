//

import studioNamesRawJson from "../../result.json" assert { type: "json" };
import * as fs from "fs";

// {
//   "media": [
//     {
//       "studios": {
//         "nodes": [
//           {
//             "name": "MADHOUSE"
//           }
//         ]
//       }
//     },
//     {
//       "studios": {
//         "nodes": [
//           {
//             "name": "Wit Studio"
//           },
//           {
//             "name": "CloverWorks"
//           }
//         ]
//       }
//     },
//   ]
// }
// 上記のようなオブジェクトの配列から、nameを取り出してsetにする

export const studioNames = new Set(
  studioNamesRawJson.media.map((e) => e.studios.nodes.map((v) => v.name)).flat()
);

// 生成したsetを、names.jsonとしてエクスポートする

const outputFilePath = "./names.json";
fs.promises
  .writeFile(
    outputFilePath,
    JSON.stringify(Array.from(studioNames), null, 2),
    "utf8"
  )
  .then(() => {
    console.log("JSONファイルにデータを出力しました:");
  })
  .catch((err) => {
    console.error("JSONファイルへの書き込みエラー:", err);
  });
