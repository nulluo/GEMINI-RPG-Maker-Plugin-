//=============================================================================
// GMN_OneSpriteCharacter.js v1.0.2
//=============================================================================
// (C) 2020 GEMINI Ogawa
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2020/02/10 初版
// 1.0.1 2020/02/10 向きや歩行によって画像が消えてしまうのを修正。
// 1.0.2 2020/02/11 接頭詞をプラグインパラメータで指定できるようにしました。
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/gemini_gamedev/
//=============================================================================
/*:
 * @plugindesc OneSpriteCharacter
 * @author GEMINI Ogawa
 *
 * @help ファイル名に特定の接頭詞がついたキャラチップを一枚絵として扱います。
 * 接頭詞はプラグインパラメータで指定してください。
 *
 * @param prefix
 * @type string
 * @default &
 *
 */
/*:ja
 * @plugindesc キャラチップ一枚絵プラグイン
 * @author 小河GEMINI
 *
 * @help ファイル名に特定の接頭詞がついたキャラチップを一枚絵として扱います。
 * 接頭詞はプラグインパラメータで指定してください。
 *
 * @param prefix
 * @type string
 * @default &
 *
 */
(function() {
	'use strict';
//=============================================================================
// プラグイン パラメータ
//=============================================================================
    var parameters = PluginManager.parameters('GMN_OneSpriteCharacter');
	var prefix=parameters['prefix'];
//-----------------------------------------------------------------------------
// ImageManager
// 一枚絵判定を行います。
//-----------------------------------------------------------------------------
    ImageManager.isOneSprite = function(filename) {
		var sign=filename.match(/^[\!\@\$]+/);
        return sign && sign[0].contains(prefix);
    };
    var _ImageManager_isBigCharacter=ImageManager.isBigCharacter;
    ImageManager.isBigCharacter = function(filename) {
        return ImageManager.isOneSprite(filename) || _ImageManager_isBigCharacter.apply(this,arguments);
    };
//-----------------------------------------------------------------------------
// Sprite_Character
// ビットマップをそのまま読み込みます。
//-----------------------------------------------------------------------------
	var _Sprite_Character_prototype_setCharacterBitmap=Sprite_Character.prototype.setCharacterBitmap;
	Sprite_Character.prototype.setCharacterBitmap = function() {
		_Sprite_Character_prototype_setCharacterBitmap.apply(this,arguments);
		this._isOneSprite=ImageManager.isOneSprite(this._characterName);;
	};
	var _Sprite_Character_prototype_characterPatternX=Sprite_Character.prototype.characterPatternX;
	Sprite_Character.prototype.characterPatternX = function() {
		if(this._isOneSprite){
			return 0;
		}else{
			return _Sprite_Character_prototype_characterPatternX.apply(this,arguments);
		}
	};
	var _Sprite_Character_prototype_characterPatternY=Sprite_Character.prototype.characterPatternY;
	Sprite_Character.prototype.characterPatternY = function() {
		if(this._isOneSprite){
			return 0;
		}else{
			return _Sprite_Character_prototype_characterPatternY.apply(this,arguments);
		}
	};
	var _Sprite_Character_patternWidth=Sprite_Character.prototype.patternWidth;
    Sprite_Character.prototype.patternWidth = function() {
		if(this._isOneSprite){
			return this.bitmap.width;
		}else{
			return _Sprite_Character_patternWidth.apply(this,arguments);
		}
	};
	var _Sprite_Character_patternHeight=Sprite_Character.prototype.patternHeight;
    Sprite_Character.prototype.patternHeight = function() {
		if(this._isOneSprite){
			return this.bitmap.height;
		}else{
			return _Sprite_Character_patternHeight.apply(this,arguments);
		}
	};
})();