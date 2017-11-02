# TropicalStorm サンプルコード

## URL	

* http://pt-wrap01.wni.co.jp/Venus/sample/tropicalstorm.html


## 機能

* TropicalStormの表示を行います。

* 画面上部のチェックボックスにより描画要素の表示OnOffを行います。

## レイヤーコンフィグ

TropicalStrom描画の各種属性はコンフィグによりカストマイズ可能です。

```
{
    "Name" : "TropicalStorm",
    "Renderer" : "TropicalStorm",
    "Attributes" : {
        "track_history_line_color":"#802020",               // Track Historyの線色
        "track_history_line_width":2,                       // Track Historyの線幅
        "forecst_track_line_color":"#2020ee",               // Forcast Tracの線色
        "forecst_track_line_width":2,                       // Forcast Tracの線幅
        "wind_line_color_35kt":"rgba(255,255,150,1.0)",     // 35kt強風域扇型の線色
        "wind_line_color_50kt":"rgba(255,50,50,1.0)",       // 50kt強風域扇型の線色
        "wind_line_width":1,                                // 強風域扇型の線幅
        "wind_fill_color_35kt":"rgba(255,255,100,0.3)",     // 35kt強風域扇型の塗り色
        "wind_fill_color_50kt":"rgba(255,50,50,0.3)",       // 50kt強風域扇型の塗り色
        "label_text_color":"#202020",                       // 時間ラベルのテキスト色
        "label_edge_color":"#ffffff",                       // 時間ラベルのテキスト縁色
        "label_offset_x":10,                                // 時間ラベルの表示オフセット X座標増分
        "label_offset_y":10,                                // 時間ラベルの表示オフセット Y座標増分
        "icon": {
            "STS": "img/STS.png",                           // class＝’STS’の表示アイコン
            "TS": "img/TS.png",                             // class＝’TS’の表示アイコン
            "TD": "img/TD.png"                              // class＝’TD’の表示アイコン
        },
        "icon_width": 16,                                   // アイコンの幅
        "icon_height": 23,                                  // アイコンの高さ
        "icon_offset_x": -8,                                // アイコンのオフセット
        "icon_offset_y": -12,                               // アイコンのオフセット
        "show_forcast_track": true,                         // Forcast Trackの表示On/Off
        "show_track_history": true,                         // Track Historyの表示On/Off
        "show_forcast_wind_radii": true,                    // Forcast Trackの強風圏表示On/Off
        "show_analysis_wind_radii": true                    // Analysisの強風圏表示On/Off
    }
}
```

アイコンは、TropicalStormのポイントデータの class属性に応じて選択されます。

用意するアイコンは同じサイズである必要があります。　


## 表示属性の動的更新について

レイヤーコンフィグの内容は、Layer.setAttributes()関数により動的に変更することができます。

本サンプルでは、画面上部のチェックボックス状態に応じて、以下を動的に更新しています。

```
        "show_forcast_track": true,                         // Forcast Trackの表示On/Off
        "show_track_history": true,                         // Track Historyの表示On/Off
        "show_forcast_wind_radii": true,                    // Forcast Trackの強風圏表示On/Off
        "show_analysis_wind_radii": true                    // Analysisの強風圏表示On/Off
```

更新処理

```
            // チェック内容に応じて要素の表示状態をOn/Offする
            function updateContents() {
                var forcast_track = $('#forcast_track').prop('checked');                // チェックボックスの状態取得
                var track_history = $('#track_history').prop('checked');                // チェックボックスの状態取得
                var forcast_wind_radii = $('#forcast_wind_radii').prop('checked');      // チェックボックスの状態取得
                var analysis_wind_radii = $('#analysis_wind_radii').prop('checked');    // チェックボックスの状態取得
                layer.setAttributes({
                    show_forcast_track:forcast_track,
                    show_track_history:track_history,
                    show_forcast_wind_radii:forcast_wind_radii,
                    show_analysis_wind_radii:analysis_wind_radii
                });
            }
```
