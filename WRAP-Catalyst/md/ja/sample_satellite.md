# Global Satellite サンプルコード

## URL	

* http://pt-wrap01.wni.co.jp/Mercury/sample/satellite.html


## 機能

* satdbから全球雲画像データのタイムリストおよび画像タイルを取得して表示を行います。
* 現在取得しているデータキー

                "WNI_ANLSIS_SAT_WORLD_WV",

                "WNI_ANLSIS_SAT_WORLD_IR",

                "WNI_ANLSIS_SAT_WORLD_CLDTOP"

* IRではレイヤーコンフィグに定義したパレットにより色変換を行っています。
* CLDTOPではマウス位置の雲頂高度を計算してツールチップに表示する事例を実装しています。

## サンプル構成

データコンフィグ

sample/pri/conf/data/WNI_ANLSIS_SAT_WORLD_WV.json

＊各データのコンフィグはデータキー部分が異なるのみで同一です。

```
{
    "Name" : "WNI_ANLSIS_SAT_WORLD_WV",
    "DataHandler" : "TMS",
    "Attributes" : {
        "TimeList" : "https://shoji:qwerty@satdb-test.wni.co.jp/buckets/WNI_ANLSIS_SAT_WORLD_WV/keys/list",
        "File" : "https://shoji:qwerty@satdb-test.wni.co.jp/buckets/WNI_ANLSIS_SAT_WORLD_WV_%validtime%/keys/%z%_%y%_%x%.png",
        "API" : "satdb",
        "DataGrid" : {
            "MinZoom" : 0,
            "MaxZoom" : 6,
            "YCoordinate" : -1
        },
        "UpdateInterval" : 300
    }
}
```

TimeList：satdbサーバーの「有効DB一覧取得」API-URLを記載します。

File：satdbサーバーの「画像取得」URLを記載。validtime、z、y、x部分は実行時に決定するので、％％で囲んで指定します。

DataGrid.MinZoomおよびMaxZoom：satdbサーバーの「最大ズームレベル」APIにより事前に確認した最小、最大ズームレベルを記載します。

DataGrid.YCoordinate：satdbのタイルのYインデックスがTMS標準と逆になっているため、−1を指定します。

API：”satdb”と記載します。

タイムリスト形式が WRAP標準と異なるため、API指定を参照して専用処理にディスパッチしてデータを読み替えています。




レイヤーコンフィグ

sample/pri/conf/layer/Satellite.json（WV、CLDTOP共用）

```
{
    "Name" : "Satellite",
    "Renderer" : "Image",
    "Attributes" : {
        "style" : {
            "default" : {
              "type" : "filter",
              "opacity" : 0.5
            }
        }
    }
}
```

画像変換のフィルタ（filter）を指定して、不透明度（opacity）を 0.5を設定しています。

sample/pri/conf/layer/SatelliteIR.json（IR用）

```
{
    "Name" : "SatelliteIR",
    "Renderer" : "Image",
    "Attributes" : {
        "style" : {
            "default" : {
                "type" : "grayscale_palette",
                "palette" : [
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,0],
                    [255,255,255,17],
                    [255,255,255,25],
                    [255,255,255,34],
                    [255,255,255,34],
                    [255,255,255,34],
                    [255,255,255,34],
                    [255,255,255,42],
                    [255,255,255,42],
                    [255,255,255,42],
                    [255,255,255,42],
                    [255,255,255,51],
                    [255,255,255,51],
                    [255,255,255,51],
                    [255,255,255,51],
                    [255,255,255,51],
                    [255,255,255,59],
                    [255,255,255,59],
                    [255,255,255,59],
                    [255,255,255,59],
                    [255,255,255,59],
                    [255,255,255,59],
                    [255,255,255,59],
                    [255,255,255,59],
                    [255,255,255,59],
                    [254,255,255,68],
                    [254,255,255,68],
                    [254,255,255,68],
                    [254,255,255,68],
                    [254,255,255,68],
                    [254,255,255,68],
                    [254,255,255,68],
                    [254,255,255,68],
                    [254,255,255,68],
                    [254,255,255,68],
                    [254,255,255,68],
                    [254,255,255,102],
                    [254,255,255,102],
                    [254,255,255,102],
                    [254,255,255,102],
                    [254,255,255,102],
                    [254,255,255,102],
                    [254,255,255,102],
                    [254,255,255,102],
                    [254,255,255,102],
                    [254,255,255,148],
                    [254,255,255,148],
                    [254,255,255,148],
                    [254,255,255,148],
                    [254,255,255,148],
                    [254,255,255,148],
                    [254,255,255,148],
                    [254,255,255,148],
                    [254,255,255,148],
                    [254,255,255,148],
                    [193,210,87,153],
                    [193,210,87,153],
                    [193,210,87,153],
                    [193,210,87,153],
                    [193,210,87,153],
                    [193,210,87,153],
                    [193,210,87,153],
                    [193,210,87,153],
                    [255,255,0,153],
                    [255,255,0,153],
                    [255,255,0,153],
                    [255,255,0,153],
                    [255,255,0,153],
                    [255,255,0,153],
                    [255,255,0,153],
                    [255,255,0,153],
                    [255,255,0,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [223,102,102,153],
                    [212,0,0,153],
                    [212,0,0,153],
                    [212,0,0,153],
                    [212,0,0,153],
                    [212,0,0,153],
                    [212,0,0,153],
                    [212,0,0,153],
                    [212,0,0,153],
                    [212,0,0,153],
                    [212,0,0,153],
                    [212,0,0,153],
                    [212,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153],
                    [0,0,0,153]
                ]
            }
        }
    }
}
```

