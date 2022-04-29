# 変数展開プラグインの利用例

[変数展開プラグイン](../GMN_VariableExpansion.md) の利用例です。

## マップ関連の名称

以下の項目をウィンドウ上に表示できます。

    【Tips】
    特定IDマップの表示名を取得するのは難しいようです。

- 現在プレイヤーがいるマップの表示名
- 特定のIDのマップの名前(エディタ上での名前)
- 現在プレイヤーがいるマップ名(エディタ上での名前)

### 現在プレイヤーがいるマップの表示名

スクリプト `$gameMap.displayName()` を使用すると現在プレイヤーがいるマップの表示名が取得できます。

マップ名の表示ウィンドウで表示される名称です。

【使用例】
<details>
<summary>スクリーンショットを表示する</summary>
    <img src=./pre_1.png width=50%><img src=./1.png width=50%>
</details>

```
◆文章：`$gameMap.displayName()`に詳しい人, なし, ウィンドウ, 下
：　　：ここは`$gameMap.displayName()`だよ。
```

### 特定のIDのマップの名前(エディタ上での名前)

スクリプト `$dataMapInfos[n].name` を使用するとn番のマップの名前が取得できます。

【使用例】
<details>
<summary>スクリーンショットを表示する</summary>
    <img src=./pre_1.png width=50%><img src=./pre_2.png width=50%>
    <img src=./2_3.png width=50%>
</details>

```
◆選択肢の表示：`$dataMapInfos[1].name`, `$dataMapInfos[2].name` (ウィンドウ, 右, #1, #2)
：`$dataMapInfos[1].name`のとき
  ◆注釈：処理を記述する
  ◆
：`$dataMapInfos[2].name`のとき
  ◆注釈：処理を記述する
  ◆
：分岐終了
```

### 現在プレイヤーがいるマップの名前(エディタ上での名前)

スクリプト `$dataMapInfos[$gameMap.mapId()].name` を使用すると現在プレイヤーがいるマップの名前が取得できます。

エディタでツリー上に表示される名前と同じです。

【使用例】
<details>
    <summary>スクリーンショットを表示する</summary>
    <img src=./pre_1.png width=50%><img src=./pre_2.png width=50%>
    <img src=./2_3.png width=50%>
</details>

```
◆文章：`$dataMapInfos[$gameMap.mapId()].name`に詳しい人, なし, ウィンドウ, 下
：　　：ここは`$dataMapInfos[$gameMap.mapId()].name`です。
：　　：どのマップに移動しますか？
```