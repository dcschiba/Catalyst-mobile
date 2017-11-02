# 緯度経度線 サンプルコード

## URL	

* http://pt-wrap01.wni.co.jp/Mercury/sample/gridline.html


## 機能

* マップ上に緯度経度線レイヤーを表示します。

## 処理概要

・レイヤーの作成

緯度経度線を描画する GridLineレンダラーの描画設定を行ったレイヤーコンフィグをレイヤーに登録します。


```
            // レイヤーの作成
            var layer = new WRAP.Geo.Layer("GridLine");

            // レイヤーを Geoに登録
            WRAP.Geo.setLayer({upper_layers: [layer]});

            // レイヤーにコンフィグを設定
            var conf_dir = "./pri/conf";
            $.getJSON(conf_dir + '/layer/GridLine.json', function() {}).
            success(function(conf) {
                layer.configure(null, conf);        // データは null、confのみ設定
            }).
            error(function(jqXHR, textStatus, errorThrown) {
                console.log("GridLine Layer configuration file load error : " + textStatus);
            });
```
　

・レイヤーコンフィグ

GridLineレンダラーの描画パラメータを設定します。


```
{
    "Name" : "GridLine",
    "Renderer" : "GridLine",
    "Attributes" : {
        "style" : {
            "default" : {
                "position":["top","left"],                  ・・・ラベルの表示位置（"top","bottom","left","right"より指定。複数指定可）
                "line_color":"rgba(120,120,120,0.3)",       ・・・緯度経度線の色
                "line_width":1.0,                           ・・・緯度経度線の線幅
                "font_size":11,                             ・・・ラベルのフォントサイズ（pixel）
                "text_edge_color":"rgba(20,150,20,0.9)",    ・・・ラベルテキストのエッジ色
                "text_color":"rgba(90,90,90,0.7)",          ・・・ラベルテキストのテキスト色
                "grid_interval":10                          ・・・緯度経度線の間隔
            }
        }
    }
}

```
