# WRAP サンプルコード（v1.0）

## URL	

* http://sky-pb-dev2.wni.co.jp/WRAP/sample/test.html　	（配信データ版）
* http://sky-pb-dev2.wni.co.jp/WRAP/sample/test2.html	（スタティック・サンプルデータ版）


## 機能

* Copilotレイヤー（6タイプ）、軌跡表示
* ランデブーポイント（3タイプ）
* レーダー、12コマアニメーション
* 雷
* ライブカメラ
* GASS Scale、12コマアニメーション

## 処理構成

初期化

* グーグルマップの登録、WRAP.Geoのセットアップ
* カスタマ、ユーザーを WRAP.DHに設定
* 使用するデータをWRAP.DHに登録
* レイヤーの作成、（重ね順の）登録
* レイヤーコンフィグをDLしレイヤーにデータとコンフィグをアタッチ
<br>
* レイヤーコンフィグの動的調整<br>
　GASS Scaleの閾値をアプリケーションから設定
* アニメーションコントローラの作成
* ツールチップなどのマップインタラクションモジュールの初期化


データの更新監視

* WRAP.DHデータの更新を監視し UIを更新

イベントハンドリング
* レイヤーの表示チェック状態の更新を監視しレイヤーに反映
* アニメーションコントローラ操作に応じてアニメーションを実行
* その他UI操作に応じて マップ表示状態を更新<br>
Copilot軌跡表示、ライブカメラ整列、画角への変更など



## 実装内容

### インポート

　GoogleMaps、WRAP.DH、WRAP.Geoおよびアプリケーション使用ライブラリ（jQuery）をインポート

```
<script src="https://maps.googleapis.com/maps/api/js?
client=gme-weathernewsinc&channel=sky_bestway&libraries=geometry"></script>
<script type="text/javascript" src="3rd/js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/WRAP.DH-1.0.0.0-min.js"></script>
<script type="text/javascript" src="js/WRAP.Geo-1.0.0.0-min.js"></script>
```

### 初期化

(1) グーグルマップの初期化
```
    // Setup Google Maps
    var map_canvas = document.getElementById('map_canvas');
    // Setup Google Maps
    var map = new google.maps.Map(map_canvas, {
        zoom: 10,
        minZoom: 3,
        center: new google.maps.LatLng(35.792621, 139.806513),
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        draggableCursor: "default",
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
```

(2) グーグルマップをWRAP.Geoに登録
```
    WRAP.Geo.setGoogleMaps(map);
```

(3) カスタマ、ユーザー情報を WRAP.DHに登録
```
    WRAP.DH.setUser("WNI", "wni_root1");
```

(4) 使用するデータをWRAP.DHに登録

addObject()でデータ識別子を与え DHに登録すると、データコンフィグが読み込まれ、データが利用可能になる。

設定にしたがいデータの自動ロードが開始される。

```
    var lightning_data = WRAP.DH.addObject("WX_JP_Lightning");
    var rendezvous_point_data = WRAP.DH.addObject("SKY_CUS_RendezvousPoint");
    var copilot_data = WRAP.DH.addObject("SKY_CUS_CoPilot");
    var radar_data = WRAP.DH.addObject("WX_JP_Radar");
    var gass_scale_data = WRAP.DH.addObject("SKY_JP_GASS_Scale");
    var live_camera_data = WRAP.DH.addObject("WX_LiveCamera");
```

(5) レイヤーの作成と登録

Copilot、ランデブーポイント、雷を interactive_layersに登録。

レーダー、GASSスケールを upper_layersに登録する。

Geo.setLayerの指定順が重ね順になる。（上位が前面）

