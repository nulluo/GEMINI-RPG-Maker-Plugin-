//=============================================================================
// GMN_CommonEventKey.js
// ----------------------------------------------------------------------------
// (C)2021 GEMINI
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
/*:
 * 2021/08/01 1.0.0 released
 * 2021/11/29 1.1.0 Repository and directory changes
 *
 * @plugindesc Execute a common event containing the string specified by the plugin command.
 * @url https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_CommonEventKey.js
 * @author GEMINI
 * @base PluginCommonBase.js
 * @help Executes a common event containing the string specified in the plugin command.
 * @target MZ
 * @command common event invocation
 * @arg key
 * @text Contains the string
 * @desc The string contained by the common event to be invoked.
 * If only an integer is specified, it will be interpreted as an ID.
 * @arg count
 * @type number
 * @text Number of calls to the common event.
 * @desc Specify the number of times to invoke the common event.
 * Default is 1 time.
 * @default 1
 */
/*:ja
 * 2021/08/01 1.0.0 公開
 * 2021/11/29 1.1.0 レポジトリ及びディレクトリ変更
 *
 * @plugindesc プラグインコマンドで指定した文字列を含むコモンイベントを実行します。
 * @url https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_CommonEventKey.js
 * @author ジェミニ
 * @base PluginCommonBase.js
 * @help プラグインコマンドで指定した文字列を含むコモンイベントを実行します。
 * @target MZ
 * @command コモンイベント呼び出し
 * @arg key
 * @text 含有文字列
 * @desc 呼び出したいコモンイベントが含む文字列です。
 * 整数のみを指定した場合はIDと解釈します。
 * @arg count
 * @type number
 * @text コモンイベントの呼び出し回数
 * @desc コモンイベントの呼び出し回数を指定してください。
 * デフォルトは1回です。
 * @default 1
 */
{
  const script = document.currentScript;
  const handleError = (msg) => {
    if ($gameTemp.isPlaytest()) {
      throw new Error(msg);
    } else {
      $gameMessage.add(msg);
      return null;
    }
  };
  const getCommmonEvent = (key) => {
    const numKey = Number(key);
    if (!Number.isNaN(numKey) && Number.isInteger(numKey)) {
      if (numKey < $dataCommonEvents.length) {
        return numKey;
      } else {
        const msg = `指定したIDのコモンイベントは存在しません。
        コモンイベントID:${numKey}`;
        return handleError(msg);
      }
    }
    const commonEvents = $dataCommonEvents
      .filter((e) => e && e.name && e.name.contains(key))
      .map((e) => e.id);
    console.log(`commonEvents.length:${commonEvents.length}`);
    if (!commonEvents.length) {
      const msg = `指定した文字列を含むコモンイベントが存在しません。
      文字列:${key}`;
      return handleError(msg);
    }
    if (commonEvents.length > 1) {
      const msg = `指定した文字列を含むコモンイベントが複数あります。
      重複しないようにしてください。
      文字列:${key}, コモンイベントID:${commonEvents}`;
      return handleError(msg);
    }
    return commonEvents[0];
  };
  PluginManagerEx.registerCommand(script, "コモンイベント呼び出し", (args) => {
    const count = args.count;
    const commonEvent = getCommmonEvent(args.key);
    commonEvent &&
      [...Array(count)].map(() => $gameTemp.reserveCommonEvent(commonEvent));
  });
}
