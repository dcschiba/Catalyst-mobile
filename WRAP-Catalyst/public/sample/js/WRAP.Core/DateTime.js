/**
 * 日付・時間クラス
 *
 *
 *     var datetime = new WRAP.Core.DateTime('2016/08/31T00:00:00');    // 指定時間で初期化
 *     var now = new WRAP.Core.DateTime();                              // 現在時間で初期化
 *      // Date Time
 *      var dt = new WRAP.Core.DateTime();          // 現在時刻
 *      console.log(dt.text());                     // 標準フォーマットで出力
 *      //[Log] 20161213T073640
 *
 *     console.log(dt.text('YYYY-MM-DD hh:mm'));   // フォーマット指定出力
 *      //[Log] 2016-12-13 07:36
 *
 *      var dt2 = WRAP.Core.currentTime();          // 現在時刻
 *      console.log(dt2.text());                    // 標準フォーマットで出力
 *      //[Log] 20161213T073640
 *
 *      console.log(dt2.text('YYYY-MM-DD hh:mm'));  // フォーマット指定出力
 *      //[Log] 2016-12-13 07:36
 *
 *      var dt3 = new WRAP.Core.DateTime('20161210T000000');    // 指定時間の時間オブジェクト作成
 *      console.log(dt3.text());                    // 標準フォーマットで出力
 *      //[Log] 20161210T000000
 *      console.log(dt3.text('YYYY-MM-DD hh:mm'));  // フォーマット指定出力
 *      //[Log] 2016-12-10 00:00
 *
 *      var dt4 = new WRAP.Core.DateTime('20161210T000000');
 *      dt4.add(3600);                              // 時間オブジェクトに秒を加算
 *      var diff = dt3.diff(dt4);                   // 時間オブジェクトの差を算出
 *      console.log(diff);
 *      //[Log] 3600
 *
 *
 * @class WRAP.Core.DateTime
 * @constructor
 * @optional time {String} 文字列表現された時間（YYYY/MM/DDT/hh/mm/ss形式）
 * @optional time {Date} Javascript Dateオブジェクト
 * @optional 省略時 現在時間オブジェクト
 */

WRAP.Core.DateTime = (function() {
  
    return function(time) {
                      
        if ( !time ) {
            if ( WRAP.Core.current )
                return WRAP.Core.current;
            this.date = new Date();
        }
        else {
            var type = Object.prototype.toString.call(time).slice(8, -1);
            if ( type === 'Date' ) {
                this.date = time;
                      
            }
            else {
                if ( time.length > 0 ) {
                    time = time.replace(/ +/g,' ').replace(/:| |T|\//g,",");
                    var t  = [0,0,0,0,0,0,-1];
                    var m  = [4,2,2,2,2,2,-1];
                    var k = 0, d = 0;
                    for ( var i = 0 ; i < time.length && m[k] > 0 ; i++ ) {
                        var c = time.charAt(i);
                        if ( isNaN(c) ) {
                            if ( c == "," )
                                k++, d = 0;
                        }
                        else {
                            if ( m[k] == d )
                                k++, d = 0;
                            t[k] = t[k]*10+parseInt(c);
                            d++;
                        }
                    }
                    this.date = new Date(Date.UTC(t[0],t[1]-1,t[2],t[3],t[4],t[5]));
                }
            }
        }
    
        this._padding = function(v, l) {
            if ( l == void 0 )
                l = 2;
            var t = "" + v;
            while ( t.length < l )
                t = "0" + t;
            return t;
        }
                                                         
        /**
         * 時間の文字列表現を返す
         *
         *     var str = datetime.text("YYYY/MM/DD hh:mm");
         *
         * @method text
         * @param format {String} Y,M,D,h,m,sと任意デリミタでフォーマットを表現。<br>省略時は YYYY/MM/DDThh/mm/ss形式
         * @return {String} 時間の文字列表現
         **/
        this.text = function(format) {
            if (!format)
                format = 'YYYYMMDDThhmmss';
            format = format.replace(/YYYY/g, this._padding(this.date.getUTCFullYear(),4));
            format = format.replace(/MM/g, this._padding(this.date.getUTCMonth()+1, 2));
            format = format.replace(/DD/g, this._padding(this.date.getUTCDate(), 2));
            format = format.replace(/HH/g, this._padding(this.date.getUTCHours(), 2));
            format = format.replace(/hh/g, this._padding(this.date.getUTCHours(), 2));
            format = format.replace(/mm/g, this._padding(this.date.getUTCMinutes(), 2));
            format = format.replace(/ss/g, this._padding(this.date.getUTCSeconds(), 2));
            return format;
        }

        /**
         * 時間オブジェクトに指定秒を加算する
         * 
         *     datetime.add(3600); // datetimeに一時間加算
         *
         * @method add
         * @param sec {Number} 秒
         * @return {WRAP.Core.DateTime} 秒加算されたオブジェクト（this）
         **/
        this.add = function(sec) {
            this.date = new Date(this.date.getTime()+sec*1000);
        }

        /**
         * 指定時間オブジェクトとの時間差を取得する
         *
         *     var elapsed = now.diff(lasttime);
         *
         * @method diff
         * @param time {WRAP.Core.DateTime} 差をとる時間オブジェクト
         * @return {Integer} 時間差（秒）
         **/
        this.diff = function(time) {
            return parseInt((time.date.getTime()-this.date.getTime())/1000);
        }
    }
}());