```
    // Layers
    var lightning_layer = new WRAP.Geo.Layer("Lightning");
    var rp10_layer = new WRAP.Geo.Layer("RendezvousPoint_10");
    var rp11_layer = new WRAP.Geo.Layer("RendezvousPoint_11");
    var rp12_layer = new WRAP.Geo.Layer("RendezvousPoint_12");
    var rp20_layer = new WRAP.Geo.Layer("RendezvousPoint_20");
    var rp30_layer = new WRAP.Geo.Layer("RendezvousPoint_30");
    var cp00_layer = new WRAP.Geo.Layer("CoPilot_00");
    var cp10_layer = new WRAP.Geo.Layer("CoPilot_10");
    var cp11_layer = new WRAP.Geo.Layer("CoPilot_11");
    var cp20_layer = new WRAP.Geo.Layer("CoPilot_20");
    var cp21_layer = new WRAP.Geo.Layer("CoPilot_21");
    var cp30_layer = new WRAP.Geo.Layer("CoPilot_30");
    var radar_layer = new WRAP.Geo.Layer("Radar");
    var gass_scale_layer = new WRAP.Geo.Layer("GASSScale");
    var live_camera_layer = new WRAP.Geo.Layer("LiveCamera");

    WRAP.Geo.setLayer({
        interactive_layers : [
            // copilot layers
            cp00_layer,
            cp10_layer,
            cp11_layer,
            cp20_layer,
            cp21_layer,
            cp30_layer,
            // rendezvous point layers
            rp30_layer,
            rp20_layer,
            rp12_layer,
            rp11_layer,
            rp10_layer,
            live_camera_layer,
            lightning_layer,
        ],
        upper_layers : [
            radar_layer,
            gass_scale_layer
        ]
    });
```

(6) レイヤーコンフィグのDLと レイヤーの設定

各レイヤーに configure()関数を用いて、表示データとレイヤーコンフィグをアタッチする。

```
    var conf_dir = "./pri/conf";
    // Configure Layers
    $.when(
        $.getJSON(conf_dir + '/layer/Lightning.json'),
        $.getJSON(conf_dir + '/layer/RendezvousPoint_10.json'),
        $.getJSON(conf_dir + '/layer/RendezvousPoint_11.json'),
        $.getJSON(conf_dir + '/layer/RendezvousPoint_12.json'),
        $.getJSON(conf_dir + '/layer/RendezvousPoint_20.json'),
        $.getJSON(conf_dir + '/layer/RendezvousPoint_30.json'),
        $.getJSON(conf_dir + '/layer/CoPilot_00.json'),
        $.getJSON(conf_dir + '/layer/CoPilot_10.json'),
        $.getJSON(conf_dir + '/layer/CoPilot_11.json'),
        $.getJSON(conf_dir + '/layer/CoPilot_20.json'),
        $.getJSON(conf_dir + '/layer/CoPilot_21.json'),
        $.getJSON(conf_dir + '/layer/CoPilot_30.json'),
        $.getJSON(conf_dir + '/layer/Radar.json'),
        $.getJSON(conf_dir + '/layer/GASS_Scale.json'),
        $.getJSON(conf_dir + '/layer/LiveCamera.json')
    ).done(function() {
        var i = 0;
        lightning_layer.configure(lightning_data, arguments[i++][0]);
        rp10_layer.configure(rendezvous_point_data, arguments[i++][0]);
        rp11_layer.configure(rendezvous_point_data, arguments[i++][0]);
        rp12_layer.configure(rendezvous_point_data, arguments[i++][0]);
        rp20_layer.configure(rendezvous_point_data, arguments[i++][0]);
        rp30_layer.configure(rendezvous_point_data, arguments[i++][0]);
        cp00_layer.configure(copilot_data, arguments[i++][0]);
        cp10_layer.configure(copilot_data, arguments[i++][0]);
        cp11_layer.configure(copilot_data, arguments[i++][0]);
        cp20_layer.configure(copilot_data, arguments[i++][0]);
        cp21_layer.configure(copilot_data, arguments[i++][0]);
        cp30_layer.configure(copilot_data, arguments[i++][0]);
        radar_layer.configure(radar_data, arguments[i++][0]);
        gass_scale_layer.configure(gass_scale_data, arguments[i++][0]);
        live_camera_layer.configure(live_camera_data, arguments[i++][0]);
    });
```

(7) レイヤーコンフィグの動的調整

GASS Sacleのデフォルト閾値は Configに設定されているが、Layer.setAttributes()関数を用いることでConfigの Attributes以下をオーバーライドすることができる。

以下は GASS Sacleの閾値を変更

```
    // Customize Layer Attributes
    gass_scale_layer.setAttributes({
        vis3:5000, vis2:9900, cig3:1000, cig2:2000
    });
```

(8) アニメーションコントローラの作成

レーダーと GASS Scaleレイヤーでアニメーションを行う為アニメーションコントローラを作成する。

```
    // Animation Controller
    var radar_animation = new WRAP.Geo.Animation();
    var gass_scale_animation = new WRAP.Geo.Animation();
```

