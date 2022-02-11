//=============================================================================
// GMN_DescriptionWithFomula.js
// ----------------------------------------------------------------------------
// (C)2021 GEMINI
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
/*:
 * @target MZ
 * @plugindesc Display status increase/decrease.
 * @base PluginCommonBase
 * @url https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_DescriptionWithFomula.js
 * @author Gemini
 *
 * @help
 * Display status increase/decrease in equipment description.
 *
 * [Usage]
 *
 * 1.
 * Specify the format string of the parameter with the plugin parameter "format".
 * "%1" will be the parameter name and "%2" will be the parameter value.
 * Example: When attack power is increased by 30 => [attack power] +30
 * Under the same conditions, if you set this parameter as "%1:%2".
 * "Attack Power: +30" will be displayed.
 *
 * 2.
 * If you want to increase or decrease multiple parameters, you can use the separator in the plugin parameter
 * Specify the separator in "separator".
 * Example: When attack power is increased by 30 and defense power is decreased by 30 => [attack power] +30, [defense power] -30 and
 * The characters will be separated by ",".
 *
 * 3.
 * Specify the character that represents the parameter increase in the plugin parameter "plusSign".
 * Example: When the attack power is increased by 30 => [Attack Power] +30, the number will be prefixed with "+".
 *
 * 4.
 * Specify the character that represents a parameter decrease in the plugin parameter "minusSign".
 * Example: When defense decreases by 30 => [Defense] -30 with "-" at the beginning of the number.
 *
 * 5.
 * Specify the name of each parameter to be displayed in the description field in "paramName" of the plugin parameter.
 * Specify it.
 * From left to right, maximum HP, maximum MP, attack power, defense power, magic power, magic defense, agility, luck
 * Equivalent to.
 *
 * @param format
 * @type string
 * @default [%1] %2
 * @text Format for the parameter.
 * @desc The format string for displaying the parameter.
 * "%1" will be the parameter name and "%2" will be the parameter value.
 * @param separeator
 * @type string
 * @default ,
 * @text Delimiter when multiple parameters are to be increased or decreased.
 * @desc When multiple parameters are to be increased or decreased, this parameter is used to connect them.
 * @param plusSign
 * @type string
 * @default +
 * @text Character for parameter increase.
 * @desc A symbol to be added to the number if when the parameter is to be increased.
 * Example: when attack power is increased by 30 => [attack power] +30 with a "+" at the beginning of the number.
 * @param minusSign
 * @type string
 * @default -
 * @text Character for parameter decrease.
 * @desc A symbol to be added to the number when the parameter is decreased.
 * e.g. when defense decreases by 30 => [defense]-30 with "-" at the beginning of the number.
 * @param paramName
 * @type string[].
 * @default ["max HP", "max MP", "attack power", "defense power", "magic power", "magic defense", "agility", "luck"]
 * @text Parameter name array
 * @desc Specifies the parameter names to be displayed in the description.
 * From left to right: maximum HP, maximum MP, attack power, defense power, magic power, magic defense, agility, luck
 * Equivalent to.
 *
 * 2021/05/25 1.0.0 released
 * 2021/11/29 1.1.0 Repository and directory changes
 * 2022/02/11 1.1.1 Typographical correction
 * 2022/02/11 1.2.0 Refactoring
 */
