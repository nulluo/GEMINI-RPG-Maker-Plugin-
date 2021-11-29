//=============================================================================
// GMN_GLSLShader.js
// ----------------------------------------------------------------------------
// (C)2021 GEMINI
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Apply a GLSL shader to the picture.
 * @url https://github.com/GEMINIGAMEDEV/plug-in/blob/master/MZ/GMN_GLSLShader.js
 * @author GEMINI
 *
 * @help
 * Apply a GLSL shader to a picture.
 * There are two plugin commands.
 * add: Adds a shader to a picture. Specify the code and the target picture number as arguments.
 * remove: removes the shader from the picture.
 * Once applied, the shader will remain applied after the picture is removed.
 * There are no plugin parameters for this plugin.
 *
 * 2021/03/14 1.0.0 released
 * 2021/03/14 1.0.1 Refactoring
 * 2021/03/14 1.0.2 Refactoring
 * 2021/03/20 1.1.0 Fixed variable time not being applied + other refactorings
 *
 * @command add
 * @text Add shader.
 * @desc Add a shader to a picture. Specify the code and the target picture number as arguments.
 * @arg fragmentSrc
 * @type multiline_string
 * @text GLSL shader code.
 * @desc Describe the shader code to be applied to the picture. uniforms time can be used for GLSL variables.
 * @arg pictureId
 * @type number
 * @text The picture number you want to set.
 * @desc Describe the picture number you want to set.
 *
 * @command remove
 * @text Remove shader
 * @desc Remove a shader from a picture. Specify the target picture number as an argument.
 * @arg pictureId
 * @type number
 * @text Picture number to remove.
 * @desc Describe the picture number to be removed.
 *
 */
/*:ja
 * @target MZ
 * @plugindesc ピクチャにGLSLシェーダーを適用します。
 * @url https://github.com/GEMINIGAMEDEV/plug-in/blob/master/MZ/GMN_GLSLShader.js
 * @author ジェミニ
 *
 * @help
 * ピクチャにGLSLシェーダーを適用します。
 * プラグインコマンドは2種類あります。
 * add: シェーダーをピクチャに追加します。引数にコードと対象のピクチャ番号を指定してください。
 * remove: シェーダーをピクチャから取り除きます。
 * 一度適用したシェーダーはピクチャ消去後も適用されたままになります。
 * このプラグインにプラグインパラメータはありません。
 *
 * 2021/03/14 1.0.0 公開
 * 2021/03/14 1.0.1 リファクタリング
 * 2021/03/14 1.0.2 リファクタリング
 * 2021/03/20 1.1.0 変数timeが適用できてなかったので修正+その他リファクタリング
 *
 * @command add
 * @text シェーダー追加
 * @desc シェーダーをピクチャに追加します。引数にコードと対象のピクチャ番号を指定してください。
 * @arg fragmentSrc
 * @type multiline_string
 * @text GLSLシェーダーのコード
 * @desc ピクチャに適用するシェーダーのコードを記述してください。
 * @arg pictureId
 * @type number
 * @text 設定したいピクチャ番号
 * @desc 設定したいピクチャ番号を記述してください。
 *
 * @command remove
 * @text シェーダー除去
 * @desc シェーダーをピクチャから除去します。引数に対象のピクチャ番号を指定してください。
 * @arg pictureId
 * @type number
 * @text 除去したいピクチャ番号
 * @desc 除去したいピクチャ番号を記述してください。
 *
 */
(() => {
  "use strict";
  const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
  const UNIFORMS_DEFAULT = 0.0;
  const UNIFORMS_MILISECONDS = 0.001;
  const VERTEX_SHADER_DEFAULT = null;
  // command:add
  PluginManager.registerCommand(pluginName, "add", (args) => {
    const sprite = getSprite(Number(args.pictureId));
    const filter = createGLSLFilter(args.fragmentSrc);
    sprite.setGLSLFilter(filter);
    sprite.addUniforms(filter);
  });
  // command:remove
  PluginManager.registerCommand(pluginName, "remove", (args) => {
    const sprite = getSprite(Number(args.pictureId));
    sprite.clearGLSLFilter();
    sprite.removeUniforms();
  });

  /**
   * GLSLシェーダ用のフィルタを定義します。
   */
  const Filter = class extends PIXI.Filter {
    constructor(fragmentSrc) {
      super(
        VERTEX_SHADER_DEFAULT, // vertex shader
        fragmentSrc, // fragment shader
        {
          time: UNIFORMS_DEFAULT, // uniforms
        }
      );
    }
  };
  /**
   * GLSLシェーダ用のフィルタを取得します。
   * @param {string} fragmentSrc
   * @returns {PIXI.Filter} フィルタ
   */
  const createGLSLFilter = (fragmentSrc) => {
    return new Filter(fragmentSrc);
  };
  /**
   * 使用しているTickerを取得します。
   * @returns {PIXI.ticker.Ticker} ticker
   */
  const getTicker = () => {
    return Graphics.app.ticker;
  };

  /**
   * GLSLシェーダー処理対象となるピクチャのスプライトを返却します。
   * @param {number} pictureId
   * @returns {Sprite_Picture} GLSLシェーダー処理対象
   */
  const getSprite = (pictureId) => {
    const sprites = SceneManager._scene._spriteset._pictureContainer.children;
    // ピクチャ番号とSprite_Pictureのインデックスは1ずれているので合わせます。
    return sprites[pictureId - 1];
  };

  //-----------------------------------------------------------------------------
  // Sprite_Picture
  //
  // GLSLフィルタ及びuniformsの追加・除去用関数を追加します。
  const _Sprite_Picture_initialize = Sprite_Picture.prototype.initialize;
  Sprite_Picture.prototype.initialize = function (pictureId) {
    _Sprite_Picture_initialize.call(this, pictureId);
    this.clearGLSLFilter();
    this.clearUniforms();
  };
  /**
   * GLSLシェーダ用のフィルタを1つだけ設定します。
   * @param {PIXI.Filter} GLSLFilter
   */
  Sprite_Picture.prototype.setGLSLFilter = function (GLSLFilter) {
    this.filters = [GLSLFilter];
  };
  /**
   * GLSLシェーダ用のフィルタを消去します。
   */
  Sprite_Picture.prototype.clearGLSLFilter = function () {
    this.filters = [];
  };
  /**
   * Tickerに関数を追加してGLSLシェーダで変数を利用可能にします。
   * 作成したuniformsを保存して除去できるようにします。
   * @param {PIXI.Filter} GLSLFilter
   */
  Sprite_Picture.prototype.addUniforms = function (GLSLFilter) {
    const ticker = getTicker();
    this._GLSLFilterUniforms = () => {
      GLSLFilter.uniforms.time += ticker.elapsedMS * UNIFORMS_MILISECONDS;
    };
    ticker.add(this._GLSLFilterUniforms);
  };
  /**
   * Tickerから関数を除去してGLSLシェーダで変数を利用不可能にします。
   */
  Sprite_Picture.prototype.removeUniforms = function () {
    const ticker = getTicker();
    ticker.remove(this._GLSLFilterUniforms);
  };
  /**
   *　Sprite_Pictureのプロパティとして保管するuniformsをクリアします。
   */
  Sprite_Picture.prototype.clearUniforms = function () {
    this._GLSLFilterUniforms = () => {};
  };
})();