(9) マップインタラクションモジュールの初期化

ランデブーポイント、Copilotのツールチップ処理およびライブカメラのポップアップ処理の全ては MapInteractionモジュールに実装されている。

同モジュールにライブカメラデータとマップhtml要素を渡し初期化することで、マップ上のマウス操作に関する処理を移譲する。

また、ライブカメラの「整列」ボタンのクリックをトリガーにカメラウィンドウの整列機能を呼び出す。

```
    // Setup Map Interaction Module
    MapInteraction.init(live_camera_data, map_canvas);
    $('#lc_align').click(function() {		// 整列ボタンのクリック
        $('#menu').click();					// メニューを閉じて
        MapInteraction.alignLiveCamera();	// ライブカメラウィンドウを整列させる
    });
```

(10) データの更新監視

WRAP.DHの機能（inspect）を用いてデータの更新を監視し、更新に対応してUIをアップデートする。

inspect()関数の最後の引数は、immidiateフラグであり、trueを設定することで本関数実行時にすでにデータがロードされていれば即時コールバックするようにする。

```
    // update UI
    lightning_data.inspect(function(ref) {		// 雷データの更新監視
        var tm = ref.query("data.updatedtime").value();
        if ( tm ) {
            var ts = timeString(tm, true);
            $('#lt_time').html(ts+"Z");
            var num = ref.query("data.array").length();
            message("Lightning Data Loaded.  updated time="+ts+" num="+num);
        }
    }, true);

    rendezvous_point_data.inspect(function(ref) {		// ランデブーポイントデータの更新監視
        var ts = "--/-- --:--";
        var num = ref.query("data").length();
        if ( num ) {
            var tm = ref.query("data[0].update_time").value();
            ts = timeString(tm, true);
        }
        $('#rp_time').html(ts+"Z");
        message("RendezvousPoint Data Loaded.  updated time="+ts+" num="+num);
    }, true);

    copilot_data.inspect(function(ref) {		// CoPilotデータの更新監視
        var ts = "--/-- --:--";
        var num = ref.query("data").length();
        if ( num ) {
            var tm = ref.query("data[0].update_time").value();
            ts = timeString(tm, true);
        }
        $('#cp_time').html(ts+"Z");
        message("Copilot Data Loaded.  updated time="+ts+" num="+num);
    }, true);

    live_camera_data.inspect(function(ref) {		// ライブカメラデータの更新監視
        var lc = ref.query("data").value();
        if ( lc ) {
            $("#chk_lc").prop('disabled', false);
            var count = 0;
            var latest;
            for ( var key in lc ) {
                var c = lc[key];
                if ( c.image && c.image.length ) {
                    if ( !latest || latest < c.image[0].time )
                        latest = c.image[0].time;
                    count++;
                }
            }
            var ts = (latest?timeString(latest, true):"--/-- --:--")+"Z";
            $('#lc_time').html(ts);
            message("Camera Data Loaded.  latest time="+ts+" active camera="+count);
        }
    }, true);
```

レーダーとGASS Scaleについてはアニメーションを行う為、アニメーションの時間レンジを
time_rangeオブジェクトに登録して保持するようにしている。
アニメーション実行時にコントローラにここから時間レンジを取り出して設定する。

