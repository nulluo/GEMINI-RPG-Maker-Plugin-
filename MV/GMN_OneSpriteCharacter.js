//=============================================================================
// GMN_OneSpriteCharacter.js v1.0.2
//=============================================================================
// (C) 2020 GEMINI
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/gemini_gamedev/
//=============================================================================
/*:
 * @plugindesc character tip single picture plugin
 * @author GEMINI
 *
 * @help Treat character chips with a specific prefix in the file name as a single picture.
 * The prefix must be specified in the plugin parameters.
 *
 * @param prefix
 * @type string
 * @default &
 *
 * 1.0.0 2020/02/10 First version
 * 1.0.1 2020/02/10 Fixed disappearing images depending on orientation and walking.
 * 1.0.2 2020/02/11 Added the ability to specify prefixes in plugin parameters.
 * 1.1.0 2021/03/20 Author name change
 * 1.1.1 2022/03/16 Fixed a bug that prevented the default values from working.
 *
 */
/*:ja
 * @plugindesc キャラチップ一枚絵プラグイン
 * @author ジェミニ
 *
 * @help ファイル名に特定の接頭詞がついたキャラチップを一枚絵として扱います。
 * 接頭詞はプラグインパラメータで指定してください。
 *
 * @param prefix
 * @type string
 * @default &
 *
 * 1.0.0 2020/02/10 初版
 * 1.0.1 2020/02/10 向きや歩行によって画像が消えてしまうのを修正。
 * 1.0.2 2020/02/11 接頭詞をプラグインパラメータで指定できるようにしました。
 * 1.1.0 2021/03/20 作者名変更
 * 1.1.1 2022/03/16 デフォルト値で動作しないバグを修正
 *
 */
(function () {
  "use strict";
  //=============================================================================
  // プラグイン パラメータ
  //=============================================================================
  var parameters = PluginManager.parameters("GMN_OneSpriteCharacter");
  var prefix = parameters["prefix"];
  //-----------------------------------------------------------------------------
  // ImageManager
  // 一枚絵判定を行います。
  //-----------------------------------------------------------------------------
  ImageManager.isOneSprite = function (filename) {
    return filename.contains(prefix);
  };
  var _ImageManager_isBigCharacter = ImageManager.isBigCharacter;
  ImageManager.isBigCharacter = function (filename) {
    return (
      ImageManager.isOneSprite(filename) ||
      _ImageManager_isBigCharacter.apply(this, arguments)
    );
  };
  //-----------------------------------------------------------------------------
  // Sprite_Character
  // ビットマップをそのまま読み込みます。
  //-----------------------------------------------------------------------------
  var _Sprite_Character_prototype_setCharacterBitmap =
    Sprite_Character.prototype.setCharacterBitmap;
  Sprite_Character.prototype.setCharacterBitmap = function () {
    _Sprite_Character_prototype_setCharacterBitmap.apply(this, arguments);
    this._isOneSprite = ImageManager.isOneSprite(this._characterName);
  };
  var _Sprite_Character_prototype_characterPatternX =
    Sprite_Character.prototype.characterPatternX;
  Sprite_Character.prototype.characterPatternX = function () {
    if (this._isOneSprite) {
      return 0;
    } else {
      return _Sprite_Character_prototype_characterPatternX.apply(
        this,
        arguments
      );
    }
  };
  var _Sprite_Character_prototype_characterPatternY =
    Sprite_Character.prototype.characterPatternY;
  Sprite_Character.prototype.characterPatternY = function () {
    if (this._isOneSprite) {
      return 0;
    } else {
      return _Sprite_Character_prototype_characterPatternY.apply(
        this,
        arguments
      );
    }
  };
  var _Sprite_Character_patternWidth = Sprite_Character.prototype.patternWidth;
  Sprite_Character.prototype.patternWidth = function () {
    if (this._isOneSprite) {
      return this.bitmap.width;
    } else {
      return _Sprite_Character_patternWidth.apply(this, arguments);
    }
  };
  var _Sprite_Character_patternHeight =
    Sprite_Character.prototype.patternHeight;
  Sprite_Character.prototype.patternHeight = function () {
    if (this._isOneSprite) {
      return this.bitmap.height;
    } else {
      return _Sprite_Character_patternHeight.apply(this, arguments);
    }
  };
})();
