// =============================================================================
// GMN_SkillPriority.js v1.0.0
// =============================================================================
// (C) 2020 "Masataka Ogawa"
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2020/06/01 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/gemini_gamedev/
// =============================================================================

/*:
 * @plugindesc GMN_SkillPriority
 * @author Masataka Ogawa
 *
 * @help You can set the priority by writing <GMN_Priority:100> in the memo field of the skill. 
 * When the priority is the same, it is in order of ID.
 *
 *
 */

/*:ja
 * @plugindesc スキル表示順プラグイン
 * @author 小河真孝
 *
 * @help スキルのメモ欄に<GMN_Priority:100>のように記述して
 * 優先度をつけることができます。優先度が同じ場合にはID順となります。
 *
 *
 */
// =============================================================================
// GMN_SkillPriority
// =============================================================================
(function() {
  'use strict';
  function getPriority(elem) {
    return elem.meta.GMN_Priority || 0;
  }
  const _Game_Actor_prototype_skills = Game_Actor.prototype.skills;
  Game_Actor.prototype.skills = function() {
    return _Game_Actor_prototype_skills
        .apply(this, arguments)
        .sort(function(a, b) {
          return getPriority(b) - getPriority(a);
        });
  };
})();
