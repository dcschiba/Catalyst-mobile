# Lightning サンプルコード

## URL	

* http://pt-wrap01.wni.co.jp/Mercury/sample/lightning.html


## 機能

* 雷サンプルデータ（GeoJSON）の表示
* ツールチップの表示
* ツールチップ表示状態の監視
* 画面内に表示している要素数の件数カウント＆表示
* 要素の表示状態On/Off

## サンプル構成

サンプルデータ（GeoJSON）

```
{
    "features": [
        {
            "geometry": {
                "coordinates": [
                    45.7805, 
                    11.4803
                ], 
                "type": "Point"
            }, 
            "properties": {
                "announced_date": "20161121T051500", 
                "kind": "G", 
                "obs_time": "20161121T051110938", 
                "peak_current": -314
            }, 
            "type": "Feature"
        }, 
        {
            "geometry": {
                "coordinates": [
                    45.7909, 
                    11.4767
                ], 
                "type": "Point"
            }, 
            "properties": {
                "announced_date": "20161121T051500", 
                "kind": "G", 
                "obs_time": "20161121T051110980", 
                "peak_current": 1627
            }, 
            "type": "Feature"
        }, 
        {
            "geometry": {
                "coordinates": [
                    45.9817, 
                    11.6024
                ], 
                "type": "Point"
            }, 
            "properties": {
                "announced_date": "20161121T051500", 
                "kind": "G", 
                "obs_time": "20161121T051355659", 
                "peak_current": 544
            }, 
            "type": "Feature"
        }, 
        {
            "geometry": {
                "coordinates": [
                    45.7232, 
                    11.4912
                ], 
                "type": "Point"
            }, 
            "properties": {
                "announced_date": "20161121T052000", 
                "kind": "G", 
                "obs_time": "20161121T051712892", 
                "peak_current": 1044
            }, 
            "type": "Feature"
        }, 
        {
            "geometry": {
                "coordinates": [
                    45.7326, 
                    11.5195
                ], 
                "type": "Point"
            }, 
            "properties": {
                "announced_date": "20161121T052000", 
                "kind": "G", 
                "obs_time": "20161121T051713129", 
                "peak_current": 302
            }, 
            "type": "Feature"
        }, 
        {
            "geometry": {
                "coordinates": [
                    46.0282, 
                    11.5691
                ], 
                "type": "Point"
            }, 
            "properties": {
                "announced_date": "20161121T052000", 
                "kind": "C", 
                "obs_time": "20161121T051714218", 
                "peak_current": -610
            }, 
            "type": "Feature"
        }, 
        {
            "geometry": {
                "coordinates": [
                    46.0264, 
                    11.5768
                ], 
                "type": "Point"
            }, 
            "properties": {
                "announced_date": "20161121T052000", 
                "kind": "C", 
                "obs_time": "20161121T051714243", 
                "peak_current": -293
            }, 
            "type": "Feature"
        }, 
        {
            "geometry": {
                "coordinates": [
                    46.03, 
                    11.5736
                ], 
                "type": "Point"
            }, 
            "properties": {
                "announced_date": "20161121T052000", 
                "kind": "G", 
                "obs_time": "20161121T051714310", 
                "peak_current": -199
            }, 
            "type": "Feature"
        }, 
        {
            "geometry": {
                "coordinates": [
                    46.0166, 
                    11.5401
                ], 
                "type": "Point"
            }, 
            "properties": {
                "announced_date": "20161121T052000", 
                "kind": "C", 
                "obs_time": "20161121T051847937", 
                "peak_current": 337
            }, 
            "type": "Feature"
        }, 
        {
            "geometry": {
                "coordinates": [
                    45.8575, 
                    11.4307
                ], 
                "type": "Point"
            }, 
            "properties": {
                "announced_date": "20161121T053000", 
                "kind": "C", 
                "obs_time": "20161121T052529151", 
                "peak_current": -200
            }, 
            "type": "Feature"
        }, 
        {
            "geometry": {
                "coordinates": [
                    45.8586, 
                    11.4437
                ], 
                "type": "Point"
            }, 
            "properties": {
                "announced_date": "20161121T053000", 
                "kind": "G", 
                "obs_time": "20161121T052529287", 
                "peak_current": -136
            }, 
            "type": "Feature"
        }
    ], 
    "type": "FeatureCollection"
}
```

