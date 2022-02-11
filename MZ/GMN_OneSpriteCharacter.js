//=============================================================================
// GMN_OneSpriteCharacter.js
//=============================================================================
// (C) 2022 GEMINI
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
/*:
 * @plugindesc character tip single picture plugin
 * @base PluginCommonBase
 * @url https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_OneSpriteCharacter.js
 * @author GEMINI
 * @target MZ
 *
 * @help Treat character chips with a specific prefix in the file name as a single picture.
 * The prefix must be specified in the plugin parameters.
 * @param prefix
 * @type string
 * @default &
 *
 * 1.0.0 2022/02/11 First version
 *
 */
/*:ja
 * @plugindesc キャラチップ一枚絵プラグイン
 * @author ジェミニ
 * @target MZ
 *
 * @help ファイル名に特定の接頭詞がついたキャラチップを一枚絵として扱います。
 * 接頭詞はプラグインパラメータで指定してください。
 * @param prefix
 * @type string
 * @default &
 *
 * 1.0.0 2022/02/11 初版
 *
 */
"use strict";
{
  const script = document.currentScript;
  const param = PluginManagerEx.createParameter(script);

  ImageManager.isOneSprite = function (filename) {
    const sign = filename.match(/^[\!\@\$]+/);
    return sign && sign[0].contains(param.prefix);
  };
  const _ImageManager_isBigCharacter = ImageManager.isBigCharacter;
  ImageManager.isBigCharacter = function (filename) {
    return (
      ImageManager.isOneSprite(filename) ||
      _ImageManager_isBigCharacter.call(this, filename)
    );
  };

  const _Sprite_Character_setCharacterBitmap =
    Sprite_Character.prototype.setCharacterBitmap;
  Sprite_Character.prototype.setCharacterBitmap = function () {
    _Sprite_Character_setCharacterBitmap.call(this);
    this._isOneSprite = ImageManager.isOneSprite(this._characterName);
  };
  const _Sprite_Character_characterPatternX =
    Sprite_Character.prototype.characterPatternX;
  Sprite_Character.prototype.characterPatternX = function () {
    if (this._isOneSprite) {
      return 0;
    } else {
      return _Sprite_Character_characterPatternX.call(this);
    }
  };
  const _Sprite_Character_characterPatternY =
    Sprite_Character.prototype.characterPatternY;
  Sprite_Character.prototype.characterPatternY = function () {
    if (this._isOneSprite) {
      return 0;
    } else {
      return _Sprite_Character_characterPatternY.call(this);
    }
  };
  const _Sprite_Character_patternWidth =
    Sprite_Character.prototype.patternWidth;
  Sprite_Character.prototype.patternWidth = function () {
    if (this._isOneSprite) {
      return this.bitmap.width;
    } else {
      return _Sprite_Character_patternWidth.call(this);
    }
  };
  const _Sprite_Character_patternHeight =
    Sprite_Character.prototype.patternHeight;
  Sprite_Character.prototype.patternHeight = function () {
    if (this._isOneSprite) {
      return this.bitmap.height;
    } else {
      return _Sprite_Character_patternHeight.call(this);
    }
  };
}
