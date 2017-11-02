# TimeControl サンプルコード

## URL	

* http://pt-wrap01.wni.co.jp/Mercury/sample/timecontrol.html


## 機能

* 異なるタイムリスト構造を持つ２つのコンテンツを単一のディスプレイタイムにより最適コンテンツ時間を決定し表示します。
* レーダーとGSM（温度）のコンテンツの時間を上部ツールバーの時間リストから選択すると、選択した時間が ディスプレイタイムとなりもう片方の表示時間が自動で選択されます。
* 上部ツールバーのフレーム制御ボタン「|＜、＜、＞、＞|」を操作すると 2016/12/6 00zから 2016/12/7 00zの範囲でディスプレイタイムを変更します。変更間隔は「pitch」リストより指定可能です。
* 上部ツールバーのプレイボタン「▶︎」を押すと前記範囲でアニメーションを行います。

## ディスプレイタイムの制御について

レイヤーの表示コンテンツを設定する場合、layer.set()関数を用いて各レイヤーのコンテンツ属性を指定します。

```
　   radar_layer.set({
        element:'WX_JP_Radar',
        validtime:'20161205T060000'
    });　

　   model_layer.set({
        element:'TMP',
        basetimetime:'20161205T000000',
        validtime:'20161205T060000'
    });　

     :
    
```

複数のレイヤーを単一のディスプレイタイムに連動して最適な validtimeを表示するようにする場合、ディスプレイタイム変更の都度各レイヤーに結びついたデータオブジェクトのタイムリストを参照し適切な validtimeを決定する必要があります。

WRAP.Geo.TimeControllerを用いることで各レイヤーの validtime決定処理の部分をまとめて移譲することができます。

### WRAP.Geo.TimeControllerによる処理フロー

1) TimeControllerにvalidtime決定処理を移譲するレイヤーを登録

```
    var time_controller = new WRAP.Geo.TimeController();
    time_controller.add(radar_layer);
    time_controller.add(model_layer);
     :
```

2) アプリケーションは、TimeControllerに validtime以外のcontent属性を設定

```
　   radar_layer.set({           ・・・validtimeは設定しない
        element:'WX_JP_Radar'
    });　

　   model_layer.set({           ・・・validtimeは設定しない
        element:'TMP',
        basetimetime:'20161205T000000'
    });　

     :
    
```

3) TimeControllerにディスプレイタイムをセット

```
    time_controller.setDisplayTime('20161205T060000');
```

TimeControllerにより各レイヤーにアタッチされたタイムリストが参照され、指定ディスプレイタイムの直近の validtimeが選択されコンテンツ属性に付加されます。

本サンプルでは、上部ツールバーのコンテンツ時間を選択するとディスプレイタイムが更新され、各レイヤーの validtimeが TimeControllerにより決定されます。


## Validtime選択ロジックのカストマイズについて

TimeControllerのデフォルトロジックは下記のようになっています。

・レイヤーにアタッチされているデータオブジェクトからタイムリストを取得

・タイムリストが validtime配列であった場合、ディスプレイタイム直近の validtimeを選択。

　ただし選択された validtimeが配列中最も新しいものであった場合は、ディスプレイタイムとの差が直前の validtime間の差より大きい場合は validtimeを選択しない。

・タイムリストが basetime配列型であった場合、contentに指定された basetimeと一致するものから validtime配列を取得し上記と同様の処理により validtimeを選択する。

・ディスプレイタイムに対応する validtimeが選択できた場合は、contentオブジェクトに validtimeプロパティを設定する。

　選択できなかった場合は、validtimeプロパティをnullに設定する。　（validtimeが設定されなかった場合はレイヤーはクリアされる）


データオブジェクトの validate()関数にvalidtime決定処理を渡すことで上記ロジックを任意処理にカストマイズすることができます。
カストマイズ処理に、ディスプレイタイム、データオブジェクト、現在のcontent属性設定が渡されるので、データオブジェクトからタイムリストを取り出してcontent属性に validtimeプロパティなど任意の値を設定して表示コンテンツを制御します。

