# ref
https://zenn.dev/catallaxy_dev/articles/tailwindcss-create-floating-action-button
フローティングボタンの実装参考

https://flowbite.com/docs/components/button-group/
Tailwindの参考サイト

chatGPTの参考になった回答
https://chat.openai.com/share/b7e559df-a7b2-4507-8863-28d200ad3434

# TODO
- テストの実装

- クエリ対象が10未満でもエラーを吐かないように調整

- 時間制限機能
画面中央に円形プログレスバーを用意して、
時間と連動して、バーが減るようにする
デジタル時間も用意する

https://azby.fmworld.net/game/su-16-quizzatsugaku.html
UIはこれを参考に

- 同じスタジオが作った別のアニメを3つぐらい表示する
画像の上にモーダルを表示するか、
画像を左にスライドして右側に表示するか

- 問題数の調整
cookieかlocalStorageとかを使って問題数の調整

# DONE

- 出題範囲の選択
airing anime
ユーザーid指定
favorite TOP100
upcoming next season

- READMEの整備

- 製作会社の名前が出てしまうことがあるので、
あくまでクリエイターの制作会社を選択肢に表示するようにしたい

- vercelにデプロイ

- 画像が表示できていない時にloadingを表示したい
もしくは、予め読み込んでおきたい
--> keyプロパティを使って新しいコンポーネントとして認識させることで解決
loadingは表示できず

- 正解時の動作
音声をつける（魔王魂）
https://maou.audio/

正解の選択肢だけを薄緑にして、
チェックマークをつけて
正解だとわかりやすくする

不正解の選択肢を薄くする

不正解時の音声を変える

tap to skipみたいなUIにして、
tapしたら次の問題に進めるようにする（スマホ意識）

- 問題振り返り機能
選んだ選択肢を振り返られるようにしておく

# Never

- 得点をTwitterでシェアできるようにする

- マンガ編
原作者の名前を当てる