グレースケールパレット（grayscale_palette）を指定してオリジナルデータの0〜255に対応した変換色を設定しています。

現在 Imageレンダラーでサポートしている styleは以下です。

・type：filter

```
              "opacity" : 0.5　　　　不透明度を指定（0が完全透明、1が不透過）
              "rgb_offset" : 50　　 輝度調整値を指定（各画素の r,g,b値に指定値が加算され、0−255にクランプされます）
```

・type：grayscale_palette
              
```
                "palette" : [
                    [255,255,255,0],		// gray=0を置き換える色[r,g,b,a]
                    [255,255,255,0],		// gray=1を置き換える色
                    [255,255,255,0],		// gray=2を置き換える色
                         :
                    [255,255,255,8],		// gray=22を置き換える色
                    [255,255,255,8],		// gray=23を置き換える色
                    [255,255,255,8],
                    [255,255,255,8],
                         :
                    [193,210,87,153],		// gray=86を置き換える色
                    [193,210,87,153],		// gray=87を置き換える色
                         :
                    [254,255,255,102],		// gray=95を置き換える色
                         :
                    [0,0,0,153],		    // gray=254を置き換える色
                    [0,0,0,153]  		    // gray=255を置き換える色
                ]
            
                grayscaleで与えられるオリジナルデータの0〜255値に対応する色 [r,g,b,a]を配列で指定します。
                配列の要素数は256である必要があります。
```

・type：rgb_palette
              
```
                "palette" : [[[128,128,128],[0,0,0,0]]]

                オリジナルデータの [r,g,b]と書き換える [r,g,b,a]のペアを配列で指定します。
                上記は、r=g=b=128の画素を透明の黒r=g=b=a=0に置き換えるような設定です。
                色のペアは配列に複数記載することができますが、件数が多くなると描画パフォーマンスが劣化します。
```

その他特殊な画像変換を行う場合は、新たにレンダラーを作成し Rendererの項に指定します。


## サンプル処理内容

各データ要素毎に、WRAP.DH.addObject()でデータオブジェクトとレイヤーを作成します。

それぞれのレイヤーに configure()関数を用いて、データオブジェクトとレイヤーコンフィグをアタッチします。

プルダウンリストによりデータが切り替えられた場合は、レイヤー表示を切り替え、Validtimeのリストを再構築します。

Validtimeが変更された場合は、レイヤーのset()関数によりコンテンツを指定し表示を更新します。


