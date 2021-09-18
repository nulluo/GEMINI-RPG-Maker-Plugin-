//=============================================================================
// GMN_VariableExpansion.js
// ----------------------------------------------------------------------------
// (C)2021 GEMINI
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
/*:en
 * @target MZ
 * @plugindesc Display the results of script execution in a window.
 * @url https://github.com/GEMINIGAMEDEV/plug-in/blob/master/GMN_VariableExpansion.js
 * @author GEMINI
 *
 * @help
 * You can write scripts in the window, including "Show Text".
 * If you write a script enclosed in back-quotes (`), the corresponding part will be replaced by the script's
 * If you write a script enclosed in back-quotes (`), the corresponding part of the script will be replaced by the result of execution.
 *
 *[Example usage]
 * ◆文章：なし, Actor1(0), ウィンドウ, 下
 * ：　　：The ID of this map is `$gameMap.mapId()`.
 * ：　　：The number of events that exist is `$gameMap.events().length`.
 *
 * 2021/09/18 1.0.0 Published.
 */
/*:ja
 * @target MZ
 * @plugindesc ウィンドウ内にスクリプトの実行結果を表示します。
 * @url https://github.com/GEMINIGAMEDEV/plug-in/blob/master/GMN_VariableExpansion.js
 * @author ジェミニ
 *
 * @help
 * 「文章の表示」をはじめとするウィンドウ内にスクリプトを記述できます。
 * バッククォート(`)で囲ったスクリプトを記述すると、該当部分がスクリプトの
 * 実行結果に置き換わります。
 *
 *【使用例】
 * ◆文章：なし, Actor1(0), ウィンドウ, 下
 * ：　　：このマップのIDは`$gameMap.mapId()`です。
 * ：　　：存在するイベントは`$gameMap.events().length`個です。
 *
 * 2021/09/18 1.0.0 公開
 */
"use strict";
{
  const variableExpansion = (text) => {
    return text.replace(/`(.+)`/gi, (_, p1) => eval(p1));
  };
  const _Window_Base_convertEscapeCharacters =
    Window_Base.prototype.convertEscapeCharacters;
  Window_Base.prototype.convertEscapeCharacters = function (text) {
    const original = _Window_Base_convertEscapeCharacters.call(this, text);
    return variableExpansion(original);
  };
}
