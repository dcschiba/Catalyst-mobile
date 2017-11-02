/**
 * @namespace WRAP
 *
 **/

var WRAP; if (typeof WRAP === 'undefined') WRAP = {};

/**
 * @class DH
 * @static
 **/
WRAP.DH = {
    
    version: "1.1",
    
    /**
     *
     * データ・コンフィグの格納ディレクトリのパスを指定する
     * @property conf_path
     * @type {String}
     * @default "./pri/wrap/conf/data"
     **/
    conf_path: "./pri/wrap/conf/data",
    
    
    /**
     * カスタマコード、ユーザー名を設定する
     *
     * @method setUser
     * @param customercode {String} カスタマコード
     * @param username {String} ユーザー名
     **/
    setUser : function(customercode, username) {
        this.user = username;
        this.customer = customercode;
        if ( this._data ) {
            var reload;
            for ( var key in this._data )
                (reload = this._data[key].reload) && reload();
        }
    },
    
    /**
     * 処理対象のオブジェクトを指定する
     *
     * オブジェクト識別子はデータ毎に定められたユニークな文字列
     * @method addObject
     * @param id {String} オブジェクト識別子
     * @return {WRAP.DH.Reference} 対象オブジェクトのルートの参照オブジェクト
     **/
    addObject: function(id) {
        var self = this;
        self._data[id] = {name:id, base:{}, load:[], inspect:[]};
        var conf = this.conf_path + "/" + id + ".json";
        this._getJSON(conf, "configuration", function(c) {
            var data = self._data[id];
            data.conf = c;
            var name = c.DataHandler;
            if ( name && self.DataHandler[name] ) {
                data.handler = new self.DataHandler[name](data.ref, data.conf, data.base);
                WRAP.DH._load(data);
            }
            else {
                self._error("Implementation WRAP.DH.DataHandler."+name+" not found.");
            }
        });
        return (self._data[id].ref = new this.Reference(id));
    },
    
    /**
     * オブジェクトを処理対象から削除する
     * @method removeObject
     * @param id {String} オブジェクト識別子
     **/
    removeObject: function(id) {
        delete this._data[id];
    },
    
    /**
     * オブジェクトの参照（Rerenceオブジェクト）を返す
     *
     * 参照識別子はオブジェクト名称を「.」連結したオブジェクトのパス文字列
     *
     * 配列の場合[]でインデックスを指定可能
     *
     *      　記述方式
     *      　・オブジェクトの階層を表す場合、オブジェクト名を「.」連結する。
     *      　		　　"object.element1.element2"
     *
     *      　・テーブル（配列）内のインデックスを指定する。
     *      　		　　"JMA_RADAR.timelist[2]"
     *
     *      　・テーブル内の１要素について値が一致する要素を指定する。
     *      　		　　"JMA_RADAR.timelist[basetime=20160512T000000]"
     *
     * @method query
     * @param key {String} 参照識別子
     **/
    query: function(key) {
        return new this.Reference(key);
    },
    
    // Classes
    /**
     * Data Handling内で管理するオブジェクトの参照を表現するクラス
     *
     * @class DH.Reference
     * @constructor
     * @param key {String} 参照識別子
     * @param root {WRAP.DH.Reference} addObjectで返されたルートオブジェクト
     */
    Reference: function(key, root) {
        if ( !root ) {
            this._string = key;
            var ks = key.split(".");
            if ( !ks.length || !(this._data = WRAP.DH._data[ks[0]]) )
                WRAP.DH._error("Invalid reference. key="+key+" root object not found.");
        }
        else {
            this._string = root._string+"."+key;
            this._data = root._data;
        }
        
        this._path = (root?root._path:[]).concat(key?key.split("."):[]);

        /**
         * 当該オブジェクトの下位階層を検索し、参照識別子に対応する参照オブジェクトを返す。
         *
         * @method query
         * @param key {String} 参照識別子
         * @return {WEAP.DH.Reference} 参照オブジェクト
         **/
        this.query = function(key) {
            return new WRAP.DH.Reference(key, this);
        }

        /**
         * オブジェクトが配列の場合は、要素数を返す
         *
         * @method length
         * @return {Number} 配列のサイズ。<br>オブジェクトが配列でない場合は nullを返す
         **/
        this.length = function() {
            var v = this.value();
            return Array.isArray(v)?v.length:0;
        }

        /**
         * 参照オブジェクトの値（オブジェクト）を返す
         *
         *
         *        使用例）
         *        var route = WRAP.DH.query("Copilot.ffs_route").value()             // ffs_route配列（論理構成）が返る。
         *        var id = WRAP.DH.query("Copilot.ffs_route[2].id").value()			// ffs_routeのindex=2位置のidオブジェクトが返される。
         *        var vt = WRAP.DH.query("JMA_RADAR.timelist[basetime=20160512T000000]").query("validtime[1].time").value()
         *                                      // JMA_RADARのbassetime 20160512T000000の１件目の validtimeを返す。
         *
         * @method value
         * @return {Object} 参照オブジェクトの実体オブジェクトまたは値
         **/
        this.value = function() {
            var v;
            var data = this._data;
            if ( data ) {
                if ( data.handler && data.handler.resolve )
                    data.handler.resolve(this);
                if ( (v=data.base) ) {
                    for ( var i = 1 ; i < this._path.length ; i++ ) {
                        var key = this._path[i];
                        if ( !(v=this._resolve(v, key)) )
                            break;
                    }
                }
            }
            return v;
        }
    
        /**
         * 参照先オブジェクトが存在する（ロードされている）かどうかを返す
         *
         * @method available
         * @return {Boolean} 参照先オブジェクトが存在していれば true、<br>存在していない場合 false
         **/
        this.available = function() {
            return !(this.value() === undefined);
        }

        /**
         * 参照先オブジェクトをロードする
         *
         * @method load
         * @param cb {Function} コールバック関数
         *
         * <コールバック引数>
         * + __state__ String   ”completed”または ”error”
         * + __reference__  WRAP.DH.Reference    ロードされたオブジェクト参照
         * @return
         **/
        this.load = function(cb) {
            this._data.load.push({ref:this,cb:cb?cb:this._nop});
            WRAP.DH._load(this._data);
        }

        /**
         * オブジェクトの更新を監視する
         *
         * 参照先オブジェクトが更新された場合に指定したコールバック関数を呼び出す
         * @method inspect
         * @param cb {Function} コールバック関数
         * @param immediate {Boolean} trueの場合本関数呼び出し時点でデータがロードれていれば直ちにコールバックする
         *
         * <コールバック引数>
         * + __reference__  WRAP.DH.Reference    ロードされたオブジェクト参照
         * @return
         **/
        this.inspect = function(cb, immediate) {
            if ( cb ) {
                var key = this._string+"."+cb.toString();
                this._data.inspect.push({key:key,ref:this,cb:cb});
                if ( immediate && this.available() )
                    cb(this);
            }
            else {
                for ( var i = 0 ; i < this._data.inspect.length ; i++ ) {
                    if ( this._data.inspect[i].ref == this ) {
                        this.splice(i, 1);
                        return;
                    }
                    i++;
                }
            }
        }
        
        /**
         * 参照オブジェクトが配列の場合に、各要素を引数とする指定フィルタ関数を呼び出す
         *
         * filter関数でリターンしたオブジェクトを要素とする配列として返す。
         *
         * @method filter
         * @param cb {Function} コールバック関数
         * @param immediate {Boolean} trueの場合本関数呼び出し時点でデータがロードれていれば直ちにコールバックする
         *
         * <コールバック引数>
         * + __object__  Object    配列内要素
         * @return {Array} フィルタ関数がretuenした非indefinedオブジェクトを要素とする配列<br>
         * 本参照オブジェクトが配列を参照してなかった場合は、undefinedを返す。配列のサイズ。
         **/
        this.filter = function(cb) {
            var v = this.value();
            if ( Array.isArray(v) ) {
                var array = [];
                var l = v.length;
                for ( var i = 0 ; i < l ; i++ ) {
                    var r = cb(v[i]);
                    if ( !(r === undefined) )
                        array.push(r);
                }
                return array;
            }
            return undefined;
        }
        
        /**
         * データオブジェクトにディスプレイタイムに対するコンテンツ時間を決定するためのカストマイズロジックを登録する。<br/>
         * デフォルトではデータオブジェクトはDisplayTimeの直近の （指定 Basetimeにおける） Validtimeを選択する。<br/>
         * これ以外のロジックでコンテンツ時間を決定したい場合に、本関数によりカスタム処理を登録する。<br/>
         *
         * カスタムロジックは、引数の dataオブジェクトから現在のタイムリストを取得し、引数のcontentオブジェクトの bastime、valitdimeプロパティを設定する。
         *
         * @method validate
         * @param cb {Function} コールバック関数
         * @param result {Boolean} trueの場合、指定content属性によりレイヤーがレンダリングされる。falseの場合はレイヤーの表示内容がクリアされる。
         *
         * <コールバック引数>
         * + __displaytime__  {String}    ディスプレイタイム（YYYYMMDDThhmmss型）
         * + __data__  {WRAP.DH.Reference}    データオブジェクト
         * + __content__  {Object}    現在のコンテンツ属性
         * @return {Boolean} true：レイヤー更新、false：レイヤークリア<br>
         **/
        this.validate = function(cb) {
            this.validator = cb;
        }
        
        this._resolve = function(value, key) {
            var v;
            var bs = key.indexOf("[");
            var be = key.indexOf("]");
            if ( bs < 0 && be < 0 ) {
                v = value[key];
            }
            else if ( bs < 0 || be < 0 ) {
                WRAP.DH._error("Invalid reference key. \""+key+"\"");
            }
            else {
                var e = key.substring(0, bs);
                if ( (v = value[e]) ) {
                    var eq = key.indexOf("=");
                    if ( eq > bs ) {
                        if ( Array.isArray(v) ) {
                            var idx = key.substring(bs+1, eq);
                            var cnd = ket.substring(eq+1, be);
                            var l = v.length;
                            var i = 0;
                            while ( i < l ) {
                                if ( v[i][idx] == cnd )
                                   break;
                                i++;
                            }
                            v = (i < l)?v[i]:undefined;
                        }
                    }
                    else {
                        var idx = key.substring(bs+1, be);
                        v = v[idx];
                    }
                }
            }
            return v;
        }
                               
        this._contain = function(ref) {
            var l = this._path.length;
            for ( var i = 0 ; i < l ; i++ ) {
                if ( this._path[i] != ref._path[i] )
                    return false;
            }
            return true;
        }
        
        this._equal = function(ref) {
            var l = this._path.length;
            if ( l != ref._path.length )
                return false;
            for ( var i = 0 ; i < l ; i++ ) {
                if ( this._path[i] != ref._path[i] )
                    return false;
            }
            return true;
        }
        
        this._handler = function() {
            return this._data.handler;
        }
        
        this._nop = function() {}
    },
    
    // Name Space
    DataHandler: {},
    
    // Internal Objects
    _cache: function(max) {
        this.array = [];
        this.max = max;
        
        this.get = function(key) {
            for ( var i = 0 ; i < this.array.length ; i++ ) {
                if ( this.array[i].key == key ) {
                    var t = this.array[i];
                    this.array.splice(i,1);
                    this.array.unshift(t);
                    return t;
                }
            }
            return null;
        }
        
        this.set = function(key, data) {
            var r = this.get(key);
            if ( r ) {
                r.data = data;
                return;
            }
            this.array.unshift({key:key, data:data});
            if ( this.array.length >= this.max )
                this.array.pop();
        }
    },
    
    _get: function(url, desc, cb, err) {
        var self = this;
        var xhr = new XMLHttpRequest();
        if (xhr) {
            xhr.onreadystatechange = function() {
                if ( xhr.readyState === 4 ) {
                    if ( xhr.status === 200 || xhr.status === 0 ) {
                        cb(xhr.responseText);
                    }
                    else {
                        self._error(desc+" load error. ("+xhr.status+") ["+url+"]");
                        if ( err )
                            err();
                        else
                            cb(null);
                    }
                }
            };
            xhr.open("GET", url+"?t="+(new Date()).getTime(), true);
            xhr.send(null);
        }
    },
    
    _getJSON: function(url, desc, cb, err) {
        var self = this;
        this._get(url, desc, function(res) {
            var obj = null;
            try {
                obj = JSON.parse(res);
            }
            catch (e) {
                self._error(desc+" parse error. ["+url+"]");
            }
            if ( obj )
                cb(obj);
            else if ( err )
                err();
            else
                cb(null);
        }, err);
    },
                               
    _load: function(data) {
        if ( !data.handler )
            return;
        var rq;
        while ( (rq=data.load.shift()) ) {
            rq.ref.cb = rq.cb;
            data.handler.load(rq.ref,
                function(state, ref) {
                    if ( ref ) {
                        for ( var i = 0 ; i < data.inspect.length ; i++ ) {
                            var t = data.inspect[i];
                            if ( ref._contain(t.ref) || t.ref._contain(ref) )
                                t.cb(ref);
                        }
                        if ( ref.cb ) {
                            ref.cb(state, ref);
                            delete ref.cb;
                        }
                    }
                });
        }
    },
                               
    _padding: function(v, l) {
        if ( l == void 0 )
            l = 2;
        var t = "" + v;
        while ( t.length < l )
            t = "0" + t;
        return t;
    },

    _timeString: function(time, d, m, t) {
        var str = "";
        if ( arguments.length == 1 )
            d="",m="T",t="";
        if ( d == "" || d ) {
            str += time.getUTCFullYear()+d;
            str += this._padding(time.getUTCMonth()+1)+d;
            str += this._padding(time.getUTCDate());
        }
        if ( m )
            str += m;
        if ( t == "" || t ) {
            str += this._padding(time.getUTCHours())+t;
            str += this._padding(time.getUTCMinutes())+t;
            str += this._padding(time.getUTCSeconds());
        }
        return str;
    },

    _time: function(str) {
        str = str.replace(/ +/g,' ').replace(/:| |T|\//g,",");
        var t  = [0,0,0,0,0,0,-1];
        var m  = [4,2,2,2,2,2,-1];
        var k = 0, d = 0;
        for ( var i = 0 ; i < str.length && m[k] > 0 ; i++ ) {
            var c = str.charAt(i);
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
        return new Date(Date.UTC(t[0],t[1]-1,t[2],t[3],t[4],t[5]));
    },

    _currentTime: function() {
        return new Date;
    },
                               
    _setTime: function(time, sec) {
        return new Date(time.getTime()+sec*1000);
    },
                               
    _elapsed: function(from, to) {
        return parseInt((to.getTime()-from.getTime())/1000);
    },
                               
    _error: function(e) {
        console.warn((this.name||"Error")+":"+e);
    },
    
    _data: {},
                                             
    Test: {}
}


