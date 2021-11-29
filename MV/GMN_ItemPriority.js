// =============================================================================
// GMN_ItemPriority.js
// =============================================================================
// (C) 2020 GEMINI
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/gemini_gamedev/
// =============================================================================
/*:
 * @plugindesc GMN_ItemPriority
 * @author GEMINI
 *
 * @help You can set the priority by writing <GMN_Priority:100> in the memo field of the item.
 * When the priority is the same, it is in order of ID.
 *
 * @param default_priority
 * @type number
 * @min 0
 * @default 100
 *
 * 1.0.0 2020/04/02 First version
 * 1.1.0 2021/03/20 Author name change
 */
/*:ja
 * @plugindesc アイテム表示順プラグイン
 * @author ジェミニ
 *
 * @help アイテムのメモ欄に<GMN_Priority:100>のように記述して
 * 優先度をつけることができます。優先度が同じ場合にはID順となります。
 * 優先度のデフォルト値をプラグインパラメータ"default_priority"で指定できます。
 *
 * @param default_priority
 * @type number
 * @min 0
 * @default 100
 *
 * 1.0.0 2020/06/03 初版
 * 1.1.0 2021/03/20 作者名変更
 */

(function () {
  "use strict";
  // =============================================================================
  // プラグイン パラメータ
  // =============================================================================
  const parameters = PluginManager.parameters("GMN_ItemPriority");
  const default_priority = parameters["default_priority"];
  // =============================================================================
  // GMN_ItemPriority
  // =============================================================================

  function getPriority(elem) {
    var num = Number(elem.meta.GMN_Priority);
    return isNaN(num) ? default_priority : num;
  }
  const _Game_Party_prototype_items = Game_Party.prototype.items;
  Game_Party.prototype.items = function () {
    return _Game_Party_prototype_items
      .apply(this, arguments)
      .sort(function (a, b) {
        return getPriority(b) - getPriority(a) === 0
          ? a.id - b.id
          : getPriority(b) - getPriority(a);
      });
  };
})();
