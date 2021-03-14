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
 * @url https://github.com/GEMINIGAMEDEV/plug-in/GMN_GLSLShader.js
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
 * @url https://github.com/GEMINIGAMEDEV/plug-in/GMN_GLSLShader.js
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
 *
 * @command add
 * @text シェーダー追加
 * @desc シェーダーをピクチャに追加します。引数にコードと対象のピクチャ番号を指定してください。
 * @arg fragmentSrc
 * @type multiline_string
 * @text GLSLシェーダーのコード
 * @desc ピクチャに適用するシェーダーのコードを記述してください。GLSLの変数には uniforms time が使用できます。
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

  PluginManager.registerCommand(pluginName, "add", (args) => {
    const sprites = SceneManager._scene._spriteset._pictureContainer.children;
    // ピクチャ番号とSprite_Pictureの番号は1ずれているようなので1引く
    sprites[Number(args.pictureId) - 1].setGLSLFilter(args.fragmentSrc);
  });

  PluginManager.registerCommand(pluginName, "remove", (args) => {
    const sprites = SceneManager._scene._spriteset._pictureContainer.children;
    // ピクチャ番号とSprite_Pictureの番号は1ずれているようなので1引く
    sprites[Number(args.pictureId) - 1].resetGLSLFilter();
  });

  PIXI.filters.GLSLFilter = class extends PIXI.Filter {
    constructor(fragmentSrc) {
      super(
        null, // vertex shader
        fragmentSrc, // fragment shader
        {
          time: 0.0, // uniforms
        }
      );
    }
  };

  const _Sprite_Picture_initialize = Sprite_Picture.prototype.initialize;
  Sprite_Picture.prototype.initialize = function (pictureId) {
    _Sprite_Picture_initialize.call(this, pictureId);
    this.resetGLSLFilter();
  };
  Sprite_Picture.prototype.setGLSLFilter = function (fragmentSrc) {
    const GLSLFilter = new PIXI.filters.GLSLFilter(fragmentSrc);
    // timeを渡す
    Graphics._app._ticker.add(function () {
      GLSLFilter.uniforms.time += Graphics._app._ticker.elapsedMS * 0.001;
    });
    this.filters = [GLSLFilter];
  };
  Sprite_Picture.prototype.resetGLSLFilter = function () {
    this.filters = [];
  };
})();