カストマイズ例（ディスプレイタイム直後のvalidtimeを選択するように変更）

```
            // validtime決定ロジックのカストマイズ例
            gsm_data.validate(function(display_time, data, content) {
                // display_time に対応する最適な content.validtimeを決定する。
                if ( !content )
                    return false;
                              
                // dataから timelistを取得する
                var timelist = data.query("timelist").value();
                // 現在設定されている basetimeの validtime配列を取得
                var validtime;
                if ( timelist && content.basetime ) {
                    for ( var i = 0 ; i < timelist.length ; i++ ) {
                        if ( timelist[i].basetime == content.basetime ) {
                          validtime = timelist[i].validtime;
                          break;
                        }
                    }
                }
                if ( validtime ) {
                    // validtime配列から display_time直後の validtimeを選択してcontentに設定
                    validtime = validtime.sort(function(a,b){
                        if( a > b ) return -1;
                        if( a < b ) return 1;
                        return 0;
                    });
                    for ( var i = 0 ; i < validtime.length ; i++ ) {
                        if ( validtime[i] >= display_time
                        && ((i==validtime.length-1) || validtime[i+1] < display_time) ) {
                              content.validtime = validtime[i];
                              return true;
                        }
                    }
                }
                // 適切な validtimeがなかったので、fasleをリターンしてレイヤーをクリアする
                content.validtime = null;
                return false;
            });
```

## アニメーションについて

WRAP.Geo.Animation オブジェクトを用いてアニメーションの制御を行います。

アニメーションの処理フロー

1) setValidTimeRange()関数により アニメーションのフレーム範囲を設定します。

範囲内の各フレームの validtimeプロパティ配列が返されます。

```
            var animation = new WRAP.Geo.Animation();
            
            // アニメーション範囲を設定（12/6 0000Zから 12/7 0000Zまで 60分（3600秒）毎のフレームを 1.0秒間隔で表示）
            var pitch = 3600;
            dt_list = animation.setValidTimeRange("20161206T000000", "20161207T000000", pitch, 1.0);
```

2) アニメーションの開始および進行

最初のフレームの時間を指定し、start()関数によりアニメーションを開始します。

各フレームに遷移するとコールバックがフレームの validtimeを引数として呼ばれるので、ここで TimeContollerの setDisplayTime()によりディスプレイタイムを更新します。

TimeControllerに登録したレイヤーのコンテンツが更新され、レイヤーの描画がおこなわれます。

```

                    animation.setTime({validtime:time_controller.displayTime()});   // 最初のフレーム（Validtime）を設定
                    animation.start(function(time) {                                // アニメーション開始
                        // フレーム（時間）変化毎にコールバックされるので UIの時間表示を更新
                        time_controller.setDisplayTime(time.validtime);
                    });
```

3) アニメーションの停止

stop()関数によりアニメーションを停止します。

```
                    animation.stop();
```

4) animation用UIの制御

アプリケーションは、アニメーションの状態に応じて、ボタンや時間選択などのUIの有効化、無効化を適切に行います。

animation.start(callback)のコールバックにより現在表示されているフレームがわかります。

現在フレームの validtimeと setValidTimeRange()登録時に返された全フレームの validtimeリストから現在のフレームの位置を特定してUI に
反映させることができます。


## サンプル構成

レーダーデータのタイムリスト

```
{
  "validtime": [
    "20161206T235500",
    "20161206T235000",
    "20161206T234500",
    "20161206T234000",
    　　：
    "20161206T011000",
    "20161206T010500",
    "20161206T010000",
    "20161206T005500",
    "20161206T005000",
    "20161206T004500",
    "20161206T004000",
    "20161206T003500",
    "20161206T003000",
    "20161206T002500",
    "20161206T002000",
    "20161206T001500",
    "20161206T001000",
    "20161206T000500",
    "20161206T000000",
    "20161205T235500",
    "20161205T235000",
    "20161205T234500",
    "20161205T234000",
    "20161205T233500",
    "20161205T233000",
    "20161205T232500",
    "20161205T232000",
    "20161205T231500",
    　　：
    "20161205T003500",
    "20161205T003000",
    "20161205T002500",
    "20161205T002000",
    "20161205T001500",
    "20161205T001000",
    "20161205T000500",
    "20161205T000000"
  ]
}
```

