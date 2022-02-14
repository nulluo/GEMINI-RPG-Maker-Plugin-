# GMN_AutoSave

オートセーブが行われるタイミングを変更します。
https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_AutoSave.js

## 利用方法
プラグインパラメータで指定したスイッチによって

マップ切り替え時・戦闘終了時にオートセーブするかを切り替えられます。

また、プラグインコマンドによって任意のタイミングでオートセーブを実行できます。

## プラグインパラメータ

### shouldAutosaveOnMap
指定したスイッチがONの場合マップ切り替え時にオートセーブします。

### shouldAutosaveOnBattle
指定したスイッチがONの場合戦闘時終了時にオートセーブします。
 
 ## プラグインコマンド

### AUTO_SAVE
プラグインコマンドを実行したタイミングでオートセーブを行います。