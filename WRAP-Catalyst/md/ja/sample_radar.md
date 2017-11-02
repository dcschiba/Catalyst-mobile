# Radar サンプルコード

## URL	

* http://pt-wrap01.wni.co.jp/Mercury/sample/radar.html


## 機能

* TMS形式のレーダータイルの表示を行います。
* タイル画像をダイレクトに表示するモードと、r=g=b=128ので示されるカバレッジ領域を透明化するモードの２つのスタイルをコンフィグ定義しアプリケーションからレイヤースタイルの切り替えを行います。

## サンプル構成

サンプルデータ

sample/pri/data/WX_AU_Radar

sample/pri/data/WX_EU_Radar

sample/pri/data/WX_JP_Radar

sample/pri/data/WX_KR_Radar

sample/pri/data/WX_US_Radar


各ディレクトリ直下にタイムリスト（index.json）を配置しています。


index.json

新しい順に validtimeが配列に格納されます。

```
{ 
  "validtime": [
    "20161205T235500",
    "20161205T235000",
    "20161205T234500",
    "20161205T234000",
    "20161205T233500",
    "20161205T233000",
    "20161205T232500",
    "20161205T232000",
    "20161205T231500",
    "20161205T231000",
    "20161205T230500",
    "20161205T230000",
    "20161205T225500",
    　　：
    "20161205T002000",
    "20161205T001500",
    "20161205T001000",
    "20161205T000500",
    "20161205T000000"
  ]
}
```

データコンフィグ

sample/pri/conf/data/WX_JP_Radar.json

sample/pri/conf/data/WX_US_Radar.json

　　：

＊各データのコンフィグはデータキー部分が異なるのみで同一です。

```
{
    "Name" : "WX_JP_Radar",
    "DataHandler" : "TMS",
    "Attributes" : {
        "TimeList" : "./pri/data/WX_JP_Radar/index.json",
        "File" : "./pri/data/WX_JP_Radar/%validtime%/%z%/%x%/%y%.png",
        "DataGrid" : {
            "MinZoom" : 0,
            "MaxZoom" : 5,
            "BoundingBox" : {
                "West":118.00000000000000,
                "South":19.99482396966169,
                "East":149.99687754060804,
                "North":48.00000000000001
            }
        },
        "UpdateInterval" : 300
    }
}
```

TileList：タイムリストの配置パスを指定します。

File：TMSタイルの配置パスを指定します。validtime、z、y、x部分は実行時に決定するので、％％で囲んで指定します。

DataGrid.MinZoomおよびMaxZoom：各データの最小、最大ズームレベルを事前にしらべ記載します。（最大ズームより大きなズームレベルを表示する場合最大ズームタイルを拡大して表示が行われます）

DataGrid.BoundingBox：タイルの座標範囲を事前に調べ記載します。範囲外のタイルをロードしません。BoundingBox定義を省略した場合範囲チェックが省略されすべての可視タイルのロードを試みます。



レイヤーコンフィグ

sample/pri/conf/layer/Radar.json

各データ共通です。

```
{
    "Name" : "Radar",
    "Renderer" : "Image",
    "Attributes" : {
        "style" : {
            "default" : {
                "type" : "rgb_palette",
                "palette" : [[[255,255,255],[128,128,128,128]]],
                "alternative_color" : [128,128,128,128]
            },
            "clear_coverage" : {
                "type" : "rgb_palette",
                "palette" : [[[255,255,255],[0,0,0,0]]],
                "alternative_color" : [128,128,128,128]
            }
        }
    }
}
```

画像を無変換で表示する「default」とカバレッジ部分を透過させる「clear_coverage」の二つの styleを定義しています。

アプリケーションは、layer.setStyle()でどちらかのスタイル名を指定することで表示スタイルを切り替えることができます。

・rgb_paletteフィルタについて
              
```
                "palette" : [[[255,255,255],[128,128,128,128]]],

                オリジナルデータの [r,g,b]と書き換える [r,g,b,a]のペアを配列で指定します。
                上記は、r=g=b=255の画素を透明の黒r=g=b=a=128に置き換えるような設定です。
                色のペアは配列に複数記載することができますが、件数が多くなると描画パフォーマンスが劣化します。
```

・alternative_colorについて

領域の超複する複数のレーダーレイヤーの内容をマージして表示する場合に、カバレッジ部分をデータ領域に表示しないための設定です。

詳細は、ハイブリッドレーダーサンプルおよびドキュメントを参照してください。

http://pt-wrap01.wni.co.jp/Mercury/sample/hybrid_radar.html

## サンプル処理内容

各データ要素毎に、WRAP.DH.addObject()でデータオブジェクトとレイヤーを作成します。

それぞれのレイヤーに configure()関数を用いて、データオブジェクトとレイヤーコンフィグをアタッチします。

プルダウンリストによりデータが切り替えられた場合は、レイヤー表示を切り替え、Validtimeのリストを再構築します。

Validtimeが変更された場合は、レイヤーのset()関数によりコンテンツを指定し表示を更新します。