データコンフィグ

sample/pri/conf/data/LightningSample.json
```
{
    "Name" : "LightningSample",
    "DataHandler" : "GeoJSON",
    "Attributes" : {
        "File" : "./pri/data/Lightning/kr_lighting_latest.json",
        "UpdateInterval" : 60
    }
}
```

レイヤーコンフィグ

sample/pri/conf/layer/LightningSample.json

```
{
    "Name" : "LightningSample",
    "Renderer" : "Lightning",
    "Attributes" : {
        "style" : {
            "default" : {
                "icon_width" : 16,
                "icon_height" : 16,
                "icon_offset_x" : -8,
                "icon_offset_y" : -8,
                "icon" : [
                    { "ge":0, "lt":10, "image":"img/thunder_red.png" },
                    { "ge":10, "lt":20, "image":"img/thunder_orange.png" },
                    { "ge":20, "lt":30, "image":"img/thunder_yellow.png" },
                    { "ge":30, "lt":40, "image":"img/thunder_yellow_green.png" },
                    { "ge":40, "lt":50, "image":"img/thunder_light_blue.png" },
                    { "ge":50, "lt":60, "image":"img/thunder_blue.png" }
                ]
            }
        }
    }
}
```

## 処理内容

### データオブジェクトおよびレイヤーセットアップ
```
            // Data
            WRAP.DH.conf_path = conf_path+"/data";
            var lightning_data = WRAP.DH.addObject("LightningSample");      // データID＝コンフィグ名を指定
            
            // Layers
            var lightning_layer = new WRAP.Geo.Layer("LightningSample");    // レイヤー名称を指定（任意）
            
            WRAP.Geo.setLayer({
                upper_layers : [
                    lightning_layer
                ]
            });

            // Configure Layers            // レイヤーコンフィグをDLし、データオブジェクトとともにレイヤーに登録（configure）
            var conf_dir = "./pri/conf";
            // Configure Layers
            $.when(
                $.getJSON(conf_dir + '/layer/LightningSample.json')
            ).done(function() {
                lightning_layer.configure(lightning_data, arguments[0]);
            });

```

### ツールチップの表示

レイヤーの setTooltip関数を用いて、ツールチップ内容を編集します。

マップ上の描画要素にマウスオーバーすると、setTooltipに指定したコールバックが呼び出されます。


　callback(geo, data)

　コールバックの引数

　　geo：表示要素に対応する GeoJSONの Featureオブジェクト

　　data：表示要素が データオブジェクトに結びついている場合は、該当のデータオブジェクト

本サンプルでは、データソースは GeoJSONであり、データオブジェクトが存在しないので geoのみを引数にとっています。

コールバックが文字列（html）をリリターンした場合、指定文字列をセットしてツールチップが表示されます。

nullをリターンした場合は、ツールチップは表示されません。

```
            // Tooltip
            WRAP.Geo.setInteraction(map_canvas);
            lightning_layer.setTooltip(function(geo) {
                var p = geo && geo.properties;
                if ( p ) {
                    // GeoJSONオブジェクトから情報を取り出しツールチップ内容を作成
                    var lat = geo.geometry.coordinates[1];
                    var lon = geo.geometry.coordinates[0];
                    var ad = p.announced_date;
                    var ad_text = ad.substr(0,4)+"/"+ad.substr(4,2)+"/"+ad.substr(6,2)+" "
                                + ad.substr(9,2)+":"+ad.substr(11,2)+":"+ad.substr(13,2);
                    var ot = p.obs_time;
                    var ot_text = ot.substr(0,4)+"/"+ot.substr(4,2)+"/"+ot.substr(6,2)+" "
                                + ot.substr(9,2)+":"+ot.substr(11,2)+":"+ot.substr(13,2);
                    return "pos : "+lat+" ,"+lon+"<br>"
                         + "announced_date : "+ad_text+"<br>"
                         + "obs_time : "+ot_text+"<br>"
                         + "kind : "+p.kind+"<br>"
                         + "peak_current : "+p.peak_current;    // リターンしたHTMLがツールチップ・コンテンツとなる
                }
                tooltipStatus();    // ツールチップの状態表示関数（後述）
            });
```


### ツールチップ表示状態の監視
WRAP.Geo.currentTooltip() 関数を用いて現在表示されているツールチップの情報を取得します。

