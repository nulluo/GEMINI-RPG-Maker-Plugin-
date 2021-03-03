//=============================================================================
// GMN_Tweet.js
// ----------------------------------------------------------------------------
// (C)2021 GEMINI
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Tweets with the content specified by the plugin command.
 * @author GEMINI
 * @url https://twitter.com/gemini_gamedev
 *
 * @help
 * Tweets with the content specified by the plugin command.
 * Will not work on some posting sites because it uses the window object.
 * (Probably not available for GAME atsumaru.)
 *
 * 2021/03/02 1.0.0 released
 * 2021/03/02 1.1.0 Some control characters can now be entered. Some control characters can now be entered, including "#" and "atmark".
 * 2021/03/03 1.2.0 Open in a new tab or a new window can now be selected. Messages can now be displayed when the tweet screen cannot be opened.
 *
 * @param windowType
 * @type select
 * @option newTab
 * @option newWindow
 * @default newTab
 * @text New Tab/New Window
 * @desc Choose whether to open a new tab or a new window when you tweet.
 * @param errorMessage
 * @type string
 * @default The tweet screen cannot be opened.
 * @text Text to be displayed in the game when the tweet screen cannot be opened.
 * @desc Set the text that will be displayed on the game when the tweet screen cannot be opened. Blank is OK.
 *
 * @command tweet
 * @text Tweet
 * @desc Tweet with the content specified by the parameter.
 * @arg text
 * @type multiline_string
 * @min 1
 * @max 140
 * @text Text to tweet
 * @desc Write the actual text that you want to tweet. \V[n],\N[n],\P[n],\G can be used.
 * @arg hashtags
 * @type string
 * @text Hashtags you want to set
 * @desc Describe the hashtag you want to set. With or without "#" is OK. Multiple hashtags can be specified separated by commas. Blank space is OK.
 * @arg via
 * @type string
 * @text The name of the user you want to mention.
 * @desc Please set the user name you want to mention. With or without atmark, blank is OK.
 *
 */
/*:ja
 * @target MZ
 * @plugindesc プラグインコマンドで指定した内容でツイートします。
 * @author ジェミニ
 * @url https://twitter.com/gemini_gamedev
 *
 * @help
 * プラグインコマンドで指定した内容でツイートします。
 * windowオブジェクトを使用しているため投稿サイトによっては動作しません。
 * (おそらく、GAMEアツマールでは使用不可能です。)
 *
 * 2021/03/02 1.0.0 公開
 * 2021/03/02 1.1.0 一部の制御文字を入力可能にしました。「#」,アットマークありでもOKにしました。
 * 2021/03/03 1.2.0 新規タブで開くか、新規ウィンドウで開くかを選択可能にしました。ツイート画面を開けなかった場合のメッセージを表示可能にしました。
 *
 * @param windowType
 * @type select
 * @option newTab
 * @option newWindow
 * @default newTab
 * @text 新規タブ/新規ウィンドウ
 * @desc ツイートする際に新規タブを開くか、新規ウィンドウを開くか選択してください。
 * @param errorMessage
 * @type string
 * @default ツイート画面が開けませんでした。
 * @text ツイート画面が開けなかった場合にゲーム上に表示する文章
 * @desc ツイート画面が開けなかった場合にゲーム上に表示する文章を設定してください。空欄OK。
 *
 * @command tweet
 * @text ツイート
 * @desc パラメータで指定した内容でツイートします。
 * @arg windowType
 * @type multiline_string
 * @min 1
 * @max 140
 * @text ツイートする文章
 * @desc 実際にツイートしたいテキストをそのまま記述してください。\V[n],\N[n],\P[n],\G を使用可能です。
 * @arg text
 * @type multiline_string
 * @min 1
 * @max 140
 * @text ツイートする文章
 * @desc 実際にツイートしたいテキストをそのまま記述してください。\V[n],\N[n],\P[n],\G を使用可能です。
 * @arg hashtags
 * @type string
 * @text 設定したいハッシュタグ
 * @desc 設定したいハッシュタグを記述してください。「#」ありなしOK。カンマ区切りで複数指定可能。空欄OK。
 * @arg via
 * @type string
 * @text メンションしたいユーザー名
 * @desc メンションしたいユーザー名を設定してください。アットマークありなしOK。空欄OK。
 *
 */
(() => {
  "use strict";
  const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
  const parameters = PluginManager.parameters(pluginName);
  const errorMessage = parameters["errorMessage"];
  const windowType = parameters["windowType"];
  const convertEscapeCharacters = function (text) {
    /* eslint no-control-regex: 0 */
    text = text.replace(/\\/g, "\x1b");
    text = text.replace(/\x1b\x1b/g, "\\");
    text = text.replace(/\x1bV\[(\d+)\]/gi, (_, p1) =>
      $gameVariables.value(parseInt(p1))
    );
    text = text.replace(/\x1bV\[(\d+)\]/gi, (_, p1) =>
      $gameVariables.value(parseInt(p1))
    );
    text = text.replace(/\x1bN\[(\d+)\]/gi, (_, p1) => actorName(parseInt(p1)));
    text = text.replace(/\x1bP\[(\d+)\]/gi, (_, p1) =>
      partyMemberName(parseInt(p1))
    );
    text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    return text;
  };
  const actorName = function (n) {
    const actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.name() : "";
  };

  const partyMemberName = function (n) {
    const actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.name() : "";
  };
  PluginManager.registerCommand(pluginName, "tweet", (args) => {
    const params = {};
    params.text = convertEscapeCharacters(args.text);
    params.hashtags = args.hashtags.replace(/#/gi, (_) => "");
    params.via = args.via.replace(/^@/gi, (_) => "");
    const query = Object.entries(params)
      .filter((e) => e[1])
      .map((e) => `${e[0]}=${e[1]}`)
      .join("&");
    const uri = encodeURI(`http://twitter.com/intent/tweet?${query}`);
    const windowFeatures = [
      "menubar",
      "location",
      "resizable",
      "scrollbars",
      "status",
    ].join(",");
    const newWindow = window.open(
      uri,
      "newtab",
      windowType !== "newTab" ? windowFeatures : null
    );
    if (!newWindow && errorMessage) {
      $gameMessage.add(convertEscapeCharacters(errorMessage));
    }
  });
})();
