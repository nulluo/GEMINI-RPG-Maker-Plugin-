# GMN_DataBasePriority

https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_DataBasePriority.js

データベースの項目の表示順を、メモ欄で指定した優先度の順に並び替えられます。

---

プラグインに関する問い合わせは [Twitter](https://twitter.com/gemini_gamedev)でお願いいたします。

それ以外の場所は見ていないことが多いので、あらかじめご了承ください。

## 利用方法

1. アイテム・スキル・武器・防具 のメモ欄に以下のように優先度を記述します。<br>
  記述例:
    - アイテム1 `<priority:600>`
    - アイテム2 `<priority:1200>`
    - アイテム3 `<priority:900>`
  と記述すると<br>
  アイテム1(優先度600)➔アイテム3(優先度900)➔アイテム2(優先度1200)<br>
  の順に表示されます。<br>
  ※優先度のタグ名("priority"の箇所)はプラグインパラメータで変更可能です。<br>
  ※優先度の値("600"の箇所)は正の整数で記述してください。<br>
  <details>
  <summary>エディタ上の操作と実行結果</summary>

  ![example.1.jpg](GMN_DataBasePriority/example.1.jpg)
  ![example.2.jpg](GMN_DataBasePriority/example.2.jpg)
  ![example.3.jpg](GMN_DataBasePriority/example.3.jpg)
  ![example.4.jpg](GMN_DataBasePriority/example.4.jpg)

  </details>
2. アイテム・スキル・武器・防具が優先度順に表示されるようになります。<br>
  昇順(1,2,3...の順番)と降順(999999,999998,999997...)を<br>
  プラグインパラメータで選択可能です。<br>
  優先度が同じ場合には,、標準仕様通りにID順に並びます。<br>
3. メモ欄に優先度が設定されていない場合に、<br>
  プラグインパラメータでデフォルトの優先度を設定できます。<br>

## プラグインパラメータ

### asc
優先度を昇順と降順のどちらにするかを選択します。
昇順の場合には、1,2,3...の順番で並びます。
降順の場合には、999999,999998,999997...
の順番で並びます。

### defaultPriority
優先度が設定されていない・整数でない場合に設定される
優先度のデフォルト値です。

## 開発者向け機能
プラグインパラメータ "isScriptEnabled" が有効な場合、
プラグイン外部から並び替えスクリプトを実行できます。

スクリプトやプラグインの利用を想定しています。

非破壊的に実行できます。

### 並び替えスクリプト利用方法

`window.<プラグイン名>.sortByPriority(<並び替え対象>)` を
実行します。

#### <プラグイン名>
<プラグイン名>は本プラグインのファイル名から拡張子を除いたものです。
デフォルトでは "GMN_DataBasePriority"。

#### <並び替え対象>
<並び替え対象> は$dataXxxなどに代表されるデータベース設定項目の配列です。

ただし、各項目は必ず "id" および "meta" のフィールドを持つ必要があります。

> 例: `$dataEnemies.slice(1)`

スクリプト実行によって変化しません。

#### スクリプトの返り値
返り値は、並び替え済みの配列です。