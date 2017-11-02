/**
 * @namespace WRAP
 **/
var WRAP; if (typeof WRAP === 'undefined') WRAP = {};

/**
 * @class Geo
 * @static
 **/
WRAP.Geo = {
    
    version : "1.1",

    /**
     * 論理レイヤー（の重ね順）を登録する
     * @method setLayer
     * @param layers {Object} <br>
     {<br>
					interactive_layers : [{WRAP.GeoLayer}, ...],<br>
					plot_layers : [{WRAP.GeoLayer}, ...],<br>
					upper_layers : [{WRAP.GeoLayer}, ...],<br>
					lower_layers : [{WRAP.GeoLayer}, ...],<br>
     }<br>
     
     container.interactive_layers		ユーザーとのインタラクションを共なうコンテンツを描画するレイヤー
     container.plot_layers			インタラクションを共なわないコンテンツを描画するレイヤー
     container.upper_layers		ベースマップ（陸地）の上にオーバレイするイメージを描画するレイヤー
     container.lower_layers		ベースマップ（陸地）の下に描画するイメージを描画するレイヤー
     *
     *v1.0では、lower_layersおよび plot_layersは非対応
     * @return なし
     **/
    setLayer: function(container) {
        this.container = {
            interactive_layers:container.interactive_layers,
            plot_layers:container.plot_layers,
            upper_layers:container.upper_layers,
            lower_layers:container.lower_layers,
        };
        if ( !this.container.upper_layers )
            this.container.container.upper_layers = [];
        if ( this.container.plot_layers )
            this.container.upper_layers = this.container.upper_layers.concat(this.container.plot_layers)
        if ( this.container.interactive_layers )
            this.container.upper_layers = this.container.upper_layers.concat(this.container.interactive_layers)
    },
    
    /**
     * 指定緯度経度座標の現在のマップ上のスクリーン座標を返す
     * @method getScreenPoint
     * @param ps {WRAP.Geo.Point} <br>
     * @return {WRAP.Geo.ScreenPoint} スクリーン座標
     **/
    getScreenPoint: function(pt) {
        return this.map.getScreenPoint(pt);
    },
    
    /**
     * 現在のマップの指定スクリーン座標の緯度経度を返す
     * @method getPoint
     * @param pt {WRAP.Geo.ScreenPoint} <br>
     * @return {WRAP.Geo.Point} 緯度経度座標
     **/
    getPoint: function(pt) {
        return this.map.getPoint(pt);
    },
    
    /**
     * 現在のマップの中心座標を返す
     * @method getCenterPoint
     * @param なし
     * @return {WRAP.Geo.Point}				point マップ中心の緯度経度座標
     **/
    getCenterPoint: function() {
        return this.map.getCenterPoint();
    },
    
    /**
     * 現在のマップの中心座標を指定緯度経度にする
     * @method setCenterPoint
     * @param {WRAP.Geo.Point} point マップ中心の緯度経度座標
     * @return なし
     **/
    setCenterPoint: function(pt) {
        this.map.setCenterPoint(pt);
    },
    
    /**
     * 現在のマップのズームを取得する
     * @method getZoom
     * @param なし
     * @return {Integer} zoom ズームID
     **/
    getZoom: function() {
        return this.map.getZoom();
    },
    
    /**
     * 現在のマップのズームを設定する
     * @method setZoom
     * @param {Integer} zoom ズームID
     * @return なし
     **/
    setZoom: function(zoom) {
        this.map.setZoom(zoom);
    },
    
    /**
     * 現在のマップサイズから上下左右の指定マージンを差し引いた領域に、
     * 指定した座標（配列）の全てを表示できる画角情報（中心座標およびズーム）を返す
     * @method getPerspective
     * @param {Array} points [{WRAP.Geo.Point}, ...] 緯度経度オブジェクトの配列
     * @param {Integer} margin マージン
     *
     * @return {Object}
     * ```
     *     {
     *          center：{WRAP.Geo.GeoPoint},		中心座標
	 *          zoom：{Integer}					ズームID
     *     }
     * ```
     **/
    getPerspective: function(pts, margin) {
        return this.map.getPerspective(pts, margin);
    },
    
    /**
     * 指定した２点間の距離（m）を返す
     * @method getDistance
     * @param {WRAP.Geo.Point} p0 地点1
     * @param {WRAP.Geo.Point} p1 地点2
     * @return {Number} 距離（m）
     **/
    getDistance: function(p0, p1) {
        if ( this.map && this.map.getDistance )
            return this.map.getDistance(p0, p1);
        return distance(p0.lonDegree(), p0.latDegree(), p1.lonDegree(), p1.latDegree());
    },
    
    /**
     * イベントハンドラを登録する
     * @method addEventHandler
     * @param {String} name イベント名
     * + ”mouseover” マウスが描画要素に重なる
     * + ”mouseout” マウスが描画要素から出る
     * + ”touch” 描画要素をクリック（タップ）する
     * + ”boundsChange” マップ画角が変化
     * + ”visibilityChange” レイヤーの可視状態が変化
     * @param {Function} function イベント発火時に呼び出されるコールバック関数<br>
     * コールバックの引数 (layer, reference, screen_point)
     * mouseover, mouseout, touchの場合
     * + {WRAP.Geo.Layer}		layer           イベントが発火したレイヤー
     * + {WRAP.DH.Reference}	reference       イベントが発火したオブジェクト参照
     * + {WRAP.Geo.ScreenPoint}	screen_point	イベント発火スクリーン座標
     * boundsChangeの場合
     * + {WRAP.Geo.Bounds}		bounds          画面表示しているマップ範囲
     * visibilityChangeの場合
     * + {WRAP.Geo.Layer}		layer           可視状態が変化したレイヤー
     * @return なし
     **/
    addEventHandler: function(name, cb) {
        var event = this.Interaction[name];
        if ( event )
            event.push(cb);
    },
    
    /**
     * イベントハンドラを削除する
     * @method removeEventHandler
     * @param {String} name イベント名
     * @param {Function} function 登録した関数
     * @return なし
     **/
    removeEventHandler: function(name, cb) {
        var event = this.Interaction[name];
        if ( event ) {
            var index = event.indexOf(cb);
            if ( index >= 0 )
                event.splice(index,1);
        }
    },

    /**
     * マップシステムを切り替える
     * @method switchMap
     * @param {Object} map GoogleMapsまたは OpenLayersの Mapオブジェクト
     * @return なし
     **/
    switchMap: function(map) {
        var zoom, center;
        if ( WRAP.Geo.map ) {
            zoom = WRAP.Geo.map.getZoom();
            center = WRAP.Geo.map.getCenterPoint();
        }
        if ( WRAP.Geo.map.context )
            map.context.revision = WRAP.Geo.map.context.revision;
        map.context.revision++;
        WRAP.Geo.map = map;
        if ( zoom && center ) {
            WRAP.Geo.map.setZoom(zoom);
            WRAP.Geo.map.setCenterPoint(center);
        }
        setTimeout(function() {
            map.update(true);
            WRAP.Geo.invalidate();
        }, 1000 );
    },
    
    /**
     * マウス・インタラクションの初期化を行う
     * @method setInteraction
     * @param {html div} div Mapを表示している HTML　div要素オブジェクト
     * @param {Object} livecamera ライブカメラ機能を利用する場合は、WRAP.DH.addObjectで登録したライブカメラデータオブジェクト
     *　　　　　　　　　　　　　　　　　仕様しない場合は指定しない
     * @return なし
     **/
    setInteraction: function(div, livecamera) {
        var self = this;
        WRAP.Geo.Interaction.init(livecamera, div);
        self.lastHit = null;
        self.lastClick = null;
        self.lastX = 0;
        self.lastY = 0;
        
        div.addEventListener('mousemove', function(evt) {
            if (evt._prevent )
                return;
            var r = div.getBoundingClientRect();
            var x = evt.clientX-r.left, y = evt.clientY-r.top;
                       
            self.lastX = x;
            self.lastY = y;
            var dragging = evt.which;
            if ( !dragging ) {
                if ( self.lastClick ) {
                    WRAP.Geo.enableScroll(true);
                    self.lastClick = null;
                }
            }
            else if ( self.lastClick ) {
                if ( self.lastClick.feature.draggable ) {
                    self.lastClick.feature.drag(x, y);
                    self.invalidate();
                    return;
                }
            }
                             
            var hit = self.hit(new WRAP.Geo.ScreenPoint(x, y));
            if ( !self.lastHit || hit.feature != self.lastHit.feature ) {
                if ( hit.feature && hit.feature.draggable ) {
                    WRAP.Geo.enableScroll(false);
                }
                             
                if ( self.lastHit && self.lastHit.feature && self.lastHit.feature.mouseout )
                    self.lastHit.feature.mouseout();
                if ( hit.feature && hit.feature.mouseover )
                    hit.feature.mouseover();
                self.lastHit = hit;
                if ( self.lastHit.feature ) {
                    var layer = self.lastHit.layer;
                    var feature = self.lastHit.feature;
                    if ( layer._tooltip_handler ) {
                        var text = layer._tooltip_handler(feature.geo, feature.data);
                        if ( text ) {
                            WRAP.Geo.currentFeature = feature;
                            WRAP.Geo.Interaction.setTooltip(text);
                            WRAP.Geo.Interaction.showTooltip(self.lastHit.x,self.lastHit.y);
                        }
                        else {
                            WRAP.Geo.currentFeature = null;
                            WRAP.Geo.Interaction.clearTooltip();
                        }
                    }
                    //console.log("hit");
                }
                else {
                    WRAP.Geo.enableScroll(true);
                    WRAP.Geo.currentFeature = null;
                    WRAP.Geo.Interaction.clearTooltip();
                    //console.log("no hit");
                }
            }
        });
        
        var click_x, click_y;
        div.addEventListener('mousedown', function(evt) {
            click_x = evt.clientX;
            click_y = evt.clientY;
            var r = div.getBoundingClientRect();
            var x = evt.clientX-r.left, y = evt.clientY-r.top;
            var hit = self.hit(new WRAP.Geo.ScreenPoint(x, y));
            if ( hit && hit.feature ) {
                self.lastClick = hit;
                if ( self.lastClick.feature.draggable )
                    self.lastClick.feature.dragStart(x, y);
                             
                if ( hit.feature.touch )
                    hit.feature.touch();
            }
        });
        
        div.addEventListener('mouseup', function(evt) {
            if ( self.lastClick ) {
                if ( self.lastClick.feature.draggable ) {
                    self.lastClick.feature.dragEnd();
                }
                WRAP.Geo.enableScroll(true);
                self.lastClick = null;
            }
            else {
                if ( click_x == evt.clientX && click_y == evt.clientY ) {
                    var r = evt.target.getBoundingClientRect();
                    var x = evt.clientX-r.left, y = evt.clientY-r.top;
                    var handler = WRAP.Geo.Interaction.touch;
                    var sp = new WRAP.Geo.ScreenPoint(x,y);
                    for ( var i = 0 ; i < handler.length ; i++ )
                        handler[i](null, null, sp);
                }
            }
        });
        
    },
    
    /**
     * 現在のツールチップの表示状態を返す
     * @method currentTooltip
     * @param なし
     *
     * @return {Object}
     *
     * ツールチップ表示状態の場合
     *
     * ```
     *     {
     *          geo：{GeoJSON.Feature},     ツールチップ表示対象となる GeoJSONの Featureオブジェクト
     *          data：{Object},             GeoJSONにデータJSONが結びついている場合は、該当のデータオブジェクト
     *          conent：{String}	            Layer.setTooltipで設定したツールチップ内容テキスト
     *     }
     * ```
     *
     * ツールチップ非表示状態の場合
     *
     * null
     **/
    currentTooltip: function() {
        var content = WRAP.Geo.Interaction.getTooltip();
        if ( content && WRAP.Geo.currentFeature ) {
            return {
                geo:WRAP.Geo.currentFeature.geo,
                data:WRAP.Geo.currentFeature.data,
                content:content
            }
        }
    },
    
    /**
     * マップ上の緯度経度座標を表現するクラス
     *
     * @class Geo.Point
     * @constructor
     * @param {Number} lat 緯度（分）
     * @param {Number} lon 経度（分）
     */
    Point: function(lat, lon) {
        
        /**
         * 緯度（分）
         * @property lat
         * @type {Number} 緯度（分）
         **/
        
        /**
         * 経度（分）
         * @property lon
         * @type {Number} 経度（分）
         **/
        
        /**
         * 緯度経度を（分）で設定する
         * @method setDegree
         * @param {Number} lat 緯度（分）
         * @param {Number} lon 経度（分）
         * @return なし
         **/
        this.set = function(lat, lon) {
            this.lat = parseFloat(lat);
            this.lon = parseFloat(lon);
            if ( this.lon < -10800 )
                this.lon += 21600;
            else if ( this.lon >= 10800 )
                this.lon -= 21600;
        }
        
        /**
         * 緯度経度を（度）で設定する
         * @method setDegree
         * @param {Number} lat 緯度（度）
         * @param {Number} lon 経度（度）
         * @return なし
         **/
        this.setDegree = function(lat, lon) {
            set(parseFloat(lat)*60.0. parseFloat(lon)*60.0);
        }
        
        /**
         * 緯度を（度）で取得する
         * @method latDegree
         * @param なし
         * @return {Number} 緯度（度）
         **/
        this.latDegree = function() {
            return this.lat/60.0;
        }

        /**
         * 経度を（度）で取得する
         * @method lonDegree
         * @param なし
         * @return {Number} 経度（度）
         **/
        this.lonDegree = function() {
            return this.lon/60.0;
        }
        
        this.set(lat, lon);
    },

    /**
     * マップ上の緯度経度領域を表現するクラス
     *
     * @class Geo.Bounds
     * @constructor
     * @param {Number} n 北限緯度（分）
     * @param {Number} s 南限緯度（分）
     * @param {Number} e 東限経度（分）
     * @param {Number} w 西限経度（分）
     */
    Bounds: function(n,s,e,w) {
        /**
         * 指定座標が Boundsに含まれるかどうかを判定する
         * @method contains
         * @param {WRAP.Geo.Point} point　座標
         * @return {Boolean} 含まれる場合は true、含まれない場合は false
         **/
        this.contains = function(point) {
            if ( point.lat > this.north || point.lat < this.south )
                return false;
            if ( this.west < this.east ) {
                if ( point.lon > this.east || point.lon < this.west )
                    return false;
            }
            else {
                if ( point.lon > this.east && point.lon < this.west )
                    return false;
            }
            return true;
        }
        /**
         * @property north
         * @type {Number} 北限緯度（分）
         **/
        this.north = n;
        /**
         * @property south
         * @type {Number} 南限緯度（分）
         **/
        this.south = s;
        /**
         * @property east
         * @type {Number} 東限経度（分）
         **/
        this.east = e;
        /**
         * @property west
         * @type {Number} 西限経度（分）
         **/
        this.west = w;
    },
    
    /**
     * マップ上のスクリーン座標を表現するクラス
     * @class Geo.ScreenPoint
     * @constructor
     * @param {Number} x x座標
     * @param {Number} y y座標
     */
    ScreenPoint: function(x, y) {
        this.x = x;
        this.y = y;
    },
    

    /**
     * マップ上のスクリーン座標範囲を表現するクラス
     * @class Geo.ScreenBounds
     * @constructor
     * @param {Number} x x座標
     * @param {Number} y y座標
     * @param {Number} width 幅
     * @param {Number} height 高さ
     */
    ScreenBounds: function(x, y, width, height) {
        /**
         * @property x
         * @type {Number} x座標
         **/
        this.x = x;
        /**
         * @property y
         * @type {Number} y座標
         **/
        this.y = y;
        /**
         * @property width
         * @type {Number} 幅
         **/
        this.width = width;
        /**
         * @property height
         * @type {Number} 高さ
         **/
        this.height = height;
    },
    
    /**
     * 論理レイヤークラス
     * @class Geo.Layer
     * @constructor
     * @param {String} name  レイヤー名称
     */
    Layer: function(name) {
        var self = this;
        this._name = name;
        this._visible = true;
        this._style = null;
        this._content = null;
        this._attr = null;
        this._data = null;
        this._conf = null;
        this._dl = [];
        this._revision = { data:0, conf:0, context:0, content:0, style:0 };
        
        /**
         * レイヤーにデータとレイヤーコンフィグをアタッチし、レンダラがレイヤー内にインスタンス化される
         * レンダラは設定されたデータを監視しデータ更新に応じて描画を更新する
         * @method configure
         * @param {WRAP.DH.Referecne} data 描画対象データの参照
         * @param {Object} conf レイヤーコンフィグ・データ
         * @return なし
         **/
        this.configure = function(data, conf) {
            this._data = data;
            this._conf = conf;
            this._revision.conf++;
            
            var name = conf.Renderer;
            if ( name && WRAP.Geo.Renderer[name] ) {
                this._renderer = new WRAP.Geo.Renderer[name]();
            }
            else {
                self._error("Implementation WRAP.Geo.Renderer."+name+" not found.");
            }
            
            if ( this._data ) {
                this._data.inspect(function() {
                    self._revision.data++;
                    self.render();
                }, true);
            }
            else {
                self.render();
            }
        }
        
        /**
         * レイヤーを表示する
         * @method show
         * @param なし
         * @return なし
         **/
        this.show = function() {
            this.setVisible(true);
        }
        
        /**
         * レイヤーを非表示にする
         * @method hide
         * @param なし
         * @return なし
         **/
        this.hide = function() {
            this.setVisible(false);
        }
        
        /**
         * レイヤーの表示状態を返す
         * @method visible
         * @param なし
         * @return {Boolean} true:表示、false：非表示
         **/
        this.visible = function() {
            return this._visible;
        }
        
        /**
         * レイヤーの表示状態を設定する
         * @method setVisible
         * @param {Boolean} true:表示、false：非表示
         * @return なし
         **/
        this.setVisible = function(flag) {
            if ( this._visible == flag )
                return;
            this._visible = flag;
            
            var handler = WRAP.Geo.Interaction.visibilityChange;
            if ( handler ) {
                for ( var i = 0 ; i < handler.length ; i++ )
                    handler[i](this);
            }
            this.render();
            WRAP.Geo.invalidate();
        }
        
        /**
         * レイヤーに描画要素オブジェクト（Feature）を登録する
         * @method addFeature
         * @param {WRAP.Geo.Feature} feature 描画要素オブジェクト
         * @return なし
         **/
        this.addFeature = function(feature) {
            feature.layer = this;
            this._dl.push(feature);
        }
        
        /**
         * レイヤーから描画要素オブジェクト（Feature）を削除する
         * @method removeFeature
         * @param {WRAP.Geo.Feature} feature 描画要素オブジェクト
         * @return なし
         **/
        this.removeFeature = function(feature) {
            var index = this._dl.indexOf(feature);
            if ( index >= 0 )
                this._dl.splice(index, 1);
        }
        
        /**
         * レイヤーから描画内容（全ての描画要素）を削除する
         * @method clear
         * @param なし
         * @return なし
         **/
        this.clear = function() {
            this._dl = [];
            WRAP.Geo.invalidate();
        }
        
        /**
         * レイヤーに表示するコンテンツキーを設定する
         * コンテンツキーはデータ内部の可変属性を確定させるための（basetime、validtime、element、level...）などのキーで、構成・内容はデータに依存する
         * @method set
         * @param {Object} object 形式はデータに依存<br>
         *      例）<br>
         *      {
         *          basetime：{String}，
         *          validtime：{String}
         *      }
         *
         * @return なし
         **/
        this.set = function(content) {
            var c = JSON.parse(JSON.stringify(content));
            if ( this._timeController && this._data ) {
                if ( !this._timeController.validate(this, c) ) {
                    this._content = c;
                    self.clear();
                    return;
                }
            }
            if ( JSON.stringify(this._content) == JSON.stringify(c) )
                return;
            this._content = c;
            self._revision.content++;
            self.render();
        }
        
        /**
         * レイヤーに 現在 setされているコンテンツキー取得する。
         * 属性キーの構成・内容はデータに依存する（Basetime、Validtimeなど）
         * @method get
         * @param なし
         *
         * @return {Object} object 形式はデータに依存<br>
         *      例）<br>
         *      {
         *          basetime：{String}，
         *          validtime：{String}
         *      }
         **/
        this.get = function() {
            return this._content;
        }
        
        /**
         * レイヤーにアタッチしたレイヤーコンフィグの Attributes部分を指定オブジェクトでオーバーライドする
         *
         * レイヤーコンフィグとして共通のテンプレートを用いて内部の一部属性のみを変更する場合などに用いる
         * @method setAttributes
         * @param {Object} attr Attributes設定（内容は個々のレイヤーレンダラのConfig仕様に依存）
         * @return なし
         **/
        this.setAttributes = function(attr) {
            if ( this._content && attr &&
                JSON.stringify(this._content) == JSON.stringify(attr) )
                return;
            self._revision.conf++;
            this._attr = attr;
            this.render();
        }
        
        /**
         * レイヤー名称を返す
         * @method name
         * @param なし
         * @return {String} レイヤー名称
         **/
        this.name = function() {
            return this._name;
        }
        
        /**
         * レイヤーのスタイルを設定する
         * @method setStyle
         * @param {String} style スタイル名
         * @return なし
         **/
        this.setStyle = function(style) {
            if ( this._style == style )
                return;
            self._revision.style++;
            this._style = style;
            this.render();
        }
        
        /**
         * レイヤーにツールチップハンドラを設定する
         * @method setToolTip
         * @param {Function} handler ツールチップコンテンツ生成ハンドラ
         * コールバックの引数 (data)
         * + {WRAP.DH.Reference}	data	イベントが発火したオブジェクト参照
         * @return なし
         **/
        this.setTooltip = function(handler) {
            this._tooltip_handler = handler;
        }
        
        /**
         * レイヤーを再描画する
         * @method invalidate
         * @param なし
         * @return なし
         **/
        this.invalidate = function() {
            this._revision.data++;
            this.render();
        }
        
        this._currentConfiguration = function() {
            
            function copy(t, c) {
                for ( var key in c ) {
                    if ( Array.isArray(c[key]) )
                        t[key] = c[key];
                    else if ( typeof c[key] == "object" )
                        copy((t[key] = {}), c[key]);
                    else
                        t[key] = c[key];
                }
            }
            
            function override(t, c) {
                if ( !c )
                    return;
                for ( var key in c ) {
                    if ( typeof c[key] == "object" && t[key] )
                        override(t[key], c[key]);
                    else
                        t[key] = c[key];
                }
            }
            
            var conf = {};
            copy(conf, this._conf);
            if ( !conf.Attributes )
                conf.Attributes = {};
            override(conf.Attributes, this._attr);
            return conf;
        }
        
        this.render = function() {
            if ( this._visible && this._renderer && this._renderer.draw ) {
                var content = this._content;
                var conf = this._currentConfiguration();
                var context = WRAP.Geo.map.context;
                var style = this._style;
                var data = this._data;
                var revision = this._revision;
                var dl = this._dl;
                revision.context = context.revision;
                this._renderer.draw(this, content, conf, context, style, data, revision, dl);
            }
        }
        
        this.setTimeController = function(controller) {
            this._timeController = controller;
        }
        
        this._error = function(e) {
            console.warn(this.name()+":"+e);
        }

    },
    
    Feature: {
        /**
         * ポイント描画要素クラス
         * @class Geo.Feature.Point
         * @constructor
         * @param {Object} style スタイル
         *
         * ```
         *     {
         *          point:[lon, lat],                   単位は度
         *          pointSize:{Number}                  ポイントサイズ
         *          lineWidth:{Number}                  ポイントの外周線のサイズ
         *          strokeStyle:{String}                ポイントの外周線の色　例）rgba(255,255,255,0.5)
         *          fillStyle:{String}                  ポイントの色　例）rgba(255,0,0,1.0)
         *     }
         * ```
         **/
        Point: function(style) {
            this.draw = function(context) {
                context.drawPoint(style.point, style.pointSize, style.lineWidth, style.strokeStyle, style.fillStyle);
            }
            this.hit = function(x, y) {
                var s = style.pointSize;
                var p = WRAP.Geo.getScreenPoint(new WRAP.Geo.Point(style.point[1]*60, style.point[0]*60));
                var sx = p.x-s/2;
                var ex = sx+s;
                if ( x < sx || ex < x )
                    return null;
                var sy = p.y-s/2;
                var ey = sy+s;
                if ( y < sy || ey < y )
                    return null;
                return { x:p.x, y:p.y };
            }
            this.setDraggable = function(draggable, cb) {
                this.draggable = draggable;
                this.dragHandler = cb;
            }
            this.style = function() { return style };
            
            this.mouseover = function() {
                var handler = WRAP.Geo.Interaction.mouseover;
                var sp = WRAP.Geo.getScreenPoint(new WRAP.Geo.Point(style.point[1]*60, style.point[0]*60));
                for ( var i = 0 ; i < handler.length ; i++ )
                    handler[i](this.layer, this, sp);
            }
            this.mouseout = function() {
                var handler = WRAP.Geo.Interaction.mouseout;
                var sp = WRAP.Geo.getScreenPoint(new WRAP.Geo.Point(style.point[1]*60, style.point[0]*60));
                for ( var i = 0 ; i < handler.length ; i++ )
                    handler[i](this.layer, this, sp);
            }
            this.touch = function() {
                var handler = WRAP.Geo.Interaction.touch;
                var sp = WRAP.Geo.getScreenPoint(new WRAP.Geo.Point(style.point[1]*60, style.point[0]*60));
                for ( var i = 0 ; i < handler.length ; i++ )
                    handler[i](this.layer, this, sp);
            }
            
            this.dragStart = function(x, y) {
                var p = WRAP.Geo.getScreenPoint(new WRAP.Geo.Point(style.point[1]*60, style.point[0]*60));
                this.anchor = {
                    lon:style.point[0],
                    lat:style.point[1],
                    ox:x,
                    oy:y,
                    x:p.x,
                    y:p.y
                }
            }
            this.drag = function(x, y) {
                if ( !this.anchor )
                    return;
                var pos = WRAP.Geo.getPoint(new WRAP.Geo.ScreenPoint(this.anchor.x+(x-this.anchor.ox), this.anchor.y+(y-this.anchor.oy)));
                style.point[0] = pos.lonDegree();
                style.point[1] = pos.latDegree();
                if ( this.dragHandler )
                    this.dragHandler(this, style.point);
            }
            this.dragEnd = function() {
                this.anchor = null;
            }
        },
        
        /**
         * テキスト描画要素クラス
         * @class Geo.Feature.Text
         * @constructor
         * @param {Object} style スタイル
         *
         * ```
         *     {
         *          point:[lon, lat],                   単位は度
         *          text:{String}                       文字列
         *          fontSize:{Number}                   フォントサイズ（ピクセル）
         *          fillStyle:{String}                  色　例）rgba(255,0,0,1.0)
         *          offsetX:{Number}                　　 テキストの表示オフセットX（ピクセル）
         *          offsetY:{Number}                　　 テキストの表示オフセットY（ピクセル）
         *          align:{String}                      文字列の水平方向アライン 'center' または 'right' または 'left'
         *     }
         * ```
         *
         **/
        Text: function(style) {
            this.draw = function(context) {
                context.drawText(style.point, style.text, style.fontSize, style.fillStyle,
                                 style.offsetX, style.offsetY, style.align);
            }
            this.hit = function(/*x, y*/) {
                return null;
            }
            this.style = function() { return style };
        },
        
        /**
         * Line描画要素クラス
         * 指定座標を基準としたピクセル座標のライン、ポリゴンの描画
         * @class Geo.Feature.Line
         * @constructor
         * @param {Object} style スタイル
         *
         * ```
         *     {
         *          point:[lon, lat],                   基準座標。単位は度
         *          line:[[x0, y0], [x1, y1], ...],     ピクセル座標配列
         *          　　　　　　　　　　　　　　　　　　　　　 または、ピクセル座標配列の配列でもよい[[[x0, y0], [x1, y1]], [[x2, y2], [x3, y3]]]
         *          lineWidth:{Number}                  line幅
         *          strokeStyle:{String}                lineの色　例）rgba(255,255,255,0.5)
         *          fillStyle:{String}                  塗りつぶし色　例）rgba(255,0,0,1.0)
         *          fillImage:{String}                  塗りつぶしパターンのImageファイルURL（画像サイズは縦横とも 2のn乗である必要があります）
         *     }
         * ```
         *
         **/
        Line: function(style) {
            this.draw = function(context) {
                context.drawLine(style.point, style.line, style.lineWidth, style.strokeStyle,
                                 style.fillStyle, style.fillImage);
            }
            this.hit = function(/*x, y*/) {
                return null;
            }
            this.style = function() { return style };
        },
        
        /**
         * イメージ（アイコン）描画要素クラス
         * @class Geo.Feature.Image
         * @constructor
         * @param {Object} style スタイル
         *
         * ```
         *     {
         *          point:[lon, lat],                   単位は度
         *          image:{String}                      イメージファイルのURL
         *          width:{Number}                      イメージの横表示サイズ
         *          height:{Number}                     イメージの縦表示サイズ
         *          offsetX:{Number}                    イメージの横表示オフセット
         *          offsetY:{Number}                    イメージの縦表示オフセット
         *          rotation:{Number}                   イメージの回転角度（単位：度）
         *     }
         * ```
         *
         **/
        Image: function(style) {
            this.draw = function(context) {
                if ( style.image.data ) {
                    context.drawImageData(style.point, style.image, style.width, style.height,
                                      style.offsetX, style.offsetY, style.rotation);
                }
                else {
                    context.drawImage(style.point, style.image, style.width, style.height,
                                      style.offsetX, style.offsetY, style.rotation);
                }
            }
            this.hit = function(x, y) {
                var w = style.width;
                var h = style.height;
                var p = WRAP.Geo.getScreenPoint(new WRAP.Geo.Point(style.point[1]*60, style.point[0]*60));
                var sx = p.x-w/2;
                var ex = sx+w;
                if ( x < sx || ex < x )
                    return null;
                var sy = p.y-h/2;
                var ey = sy+h;
                if ( y < sy || ey < y )
                    return null;
                return { x:p.x, y:p.y };
            }
            this.style = function() { return style };
            
            this.mouseover = function() {
                var handler = WRAP.Geo.Interaction.mouseover;
                var sp = WRAP.Geo.getScreenPoint(new WRAP.Geo.Point(style.point[1]*60, style.point[0]*60));
                for ( var i = 0 ; i < handler.length ; i++ )
                    handler[i](this.layer, this, sp);
            }
            this.mouseout = function() {
                var handler = WRAP.Geo.Interaction.mouseout;
                var sp = WRAP.Geo.getScreenPoint(new WRAP.Geo.Point(style.point[1]*60, style.point[0]*60));
                for ( var i = 0 ; i < handler.length ; i++ )
                    handler[i](this.layer, this, sp);
            }
            this.touch = function() {
                var handler = WRAP.Geo.Interaction.touch;
                var sp = WRAP.Geo.getScreenPoint(new WRAP.Geo.Point(style.point[1]*60, style.point[0]*60));
                for ( var i = 0 ; i < handler.length ; i++ )
                    handler[i](this.layer, this, sp);
            }
            
            this.set = function(layer, ref) {
                this.layer = layer;
                this.reference = ref;
                this.mouseover = function() {
                    var handler = WRAP.Geo.Interaction.mouseover;
                    var sp = WRAP.Geo.getScreenPoint(new WRAP.Geo.Point(style.point[1]*60, style.point[0]*60));
                    for ( var i = 0 ; i < handler.length ; i++ )
                        handler[i](this.layer, this.reference, sp);
                }
                this.mouseout = function() {
                    var handler = WRAP.Geo.Interaction.mouseout;
                    var sp = WRAP.Geo.getScreenPoint(new WRAP.Geo.Point(style.point[1]*60, style.point[0]*60));
                    for ( var i = 0 ; i < handler.length ; i++ )
                        handler[i](this.layer, this.reference, sp);
                }
                this.touch = function() {
                    var handler = WRAP.Geo.Interaction.touch;
                    var sp = WRAP.Geo.getScreenPoint(new WRAP.Geo.Point(style.point[1]*60, style.point[0]*60));
                    for ( var i = 0 ; i < handler.length ; i++ )
                        handler[i](this.layer, this.reference, sp);
                }
            }
        },
        
        /**
         * GeoLine描画要素クラス
         * 緯度経度座標のライン、ポリゴンの描画
         * @class Geo.Feature.GeoLine
         * @constructor
         * @param {Object} style スタイル
         *
         * ```
         *     {
         *          path:[[lat0, lon0], [lat1, lon1], ...],     座標配列
         *          　　　　　　　　　　　　　　　　　　　　　 または、座標配列の配列でもよい[[[lon00, lat00], [lon01, lat02], ...],
         *                                                                        [[lon10, lat10], [lon11, lat12], ...]]
         *          lineWidth:{Number}                  line幅
         *          strokeStyle:{String}                lineの色　例）rgba(255,255,255,0.5)
         *          fillStyle:{String}                  塗りつぶし色　例）rgba(255,0,0,1.0)
         *          fillImage:{String}                  塗りつぶしパターンのImageファイルURL（画像サイズは縦横とも 2のn乗である必要があります）
         *     }
         * ```
         *
         **/
        GeoLine: function(style) {
            this.draw = function(context) {
                context.drawPath(style.path, style.lineWidth, style.strokeStyle, style.fillStyle, style.fillImage);
            }
            this.hit = function(/*x, y*/) {
                return null;
            }
            this.style = function() { return style };
        },
        
        
        /**
         * GeoArc描画要素クラス
         * 指定座標に指定距離の円弧を描く
         * @class Geo.Feature.GeoArc
         * @constructor
         * @param {Object} style スタイル
         *
         * ```
         *     {
         *          point:[lon, lat],                   単位は度
         *          radius:{Number}                     半径（m）
         *          start:{Number}                      開始角度（度）
         *          end:{Number}                        終了角度（度）
         *          lineWidth:{Number}                  line幅
         *          strokeStyle:{String}                lineの色　例）rgba(255,255,255,0.5)
         *          fillStyle:{String}                  塗りつぶし色　例）rgba(255,0,0,1.0)
         *          fillImage:{String}                  塗りつぶしパターンのImageファイルURL（画像サイズは縦横とも 2のn乗である必要があります）
         *     }
         * ```
         *
         **/
        GeoArc: function(style) {
            this.draw = function(context) {
                context.drawArc(style.point, style.radius, style.start, style.end,
                                style.lineWidth, style.strokeStyle, style.fillStyle, style.fillImage);
            }
            this.hit = function(/*x, y*/) {
                return null;
            }
            this.style = function() { return style };
        },
        
        Tile: function(style) {
            this.draw = function(context) {
                context.drawTile(style.tile, style.imageData);
            }
            this.hit = function(/*x, y*/) {
                return null;
            }
            this.style = function() { return style };
        }
    },
    
    
    /**
     * アニメーションを管理するアニメーションコントローラクラス
     * セットアップ内容に従い、Layerの時間属性キーを切り替えアメーションを行う。
     *
     * アニメーションの処理フロー
     *
     * ・アニメーションコントローラクラスをインスタンス化
     *
     *          animation = new WRAP.Geo.Animation;
     *
     *
     * ・アニメーションの時間レンジを登録
     *
     *          時間配列、インターバール時間を登録
     *          animation.setTimeRange(
	 * 				[{validtime:20160701T000000}, {validtime:20160701T120000}, ...],
	 * 				1.0
     *          );
     *
     * @class Geo.Animation
     * @constructor
     * @param なし
     **/
    Animation: function() {
        
        /**
         * アニメーションの各フレームの属性キー配列とアニメーションフレームのインターバル時間を設定する
         * 属性キーは basetime、validtimeなどを含む WRAP.Geo.Later.set関数で指定する属性オブジェクトと同等のもので
         * 具体的な形式はデータに依存し各データの論理構造定義で定められる
         *
         *          属性キーの例）
         *          {
         *              basetime：{String},
         *              validtime：{String}
         *          }
         *
         * @method setTimeRange
         * @param {Array} time_list [{Object}, ...] フレームの属性キー配列
         * @param {Number} interval アニメーション・インターバル時間
         * @return なし
         **/
        this.setTimeRange = function(time_array, interval) {
            this._frame = time_array;
            this._interval = parseFloat(interval);
            this._last_time = 0;
            this._next_time = 0;
            this._current = -1;
            this._time = 0;
            
            this._setFrame(0);
            this._running = null;
            this._cb = null;
        }
        
        /**
         * アニメーションの各フレームのvalidtimeの範囲とアニメーションフレームのインターバル時間を設定する
         * @method setValidTimeRange
         * @param {String} start_time アニメーション開始フレームの Validtime
         * @param {String} end_time アニメーション終了フレームの Validtime
         * @param {Integer} step アニメーション各フレームの Validtimeの間隔（秒で指定）
         * @param {Number} interval アニメーション・インターバル時間（秒で指定）
         * @return 設定された Validtimeのリスト
         *          [
         *          　　{
         *             　　 validtime：{String}
         *          　　}, ...
         *          ]
         **/
        this.setValidTimeRange = function(start_time, end_time, step, interval) {
            var time_array = [{validtime:start_time}];
            var st = WRAP.DH._time(start_time);
            var et = WRAP.DH._time(end_time);
            var ct = WRAP.DH._setTime(st, step);
            while ( ct < et ) {
                time_array.push({validtime:WRAP.DH._timeString(ct)});
                ct = WRAP.DH._setTime(ct, step);
            }
            if ( st < et )
                time_array.push({validtime:end_time});
            
            this._frame = time_array;
            this._interval = parseFloat(interval);
            this._last_time = 0;
            this._next_time = 0;
            this._current = -1;
            this._time = 0;
            
            this._setFrame(0);
            this._running = null;
            this._cb = null;
            return time_array;
        }
        
        /**
         * アニメーションコントローラにレイヤーを結びつける
         *
         * フレームの属性キーを共有できる複数のレイヤーを一つのアニメーションコントローラに登録することができる
         *
         * @method setLayer
         * @param {Array} layer_list [{WRAP.Gei.Layer}, ...] レイヤー配列
         * @return なし
         **/
        this.setLayer = function(layer_array) {
            this._layer = layer_array;
        }

        /**
         * アニメーションコントローラにタイムコントローラを結びつける
         *
         * @method setTimeController
         * @param {WRAP.Geo.TimeController} controller タイムコントローラ
         * @return なし
         **/
        this.setTimeController = function(controller) {
            this._controller = controller;
        }
        
        /**
         * 現在の表示フレームを指定した時間に合わせる
         * @method setTime
         * @param {Object} key 属性キー(時間構造に対応した形式)
         *
         *     {
         *          basetime:"20160831T000000",
         *          valietime:"20160831T120000"
         *     }
         * @return {}
         **/
        this.setTime = function(time) {
            this._running = false;
            var index = 0;
            while ( index < this._frame.length ) {
                if ( !time.basetime || time.basetime == this._frame[index].basetime )
                    if ( time.validtime <= this._frame[index].validtime )
                        break;
                index++;
            }
            //console.log("setTime index="+index);
            this._setFrame(index);
        }

        /**
         * アニメーションを開始する
         * フレームが変わる毎に指定した関数がコールバックされる
         * @method start
         * @param {Function} function フレーム変化時に呼び出されるコールバック関数
         *
         * コールバックの引数
         * + {Object} time（時間）属性キー
         * @return なし
         **/
        this.start = function(cb) {
            this._cb = cb;
            if ( !this._running ) {
                this._running = true;
                this._current_time = WRAP.Geo.addAnimation(this);
                this._next_time = this._current_time+this._interval;
            }
        }

        /**
         * アニメーションを停止する
         * @method stop
         * @param  なし
         * @return  なし
         **/
        this.stop = function() {
            this._running = false;
            WRAP.Geo.removeAnimation(this);
        }

        /**
         * 現在の表示フレームの（時間）属性キーを返す
         * @method time
         * @param なし
         * @return {Object} 属性キーオブジェクト
         **/
        this.time = function() {
            return this._time;
        }
        
        this._setFrame = function(index) {
            //console.log("setFrame index="+index);
            if ( !this._frame || !this._frame.length ) {
                this._time = undefined;
                this._current = -1;
                return false;
            }
            if ( index < 0 )
                index = 0;
            if ( index >= this._frame.length )
                index = this._frame.length-1;
            if ( this._current != index ) {
                this._current = index;
                this._time = this._frame[index];
                //console.log("index="+index+" time="+JSON.stringify(this._frame[index]));
                if ( this._layer ) {
                    for ( var i = 0 ; i < this._layer.length ; i++ ) {
                        this._layer[i].set(this._frame[index]);
                    }
                }
                if ( this._controller ) {
                    this._controller.setDisplayTime(this._frame[index].validtime);
                }
                return true;
            }
            return false;
        }
        
        this._go = function(time) {
            if ( !this._running )
                return;
            if ( this._next_time <= time ) {
                //console.log("time:"+time+" next:"+this._next_time);
                if ( WRAP.Geo.upper_layers_updating ) {
                    //console.log("waiting...");
                    WRAP.Geo.drawTiles();
                    return;
                }
                this._next_time = time + this._interval;
                if ( this._setFrame(this._current+1) ) {
                    if ( this._cb )
                        this._cb(this._time);
                }
                if ( this._current >= this._frame.length-1 )
                    this.stop();
            }
        }
    },
    

    Context: function(map) {
        this.revision = 0;
        this.tiles = [];
        
        this.lockTile = function() {
            for ( var i = 0 ; i < this.tiles.length ; i++ ) {
                this.tiles[i].locked = true;
            }
        }
        
        this.clearLockedTile = function() {
            for ( var i = this.tiles.length-1 ; i >= 0 ; i-- ) {
                if ( this.tiles[i].locked ) {
//console.log("delete tile z="+this.tiles[i].z+" y="+this.tiles[i].y+" x="+this.tiles[i].x);
                    this.tiles.splice(i, 1);
                }
            }
        }
        
        this.findTile = function(z, y, x) {
            for ( var i = 0 ; i < this.tiles.length ; i++ ) {
                var tile = this.tiles[i];
                if ( tile.z == z && tile.y == y && tile.x == x )
                    return tile;
            }
            return null;
        }
        
        this.addTile = function(type, z, y, x, cood, bounds) {
            this.revision++;
//console.log("add tile z="+z+" y="+y+" x="+x+" rev="+this.revision);
            var canvas = document.createElement("canvas");
            canvas.width = 256;
            canvas.height = 256;
            var ctx = canvas.getContext('2d');
            this.tiles.push({
                id: "M/"+z+"/"+y+"/"+x,
                type:type,
                z:z, y:y, x:x,
                cood:cood,
                bounds:bounds,
                            
                canvas:canvas,
                ctx:ctx
            });
        };
        
        this.tile = function(draw) {
            for ( var i = 0 ; i < this.tiles.length ; i++ ) {
                var tile = this.tiles[i];
                if ( !tile.valid )
                    draw(tile);
            }
        };
        
        this.drawImageData = function(point, imageData, width, height, offset_x, offset_y, rotation) {
            var p = map.getScreenPoint(new WRAP.Geo.Point(point[1]*60.0, point[0]*60.0));
            this.tile(function(tile) {
                var ctx = tile.ctx;
                var tp = map.getScreenPoint(new WRAP.Geo.Point(tile.bounds.north, tile.bounds.west));
                var ox = p.x-tp.x;
                var oy = p.y-tp.y;
                      
                var size = (width>height?width:height)*1.5;
                if ( ox < -size || 256+size < ox || oy < -size || 256+size < oy )
                    return;
                      
                var canvas = document.createElement('canvas');
                canvas.width = imageData.width;
                canvas.height = imageData.height;
                var c = canvas.getContext("2d");
                c.putImageData(imageData,0, 0);
                      
                if ( rotation ) {
                    ctx.save();
                    ctx.translate(ox, oy);
                    ctx.rotate(rotation/180 * Math.PI);
                    ctx.drawImage(canvas, offset_x, offset_y, width, height);
                    ctx.restore();
                }
                else {
                    ctx.drawImage(canvas, ox+offset_x, oy+offset_y, width, height);
                }
            });
        };
        
        this.drawImage = function(point, url, width, height, offset_x, offset_y, rotation) {
            var c = WRAP.Geo.imageCache[url];
            if ( c == undefined ) {
                c = WRAP.Geo.imageCache[url] = { loaded:false, image:new Image() };
                c.image.onload = function() {
                    c.loaded = true;
                    WRAP.Geo.invalidate();
                };
                c.image.src = url;
                return;
            }
            if ( c.loaded ) {
                var p = map.getScreenPoint(new WRAP.Geo.Point(point[1]*60.0, point[0]*60.0));
                this.tile(function(tile) {
                    var ctx = tile.ctx;
                    var tp = map.getScreenPoint(new WRAP.Geo.Point(tile.bounds.north, tile.bounds.west));
                    var ox = p.x-tp.x;
                    var oy = p.y-tp.y;
                    var size = (width>height?width:height)*1.5;
                    if ( ox < -size || 256+size < ox || oy < -size || 256+size < oy )
                        return;
                          
                    var img = c.image;

                    if ( width == 0 )
                        width = img.width;
                    if ( height == 0 )
                        height = img.height;
                    if ( rotation ) {
                        ctx.save();
                        ctx.translate(ox, oy);
                        ctx.rotate(rotation/180 * Math.PI);
                        ctx.drawImage(img, offset_x, offset_y, width, height);
                        ctx.restore();
                    }
                    else {
                        ctx.drawImage(img, ox+offset_x, oy+offset_y, width, height);
                    }
                });
            }
        };

        this._drawLines = function(lines, lineWidth, strokeStyle, fillStyle, fillImage) {
            this.tile(function(tile) {
                var ctx = tile.ctx;
                var tp = map.getScreenPoint(new WRAP.Geo.Point(tile.bounds.north, tile.bounds.west));
                      
                var sy = tp.y;
                var ey = sy+256;
                var sx = tp.x;
                var ex = sx+256;

                var active_lines = [];
                if ( fillStyle ) {
                    active_lines = lines;
                }
                else {
                    for ( var j = 0 ; j < lines.length ; j++ ) {
                        var active = false;
                        var last = 15;
                        var i = -1;
                        while ( ++i < lines[j].length ) {
                            var current = 0;
                            var x = lines[j][i].x;
                            if ( x < sx )
                                current |= 1;
                            else if ( x > ex )
                                current |= 2;
                            var y = lines[j][i].y;
                            if ( y < sy )
                                current |= 4;
                            else if ( y > ey )
                                current |= 8;
                            if ( !(last&current) ) {
                                active = true;
                                break;
                            }
                            last = current;
                        }
                        if ( active )
                          active_lines.push(lines[j]);
                    }
                }
                if ( !active_lines.length )
                      return;
                      
                ctx.beginPath();
                for ( var j = 0 ; j < active_lines.length ; j++ ) {
                    var x = active_lines[j][0].x-tp.x;
                    var y = active_lines[j][0].y-tp.y;
                    var i = 0;
                    ctx.moveTo(x, y);
                    while ( ++i < active_lines[j].length ) {
                        x = active_lines[j][i].x-tp.x;
                        y = active_lines[j][i].y-tp.y;
                        ctx.lineTo(x,y);
                    }
                }
                if ( fillStyle ) {
                    ctx.closePath();
                    ctx.fillStyle = fillStyle;
                    ctx.fill("evenodd");
                }
                if ( fillImage ) {
                    ctx.closePath();
                    var ptn = ctx.createPattern(fillImage, "");
                    ctx.fillStyle = ptn;
                    ctx.fill("evenodd");
                }
                if ( strokeStyle ) {
                    ctx.lineWidth = lineWidth||1;
                    ctx.strokeStyle = strokeStyle;
                    ctx.stroke();
                }
            });
        };
        
        this._fragmentPath = function(path) {
            var fragments = [];
            for ( var i = 0 ; i < path.length ; i++ ) {
                var lat2 = path[i][1];
                var lon2 = path[i][0];
                if ( i > 0 ) {
                    var lat1 = path[i-1][1];
                    var lon1 = path[i-1][0];
                    var d_lon = lon2-lon1;
                    var d = Math.abs(d_lon);
                    if ( d > 1.0 ) {
                        var line = new WRAP.Geo.GreatCircle(lat1, lon1, lat2, lon2);
                        var c_lat = lat1;
                        var c_lon = lon1;
                        fragments.push([c_lon, c_lat]);
                        var len = 0.0;
                        while ( len+1.0 < d ) {
                            len += 1.0;
                            var r = len/d;
                            var t = line.getPosition(r);
                            fragments.push([t.lon, t.lat]);
                            c_lat = t.lat;
                            c_lon = t.lon;
                        }
                    }
                    else {
                        fragments.push([lon1, lat1]);
                    }
                }
                fragments.push([lon2, lat2]);
            }
            return fragments;
        }
        
        this._addFragments = function(lines, fragments) {
            var line = [];
            var l_lat = fragments[0][1];
            var l_lon = fragments[0][0];
            var lp = map.getScreenPoint(new WRAP.Geo.Point(l_lat*60.0, l_lon*60.0));
            line.push(lp);
            for ( var i = 1 ; i < fragments.length ; i++ ) {
                var c_lat = fragments[i][1];
                var c_lon = fragments[i][0];
                var d_lon = c_lon - l_lon;
                if ( d_lon < -180.0 )
                    c_lon += 360.0
                else if ( d_lon >= 180.0 )
                    c_lon -= 360.0;
                var cp = map.getScreenPoint(new WRAP.Geo.Point(c_lat*60.0, c_lon*60.0));
                if ( Math.abs(cp.x-lp.x) > 500 ) {
                    cp = map.getScreenPoint(new WRAP.Geo.Point(c_lat*60.0, (c_lon+360.0)*60.0));
                    if ( Math.abs(cp.x-lp.x) < 500 ) {
                        line.push(cp);
                    }
                    else {
                        cp = map.getScreenPoint(new WRAP.Geo.Point(c_lat*60.0, (c_lon-360.0)*60.0));
                        if ( Math.abs(cp.x-lp.x) < 500 )
                            line.push(cp);
                    }
                    lines.push(line);
                    line = [];
                }
                line.push(cp);
                l_lat = c_lat;
                l_lon = c_lon;
                lp = cp;
            }
            lines.push(line);
        }
        
        this._gcPos = function(lat, lon, angle, distance) {
            // distance は knot＊時間で算出されたもの... これを minと置いている。
            var dist = distance; // ひとまずそのまま処理させてみる。（20（20knot/h） で描画させてみる）
            var PI_MIN = 10800;
            var PI_MIN_1 = 9.259259e-5;
            var M_PI_2 = Math.PI/2;
            var M_1_PI = 1.0/Math.PI;
            
            /* MIN => RAD */
            function rad(min) {
                return min * Math.PI * PI_MIN_1;
            }
            
            /* RAD => MIN */
            function min(rad) {
                return rad * PI_MIN * M_1_PI;
            }
            
            var lat_min = lat*60.0;
            var lon_min = lon*60.0;

            var d_lon = 180.0-angle;    // 仮置き（コースの東西向き）
            
            /* course */
            var co_org = angle/180.0 * Math.PI;
            var cosb_ang = Math.cos(co_org);
            
            /* lat_dr */
            var a_arc = rad(dist);
            var c_arc = (0.5 - lat_min*PI_MIN_1) * Math.PI;
            var cosa_arc = Math.cos(a_arc);
            var cosc_arc = Math.cos(c_arc);
            var sina_arc = Math.sin(a_arc);
            var sinc_arc = Math.sin(c_arc);
            var cosb_arc = cosa_arc*cosc_arc+sina_arc*sinc_arc*cosb_ang;
            var b_arc;
            if ( cosb_arc > 1 )
                b_arc = 0;
            else if ( cosb_arc < -1 )
                b_arc = Math.PI;
            else
                b_arc = Math.acos(cosb_arc);
            
            var lat_dr = M_PI_2 - b_arc;
            lat_dr = min(lat_dr);
            /* lon_dr */
            var sinb_arc = Math.sin(b_arc);
            var cosa_ang = (cosa_arc*sinc_arc-sina_arc*cosc_arc*cosb_ang)/sinb_arc;
            var a_ang;
            if ( cosa_ang > 1 )
                a_ang = 0;
            else if ( cosa_ang < -1 )
                a_ang = Math.PI;
            else
                a_ang = Math.acos(cosa_ang);
            
            var lon_dr;
            if ( d_lon > 0 )
                lon_dr = rad(lon_min)+a_ang;
            else
                lon_dr = rad(lon_min)-a_ang;
            lon_dr = min(lon_dr);
            if ( lon_dr > PI_MIN )
                lon_dr = - PI_MIN * 2 + lon_dr;
            else if ( lon_dr < -PI_MIN )
                lon_dr =  PI_MIN * 2 + lon_dr;
            return { lat:lat_dr/60.0, lon:lon_dr/60.0 };
        }
        
        this.drawPath = function(path, lineWidth, strokeStyle, fillStyle, fillImage) {
            var c = {};
            if ( fillImage ) {
                var url = fillImage;
                c = WRAP.Geo.imageCache[url];
                if ( c == undefined ) {
                    c = WRAP.Geo.imageCache[url] = { loaded:false, image:new Image() };
                    c.image.onload = function() {
                        c.loaded = true;
                        WRAP.Geo.invalidate();
                    };
                    c.image.src = url;
                    return;
                }
            }
            if ( !fillImage || c.loaded ) {
                var lines = [];
                if ( Array.isArray(path[0][0]) ) {
                    for ( var i = 0 ; i < path.length ; i++ ) {
                        if ( path[i].length < 2 )
                            continue;
                        var fragments = this._fragmentPath(path[i]);
                        this._addFragments(lines, fragments);
                    }
                    if ( !lines.length )
                        return;
                }
                else {
                    if ( path.length < 2 )
                        return;
                    var fragments = this._fragmentPath(path);
                    this._addFragments(lines, fragments);
                }
                this._drawLines(lines, lineWidth, strokeStyle, fillStyle, c.image);
            }
        };
        
        this.drawArc = function(point, radius, start, end, lineWidth, strokeStyle, fillStyle, fillImage) {
            var c = {};
            if ( fillImage ) {
                var url = fillImage;
                c = WRAP.Geo.imageCache[url];
                if ( c == undefined ) {
                    c = WRAP.Geo.imageCache[url] = { loaded:false, image:new Image() };
                    c.image.onload = function() {
                        c.loaded = true;
                        WRAP.Geo.invalidate();
                    };
                    c.image.src = url;
                    return;
                }
            }
            if ( !fillImage || c.loaded ) {
                var path = [];
                if ( start == end || Math.abs(end-start) > 360 ) {
                    start = 0;
                    end = 360;
                }
                var step = 1;
                if ( radius < 500000 )
                    step = 5;
                else if ( radius < 100000 )
                    step = 2;
                radius /= 1851.8518518518517;
                for ( var r = start ; r < end ; r+=step ) {
                    var pos = this._gcPos(point[1], point[0], r, radius);
                    path.push([pos.lon, pos.lat]);
                }
                var pos = this._gcPos(point[1], point[0], end, radius);
                path.push([pos.lon, pos.lat]);
                
                //for ( var i = 0 ; i < path.length ; i++ )
                //    console.log("path["+i+"]="+path[i][1]+","+path[i][0]);
                
                var lines = [];
                if ( path.length < 2 )
                    return;
                var fragments = this._fragmentPath(path);
                this._addFragments(lines, fragments);
                this._drawLines(lines, lineWidth, strokeStyle, fillStyle, c.image);
            }
        };
        
        this.drawPoint = function(point, size, lineWidth, strokeStyle, fillStyle) {
            var p = map.getScreenPoint(new WRAP.Geo.Point(point[1]*60.0, point[0]*60.0));
            this.tile(function(tile) {
                var ctx = tile.ctx;
                var tp = map.getScreenPoint(new WRAP.Geo.Point(tile.bounds.north, tile.bounds.west));
                var ox = p.x-tp.x;
                var oy = p.y-tp.y;
                      
                if ( ox < -size || 256+size < ox || oy < -size || 256+size < oy )
                    return;
                      
                if ( fillStyle ) {
                    ctx.fillStyle = fillStyle;
                    ctx.beginPath();
                    ctx.arc(ox, oy, size/2-1, 0, Math.PI*2,true);
                    ctx.closePath();
                    ctx.fill();
                }
                if ( strokeStyle ) {
                    ctx.strokeStyle = strokeStyle;
                    ctx.lineWidth = lineWidth||1;
                    ctx.beginPath();
                    ctx.arc(ox, oy, size/2-1, 0, Math.PI*2,true);
                    ctx.closePath();
                    ctx.stroke();
                }
            });
        };
        
        this.drawLine = function(point, path, lineWidth, strokeStyle, fillStyle, fillImage) {
            var c = {};
            if ( fillImage ) {
                var url = fillImage;
                c = WRAP.Geo.imageCache[url];
                if ( c == undefined ) {
                    c = WRAP.Geo.imageCache[url] = { loaded:false, image:new Image() };
                    c.image.onload = function() {
                        c.loaded = true;
                        WRAP.Geo.invalidate();
                    };
                    c.image.src = url;
                    return;
                }
            }
            if ( !fillImage || c.loaded ) {
                var p = map.getScreenPoint(new WRAP.Geo.Point(point[1]*60.0, point[0]*60.0));
                var lines = [];
                if ( Array.isArray(path[0][0]) ) {
                    for ( var i = 0 ; i < path.length ; i++ ) {
                        if ( path[i].length < 2 )
                            continue;
                        var line = [];
                        for ( var j = 0 ; j < path[i].length ; j++ )
                            line.push(new WRAP.Geo.ScreenPoint(p.x+path[i][j][0], p.y+path[i][j][1]));
                        lines.push(line);
                    }
                    if ( !lines.length )
                        return;
                }
                else {
                    if ( path.length < 2 )
                        return;
                    var line = [];
                    for ( var i = 0 ; i < path.length ; i++ )
                        line.push(new WRAP.Geo.ScreenPoint(p.x+path[i][0], p.y+path[i][1]));
                    lines.push(line);
                }
                this._drawLines(lines, lineWidth, strokeStyle, fillStyle, c.image);
            }
        };
            
        this.drawText = function(point, text, fontSize, fillStyle, offset_x, offset_y, align) {
            var p = map.getScreenPoint(new WRAP.Geo.Point(point[1]*60.0, point[0]*60.0));
            this.tile(function(tile) {
                var ctx = tile.ctx;
                if ( fontSize )
                    ctx.font = fontSize + "px Arial";
                if ( fillStyle )
                    ctx.fillStyle = fillStyle;
                var ox = parseFloat(offset_x) || 0;
                var oy = parseFloat(offset_y) || 0;
                var a = ctx.measureText(text);
                if ( align == 'left' )
                    ox += 0;
                else if ( align == 'right')
                    ox -= a.width;
                else
                    ox -= a.width*0.5;
                          
                var tp = map.getScreenPoint(new WRAP.Geo.Point(tile.bounds.north, tile.bounds.west));
                var x = p.x-tp.x;
                var y = p.y-tp.y;
                ctx.fillText(text, x+ox, y+oy);
            });
        };
        
        this.drawTile = function(tile, imageData) {
            this.tile(function(draw_tile) {
                if ( draw_tile.id == tile.id ) {
                    var canvas = document.createElement("canvas");
                    canvas.width = 256;
                    canvas.height = 256;
                    var ctx = canvas.getContext("2d");
                    ctx.putImageData(imageData, 0, 0, 0, 0, 256, 256);
                    ctx.fillStyle = "rgba(0,0,0,0.0)";
                    ctx.fillRect(0,0,1,1);  // Webkit Bug 対策 （本コードを入れないと putImageDataが実行されないことがある）
                    draw_tile.ctx.drawImage(canvas, 0, 0);
                }
            });
        };
        
        this.begin = function(revision) {
            for ( var i = 0 ; i < this.tiles.length ; i++ ) {
                var tile = this.tiles[i];
                if ( tile.revision != revision ) {
                    tile.valid = false;
                    tile.ctx.clearRect(0,0,256,256);
                }
            }
        };
        
        this.end = function(revision) {
            for ( var i = 0 ; i < this.tiles.length ; i++ ) {
                var tile = this.tiles[i];
                if ( tile.revision != revision ) {
                    tile.revision = revision;
                    tile.valid = true;
                }
                map.setTile(tile, revision);
            }
            map.update();
        };
    },
    
    GreatCircle: function(lat1, lon1, lat2, lon2) {
        this.p1 = [];
        this.p2 = [];
        this.omeda = 0;
        this.heading = 0;
        this.neg = false;
        
        if ( lon2 < lon1 ) {
            this.neg = true;
            var t;
            t = lon1;
            lon1 = lon2;
            lon2 = t;
            t = lat1;
            lat1 = lat2;
            lat2 = t;
        }
        var offset = lon2-lon1;
        lon1 -= offset;
        lon2 -= offset;
        while ( 180.0 < lon1 ) {
            lon1 -= 360.0;
            lon2 -= 360.0;
            offset += 360.0;
        }
        while ( lon1 < -180.0 ) {
            lon1 += 360.0;
            lon2 += 360.0;
            offset -= 360.0;
        }
        
        lat1 *= Math.PI / 180;
        lon1 *= Math.PI / 180;
        lat2 *= Math.PI / 180;
        lon2 *= Math.PI / 180;
        
        this.p1[0] = Math.cos( lat1 ) * Math.cos( lon1 );
        this.p1[1] = Math.cos( lat1 ) * Math.sin( lon1 );
        this.p1[2] = Math.sin( lat1 );
        this.p2[0] = Math.cos( lat2 ) * Math.cos( lon2 );
        this.p2[1] = Math.cos( lat2 ) * Math.sin( lon2 );
        this.p2[2] = Math.sin( lat2 );
        
        this.omega = Math.acos( this.p1[0] * this.p2[0] + this.p1[1] * this.p2[1] + this.p1[2] * this.p2[2] );
        var denom = Math.cos( lat1 ) * Math.sin( this.omega );
        if ( Math.abs( denom ) > 0.001 ) {
            var a = (Math.sin( lat2 ) - Math.sin( lat1 ) * Math.cos( this.omega ) ) / denom;
            if( a < -1.0 ) a = -1.0;
            if( a > 1.0 ) a = 1.0;
            this.heading = Math.acos( a );
            
            var dlon = lon2 - lon1;
            while( dlon < -Math.PI ) dlon += Math.PI* 2;
            while( dlon > Math.PI ) dlon -= Math.PI * 2;
            
            if( dlon < 0  )
                this.heading = Math.PI * 2 - this.heading;
        }
        else
            this.heading = 0.0;
    
        this.getDistance = function() {
            var rEarth = 3443.96;			// nm Radius of Earth at equator
            return this.omega * rEarth;
        }
        
        this.getHeading = function() {
            return this.heading * (180.0 / Math.PI);
        }
        
        this.getPosition = function(t) {
            if ( this.neg )
                t = 1.0 - t;
            
            // SLERP r as p1 * (1-t) + p2 * t
            var sinomega = Math.sin( this.omega );
            var ratio1 = Math.sin( (1.0-t) * this.omega )/ sinomega;
            var ratio2 = Math.sin( t * this.omega )/ sinomega;
            
            var r = [];
            r[0] = this.p1[0] * ratio1 + this.p2[0] * ratio2;
            r[1] = this.p1[1] * ratio1 + this.p2[1] * ratio2;
            r[2] = this.p1[2] * ratio1 + this.p2[2] * ratio2;
            
            // compute position in polar co-ordinates
            var lon = Math.atan2( r[1], r[0] ) * (180.0 / Math.PI);
            var lat = Math.asin( r[2] ) * (180.0 / Math.PI);
            
            lon += offset;
            return { lat:lat, lon:lon };
        }
    },

    // Name Space
    Bridge: {},
    
    Renderer: {},
    
    Interaction: { mouseover:[], mouseout:[], touch:[], boundsChange:[], visibilityChange:[] },
    
    // Internal
    timer:null,
    
    rendering:false,
    
    redrawQueue: [],
    
    valid: true,
    
    redraw: function (layer) {
        if ( this.redrawQueue.indexOf(layer) < 0 ) {
            this.redrawQueue.push(layer);
        }
    },
    
    render: function() {
        var self = this;
        self.valid = false;
        
        if ( !this.timer) {
            this.timer = setInterval(function() {
                if ( self.redrawQueue.length ) {
    //console.log("redraw queue="+self.redrawQueue.length);
                    var layer;
                    while ( (layer = self.redrawQueue.shift()) ) {
                        if ( layer.visible() ) {
                            layer.render();
                        }
                    }
                }
                else if (!self.valid ) {
                    var u = self.container.upper_layers;
                    if ( !u || !u.length )
                        return;
                    if ( self.rendering )
                        return;
                    self.rendering = true;
                    var context = self.map.context;
//console.log("Geo.render");
                    context.begin(self.revision);
                    for ( var j = u.length-1 ; j >= 0 ; j-- ) {
                        var layer = u[j];
                        if ( layer.visible() ) {
                            for ( var i = 0 ; i < layer._dl.length ; i++ ) {
                                layer._dl[i].draw(context);
                            }
                        }
                    }
                    self.valid = true;
                    context.end(self.revision);
                    self.rendering = false;
                                     
                    if ( self.lastX !== undefined ) {   // avoid to scroll on the new draggable feature
                        var hit = self.hit(new WRAP.Geo.ScreenPoint(self.lastX, self.lastY));
                        if ( !self.lastHit || hit.feature != self.lastHit.feature ) {
                            if ( hit.feature && hit.feature.draggable ) {
                                WRAP.Geo.enableScroll(false);
                            }
                            self.lastHit = hit;
                        }
                    }
                }
                                     
            }, 20);
        }
    },
    
    invalidate: function() {
        this.revision++;
        this.render();
    },
    
    lastZoom: -1,
    
    lastContext: -1,
    
    updateBounds: function(bounds, changing) {
//console.log("bounds changed n="+(bounds.north/60)+" s="+(bounds.south/60)+" e="+(bounds.east/60)+" w="+(bounds.west/60));
        if ( WRAP.Geo.Interaction ) {
            WRAP.Geo.lastHit = null;
            WRAP.Geo.Interaction.clearTooltip();
        }
        
        var handler = WRAP.Geo.Interaction.boundsChange;
        if ( handler ) {
            for ( var i = 0 ; i < handler.length ; i++ )
                handler[i](bounds);
        }
        
        if ( !changing ) {
            if ( this.lastContext != this.map.context.revision ) {
                this.lastContext = this.map.context.revision;
                var u = WRAP.Geo.container.upper_layers;
                if ( !u || !u.length )
                    return;
                for ( var j = u.length-1 ; j >= 0 ; j-- ) {
                    u[j].render();
                }
                this.render();
            }
        }
    },
    
    hit: function(point) {
        if ( this.container && this.container.upper_layers ) {
            var i = this.container.upper_layers.length-1;
            while ( i >= 0 ) {
                var l = this.container.upper_layers[i];
                if ( l.visible() ) {
                    for ( var j = 0 ; j < l._dl.length ; j++ ) {
                        var f = l._dl[j];
                        var h = f.hit(point.x, point.y);
                        if ( h ) {
                            return { layer:l, feature:f, x:h.x, y:h.y };
                        }
/*
                        if ( f.screenBounds ) {
                            var b = f.screenBounds();
                            var sx = b.x;
                            var ex = sx+b.width;
                            if ( point.x < sx || ex < point.x )
                                continue;
                            var sy = b.y;
                            var ey = sy+b.height;
                            if ( point.y < sy || ey < point.y )
                                continue;
                            //console.log("hit x="+point.x+" y="+point.y);
                            return { layer:l, feature:f, x:(sx+ex)/2, y:(sy+ey)/2 };
                        }
*/
                    }
                }
                i--;
            }
        }
        return {layer:null, geo:null};
    },
    
    addAnimation: function(a) {
        var self = this;
        this.animations.push(a);
        
        var current = new Date();
        if ( !this.animation_timer ) {
            this.animation_start = current;
            this.animation_timer = setInterval(function() {
                var current = new Date();
                var elapsed = (current-self.animation_start)/1000;
                for ( var i = 0 ; i < self.animations.length ; i++ )
                    self.animations[i]._go(elapsed);
            }, 15);
        }
        return (current - this.animation_start)/1000;
    },
    
    removeAnimation: function(a) {
        var index = this.animations.indexOf(a);
        if ( index >= 0 )
            this.animations.splice(index,1);
        
        if ( !this.animations.length && this.animation_timer ) {
            clearInterval(this.animation_timer);
            this.animation_timer = null;
            this.animation_start = null;
        }
    },
    
    /**
     * 時間管理クラス
     * 現在の表示時間を管理し、時間構造から対応する適切なデータ時間を決定する
     *
     * @class Geo.TimeController
     * @constructor
     * @param なし
     **/
    TimeController: function() {
        this._layers = [];
        var self = this;
        /**
         * 現在の表示時間を設定する
         * @method setDisplayTime
         * @param  {WRAP.Core.DateTime} time 時間
         * @return  なし
         **/
        this.setDisplayTime = function(time) {
            self._current_time = time;
            for ( var i = 0 ; i < self._layers.length ; i++ ) {
                var layer = self._layers[i];
                var content = layer.get();
                if ( content ) {
                    layer.set(content);
                }
            }
        }
        
        /**
         * 現在の表示時間を返す
         * @method displayTime
         * @param  なし
         * @return {WRAP.Core.DateTime} 時間
         **/
        this.displayTime = function() {
            return self._current_time;
        }

        /**
         * 時間管理を行うレイヤーを登録する
         * 登録されたレイヤーに対する、時間設定（set）は TimeControllerが実行する
         * @method addLayer
         * @param  {WRAP.Geo.Layer} layer レイヤー
         * @return {Object} なし
         **/
        this.addLayer = function(layer) {
            if ( self._layers.indexOf(layer) < 0 ) {
                layer.setTimeController(this);
                self._layers.push(layer);
            }
            this.setDisplayTime(self._current_time);
        }

        /**
         * レイヤーを時間管理対象から削除する
         * @method removeLayer
         * @param  {WRAP.Geo.Layer} layer レイヤー
         * @return {Object} なし
         **/
        this.removeLayer = function(layer) {
            var index = self._layers.indexOf(layer);
            if ( indexOf >= 0 ) {
                self._layers[index].setTimeController(null);
                self._layers.splice(index, 1);
            }
        }
        
        this.validate = function(layer, content) {
            //console.log("validate:"+layer.name());
            if ( !content )
                return false;
            if ( self._current_time && layer._data ) {
                
                if ( layer._data.validator ) // custom content validator
                    return (layer._data.validator(self._current_time, layer._data, content));
                
                var validtime;
                var timelist = layer._data.query("timelist").value();
                if ( timelist && content.basetime ) {
                    for ( var i = 0 ; i < timelist.length ; i++ ) {
                        if ( timelist[i].basetime == content.basetime ) {
                            validtime = timelist[i].validtime;
                            //console.log("basetime:"+content.basetime);
                            break;
                        }
                    }
                }
                else {
                    validtime = layer._data.query("validtime").value();
                    //console.log("validtime list ="+(validtime?validtime.length:"---"));
                }
                if ( validtime ) {
                    validtime = validtime.sort(function(a,b){
                                    if( a < b ) return -1;
                                    if( a > b ) return 1;
                                    return 0;
                                });
                    var dt = WRAP.DH._time(self._current_time);
                    var diff = 24*3600;
                    for ( var i = 0 ; i < validtime.length ; i++ ) {
                        var vt = WRAP.DH._time(validtime[i]);
                        var nt = (i<validtime.length-1)?WRAP.DH._time(validtime[i+1]):WRAP.DH._setTime(vt,diff);
                        if ( vt <= dt && dt < nt ) {
                            content.validtime = WRAP.DH._timeString(vt);
                            //console.log("validtime ="+content.validtime);
                            return true;
                        }
                        diff = WRAP.DH._elapsed(vt, nt);
                    }
                }
            }
            //console.log("validtime not found");
            content.validtime = null;
            return false;
        }
    },

    parseColor: function(color) {
        var tcv = document.createElement('canvas');
        tcv.width = 1, tcv.height = 1;
        var tcx = tcv.getContext('2d');
        tcx.fillStyle = color;
        tcx.fillRect(0,0,1,1);
        return tcx.getImageData(0,0,1,1).data;
    },
    
    enableScroll: function(enable) {
        if ( this.map.enableScroll )
            this.map.enableScroll(enable);
    },
    
    // Internal Debug function
    _tileCheck: function(context, dl) {
        for ( var i = 0 ; i < context.tiles.length ; i++ ) {
            var tile = context.tiles[i];
            var center = (128*256+128)*2;
            var lat = tile.cood[center];
            var lon = tile.cood[center+1];
            var feature;
            feature = new WRAP.Geo.Feature.Text({
                point:[lon, lat],
                text:tile.id,
                fontSize:14,
                fillStyle:'rgb(255,0,0)',
                offsetX:0,
                offsetY:0,
                align:'center'
            });
            dl.push(feature);
            feature = new WRAP.Geo.Feature.Text({
                point:[lon, lat],
                text:"lat="+lat,
                fontSize:14,
                fillStyle:'rgb(0,0,200)',
                offsetX:-50,
                offsetY:-40,
                align:'left'
            });
            dl.push(feature);
            feature = new WRAP.Geo.Feature.Text({
                point:[lon, lat],
                text:"lon="+lon,
                fontSize:14,
                fillStyle:'rgb(0,0,200)',
                offsetX:-50,
                offsetY:-20,
                align:'left'
            });
            dl.push(feature);
            feature = new WRAP.Geo.Feature.Line({
                point:[lon, lat],
                line:[[-120,-120],[120,-120],[120,120],[-120,120],[-120,-120]],
                lineWidth:1,
                strokeStyle:'rgb(40,40,200)',
            });
            dl.push(feature);
            feature = new WRAP.Geo.Feature.Line({
                point:[lon, lat],
                line:[[-124,-124],[124,-124],[124,124],[-124,124],[-124,-124]],
                lineWidth:1,
                strokeStyle:'rgb(40,200,40)',
            });
            dl.push(feature);
        }
    },
    
    container: {},
        
    timer: null,
    
    animation_timer: null,
    
    animation_start: null,
        
    animations: [],
        
    revision: 1,
        
    tiles: [],
    
    imageCache: {},
    
    distance : function(lon0, lat0, lon1, lat1) {
        var long_r = 6378137.000;     // [m] long radius
        var short_r = 6356752.314245; // [m] short radius
        var rate = Math.sqrt((long_r * long_r - short_r * short_r)/(long_r * long_r));
        var a_e_2 = long_r * (1-rate * rate);  // a(1-e^2)
        
        lon0 = lon0 * Math.PI/180;  lat0 = lat0 * Math.PI/180;
        lon1 = lon1 * Math.PI/180;  lat1 = lat1 * Math.PI/180;
        var d_lon = lon1 - lon0;
        var d_lat = lat1 - lat0;
        var ave_lat = (lat1+lat0)/2;
        var Wx = Math.sqrt(1-rate * rate * Math.sin(ave_lat) * Math.sin(ave_lat));
        var Mx = a_e_2 /Wx/Wx/Wx;
        var Nx = long_r /Wx;
        var dum = (d_lat * Mx)*(d_lat * Mx) + (d_lon* Nx * Math.cos(ave_lat)) * (d_lon* Nx * Math.cos(ave_lat));
        return Math.sqrt(dum);
    }
    
}


