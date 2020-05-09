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
 * @help This plugin creates event's self variables.
 * You can write script in event like following.
 *
 * (set value)
 * var key = <<any value you like e.g.) "A">>;
 * var value = 0;
 * this.setSelfVariable(key, value);
 *
 * (get value)
 * this.getSelfVariable("A");
 *
 * This plugin has no plugin commands.
 */

/*:ja
 * @plugindesc セルフ変数
 * @author 小河真孝
 *
 * @help セルフ変数を作成します。
 *
 * セルフ変数に値をセットする
 * var key = <<任意の値("A"など)>>;
 * var value = 0;
 * this.setSelfVariable(key, value);
 *
 * セルフ変数から値を取得する
 * this.getSelfVariable("A");
 *
 * このプラグインには、プラグインコマンドはありません。
 */

//-----------------------------------------------------------------------------
// Game_SelfVariables
//
// The game object class for self Variables.

function Game_SelfVariables() {
  this.initialize.apply(this, arguments);
}

var $gameSelfVariables = null;

(function () {
  Game_SelfVariables.prototype.initialize = function () {
    this.clear();
  };

  Game_SelfVariables.prototype.clear = function () {
    this._data = {};
  };

  Game_SelfVariables.prototype.value = function (key) {
    return this._data[key];
  };

  Game_SelfVariables.prototype.setValue = function (key, value) {
    this._data[key] = value;
  };

  Game_SelfVariables.prototype.onChange = function () {
    $gameMap.requestRefresh();
  };

  Game_SelfVariables.prototype.increment = function (key) {
    this._data[key]++;
  };

  Game_SelfVariables.prototype.decrement = function (key) {
    this._data[key]--;
  };

  Game_SelfVariables.prototype.reset = function (key) {
    this._data[key] = 0;
  };

  Game_Interpreter.prototype.setSelfVariable = function (keyInEvent, value) {
    var key = this.selfVariableKey(keyInEvent);
    if (key) {
      $gameSelfVariables.setValue(key, value);
    }
  };

  Game_Interpreter.prototype.getSelfVariable = function (keyInEvent) {
    var key = this.selfVariableKey(keyInEvent);
    return key ? $gameSelfVariables.value(key) : null;
  };

  Game_Interpreter.prototype.selfVariableKey = function (keyInEvent) {
    if (this._eventId > 0 && keyInEvent) {
      return [this._mapId, this._eventId, keyInEvent];
    }
    return null;
  };

  var _DataManager_createGameObjects = DataManager.createGameObjects;
  DataManager.createGameObjects = function () {
    _DataManager_createGameObjects.call(this);
    $gameSelfVariables = new Game_SelfVariables();
  };

  var _DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function () {
    var contents = _DataManager_makeSaveContents.call(this);
    contents.selfVariables = $gameSelfVariables;
    return contents;
  };
  var _DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function (contents) {
    _DataManager_extractSaveContents.apply(this, arguments);
    $gameSelfVariables = contents.selfVariables ? contents.selfVariables : new Game_SelfVariables();
  };
})();
