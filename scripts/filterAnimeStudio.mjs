import * as fs from "fs";

const jsonFilePath = "../public/studios.json";
const outputFilePath = "../public/studio_names.json";

fs.readFile(jsonFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("ファイルの読み込みエラー:", err);
    return;
  }

  try {
    // JSONデータをパース
    const jsonData = JSON.parse(data);

    // "first" -> "studios" の階層まで移動
    const studios = jsonData.data.first.studios;

    // "isAnimationStudio" が true の要素のみを抽出
    const animationStudios = studios.filter(
      (studio) => studio.isAnimationStudio === true
    );

    const justNames = animationStudios.map((studio) => studio.name);

    fs.promises
      .writeFile(
        outputFilePath,
        JSON.stringify(justNames, null, 2),
        "utf8"
      )
      .then(() => {
        console.log("JSONファイルにデータを出力しました:", jsonFilePath);
      })
      .catch((err) => {
        console.error("JSONファイルへの書き込みエラー:", err);
      });

    // 結果を出力
    console.log(justNames);
  } catch (err) {
    console.error("JSONデータの解析エラー:", err);
  }
});
