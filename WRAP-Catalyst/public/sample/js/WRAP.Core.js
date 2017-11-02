/**
 * @namespace WRAP
 **/

var WRAP; if (typeof WRAP === 'undefined') WRAP = {};

/**
 * @class Core
 * @static
 **/
WRAP.Core = (function() {

    return {
        version: "1.1",
    
        /**
         * 現在時間を表す時間クラス（WRAP.Core.DateTime）オブジェクトを返す。
         * @method currentTime
         * @return {WRAP.Core.DateTime} 現在時間を表す時間オブジェクト。
         **/
        currentTime: function() {
             return new WRAP.Core.DateTime();
        },
                          
        /**
         * 現在時間を設定する。
         * WRAP.Core.currentTime()関数および、WRAP.Geo.DateTime()は本関数で設定した時間を返すようになる。
         *
         *          // 現在時間を強制的に変更
         *          WRAP.Core.setCurrentTime(new WRAP.Core.DateTime('20161210T000000'));
         *          var dt5 = new WRAP.Core.DateTime();          // 現在時刻取得
         *          console.log(dt5.text());                     // 標準フォーマットで出力
         *          //[Log] 20161210T000000
         *          console.log(dt5.text('YYYY-MM-DD hh:mm'));   // フォーマット指定出力
         *          //[Log] 2016-12-10 00:00
         *
         *          var dt6 = WRAP.Core.currentTime();           // 現在時刻取得
         *          console.log(dt6.text());                     // 標準フォーマットで出力
         *          //[Log] 20161210T000000
         *          console.log(dt6.text('YYYY-MM-DD hh:mm'));   // フォーマット指定出力
         *          //[Log] 2016-12-10 00:00
         *
         * @method setCurrentTime
         * @return {WRAP.Core.DateTime} 現在時間を表す時間オブジェクト。nullを指定した場合、設定した現在時間が解除される。
         **/
        setCurrentTime: function(datetime) {
             WRAP.Core.current = datetime;
        }
    }
    
}());


