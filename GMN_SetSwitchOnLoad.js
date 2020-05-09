//=============================================================================
// GMN_SetSwitchOnLoad.js v1.0.0
//=============================================================================
// (C) 2020 Masataka Ogawa
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2020/05/09 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/gemini_gamedev/
//=============================================================================
/*:
 * @plugindesc etSwitchOnLoad
 * @author Masataka Ogawa
 * @help ロード時にプラグインパラメータで指定したスイッチをONにします。
 * このプラグインには、プラグインコマンドはありません。
 *
 * @param enableOnLoad
 * @type switch
 * @desc ロード時にONになるスイッチ
 * @default 1
 */
/*:ja
 * @plugindesc セルフ変数
 * @author 小河真孝
 * @help ロード時にプラグインパラメータで指定したスイッチをONにします。
 * このプラグインには、プラグインコマンドはありません。
 *
 * @param enableOnLoad
 * @type switch
 * @desc ロード時にONになるスイッチ
 * @default 1
 */
(function() {
    'use strict';
//=============================================================================
// プラグイン パラメータ
//=============================================================================
    var parameters = PluginManager.parameters('GMN_SetSwitchOnLoad');
    var enableOnLoad=parameters['enableOnLoad'];
    DataManager.loadGameWithoutRescue = function(savefileId) {
        var globalInfo = this.loadGlobalInfo();
        if (this.isThisGameFile(savefileId)) {
            var json = StorageManager.load(savefileId);
            this.createGameObjects();
            this.extractSaveContents(JsonEx.parse(json));
            this._lastAccessedId = savefileId;
            $gameSwitches.setValue(enableOnLoad,true);
            return true;
        } else {
            $gameSwitches.setValue(enableOnLoad,false);
            return false;
        }
    };
})();