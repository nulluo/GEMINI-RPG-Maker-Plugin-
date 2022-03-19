//=============================================================================
// GMN_PictureArrange.js
// ----------------------------------------------------------------------------
// (C)2022 GEMINI
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
/*:
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @target MZ
 * @plugindesc Multiple pictures can be aligned and displayed.
 * @base PluginCommonBase
 * @url https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_PictureArrange.js
 * @author GEMINI
 *
 * @help
 *
 * Allows multiple pictures to be displayed in an aligned fashion.
 *
 * 2022/02/20 1.0.0 Published
 * 2022/03/20 1.0.1 Description Fixed
 *
 * @command showPictures
 * @text Show aligned pictures
 * @desc Align and display pictures in the specified range.
 *
 * @arg start
 * @text Start picture number
 * @desc The picture number to start displaying.
 * @type number
 * @default 1
 * @arg end
 * @text End picture number.
 * @desc The picture number to end the display.
 * @type number
 * @default 1
 * @arg pictureInfos
 * @text Picture info.
 * @desc Information about the picture to display.
 * @type struct<PictureInfos>
 * @arg arrangeInfos
 * @text Arrange information.
 * @desc Information about the picture to arrange.
 * @type struct<ArrangeInfos>
 * @arg maxColumns
 * @text Number of columns.
 * @desc Number of pictures to display in a row.
 * @type number
 * @default 1
 */
/*~struct~PictureInfos:
 * @param file
 * @type file
 * @dir img/pictures
 * @param origin
 * @type select
 * @option top left
 * @value 0
 * @option center
 * @value 1
 * @default 0
 * @param scaleX
 * @type number
 * @default 100
 * @param scaleY
 * @type number
 * @default 100
 * @param opacity
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @param blendMode
 * @type select
 * @option normal
 * @value 0
 * @option add
 * @value 1
 * @option multiply
 * @value 2
 * @option screen
 * @value 3
 * @default 0
 */
/*~struct~ArrangeInfos:
 * @param startX
 * @type number
 * @param startY
 * @type number
 * @param marginX
 * @type number
 * @min 0
 * @param marginY
 * @type number
 * @min 0
 * @param
 */
/*:ja
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @target MZ
 * @plugindesc 複数のピクチャを整列して表示できます。
 * @base PluginCommonBase
 * @url https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_PictureArrange.js
 * @author ジェミニ
 *
 * @help
 *
 * 複数のピクチャを整列して表示できます。
 *
 * 2022/02/20 v.1.0.0 公開
 * 2022/03/20 v.1.0.1 説明文修正
 *
 * @command showPictures
 * @text ピクチャ整列表示
 * @desc 指定した範囲のピクチャを整列して表示します。
 *
 * @arg start
 * @text 開始ピクチャ番号
 * @desc 表示を開始するピクチャ番号です。
 * @type number
 * @default 1
 * @arg end
 * @text 終了ピクチャ番号
 * @desc 表示を終了するピクチャ番号です。
 * @type number
 * @default 1
 * @arg pictureInfos
 * @text ピクチャ情報
 * @desc 表示するピクチャの情報です。
 * @type struct<PictureInfos>
 * @arg arrangeInfos
 * @text 整列情報
 * @desc 整列するピクチャの情報です。
 * @type struct<ArrangeInfos>
 * @arg maxColumns
 * @text 列数
 * @desc 一列に表示するピクチャの枚数
 * @type number
 * @default 1
 */
/*~struct~PictureInfos:ja
 * @param file
 * @type file
 * @dir img/pictures
 * @param origin
 * @type select
 * @option 左上
 * @value 0
 * @option 中央
 * @value 1
 * @default 0
 * @param scaleX
 * @type number
 * @default 100
 * @param scaleY
 * @type number
 * @default 100
 * @param opacity
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @param blendMode
 * @type select
 * @option 通常
 * @value 0
 * @option 加算
 * @value 1
 * @option 乗算
 * @value 2
 * @option スクリーン
 * @value 3
 * @default 0
 */
/*~struct~ArrangeInfos:ja
 * @param startX
 * @type number
 * @param startY
 * @type number
 * @param marginX
 * @type number
 * @min 0
 * @param marginY
 * @type number
 * @min 0
 */
"use strict";
{
  const script = document.currentScript;
  const param = PluginManagerEx.createParameter(script);

  PluginManagerEx.registerCommand(script, "showPictures", function (args) {
    const ids = createIds(args.start, args.end);
    showPictures(ids, args.pictureInfos, args.arrangeInfos, args.maxColumns);
  });

  const createIds = (start, end) => {
    if (start > end) {
      const pluginName = PluginManagerEx.findPluginName(script);
      throw new Error(`[${pluginName}]
    ${start}は${end}よりも大きい数値である必要があります。`);
    }
    const length = end - start + 1;
    return [...Array(length)].map((_, i) => i + start);
  };

  const showPictures = (ids, pictureInfos, arrangeInfos, maxColumns) => {
    for (const id of ids) {
      const index = ids.indexOf(id);
      const column = index % maxColumns;
      const row = Math.floor(index / maxColumns);
      const x = arrangeInfos.startX + arrangeInfos.marginX * column;
      const y = arrangeInfos.startY + arrangeInfos.marginY * row;
      showEach(id, pictureInfos, x, y);
    }
  };

  const showEach = (id, pictureInfos, x, y) =>
    $gameScreen.showPicture(
      id,
      pictureInfos.file,
      pictureInfos.origin,
      x,
      y,
      pictureInfos.scaleX,
      pictureInfos.scaleY,
      pictureInfos.opacity,
      pictureInfos.blendMode
    );
}