関数の戻り値

ツールチップ表示状態の場合

{

geo:ツールチップ表示対象の GeoJSON Featureオブジェクト

data:ツールチップ表示対象のデータオブジェクト（GeoJSON Featureにデータオブジェクトが結びついている場合）

contrent：ツールチップ内容（前記 setTooltipでリターンした内容）

}

ツールチップを表示していない場合

null

サンプルでは、WRAP.Geo.currentTooltip()の戻り値をチェックしてヘッダに表示状態を設定している。
```
            // ツールチップの表示/非表示状態を調べヘッダに表示
            function tooltipStatus() {
                var status = WRAP.Geo.currentTooltip();
                $('#tooltip_state').html("tooltip : "+(status?"displayed":"-"));　// 戻り値があれば表示、なければ非表示
            }
```

### 画面内に表示している要素数の件数カウント＆表示

以下の２ステップで処理を行っている。

(1) マップ画角の監視

WRAP.Geo.addEventHandler('boundsChange', function(bounds))を用いマップ画角変更を監視。

コールバックに渡されるBounds情報を保存し、表示要素のカウント処理 updateDisplayCount()を呼び出す。

(2) 表示要素のカウント処理 updateDisplayCount()

表示対象の GeoJSONデータのルートオブジェクトをaddObjectで登録したデータオブジェクトから取得

                var root = lightning_data.query("data").value();

GeoJSONの すべての Featureについて、display_flagが falseなく、座標が前記 (1)で取得した Bounds範囲内のにあるものをカウントする。

座標が Boundsに含まれるかどうかは、Boundオブジェクトの contains()関数で調べる。

```
            // 画角変化の監視
            var screen_bounds;
            WRAP.Geo.addEventHandler('boundsChange', function(bounds) {
                screen_bounds = bounds;
                updateDisplayCount();
            });

            // 画角内の表示要素をカウントしてヘッダに表示
            function updateDisplayCount() {
                if ( !screen_bounds )
                    return;
                var count = 0;
                var root = lightning_data.query("data").value();
                if ( root && root.features ) {
                    for ( var i = 0 ; i < root.features.length ; i++ ) {
                        var prop = root.features[i].properties;
                        if ( prop.display_flag === false )      // display_flagが falseのものは表示されない
                            continue;
                        var geometry = root.features[i].geometry;
                        if ( screen_bounds.contains(new WRAP.Geo.Point(geometry.coordinates[1]*60, geometry.coordinates[0]*60)) )
                            count++;　// 座標が画面内にあるので countをイクリメント
                    }
                }
                $('#display_count').html("inside the screen bounds : "+count); // 件数をヘッダに表示
            }
```

### 要素の表示状態On/Off
要素の表示On/Offは GeoJSON Featureオブジェクトの propertoes.display_flagに trueまたはfalseを設定することで制御します。

要素が画面に表示される

　propertoes.display_flagが存在しない、または、propertoes.display_flagが true

要素が画面に表示されない

　propertoes.display_flagが false

サンプルでは、雷データ要素の kind属性をチェックして、ヘッダのチェックボックス状態に応じて display_flagを設定して表示のOn/Offを行っています。

GeoJSON Featureの内容を更新した場合は、レイヤーの invalidate()関数を呼び出すことでレイヤーが再描画されます。

```
            // チェック内容に応じて要素の表示状態をOn/Offする
            function updateDisplayFlag() {
                // ヘッダのチェックボックス押下状態を取得
                var c = $('#kind_c').prop('checked');
                var g = $('#kind_g').prop('checked');
                var root = lightning_data.query("data").value();
                if ( root && root.features ) {
                    // 雷 GeoJSONの全Featureについて kind属性をチェックして、display_flagを設定
                    for ( var i = 0 ; i < root.features.length ; i++ ) {
                        var prop = root.features[i].properties;
                        // GeoJSONオブジェクトの properties.display_flagを true（表示）または false（非表示）に設定する
                        if ( c && prop.kind == "C" )
                            prop.display_flag = true;
                        else if ( g && prop.kind == "G" )
                            prop.display_flag = true;
                        else
                            prop.display_flag = false;
                    }
                }
                lightning_layer.invalidate();   // レイヤーの再描画
                updateDisplayCount();           // 表示変更したので画面内の表示件数を再カウント
            }
```