```
    var time_range = { rd:[], gs:[] };

    var radar_timelist;
    radar_data.inspect(function(ref) {		// レーダーの更新監視
        var timelist = ref.query("timelist").value();
        if ( timelist && timelist.length ) {
            if ( updated(radar_timelist, timelist) ) {
                $("#chk_rd").prop('disabled', false);
                $("#rd_vt").html("");
                radar_timelist = timelist;
                time_range.rd = [];
                var num = timelist.length;
                var latest = "";
                for ( var i = 0 ; i < num ; i++ ) {
                    var tm = timelist[i];
                    var ts = timeString(tm)+"Z";
                    if ( !i )
                        latest = ts;
                    var time_index = num-i-1;
                    $("#rd_vt").append("<option value='"+time_index+"'>"+ts+"</option>");
                    time_range.rd[time_index] = {validtime:tm};
                }
                message("Radar Timelist Loaded.  updated time="+latest+" vt="+num);
            }
        }
        updateTimeControl("rd", radar_layer.visible()&&radar_timelist);
    }, true);

    var gass_scale_timelist;
    gass_scale_data.inspect(function(ref) {		// GASS Scaleの更新監視
        var timelist = ref.query("timelist").value();
        if ( timelist && timelist.length ) {
            if ( updated(gass_scale_timelist, timelist) ) {
                $("#chk_gs").prop('disabled', false);
                $("#gs_bt").html("");
                $("#gs_vt").html("");
                gass_scale_timelist = timelist;
                time_range.gs = [];
                if ( timelist.length ) {
                    var bt = timelist[0].basetime;
                    var basetime = timeString(bt)+"Z";
                    $("#gs_bt").append("<option value='"+0+"'>"+basetime+"</option>");
                    var num = timelist[0].validtime.length;
                    for ( var i = 0 ; i < num ; i++ ) {
                        var tm = timelist[0].validtime[i];
                        var ts = timeString(tm)+"Z";
                        var time_index = num-i-1;
                        $("#gs_vt").append("<option value='"+time_index+"'>"+ts+"</option>");
                        time_range.gs[time_index] = {basetime:bt, validtime:tm};
                    }
                    $("#gs_vt").val(0);
                    message("GASS Scale Timelist Loaded.  basetime time="+basetime+" vt="+num);
                }
            }
        }
        updateTimeControl("gs", gass_scale_layer.visible()&&gass_scale_timelist);
    }, true);
```


(11) レイヤーの表示チェック状態の更新を監視しレイヤーに反映

UI操作をトリガーとして updateLayers()関数を呼び出す。		

```
    $("input[type=checkbox]").change(updateLayers);
    $("#rd_vt").change(updateLayers);
    $("#gs_vt").change(updateLayers);
    updateLayers();
```

updateLayers()関数では、レイヤーの表示状態を指示するチェックボックスの状態を調べ
各レイヤーの表示状態を更新する。

```
    var updateLayers = function () {
        // 各レイヤーのチェック状態を取得
        var check_lt = $('#chk_lt').prop("checked");
        var check_rp = $('#chk_rp').prop("checked");
        var check_rp10 = $('#chk_rp10').prop("checked");
        var check_rp20 = $('#chk_rp20').prop("checked");
        var check_rp30 = $('#chk_rp30').prop("checked");
        var check_cp = $('#chk_cp').prop("checked");
        var check_cp00 = $('#chk_cp00').prop("checked");
        var check_cp10 = $('#chk_cp10').prop("checked");
        var check_cp11 = $('#chk_cp11').prop("checked");
        var check_cp20 = $('#chk_cp20').prop("checked");
        var check_cp21 = $('#chk_cp21').prop("checked");
        var check_cp30 = $('#chk_cp30').prop("checked");
        var check_cprt = $('#chk_cprt').prop("checked");
        var check_rd = $('#chk_rd').prop("checked");
        var check_gs = $('#chk_gs').prop("checked");
        var check_lc = $('#chk_lc').prop("checked");

        // setVisible()関数を用いて各レイヤーの表示状態に反映
        // 表示状態に連動して UIの enable/disable状態を適切に更新
        lightning_layer.setVisible(check_lt);
        rp10_layer.setVisible(check_rp&&check_rp10);
        rp11_layer.setVisible(check_rp&&check_rp10);
        rp12_layer.setVisible(check_rp&&check_rp10);
        rp20_layer.setVisible(check_rp&&check_rp20);
        rp30_layer.setVisible(check_rp&&check_rp30);
        cp00_layer.setVisible(check_cp&&check_cp00);
        cp10_layer.setVisible(check_cp&&check_cp10);
        cp11_layer.setVisible(check_cp&&check_cp11);
        cp20_layer.setVisible(check_cp&&check_cp20);
        cp21_layer.setVisible(check_cp&&check_cp21);
        cp30_layer.setVisible(check_cp&&check_cp30);
        radar_layer.setVisible(check_rd);
        gass_scale_layer.setVisible(check_gs);
        live_camera_layer.setVisible(check_lc);
        $('#lc_align')[check_lc?'removeClass':'addClass']('nop');

        // Copilotは軌跡の表示状態に応じて、stAttributes()関数で Configの routeフラグを動的に On/Offする。
        var copilot_route_config = {route:check_cprt};
        cp00_layer.setAttributes(copilot_route_config);
        cp10_layer.setAttributes(copilot_route_config);
        cp11_layer.setAttributes(copilot_route_config);
        cp20_layer.setAttributes(copilot_route_config);
        cp21_layer.setAttributes(copilot_route_config);
        cp30_layer.setAttributes(copilot_route_config);

        // レーダーと GASS Sacleはコンボボックスで選択された時間のフレームを表示（Layer.set）
        // updateTimeControl()はアニメーションコントロールの UI更新を集約して実装した関数で
        // 現在の表示フレームからコマ送りボタンの enable/disableなどを調整する。
        if ( check_rd && time_range.rd.length ) {
            var index = parseInt($("#rd_vt").val());
            radar_layer.set(time_range.rd[index]);
            updateTimeControl("rd", true);
        }
        else {
            updateTimeControl("rd", false);
        }

        if ( check_gs && time_range.gs.length ) {
            var index = parseInt($("#gs_vt").val());
            gass_scale_layer.set(time_range.gs[index]);
            updateTimeControl("gs", true);
        }
        else {
            updateTimeControl("gs", false);
        }
    }; 
```

