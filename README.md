# RPGツクールMZ/MV 公開プラグイン一覧

![profile](./profile.png)

* [MZプラグイン一覧]( #MZプラグイン一覧)
* [MVプラグイン一覧]( #MVプラグイン一覧)
## MZプラグイン一覧

| プラグイン名 | マニュアル |簡易説明 |
|--|--|--|
| [GMN_BackgroundNotBlur.js](./MZ/GMN_BackgroundNotBlur.js) |[GMN_BackgroundNotBlur](./MZ/GMN_BackgroundNotBlur.md)| メニュー画面その他で背景をぼかすのをやめます。 導入するだけで動く。
| [GMN_VariableExpansion.js](./MZ/GMN_VariableExpansion.js)  |[GMN_VariableExpansion](./MZ/GMN_VariableExpansion.md)| 「文章の表示」をはじめとしたウィンドウ内で` `` `で囲んだ内容がスクリプトとして解釈されます。選択肢や文字列ピクチャなど`Window_Base`を継承しているウィンドウならどこでも利用可能です。|
| [GMN_AutoSave.js](./MZ/GMN_AutoSave.js)  |[GMN_AutoSave](./MZ/GMN_AutoSave.md)| オートセーブが行われるタイミングを変更します。 プラグインパラメータで指定したスイッチによって  マップ切り替え時・戦闘終了時にオートセーブするかを切り替えられます。|
| [GMN_DataBasePriority.js](./MZ/GMN_DataBasePriority.js)  |[GMN_DataBasePriority](./MZ/GMN_DataBasePriority.md)| データベースの項目の表示順を、メモ欄で指定した優先度の順に並び替えられます。  アイテム・スキル・武器・防具が対象です。|
| [GMN_OneSpriteCharacter.js](./MZ/GMN_OneSpriteCharacter.js) |[GMN_OneSpriteCharacter](./MZ/GMN_OneSpriteCharacter.md)| 一枚絵をキャラチップにできます。 |
| [GMN_DescriptionWithFomula.js](./MZ/GMN_DescriptionWithFomula.js) |[GMN_DescriptionWithFomula](./MZ/GMN_DescriptionWithFomula.md)| 装備品による能力値増減を自動で説明欄に表示します。
| [GMN_ReadMe.js](./MZ/GMN_ReadMe.js)  |[GMN_ReadMe](./MZ/GMN_ReadMe.md)| ReadMeをゲーム内で参照できるようにします。 読み込んだ内容をゲーム画面上で表示する機能は提供していません。 他プラグインやスクリプトを利用してください。|
| [GMN_PictureArrange.js](./MZ/GMN_PictureArrange.js)  |[GMN_PictureArrange](./MZ/GMN_PictureArrange.md)| 複数のピクチャを整列して表示できます。|

## MVプラグイン一覧
| プラグイン名 | マニュアル |簡易説明 |
|--|--|--|
| ※`GMN_BackgroundNotBlur.js` MV版作成予定はありません。 既存プラグインをご利用ください。 |無し|無し
| `@作成予定`  GMN_VariableExpansion.js|作成予定| 「文章の表示」をはじめとしたウィンドウ内で` `` `で囲んだ内容がスクリプトとして解釈されます。選択肢や文字列ピクチャなど`Window_Base`を継承しているウィンドウならどこでも利用可能です。|
| ※`GMN_AutoSave.js` MV版作成予定はありません。 MVにオートセーブ機能がないためです。|無し|無し|
| `@作成予定`  GMN_DataBasePriority.js |作成予定| データベースの項目の表示順を、メモ欄で指定した優先度の順に並び替えられます。  アイテム・スキル・武器・防具が対象です。|
| [GMN_OneSpriteCharacter.js](./MV/GMN_OneSpriteCharacter.js)|作成予定| 一枚絵をキャラチップにできます。 |
| `@作成予定`  GMN_DescriptionWithFomula.js |作成予定| 装備品による能力値増減を自動で説明欄に表示します。
| `@作成予定`  GMN_ReadMe.js  |作成予定| ReadMeをゲーム内で参照できるようにします。 読み込んだ内容をゲーム画面上で表示する機能は提供していません。 他プラグインやスクリプトを利用してください。|
| `@作成予定`  GMN_DescriptionWithFomula.js |作成予定| 装備品による能力値増減を自動で説明欄に表示します。
| `@作成予定`  GMN_ReadMe.js |作成予定| ReadMeをゲーム内で参照できるようにします。 読み込んだ内容をゲーム画面上で表示する機能は提供していません。 他プラグインやスクリプトを利用してください。|
| `@非推奨`  [GMN_ItemPriority.js](./MV/GMN_ItemPriority.js) |無し| アイテムの並び順を作者が指定した「優先度」順に変更することができます。 より包括的なプラグインである `GMN_DataBasePriority` を作成予定です。|
| `@非推奨`  [GMN_SkillPriority.js](./MV/GMN_SkillPriority.js) |無し|スキルの並び順を作者が指定した「優先度」順に変更することができます。 より包括的なプラグインである `GMN_DataBasePriority` を作成予定です。|