モデルデータ（GSM）のタイムリスト

```
{
    "timelist": [
        {
            "basetime": "20161206T060000",
            "validtime": [
                "20161209T180000",
                "20161209T120000",
                "20161209T060000",
                "20161209T000000",
                "20161208T060000",
                "20161208T000000",
                "20161207T180000",
                "20161207T000000",
                "20161206T180000",
                "20161206T120000",
                "20161206T060000"
            ]
        },
        {
            "basetime": "20161206T000000",
            "validtime": [
                "20161209T120000",
                "20161208T180000",
                "20161208T120000",
                "20161208T000000",
                "20161207T120000",
                "20161207T180000",
                "20161207T060000",
                "20161207T000000",
                "20161206T180000",
                "20161206T120000",
                "20161206T060000",
                "20161206T000000"
            ]
        }
    ]
}
```


## サンプルコード


```
    <body style="width:100%; height:100%; margin:0; padding:0; background-color:rgb(255,255,255);">
        <div style= "position:absolute; width:400px; height:26px; left:10px; top:2px; background-color:rgba(100,100,100,0.15); border-radius:6px;">
            <label style="position:absolute; width:60px; height:18px; left:10px; top:4px;">
                <input type="checkbox" id="chk_radar" checked><spawn style="position:absolute; top:2px; left:20px;">Radar</spawn>
            </label>
            <select id="element" style="position:absolute; width:110px; left:80px; top:4px; height:18px;"></select>
            <select id="validtime" style="position:absolute; width:100px; left:200px; top:4px; height:18px;"></select>
            <label style="position:absolute; width:60px; height:18px; left:310px; top:4px;">
                <input type="checkbox" id="coverage" checked><spawn style="position:absolute; top:0px; left:20px;">coverage</spawn>
            </label>
        </div>
        <div style= "position:absolute; width:380px; height:26px; left:420px; top:2px; background-color:rgba(100,100,100,0.15); border-radius:6px;">
            <label style="position:absolute; width:160px; height:18px; left:10px; top:4px;">
                <input type="checkbox" id="chk_mdl" checked><spawn style="position:absolute; top:2px; left:20px;">GSM Temp</spawn>
            </label>
            <select id="mdl_lv" style="position:absolute; width:50px; left:100px; top:4px; height:18px;">
                <option value="100">100</option>
                <option value="150">150</option>
                <option value="200">200</option>
                <option value="250">250</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600</option>
                <option value="700">700</option>
                <option value="850">850</option>
                <option value="925" selected>925</option>
                <option value="1000">1000</option>
            </select>
            <select id="mdl_bt" style="position:absolute; width:100px; left:160px; top:4px; height:18px;"></select>
            <select id="mdl_vt" style="position:absolute; width:100px; left:270px; top:4px; height:18px;"></select>
        </div>
        <div style= "position:absolute; width:326px; height:26px; left:810px; top:2px; background-color:rgba(100,100,220,0.15); border-radius:6px;">
            <button id="tc_0" class="time_button" style="left:10px;">|＜</button>
            <button id="tc_1" class="time_button" style="left:46px;">＜</button>
            <button id="tc_2" class="time_button" style="left:82px;">▶</button>
            <button id="tc_3" class="time_button" style="left:118px;">＞</button>
            <button id="tc_4" class="time_button" style="left:154px;" disabled>＞|</button>
            <label style="position:absolute; width:160px; height:18px; left:200px; top:6px;">pitch</label>
            <select id="pitch" style="position:absolute; width:80px; left:234px; top:4px; height:18px;">
                <option value='600'>10 min</option>
                <option value='1800'>30 min</option>
                <option value='3600' selected>1 hour</option>
                <option value='7200'>2 hour </option>
                <option value='10800'>3 hour </option>
                <option value='21600'>6 hour </option>
            </select>
        </div>
        
        <a href="../doc/reference/sample_code/timecontrol.html" target="_blank" style="position:absolute; right:40px; top:8px;" >Document</a>
        <div id="map_canvas" style="position:absolute; top:30px; bottom:10px; left:10px; right:10px;"></div>
        
        <div id="title" style="position:absolute; top:36px; left:16px; padding:10px; font-size:16px;
            border-radius:6px; background-color:rgba(255,255,255,0.5);"></div>

        <script type="text/javascript">
            // Mapの初期画角
            var initial_lat = 35.65;
            var initial_lon = 140.045;
            var initial_zoom = 5;

            var conf_path = "./pri/conf";     // ローカルの sample_data用コンフィグを用いる
            
            // Setup Google Maps
            var map_canvas = document.getElementById('map_canvas');
            var g_map = new google.maps.Map(map_canvas, {
                zoom: initial_zoom,
                minZoom: 3,
                maxZoom: 8,
                center: new google.maps.LatLng(initial_lat, initial_lon),
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                draggableCursor: "default",
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            WRAP.Geo.setGoogleMaps(g_map)

            // Radar
            var data_id = ["WX_JP_Radar","WX_AU_Radar","WX_EU_Radar","WX_KR_Radar","WX_US_Radar"];
            var radar_data = [];      // データオブジェクト
            var radar_layer = [];     // レイヤー
            var current = -1;         // 現在選択中のエレメント・インデックス
            
            WRAP.DH.conf_path = conf_path+"/data";
            for ( var i = 0 ; i < data_id.length ; i++ ) {
                radar_data[i] = WRAP.DH.addObject(data_id[i]);
                
                radar_data[i].inspect(function(ref) {
                    var index = radar_data.indexOf(ref);
                    if ( current == index )
                        setRadarValidtime();
                });
                radar_layer[i] = new WRAP.Geo.Layer(data_id[i]);
                radar_layer[i].hide();
            }
        
            // Model
            var gsm_data = WRAP.DH.addObject("Model_GSM");
            
            var fill_layer = new WRAP.Geo.Layer("TMP");
            var contour_layer = new WRAP.Geo.Layer("TMPContour");
         
            // validtime決定ロジックのカストマイズ例
            // 下記処理を有効化すると、GSMは DisplayTime直後のValidtimeを選択するようになります。
            /*
            gsm_data.validate(function(display_time, data, content) {
                // display_time に対応する最適な content.validtimeを決定する。
                if ( !content )
                    return false;
                              
                // dataから timelistを取得する
                var timelist = data.query("timelist").value();
                // 現在設定されている basetimeの validtime配列を取得
                var validtime;
                if ( timelist && content.basetime ) {
                    for ( var i = 0 ; i < timelist.length ; i++ ) {
                        if ( timelist[i].basetime == content.basetime ) {
                          validtime = timelist[i].validtime;
                          break;
                        }
                    }
                }
                if ( validtime ) {
                    // validtime配列から display_time直後の validtimeを選択してcontentに設定
                    validtime = validtime.sort(function(a,b){
                        if( a > b ) return -1;
                        if( a < b ) return 1;
                        return 0;
                    });
                    for ( var i = 0 ; i < validtime.length ; i++ ) {
                        if ( validtime[i] >= display_time
                        && ((i==validtime.length-1) || validtime[i+1] < display_time) ) {
                              content.validtime = validtime[i];
                              return true;
                        }
                    }
                }
                // 適切な validtimeがなかったので、fasleをリターンしてレイヤーをクリアする
                content.validtime = null;
                return false;
            });
            */
        
            // レイヤー登録
            WRAP.Geo.setLayer({upper_layers:radar_layer.concat([contour_layer, fill_layer])});

            // Configure Layers
            var conf_dir = "./pri/conf";
            $.when(
                $.getJSON(conf_dir + '/layer/Radar.json'),
                $.getJSON(conf_dir + '/layer/GPVFillSample.json'),
                $.getJSON(conf_dir + '/layer/GPVContourSample.json')
            ).done(function(radar_conf, fill_conf, contour_conf) {
                for ( var i = 0 ; i < data_id.length ; i++ )
                   radar_layer[i].configure(radar_data[i], radar_conf[0]);
                fill_layer.configure(gsm_data, fill_conf[0]);
                contour_layer.configure(gsm_data, contour_conf[0]);
                   
                time_controller.setDisplayTime("20161206T000000");
            });
            
            function timeString(tm, year) {
                if ( !tm )
                    return (year?"----/":"")+"--/-- --:--";
                var ts = year?(tm.substr(0,4)+"/"):"";
                return ts+tm.substr(4,2)+"/"+tm.substr(6,2)+" "+tm.substr(9,2)+":"+tm.substr(11,2);
            }
        
            // タイムコントローラを作成し、時間管理を移譲するレイヤーを登録する
            var time_controller = new WRAP.Geo.TimeController();
            for ( var i = 0 ; i < data_id.length ; i++ )
                time_controller.addLayer(radar_layer[i]);   // レーダーレイヤーをタイムコントローラに登録
            time_controller.addLayer(fill_layer);           // モデルレイヤーをタイムコントローラに登録
            time_controller.addLayer(contour_layer);        // モデルレイヤーをタイムコントローラに登録
            
            // アニメーションコントローラ
            var animation = new WRAP.Geo.Animation();
            
            // アニメーション範囲を設定（12/6 0000Zから 12/7 0000Zまで 60分（3600秒）毎のフレームを 1.0秒間隔で表示）
            var dt_list;
            function updateTimeControlRange() {
                var pitch = $('#pitch').val();
                dt_list = animation.setValidTimeRange("20161206T000000", "20161207T000000", pitch, 1.0);
            }
            updateTimeControlRange();
        
            // 現在の DisplayTime、ContentTimeをタイトルに表示
            function updateDisplayTime() {
                var dt = time_controller.displayTime();
                var title = "<span style='color:blue;'>DisplayTime : "+timeString(dt, true) + "</span>";
                for ( var i = 0 ; i < radar_layer.length ; i++ ) {
                    if ( radar_layer[i].visible() ) {
                        var content = radar_layer[i].get();
                        if ( title.length )
                            title += "<br/>";
                        title += "<span>"+data_id[i] + " " + "VALID:" + timeString(content&&content.validtime)+"</span>";
                        if ( content )
                            $("#validtime").val(content.validtime);
                    }
                }
                if ( fill_layer.visible() ) {
                    var content = fill_layer.get();
                    if ( title.length )
                        title += "<br/>";
                    title += "<span>GSM Temp " +
                             "BASE:" + timeString(content&&content.basetime)+" "+
                             "VALID:" + timeString(content&&content.validtime)+"</span>";
                    if ( content && content.validtime ) {
                        for ( var i = 0 ; i < time_range.gsm.length ; i++ ) {
                            if ( time_range.gsm[i].validtime == content.validtime ) {
                                $("#mdl_vt").val(i);
                                break;
                            }
                        }
                    }
                    else {
                        $("#mdl_vt").val(-1);
                    }
                }
                
                $('#title').html(title);
                updateTimeControl();
            }
        
            // レーダーのコンテンツ更新
            function updateRadarContent() {
                if ( $('#chk_radar').prop('checked') ) {
                    if ( current >=0 ) {
                        var vt = $("#validtime").val();
                        if ( vt ) {
                            // Validtimeの設定
                            radar_layer[current].set({
                                validtime:vt
                            });
                            time_controller.setDisplayTime(vt);
                        }
                        // レイヤースタイルの設定 
                        var coverage = $('#coverage').prop('checked');
                        radar_layer[current].setStyle(coverage?'default':'clear_coverage');
                        radar_layer[current].show();
                    }
                }
                else {
                    radar_layer[current].hide();
                }
                updateDisplayTime();
            }

            // レーダーを選択 表示レイヤーを切り替え
            function setRadarElement(index) {
                if ( current != index ) {
                    if ( current >= 0 )
                        radar_layer[current].hide();
                    current = index;
                    setRadarValidtime();
                    updateRadarContent();
                    radar_layer[current].show();
                }
                updateDisplayTime();
            }

            // レーダーUIのセットアップ
            for ( var i = 0 ; i < data_id.length ; i++ ) {
                $('#element').append("<option value="+i+">"+data_id[i]+"</option>");
            }
        
            // レーダー選択要素の タイムリスト設定
            function setRadarValidtime() {
                var validtime;
                if ( current >= 0 ) {
                    var tl = radar_data[current].query("validtime").value();
                    if ( tl && tl.length )
                        validtime = tl;
                }
                $("#validtime").html("");
                if ( validtime && validtime.length ) {
                    $("#validtime").prop('disabled', false);
                    for ( var i = 0 ; i < validtime.length ; i++ ) {
                        var vt = validtime[i];
                        var t = timeString(vt);
                        $("#validtime").append("<option value='"+vt+"'>"+t+"</option>");
                    }
                    $("#validtime").val(validtime[validtime.length-1]);
                    updateRadarContent();
                }
                else {
                    $("#validtime").prop('disabled', true);
                }
                updateDisplayTime();
            }
        
            $('#coverage').click(function() {
                updateRadarContent();
            });
            
            $('#element').change(function() {
                setRadarElement($(this).val());
            });
            
            $('#validtime').change(function() {
                updateRadarContent();
            });
            
            $('#chk_radar').click(function() {
                updateRadarContent();
            });

            // モデルのタイムリスト取得＆UIセットアップ
            var time_range = { gsm:[] };
            var gsm_timelist;
            
            function updateModelContent() {
                if ( $('#chk_mdl').prop('checked') ) {
                    var time_index = parseInt($("#mdl_vt").val());
                    var tmp_content = {
                        element:"TMP",
                        level:$("#mdl_lv").val(),
                        basetime:time_range.gsm[time_index].basetime,
                        validtime:time_range.gsm[time_index].validtime
                    };
                    time_controller.setDisplayTime(time_range.gsm[time_index].validtime);
                    
                    fill_layer.set(tmp_content);
                    fill_layer.setStyle("gradation");
                    contour_layer.set(tmp_content);
                    fill_layer.show();
                    contour_layer.show();
                    $("#mdl_bt").prop('disabled', false);
                    $("#mdl_vt").prop('disabled', false);
                    $("#mdl_lv").prop('disabled', false);
                }
                else {
                    fill_layer.hide();
                    contour_layer.hide();
                    $("#mdl_bt").prop('disabled', true);
                    $("#mdl_vt").prop('disabled', true);
                    $("#mdl_lv").prop('disabled', true);
                }
                updateDisplayTime();
            }
            
            function updateModelTime() {
                $("#mdl_vt").html("");
                var timelist = gsm_data.query("timelist").value();
                if ( !timelist && !timelist )
                    return;
                var b = $("#mdl_bt").val();
                var bt = timelist[b].basetime;
                var num = timelist[b].validtime.length;
                for ( var i = 0 ; i < num ; i++ ) {
                    var tm = timelist[b].validtime[i];
                    var ts = timeString(tm)+"Z";
                    $("#mdl_vt").append("<option value='"+i+"'>"+ts+"</option>");
                    time_range.gsm[i] = {basetime:bt, validtime:tm};
                }
                updateDisplayTime();
            }
            gsm_data.inspect(function(ref) {
                time_range.gsm = [];
                var timelist = ref.query("timelist").value();
                if ( timelist && timelist.length ) {
                    $("#chk_mdl").prop('disabled', false);
                    $("#mdl_bt").html("");
                    $("#mdl_vt").html("");
                    gsm_timelist = timelist;
                    for ( var i = 0 ; i < timelist.length ; i++ ) {
                        var bt = timelist[i].basetime;
                        var basetime = timeString(bt)+"Z";
                        $("#mdl_bt").append("<option value='"+i+"'>"+basetime+"</option>");
                    }
                    $("#mdl_bt").val(timelist.length-1);
                    updateModelTime();
                    var vl = gsm_timelist[gsm_timelist.length-1].validtime;
                    $("#mdl_vt").val(vl.length-1);
                    updateModelContent();
                    updateDisplayTime();
                }
            }, true);

            $('#chk_mdl').click(function() {
                updateModelContent();
            });
            
            $('#mdl_lv').change(function() {
                updateModelContent();
            });
                                
            $('#mdl_bt').change(function() {
                updateModelTime();
                var index = $('#mdl_bt').val();
                var vl = gsm_timelist[index].validtime;
                $("#mdl_vt").val(vl.length-1);
                updateModelContent();
            });
                                 
            $('#mdl_vt').change(function() {
                updateModelContent();
            });
            
            // 時間選択、アニメーション操作
            function updateTimeControl() {
                var index = timeIndex(time_controller.displayTime());
                if ( index == dt_list.length-1 )
                    $("#tc_2").html("▶");
                var animating = ($("#tc_2").html() == "■");
                $("#tc_0").prop('disabled', animating||index<=0 );
                $("#tc_1").prop('disabled', animating||index<=0 );
                $("#tc_2").prop('disabled', index<0||index>=dt_list.length-1 );
                $("#tc_3").prop('disabled', animating||index<0||index>=dt_list.length-1 );
                $("#tc_4").prop('disabled', animating||index<0||index>=dt_list.length-1 );
                $('#element').prop('disabled', animating);
                $('#validtime').prop('disabled', animating);
                $('#mdl_lv').prop('disabled', animating);
                $('#mdl_bt').prop('disabled', animating);
                $('#mdl_vt').prop('disabled', animating);
                $('#pitch').prop('disabled', animating);
            }
        
            function timeIndex(t) {
                if ( dt_list.length ) {
                    if ( t < dt_list[0].validtime )
                        return 0;
                    for ( var i = 0 ; i < dt_list.length ; i++ ) {
                        if ( dt_list[i].validtime <= t
                         && (i==dt_list.length-1 || t < dt_list[i+1].validtime) )
                            return i;
                    }
                }
                return -1;
            }
        
            $("#tc_0").click(function() {
                // validtimeを最初に設定
                time_controller.setDisplayTime(dt_list[0].validtime);
                updateDisplayTime();
            });
            $("#tc_1").click(function() {
                // validtimeを一つ前に設定
                var index = timeIndex(time_controller.displayTime());
                if ( index > 0 )
                    time_controller.setDisplayTime(dt_list[index-1].validtime);
                updateDisplayTime();
            });
            $("#tc_2").click(function() {
                if ( $(this).html() == "▶" ) {
                    var index = parseInt($("#gs_vt").val());
                    // アニメーションの開始
                    animation.setTime({validtime:time_controller.displayTime()});   // 最初のフレーム（Validtime）を設定
                    animation.start(function(time) {                                // アニメーション開始
                        // フレーム（時間）変化毎にコールバックされるので UIの時間表示を更新
                        time_controller.setDisplayTime(time.validtime);
                        updateDisplayTime();
                    });
                    // プレイボタンを停止ボタンに変更
                    $(this).html("■");
                    $('#validtime').prop('disabled', true);
                    $('#mdl_bt').prop('disabled', true);
                    $('#mdl_vt').prop('disabled', true);
                    $('#tc_0').prop('disabled', true);
                    $('#tc_1').prop('disabled', true);
                    $('#tc_3').prop('disabled', true);
                    $('#tc_4').prop('disabled', true);
                }
                else {
                    // アニメーションの終了
                    animation.stop();
                    // 停止ボタンをプレイボタンに変更
                    $(this).html("▶");
                    updateDisplayTime();
                }
            });
            $("#tc_3").click(function() {
                // validtimeを一つ後に設定
                var index = timeIndex(time_controller.displayTime());
                if ( index >= 0 && index < dt_list.length-1 )
                    time_controller.setDisplayTime(dt_list[index+1].validtime);
                updateDisplayTime();
            });
            $("#tc_4").click(function() {
                // validtimeを最後に設定
                time_controller.setDisplayTime(dt_list[dt_list.length-1].validtime);
                updateDisplayTime();
            });

            $("#pitch").change(function() {
                updateTimeControlRange();
            });

            // 初期状態設定
            setRadarElement(0);
            
        </script>
    </body>
```