```
    <body style="width:100%; height:100%; margin:0; padding:0; background-color:rgb(255,255,255);">
        <div style="color:black; position:absolute; left:20px; top:8px;">Global Satellite</div>
        <select id="element" style="position:absolute; width:240px; left:160px; top:6px; height:18px;"></select>
        <select id="validtime" style="position:absolute; width:110px; left:410px; top:6px; height:18px;"></select>
        <label style="position:absolute; width:260px; height:18px; left:540px; top:6px;">
            <input type="checkbox" id="cloudtop" ><spawn id="label" style="position:absolute; top:2px; left:20px;">Cloud Top Tooltip</spawn>
        </label>
        <a href="../doc/reference/sample_code/satellite.html" target="_blank" style="position:absolute; right:40px; top:8px;" >Document</a>
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
            
            // map_canvasに対するマウス操作監視を登録
            WRAP.Geo.setInteraction(map_canvas);
            
            var wv = 0, ir = 1, cldtop = 2;
            var data_id = [
                "WNI_ANLSIS_SAT_WORLD_WV",
                "WNI_ANLSIS_SAT_WORLD_IR",
                "WNI_ANLSIS_SAT_WORLD_CLDTOP"
            ];
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
            $.getJSON(conf_dir + '/layer/Satellite.json', function() {}).
            success(function(conf) {
                layer[wv].configure(data[wv], conf);
                layer[cldtop].configure(data[cldtop], conf);
            }).
            error(function(jqXHR, textStatus, errorThrown) {
                console.log("Satellite Layer configuration file load error : " + textStatus);
            });
            $.getJSON(conf_dir + '/layer/SatelliteIR.json', function() {}).
            success(function(conf) {
                layer[ir].configure(data[ir], conf);
            }).
            error(function(jqXHR, textStatus, errorThrown) {
                console.log("WNI_ANLSIS_SAT_WORLD_IR Layer configuration file load error : " + textStatus);
            });
            
            // UI の内容から現在のレイヤーに表示コンテンツをセット
            function updateContent() {
                if ( current >=0 ) {
                    var vt = $("#validtime").val();
                    if ( vt ) {                     // Validtimeの設定
                        layer[current].set({
                            validtime:vt
                        });
                    }
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
                if ( index == cldtop ) {
                    $('#cloudtop').prop('disabled', false);
                    $('#label').css('color', 'black');
                }
                else {
                    $('#cloudtop').prop('disabled', true);
                    $('#label').css('color', 'gray');
                }
            }
        
            // マウス・インタラクション監視
            WRAP.Geo.addEventHandler('touch', function(layer, feature, sp) {
                if ( feature && feature.data ) {
                    var msg = "clicked : "+feature.data;
                    console.log(msg);
                }
            });
            WRAP.Geo.addEventHandler('mouseover', function(layer, feature, sp) {
                if ( feature && feature.data )
                    console.log("mouseover : "+feature.data);
            });
            WRAP.Geo.addEventHandler('mouseout', function(layer, feature, sp) {
                if ( feature && feature.data )
                    console.log("mouseout : "+feature.data);
            });
                                                                                   
            // ツールチップ
            layer[cldtop].setTooltip(function(geo, data) {
                if ( !$('#cloudtop').prop('checked') )
                    return null;
                                     
                if ( geo ) {
                    var prop = geo.properties;
                    if ( prop ) {
                        var v = val = prop.data[0];
                        if ( v > 117 ) {
                            // 160.57217 * (Val - 117) + 60.96	で、階調値をmに変換
                            var v = 160.57217 * (val - 117) + 60.96;
                            v *=3.281;	// mからftに変換
                            return Math.round(v)+"ft";
                        }
                    }
                                     
                }
                return "--ft";
            });

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

```
                    var vt = $("#validtime").val();
                    if ( vt ) {                     // Validtimeの設定
                        layer[current].set({
                            validtime:vt
                        });
                    }
```

### CLoud Topツールチップの表示について

CLDTOPレイヤーに対して setTootip()関数いによりツールチップコンテンツを返すハンドラを設定しています。

Imageレンダラにより描画されるレイヤーは、setTooltip()ハンドラ内でマウス位置のピクセルデータ（パレット適用前のオリジナル値）を参照することができます。

ハンドラ引数の geoは次のような構造を持っています。

```
                geo : {
                    geometry: {
                        type: "Point",
                        coordinates: [（マウス地点の経度）, （マウス地点の緯度]
                    },
                    properties: {
                        data:[(マウス地点 R値), (マウス地点 G値), (マウス地点 B値), (マウス地点 A値)]
                    }
                }
```

マウス地点の パレット適用された描画色ではなくオリジナルデータの値です。

グレースケール画像の場合は、R=G=Bとなるため、本サンプルでは、geo.properties.data[0]を参照し雲頂高度を計算しています。

```
            // ツールチップ
            layer[cldtop].setTooltip(function(geo, data) {
                if ( !$('#cloudtop').prop('checked') )  // チェックボックス Onの時のみ表示
                    return null;
                                     
                if ( geo ) {
                    var prop = geo.properties;
                    if ( prop ) {
                        var v = val = prop.data[0]; // マウス位置のオリジナルデータ
                        if ( v > 117 ) {
                            // 160.57217 * (Val - 117) + 60.96	で、階調値をmに変換
                            var v = 160.57217 * (val - 117) + 60.96;
                            v *=3.281;	// mからftに変換
                            return Math.round(v)+"ft";
                        }
                    }
                                     
                }
                return "--ft";
            });
```