coverageのチェックボックス状態に応じて、setStyle()によりレイヤーの表示スタイルを設定します。

```
    <body style="width:100%; height:100%; margin:0; padding:0; background-color:rgb(255,255,255);">
        <div style="color:black; position:absolute; left:20px; top:8px;">Radar</div>
        <select id="element" style="position:absolute; width:110px; left:100px; top:6px; height:18px;"></select>
        <select id="validtime" style="position:absolute; width:110px; left:230px; top:6px; height:18px;"></select>
        <label style="position:absolute; width:60px; height:18px; left:360px; top:6px;">
            <input type="checkbox" id="coverage" checked><spawn style="position:absolute; top:2px; left:20px;">coverage</spawn>
        </label>

        <div id="map_canvas" style="position:absolute; top:30px; bottom:10px; left:10px; right:10px;"></div>

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
            
            //var data_id = ["WX_JP_Radar"];
            var data_id = ["WX_JP_Radar","WX_AU_Radar","WX_EU_Radar","WX_KR_Radar","WX_US_Radar"];
            var data = [];      // データオブジェクト
            var layer = [];     // レイヤー
            var current = -1;   // 現在選択中のエレメント・インデックス
            
            WRAP.DH.conf_path = conf_path+"/data";
            for ( var i = 0 ; i < data_id.length ; i++ ) {
                data[i] = WRAP.DH.addObject(data_id[i]);
                
                data[i].inspect(function(ref) {
                    var index = data.indexOf(ref);
                    if ( current == index )
                        setValidtime();
                });
                layer[i] = new WRAP.Geo.Layer(data_id[i]);
                layer[i].hide();
            }
            
            WRAP.Geo.setLayer({upper_layers: layer});

            // Configure Layers
            var conf_dir = "./pri/conf";
            $.when(
                $.getJSON(conf_dir + '/layer/Radar.json')
            ).done(function(conf) {
                for ( var i = 0 ; i < data_id.length ; i++ )
                   layer[i].configure(data[i], conf);
            });
            
            // UI の内容から現在のレイヤーに表示コンテンツをセット
            function updateContent() {
                if ( current >=0 ) {
                    var vt = $("#validtime").val();
                    if ( vt ) {
                        // Validtimeの設定
                        layer[current].set({
                            validtime:vt
                        });
                    }
                    // レイヤースタイルの設定 
                    var coverage = $('#coverage').prop('checked');
                    layer[current].setStyle(coverage?'default':'clear_coverage');
                }
            }

            // レーダーを選択 表示レイヤーを切り替え
            function setElement(index) {
                if ( current != index ) {
                    if ( current >= 0 )
                        layer[current].hide();
                    current = index;
                    setValidtime();
                    updateContent();
                    layer[current].show();
                }
            }

            // UIのセットアップ
            for ( var i = 0 ; i < data_id.length ; i++ ) {
                $('#element').append("<option value="+i+">"+data_id[i]+"</option>");
            }
        
            // 選択要素の タイムリスト設定
            function timeString(tm) {
                return tm.substr(4,2)+"/"+tm.substr(6,2)+" "+tm.substr(9,2)+":"+tm.substr(11,2);
            }
        
            function setValidtime() {
                var validtime;
                if ( current >= 0 ) {
                    var tl = data[current].query("validtime").value();
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
                    $("#validtime").val(validtime[0]);
                    updateContent();
                }
                else {
                    $("#validtime").prop('disabled', true);
                }
            }
        
            $('#coverage').click(function() {
                updateContent();
            });
            
            $('#element').change(function() {
                setElement($(this).val());
            });
            
            $('#validtime').change(function() {
                updateContent();
            });

            // 初期状態設定
            setElement(0);
        </script>
    </body>
```

### タイムリストの受信監視

addObjecgt()で作成したデータオブジェクトの inspect()関数でタイムリストの受信を監視します。

受信（更新）が行われると insepct()に指定したコールバックが呼び出されるので、ここでデータ（ref）からタイムリストを取り出してプルダウンリストに登録しています。

query関数でタイムリスト（validtimeの配列）を取り出します。

```
                    var tl = data[current].query("validtime").value();
```

### レイヤーへのコンテンツの設定

レイヤーにたいして set()関数を用いて表示対象の validtimeを指定します。

プルダウンリストで選択されている時間を設定します。

ここで指定した validtimeがデータコンフィグで定義した %validtime%を置き換えてデータの取得が行われます。

coverageチェックボックスの状態を調べ setStyle()によりレイヤーに表示スタイルを設定します。

```
            // UI の内容から現在のレイヤーに表示コンテンツをセット
            function updateContent() {
                if ( current >=0 ) {
                    var vt = $("#validtime").val();
                    if ( vt ) {
                        // Validtimeの設定
                        layer[current].set({
                            validtime:vt
                        });
                    }
                    // レイヤースタイルの設定 
                    var coverage = $('#coverage').prop('checked');
                    layer[current].setStyle(coverage?'default':'clear_coverage');
                }
            }
```

