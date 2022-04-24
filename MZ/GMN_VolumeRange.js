//=============================================================================
// GMN_VolumeRange.js
// ----------------------------------------------------------------------------
// (C)2022 GEMINI
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
/*:
 * @target MV MZ
 * @plugindesc The volume interval on the options screen can be specified by a plugin parameter.
 * @url https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_VolumeRange.js
 * @author GEMINI
 *
 * @help
 * The volume interval on the options screen can be specified by a plugin parameter.
 * Default is 20% interval.
 *
 * @param volumeRange
 * @text volume interval(%)
 * @desc volume interval (%).
 * @type number
 * @default 20
 * @min 1
 * @max 100
 */
/*:ja
 * @target MV MZ
 * @plugindesc オプション画面での音量間隔をプラグインパラメータで指定できます。
 * @url https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_VolumeRange.js
 * @author ジェミニ
 *
 * @help
 * オプション画面での音量間隔をプラグインパラメータで指定できます。
 * デフォルトは20%間隔です。
 *
 * @param volumeRange
 * @text 音量間隔(%)
 * @desc 音量間隔(%)を設定してください。
 * @type number
 * @default 20
 * @min 1
 * @max 100
 */
"use strict";
{
  const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
  const param = PluginManager.parameters(pluginName);
  const volumeRange = Number(param.volumeRange);
  Window_Options.prototype.volumeOffset = () => volumeRange;
}