(12) アニメーションコントローラ操作に応じてアニメーションを実行

以下、GASS Scaleのアニメーション処理（レーダーも同様）

```
    $("#gs_play").click(function() {			// アニメーションの開始ボタンクリック
        if ( $("#gs_play").hasClass('play') ) {
            var index = parseInt($("#gs_vt").val());
            // アニメーションの開始
            gass_scale_animation.setTimeRange(time_range.gs, 0.5);  // アニメーション時間範囲、0.5秒更新
            gass_scale_animation.setLayer([gass_scale_layer]);      // アニメーション対象レイヤー登録
            gass_scale_animation.setTime(time_range.gs[index]);     // 最初のフレームを設定
            gass_scale_animation.start(function(time) {             // アニメーション開始
                // フレーム（時間）変化毎にコールバックされるので UIの時間表示を更新
                for ( var i = 0 ; i < time_range.gs.length ; i++ ) {
                    if ( time_range.gs[i].basetime == time.basetime
                    &&  time_range.gs[i].validtime == time.validtime ) {
                        $("#gs_vt").val(i);
                        if ( i == time_range.gs.length-1 )
                        $("#gs_play").removeClass('stop').addClass('play');
                        updateTimeControl("gs", gass_scale_layer.visible());
                        return;
                    }
                }
            });
            // プレイボタンを停止ボタンに変更
            $("#gs_play").removeClass('play').addClass('stop');
        }
        else {
            // アニメーションの終了
            gass_scale_animation.stop();
            // 停止ボタンをプレイボタンに変更
            $("#gs_play").removeClass('stop').addClass('play');
        }
        updateTimeControl("gs", true);
    });
```

(13) その他UI操作に応じて マップ表示状態を更新

ナビゲーションバーに、「Copilot」「RendezvousPoint」「Lighting」のボタンを表示

これらがクリックされると filter関数を用いて同データの座標列を取得し全ての要素がマップに収まるような画角にマップを調整する。

```
    // ボタンクリックで、adjustPerspective()関数に対象データを渡す
    $('#cp_test').click(function(){
        adjustPerspective(WRAP.DH.query("SKY_CUS_CoPilot.data"));
    });
    $('#rp_test').click(function(){
        adjustPerspective(WRAP.DH.query("SKY_CUS_RendezvousPoint.data"));
    });
    $('#lt_test').click(function(){
        adjustPerspective(WRAP.DH.query("WX_JP_Lightning.data.array"));
    });
    // 対象データを表示する画角に調整
    function adjustPerspective(data) {
        // 対象データの座標列を収集
        var points = data.filter(function(v) {
        return new WRAP.Geo.Point(v.lat, v.lon);
    });
    if ( points && points.length ) {
        // WRAP.Geo.getPerspective()関数により最適画角を取得
        var perspective = WRAP.Geo.getPerspective(points,10);	// マージンを10pixelとっている。
        // マップの中心位置とズームを最適画角に変更
        WRAP.Geo.setCenterPoint(perspective.center);
        WRAP.Geo.setZoom(perspective.zoom);
    }
    else {
        alert("No data found.");
    }
    }
```

filter関数を変更すれば、特定条件のデータのみを表示する最適画角を得ることができる。



