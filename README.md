# RPGツクールMV/MZ 公開プラグイン一覧

![profile](./profile.png)

RPGツクールMV/MZのプラグイン一覧
* MV・MZそれぞれのフォルダを分けてあります。
* MV向けでもMZで使えたり、逆のパターンもあります。

連絡・相談は https://twitter.com/gemini_gamedev/ まで。

## MVプラグイン一覧
| プラグイン名 | マニュアル |簡易説明 |
|--|--|--|
| `@作成予定` <br> GMN_DataBasePriority.js |未作成| データベースの項目の表示順を、メモ欄で指定した優先度の順に並び替えられます。 <br> アイテム・スキル・武器・防具が対象です。|
| [GMN_ItemPriority.js](./MV/GMN_ItemPriority.js) | 未作成| アイテムの並び順を作者が指定した「優先度」順に変更することができます。|
| [GMN_SkillPriority.js](./MV/GMN_SkillPriority.js) | 未作成|スキルの並び順を作者が指定した「優先度」順に変更することができます。|
| [GMN_OneSpriteCharacter.js](./MV/GMN_OneSpriteCharacter.js)|未作成| 一枚絵をキャラチップにできます。 |
|  `@非推奨` <br>[GMN_AssertPlayerPurchasement.js](./MV/GMN_AssertPlayerPurchasement.js) | 未作成| ショップで売買するたびに,指定した変数が増えるようになります。 |
|  `@非推奨` <br> [GMN_SelfVariables.js](./MV/GMN_SelfVariables.js) |未作成|セルフスイッチに似たセルフ変数を定義できます。<br>※ほかに上位互換があるため非推奨。
|  `@非推奨` <br> [GMN_SetSwitchOnLoad.js](./MV/GMN_SetSwitchOnLoad.js) |未作成| ゲームをロードしたときにONになるスイッチを設定できます。|
|  `@非推奨` <br> [GMN_WindowPointUnit.js](./MV/GMN_WindowPointUnit.js)| 未作成|  ダメージに単位を付けられます。 |

## MZプラグイン一覧

| プラグイン名 | マニュアル |簡易説明 |
|--|--|--|
| [GMN_BackgroundNotBlur.js](./MZ/GMN_BackgroundNotBlur.js) |[GMN_BackgroundNotBlur](./MZ/GMN_BackgroundNotBlur.md)| メニュー画面その他で背景をぼかすのをやめます。<br> 導入するだけで動く。
| [GMN_VariableExpansion.js](./MZ/GMN_VariableExpansion.js)  |[GMN_VariableExpansion](./MZ/GMN_VariableExpansion.md)| 「文章の表示」をはじめとしたウィンドウ内で` `` `で囲んだ内容がスクリプトとして解釈されます。<br/>選択肢や文字列ピクチャなど`Window_Base`を継承しているウィンドウならどこでも利用可能です。|
| [GMN_AutoSave.js](./MZ/GMN_AutoSave.js)  |未作成| オートセーブが行われるタイミングを変更します。<br> プラグインパラメータで指定したスイッチによって <br> マップ切り替え時・戦闘終了時にオートセーブするかを切り替えられます。|
| [GMN_DataBasePriority.js](./MZ/GMN_DataBasePriority.js)  |未作成| データベースの項目の表示順を、メモ欄で指定した優先度の順に並び替えられます。 <br> アイテム・スキル・武器・防具が対象です。|
| [GMN_DescriptionWithFomula.js](./MZ/GMN_DescriptionWithFomula.js) |[GMN_DescriptionWithFomula](./MZ/GMN_DescriptionWithFomula.md)| 装備品による能力値増減を自動で説明欄に表示します。
| [GMN_ReadMe.js](./MZ/GMN_ReadMe.js)  |未作成| ReadMeをゲーム内で参照できるようにします。<br> 読み込んだ内容をゲーム画面上で表示する機能は提供していません。<br> 他プラグインやスクリプトを利用してください。|
|  `@非推奨` <br> [GMN_CommonEventKey.js](./MZ/GMN_CommonEventKey.js) |未作成|  コモンイベントをID指定ではなく名前指定で動かせる。<br/>※並列処理等で使ったときの実行順に難があるため非推奨。
|  `@非推奨` <br> [GMN_GLSLShader.js](./MZ/GMN_GLSLShader.js) | 未作成|GLSLで定義したアニメーションをピクチャに適用できます。<br/>※うまく動作しないことがあるため非推奨。