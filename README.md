# Claude Certified Architect – Foundations 学習アプリ

Exam Guide をドメイン単位で「翻訳(日本語)+ 原文(英語)対比 + まとめ」の形で読めるようにした静的サイト。

## 起動方法

`index.html` をブラウザで直接開くだけで動作する(サーバー起動は不要)。

データは `data/*.js` として `<script>` タグで読み込む形式にしており(`window.EXAM_INDEX` / `window.EXAM_DATA` に格納)、`fetch`+JSONは使っていないため `file://` で開いてもCORSエラーは発生しない。

## 画面構成

- 左サイドバー: 全ページ(ドメイン/セクション)の一覧。現在開いているページを強調表示し、その配下にページ内の見出し一覧を表示する。スクロールに応じて現在見ている見出しをハイライトする(スクロールスパイ)。
- メインエリア: 選択中ページの「全体まとめ」トグルと、見出し(タスクステートメント等)ごとの日英対訳リスト。日本語文をクリックすると原文(英語)が展開する。

## ページの追加方法

1. `data/<id>.js` を以下の形式で作成する(`data/domain1.js` を参考に)。

   ```js
   window.EXAM_DATA = window.EXAM_DATA || {};
   window.EXAM_DATA["<id>"] = {
     "id": "<id>",
     "title": "...",
     "titleJa": "...",
     "summaryHtml": "...(全体まとめのHTML文字列)",
     "sections": [
       {
         "heading": "...(セクション見出し。サイドバーの目次にもそのまま使われる)",
         "groups": [
           { "label": "...", "sentences": [ { "ja": "...", "en": "..." } ] }
         ]
       }
     ]
   };
   ```

2. `data/index.js` の `window.EXAM_INDEX` 配列に `{"id": "<id>", "title": "...", "titleJa": "..."}` をページの表示順で追記する。
3. `index.html` に `<script src="data/<id>.js"></script>` を(`js/app.js` より前に)追記する。
