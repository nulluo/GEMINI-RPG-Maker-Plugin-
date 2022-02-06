//=============================================================================
// GMN_ReadMe.js
// ----------------------------------------------------------------------------
// (C)2022 GEMINI
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
/*:
 * @target MZ
 * @plugindesc Allows ReadMe to be referenced in-game.
 * @base PluginCommonBase
 * @url https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_ReadMe.js
 * @author Gemini.
 *
 * @help
 * Allows ReadMe to be referenced in-game.
 * Does not provide the ability to display the readme on the game screen.
 * Please use other plugins or scripts.
 *
 * How to use :
 * 1. In the folder where game.rmmzproject exists
 * Create a text file named "ReadMe.txt" in the folder where game.rmmzproject exists. 2.
 * 2. You can call the contents of the text with a global variable called "$ReadMe".
 * Refer to this in your scripts, etc.
 * (*) The file name and global variable can be changed in the plug-in parameters.
 *
 * (*) PluginCommonBase.js is required to use this plugin.
 *
 * 2022/02/06 1.0.0 Published.
 *
 * @param variableName
 * @text Global variable name
 * @desc Global variable name to refer to the text of the readMe file.
 * @type string
 * @default $ReadMe
 *
 * @param fileName
 * @text ReadMe file name
 * @desc Name of text file to read as ReadMe (including extension).
 * @type string
 * @default ReadMe.txt
 * @type string
 * @default ReadMe.txt
 */
/*:ja
 * @target MZ
 * @plugindesc ReadMeをゲーム内で参照できるようにします。
 * @base PluginCommonBase
 * @url https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_ReadMe.js
 * @author ジェミニ
 *
 * @help
 * ReadMeをゲーム内で参照できるようにします。
 * 読み込んだ内容をゲーム画面上で表示する機能は提供していません。
 * 他プラグインやスクリプトを利用してください。
 *
 * 利用方法:
 * 1. game.rmmzprojectが存在するフォルダ内に
 * 「ReadMe.txt」というテキストファイルを作成してください。
 * 2. テキストの内容を「$ReadMe」というグローバル変数で呼び出せます。
 * これをスクリプト等で参照してください。
 * ※ファイル名・グローバル変数はプラグインパラメータで変更可能。
 *
 * ※本プラグインの利用にはPluginCommonBase.jsが必須です。
 *
 * 2022/02/06 1.0.0 公開
 *
 * @param variableName
 * @text グローバル変数名
 * @desc 読み込んだReadMeファイルのテキストを参照するためのグローバル変数名
 * @type string
 * @default $ReadMe
 *
 * @param fileName
 * @text ReadMeファイル名
 * @desc ReadMeとして読み込むテキストファイル名(拡張子を含む)
 * @type string
 * @default ReadMe.txt
 */
"use strict";
{
  const script = document.currentScript;
  const param = PluginManagerEx.createParameter(script);
  const loadReadMe = function (name, src) {
    const xhr = new XMLHttpRequest();
    window[name] = null;
    xhr.open("GET", src);
    xhr.overrideMimeType("text/plain");
    xhr.onload = () => onXhrLoad(xhr, name, src);
    xhr.onerror = () => onXhrError(src);
    xhr.send();
  };
  const onXhrLoad = function (xhr, name, src) {
    if (xhr.status < 400) {
      window[name] = xhr.responseText;
    } else {
      onXhrError(src);
    }
  };

  const onXhrError = function (src) {
    const pluginName = PluginManagerEx.findPluginName(script);
    throw new Error(`[${pluginName}]
    ファイル: ${src}が見つかりません。`);
  };
  const _Scene_Boot_create = Scene_Boot.prototype.create;
  Scene_Boot.prototype.create = function () {
    _Scene_Boot_create.call(this);
    loadReadMe(param.variableName, param.fileName);
  };
}
