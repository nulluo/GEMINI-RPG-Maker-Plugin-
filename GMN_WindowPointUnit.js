//=============================================================================
// GMN_WindowPointUnit.js v1.0.0
//=============================================================================
// (C) 2020 GEMINI Ogawa
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2020/02/15 初版
// 1.0.1 2020/02/19 ダメージポップアップ対応
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/gemini_gamedev/
//=============================================================================
/*:
 * @plugindesc WindowPointUnit
 * @author GEMINI Ogawa
 *
 * @help アクターやエネミーのHP/MP/TPの末尾に単位をつけられます。
 * メニューやバトルのステータス画面およびバトルログ中のダメージに表示されるようになります。
 * ダメージポップアップに単位を表示するためにはDamage.pngを加工する必要があります。
 *
 * @param unit
 * @type string
 * @default pt.
 * 
 */
/*:ja
 * @plugindesc HP/MP/TP の末尾に単位をつけます。
 * @author 小河GEMINI
 *
 * @help アクターやエネミーのHP/MP/TPの末尾に単位をつけられます。
 * メニューやバトルのステータス画面およびバトルログ中のダメージに表示されるようになります。
 * ダメージポップアップに単位を表示するためにはDamage.pngを加工する必要があります。
 *
 * @param unit
 * @type string
 * @default pt.
 * 
 * 
 */
(function () {
	'use strict';
	//=============================================================================
	// プラグイン パラメータ
	//=============================================================================
	var parameters = PluginManager.parameters('GMN_WindowPointUnit');
	var pointUnit = parameters['unit'];
	//-----------------------------------------------------------------------------
	// TextManager
	// HP,MP,TP の末尾につける単位を指定します。
	//-----------------------------------------------------------------------------
	Object.defineProperty(TextManager, 'pointUnit', {
		get: function () { return pointUnit; },
		configurable: true
	});
	//-----------------------------------------------------------------------------
	// Window_Base
	// 単位を描画します。
	//-----------------------------------------------------------------------------
	Window_Base.prototype.drawPointValue = function (unit, x, y, width) {
		var unitWidth = Math.min(80, this.textWidth(unit));
		this.resetTextColor();
		this.changeTextColor(this.systemColor());
		this.drawText(unit, x + width - unitWidth, y, unitWidth, 'right');
	};
	Window_Base.prototype.drawCurrentAndMax = function (current, max, x, y, width, color1, color2) {
		var pointUnit = TextManager.pointUnit;
		var labelWidth = this.textWidth('HP');
		var valueWidth = this.textWidth('0000');
		var slashWidth = this.textWidth('/');
		var x1 = x + width - valueWidth;
		var x2 = x1 - slashWidth;
		var x3 = x2 - valueWidth;
		if (x3 >= x + labelWidth) {
			this.changeTextColor(color1);
			this.drawText(current + pointUnit, x3, y, valueWidth, 'right');
			this.changeTextColor(color2);
			this.drawText('/', x2, y, slashWidth, 'right');
			this.drawText(max + pointUnit, x1, y, valueWidth, 'right');
		} else {
			this.changeTextColor(color1);
			this.drawText(current + pointUnit, x1, y, valueWidth, 'right');
		}

	};
	//-----------------------------------------------------------------------------
	// Window_BattleLog
	// 単位を描画します。
	//-----------------------------------------------------------------------------
	Window_BattleLog.prototype.makeHpDamageText = function (target) {
		var result = target.result();
		var damage = result.hpDamage;
		var isActor = target.isActor();
		var pointUnit = TextManager.pointUnit;
		var fmt;
		if (damage > 0 && result.drain) {
			fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
			return fmt.format(target.name(), TextManager.hp, damage + pointUnit);
		} else if (damage > 0) {
			fmt = isActor ? TextManager.actorDamage : TextManager.enemyDamage;
			return fmt.format(target.name(), damage + pointUnit);
		} else if (damage < 0) {
			fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
			return fmt.format(target.name(), TextManager.hp, -damage + pointUnit);
		} else {
			fmt = isActor ? TextManager.actorNoDamage : TextManager.enemyNoDamage;
			return fmt.format(target.name());
		}
	};

	Window_BattleLog.prototype.makeMpDamageText = function (target) {
		var result = target.result();
		var damage = result.mpDamage;
		var isActor = target.isActor();
		var pointUnit = TextManager.pointUnit;
		var fmt;
		if (damage > 0 && result.drain) {
			fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
			return fmt.format(target.name(), TextManager.mp, damage + pointUnit);
		} else if (damage > 0) {
			fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
			return fmt.format(target.name(), TextManager.mp, damage + pointUnit);
		} else if (damage < 0) {
			fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
			return fmt.format(target.name(), TextManager.mp, -damage + pointUnit);
		} else {
			return '';
		}
	};

	Window_BattleLog.prototype.makeTpDamageText = function (target) {
		var result = target.result();
		var damage = result.tpDamage;
		var isActor = target.isActor();
		var pointUnit = TextManager.pointUnit;
		var fmt;
		if (damage > 0) {
			fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
			return fmt.format(target.name(), TextManager.tp, damage + pointUnit);
		} else if (damage < 0) {
			fmt = isActor ? TextManager.actorGain : TextManager.enemyGain;
			return fmt.format(target.name(), TextManager.tp, -damage + pointUnit);
		} else {
			return '';
		}
	};
	//-----------------------------------------------------------------------------
	// Sprite_Damage
	// ダメージポップアップに単位表示
	//-----------------------------------------------------------------------------
	Sprite_Damage.prototype.createUnit = function (value) {
		var string = Math.abs(value).toString();
		var w = this.digitWidth();
		var h = this.digitHeight();
		var sprite = this.createChildSprite();
		sprite.setFrame(4 * w, 4 * h, 4 * w, h);
		sprite.x = string.length * w;
		sprite.dy = -string.length;
	};

	Sprite_Damage.prototype.setup = function (target) {
		var result = target.result();
		if (result.missed || result.evaded) {
			this.createMiss();
		} else if (result.hpAffected) {
			this.createUnit(pointUnit);
			this.createDigits(0, result.hpDamage);
		} else if (target.isAlive() && result.mpDamage !== 0) {
			this.createUnit(pointUnit);
			this.createDigits(2, result.mpDamage);
		}
		if (result.critical) {
			this.setupCriticalEffect();
		}
	};
})();