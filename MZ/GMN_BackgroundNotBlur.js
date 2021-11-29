//=============================================================================
// GMN_BackgroundNotBlur.js
// ----------------------------------------------------------------------------
// (C)2021 GEMINI
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Unblur menu background.
 * @url https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_BackgroundNotBlur.js
 * @author GEMINI
 *
 * @help
 * Makes the menu background blurless.
 * You can also specify the transparency with a plugin parameter.
 * Default is the standard 192.
 *
 * @param opacity
 * @type number
 * @min 0
 * @max 255
 * @default 192
 * @text Brightness of the menu background.
 * @desc Specify the brightness of the menu background between 0 and 255.
 *
 * 2021/05/25 1.0.0 released
 * 2021/11/29 1.1.0 Repository and directory changes
 */
/*:ja
 * @target MZ
 * @plugindesc メニュー背景をぼかさなくします。
 * @url https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_BackgroundNotBlur.js
 * @author ジェミニ
 *
 * @help
 * メニュー背景をぼかさなくします。
 * また、プラグインパラメータで透明度を指定できます。
 * デフォルトは標準の192です。
 *
 * @param opacity
 * @type number
 * @min 0
 * @max 255
 * @default 192
 * @text メニュー背景の明るさ
 * @desc メニュー背景の明るさを0から255の間で指定してください。
 *
 * 2021/05/25 1.0.0 公開
 * 2021/11/29 1.1.0 レポジトリ及びディレクトリ変更
 */
(() => {
  "use strict";
  const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
  const parameters = PluginManager.parameters(pluginName);
  const opacity = Number(parameters["opacity"]);
  // 処理を上書きしています。
  Scene_MenuBase.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this.addChild(this._backgroundSprite);
    this.setBackgroundOpacity(opacity);
  };
})();