/*:ja
 * @target MZ
 * @plugindesc ステータス増減を表示します。
 * @base PluginCommonBase
 * @url https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_DescriptionWithFomula.js
 * @author ジェミニ
 *
 * @help
 * 装備品の説明文にステータス増減を表示させます。
 *
 * 【使い方】
 *
 * 1.
 * パラメータのフォーマット文字列をプラグインパラメータの「format」で指定します。
 * 「%1」がパラメータ名に、「%2」がパラメータの値になります。
 * 例: 攻撃力が30増加する時 => 【攻撃力】+30
 * 同じ条件で、このパラメータを「%1：%2」とすると
 * 「攻撃力：+30」と表示されます。
 *
 * 2.
 * 複数のパラメータを増減させる場合の区切り文字をプラグインパラメータの
 * 「separator」で指定します。
 * 例: 攻撃力が30増加、防御力が30減少する時 => 【攻撃力】+30,【防御力】-30 と
 *「,」で区切って表示されます。
 *
 * 3.
 * プラグインパラメータの「plusSign」でパラメータ増加を表す文字を指定します。
 * 例: 攻撃力が30増加する時 => 【攻撃力】+30 と数値の先頭に「+」が付きます。
 *
 * 4.
 * プラグインパラメータの「minusSign」でパラメータ減少を表す文字を指定します。
 * 例: 防御力が30減少する時 => 【防御力】-30 と数値の先頭に「-」が付きます。
 *
 * 5.
 * プラグインパラメータの「paramName」で説明欄に表示する各パラメータの名前を
 * 指定します。
 * 左から、 最大HP, 最大MP, 攻撃力, 防御力, 魔法力, 魔法防御, 敏捷性, 運
 * に相当します。
 *
 * @param format
 * @type string
 * @default 【%1】%2
 * @text パラメータのフォーマット
 * @desc パラメータを表示する際のフォーマット文字列です。
 * 「%1」がパラメータ名に、「%2」がパラメータの値になります。
 * @param separeator
 * @type string
 * @default ,
 * @text 複数のパラメータが増減するときの区切り文字
 * @desc 複数のパラメータを増減させる場合に、このパラメータでつなぎます。
 * @param plusSign
 * @type string
 * @default +
 * @text パラメータ増加を表す文字
 * @desc パラメーターが増加する場合に、数値の先頭につける記号です。
 * 例: 攻撃力が30増加する時 => 【攻撃力】+30 と数値の先頭に「+」が付きます。
 * @param minusSign
 * @type string
 * @default -
 * @text パラメータ減少を表す文字
 * @desc パラメーターが減少する場合に、数値の先頭につける記号です。
 * 例: 防御力が30減少する時 => 【防御力】-30 と数値の先頭に「-」が付きます。
 * @param paramName
 * @type string[]
 * @default ["最大HP","最大MP","攻撃力","防御力","魔法力","魔法防御","敏捷性","運"]
 * @text パラメータ名配列
 * @desc 説明文に表示するパラメータ名を指定します。
 * 左から、 最大HP, 最大MP, 攻撃力, 防御力, 魔法力, 魔法防御, 敏捷性, 運
 * に相当します。
 *
 * 2021/05/25 1.0.0 公開
 * 2021/11/29 1.1.0 レポジトリ及びディレクトリ変更
 * 2022/02/11 1.1.1 誤字修正
 * 2022/02/11 1.2.0 リファクタ
 */
"use strict";
{
  const script = document.currentScript;
  const param = PluginManagerEx.createParameter(script);
  // プラグインパラメータ名が微妙だったので別の名前にした。
  const template = param.format;
  const statuses = param.paramName;

  const getFormattedDescription = (itemParam, status) => {
    if (itemParam === 0) {
      return "";
    }
    if (itemParam > 0) {
      return template.format(status, param.plusSign + itemParam);
    }
    if (itemParam < 0) {
      return template.format(status, param.minusSign + Math.abs(itemParam));
    }
  };

  const getDescriptionWithStatuses = (item) => {
    if (!item.etypeId) {
      return "";
    }
    const descriptions = [];
    if (item.etypeId) {
      for (let i = 0; i < statuses.length; i++) {
        const formatted = getFormattedDescription(item.params[i], statuses[i]);
        formatted && descriptions.push(formatted);
      }
    }
    const txt = descriptions.join(param.separator);
    return txt ? txt + "\n" : "";
  };

  Window_Help.prototype.setItem = function (item) {
    this.setText(
      item ? getDescriptionWithStatuses(item) + item.description : ""
    );
  };
}
