//=============================================================================
// GMN_SetSwitchOnLoad.js
//=============================================================================
// (C) 2020 GEMINI
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/gemini_gamedev/
//=============================================================================
/*:
 * @plugindesc self variable
 * @author GEMINI
 * @help Turn on the switch specified in the plugin parameter at load time.
 * There is no plugin command for this plugin.
 *
 * @param enableOnLoad
 * @type switch
 * @desc Switch to be turned on on load.
 * @default 1
 *
 * 1.0.0 2020/05/09 First version
 * 1.1.0 2021/03/20 Author name change
 */
/*:ja
 * @plugindesc セルフ変数
 * @author ジェミニ
 * @help ロード時にプラグインパラメータで指定したスイッチをONにします。
 * このプラグインには、プラグインコマンドはありません。
 *
 * @param enableOnLoad
 * @type switch
 * @desc ロード時にONになるスイッチ
 * @default 1
 *
 * 1.0.0 2020/05/09 初版
 * 1.1.0 2021/03/20 作者名変更
 */
(function () {
  "use strict";
  //=============================================================================
  // プラグイン パラメータ
  //=============================================================================
  var parameters = PluginManager.parameters("GMN_SetSwitchOnLoad");
  var enableOnLoad = parameters["enableOnLoad"];
  DataManager.loadGameWithoutRescue = function (savefileId) {
    var globalInfo = this.loadGlobalInfo();
    if (this.isThisGameFile(savefileId)) {
      var json = StorageManager.load(savefileId);
      this.createGameObjects();
      this.extractSaveContents(JsonEx.parse(json));
      this._lastAccessedId = savefileId;
      $gameSwitches.setValue(enableOnLoad, true);
      return true;
    } else {
      $gameSwitches.setValue(enableOnLoad, false);
      return false;
    }
  };
})();
