//=============================================================================
// GMN_SelfVariables.js v1.0.0
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
 * @plugindesc SelfVariables
 * @author Masataka Ogawa
 *
 *
 * @help セルフ変数を作成します。
 * var key = [this._mapId, this._eventId, <<任意の値(多分"A"とかが望ましい)>>];
 * var value = 0;

 * $gameSelfVariables.setValue(key, value);
 * このプラグインには、プラグインコマンドはありません。
 */

/*:ja
 * @plugindesc セルフ変数
 * @author 小河真孝
 *
 * @help セルフ変数を作成します。
 * var key = [this._mapId, this._eventId, <<任意の値(多分"A"とかが望ましい)>>];
 * var value = 0;
 * みたいな構造になってる。
 * $gameSelfVariables.setValue(key, value);
 * このプラグインには、プラグインコマンドはありません。
 */

    //-----------------------------------------------------------------------------
    // Game_SelfVariables
    //
    // The game object class for self Variables.

    function Game_SelfVariables() {
        this.initialize.apply(this, arguments);
    }

    Game_SelfVariables.prototype.initialize = function() {
        this.clear();
    };

    Game_SelfVariables.prototype.clear = function() {
        this._data = {};
    };

    Game_SelfVariables.prototype.value = function(key) {
        return this._data[key];
    };

    Game_SelfVariables.prototype.setValue = function(key, value) {
        this._data[key] = value;
    };

    Game_SelfVariables.prototype.onChange = function() {
        $gameMap.requestRefresh();
    };

    Game_SelfVariables.prototype.increment = function(key) {
        this._data[key]++;
    };

    Game_SelfVariables.prototype.decrement = function(key) {
        this._data[key]--;
    };

    Game_SelfVariables.prototype.reset = function(key) {
        this._data[key] = 0;
    };
var $gameSelfVariables  = new Game_SelfVariables();
DataManager.makeSaveContents = function() {
    var contents = {};
    contents.system       = $gameSystem;
    contents.screen       = $gameScreen;
    contents.timer        = $gameTimer;
    contents.switches     = $gameSwitches;
    contents.variables    = $gameVariables;
    contents.selfSwitches = $gameSelfSwitches;
    contents.actors       = $gameActors;
    contents.party        = $gameParty;
    contents.map          = $gameMap;
    contents.player       = $gamePlayer;
    contents.selfVariables = $gameSelfVariables;
    return contents;
};
var _DataManager_extractSaveContents=DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    _DataManager_extractSaveContents.apply(this,arguments);
    $gameSelfVariables  = contents.selfVariables;
};