//=============================================================================
// GMN_AssertPlayerPurchasement.js
//=============================================================================
// (C) 2020 GEMINI
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/gemini_gamedev/
//=============================================================================
/*:
 * @plugindesc AssertPlayerPurchasement
 * @author GEMINI
 *
 * @help Assign the number of purchases and sales in the store to variables.
 * Specify a variable to assign the number of purchases to buyCount and a variable to assign the number of sales to sellCount.
 *
 * @param buyCount
 * @type variable
 * @desc Variable to assign the number of purchases.
 * @default 1
 *
 * @param sellCount
 * @type variable
 * @desc Variable to substitute the number of sales.
 * @default 2
 *
 * 1.0.0 2020/04/02 First version
 * 1.1.0 2021/03/20 Author name change
 *
 */
/*:ja
 * @plugindesc 購入売却回数検証プラグイン
 * @author ジェミニ
 *
 * @help ショップでの購入回数と売却回数を変数に代入します。
 * buyCountに購入回数を代入する変数を、sellCountに売却回数を代入する変数を指定してください。
 *
 * @param buyCount
 * @type variable
 * @desc 購入回数を代入する変数
 * @default 1
 *
 * @param sellCount
 * @type variable
 * @desc 売却回数を代入する変数
 * @default 2
 *
 * 1.0.0 2020/04/02 初版
 * 1.1.0 2021/03/20 作者名変更
 *
 */
(function () {
  "use strict";
  //=============================================================================
  // プラグイン パラメータ
  //=============================================================================
  var parameters = PluginManager.parameters("GMN_AssertPlayerPurchasement");
  var buyCount = parameters["buyCount"];
  var sellCount = parameters["sellCount"];
  // 購入時にカウンタを増やすようにする。
  var _Scene_Shop_prototype_doBuy = Scene_Shop.prototype.doBuy;
  Scene_Shop.prototype.doBuy = function (number) {
    $gameVariables.setValue(buyCount, $gameVariables.value(buyCount) + 1);
    _Scene_Shop_prototype_doBuy.apply(this, arguments);
  };
  // 売却時にカウンタを増やすようにする。
  var _Scene_Shop_prototype_doSell = Scene_Shop.prototype.doSell;
  Scene_Shop.prototype.doSell = function (number) {
    $gameVariables.setValue(sellCount, $gameVariables.value(sellCount) + 1);
    _Scene_Shop_prototype_doSell.apply(this, arguments);
  };
})();
