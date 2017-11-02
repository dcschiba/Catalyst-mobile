/**
 * @namespace WRAP
 *
 **/

var WRAP; if (typeof WRAP === 'undefined') WRAP = {};
var process; if (typeof process === 'undefined') process = {env:{}};

/**
 * log出力クラス
 * @class WRAP.Logger
 * @static
 **/
WRAP.Logger = {
  version: '1.0',

  DEBUG: '【DEBUG】',
  INFO: '【INFO】',
  WARN: '【WARN】',
  CRITICAL: '【CRITICAL】',

  /**
   * Loggerの状態を設定する
   *
   * 開発モードにする場合’development’を設定
   * @method set
   * @param {String} 状態文字列 開発モードの場合’development’
   * @return なし
   **/
  set: function (env) {
    this.env = env;
  },
    
  /**
   * DEBUGログをコンソールへ出力する
   * 
   * 本番向けビルド時に無効化される
   * @method debug
   * @param {String} message 出力メッセージ
   * @return なし
   **/
  debug: function (message) {
    if ( this.env === 'development' )
      console.log(this.currentTimeString() + this.DEBUG + message);
  },

    /**
   * INFOログをコンソールへ出力する
   * @method info
   * @param {String} message 出力メッセージ
   * @return なし
   **/
  info: function (message) {
    console.log(this.currentTimeString() + this.INFO + message);
  },

  /**
   * WARNログをコンソールへ出力する
   * @method warn
   * @param {String} message 出力メッセージ
   * @return なし
   **/
  warn: function (message) {
    console.log(this.currentTimeString() + this.WARN + message);
  },

  /**
   * CRITICALログをコンソールへ出力する
   * @method critical
   * @param {String} message 出力メッセージ
   * @return なし
   **/
  critical: function (message) {
    console.log(this.currentTimeString() + this.CRITICAL + message);
  },
    
  currentTimeString: function() {
      var now = new Date;
      var str = "【";
      str += now.getUTCFullYear()+"-";
      str += ("0"+(now.getUTCMonth()+1)).slice(-2)+"-";
      str += ("0"+now.getUTCDate()).slice(-2)+" ";
      str += ("0"+now.getUTCHours()).slice(-2)+":";
      str += ("0"+now.getUTCMinutes()).slice(-2)+":";
      str += ("0"+now.getUTCSeconds()).slice(-2)+"Z】";
      return str;
  }
};
