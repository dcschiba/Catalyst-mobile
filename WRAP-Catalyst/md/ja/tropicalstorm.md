# TropicalStorm メニュー

* JMA_Typhoon, JTWC_Typhoon, WNI_TropicalStorm, JMA_Typhoon_5days, TS_Relation_WNI,TS_Relation_JTWC のレイヤーを使い、表示しています。

 * All : 発表されている台風を表示します。チェックボックスで要素の表示／非表示をします
 * History(JMA) : まきもどし機能です。表示される台風は ALLのJMAで選択したのと連動してます
 * 5daysForecast(JMA) : 台風５日間予報です。 ~~JMA_Typhoon の trackと JMA_Typhoon_5daysのforecast部分を表示させます。~~ 表示される台風は ALLのJMAで選択したのと連動してます
  * 5日予報の、forecast部分のclass_iconを無しにしています。(72時間より先の予測には、階級等が入らないので、途中で弱まると誤解されないよう)
 * 3Arrows(JMA) : いわゆる３本の矢コンテンツ。経路部分はWX_JMA_Typhoon, WNI予想とJTWC予想は、WX_WNI_TropicalStorm_Relationのデータを表示しています。
 * AnalogousTS(JMA) 類似台風です。表示される台風は ALLのJMAで選択したのと連動してます
 
* 各々のレイヤーのコンフィグについては下記を参照ください。


---------------------------------------------------------------------

## JMA_Typhoon, JMA_Typhoon_5days 表示レイヤー

### 機能
* JMA Typhoon表示を行います。

* 画面上部のチェックボックスにより描画要素の表示OnOffを行います。

* 「巻き戻し」チェックボックスを押すと右側の時間リストで選択されている時間の trackの Strom、Galeエリアを描き、SWCA、ForecastCircleを非表示にします。

### 注意点
特に高緯度では台風予報円の接線がずれため、閾値を超える場合は接線を引きません。高緯度(非正円)台風接線問題 [WRAP-269 backlog](https://wni.backlog.jp/view/WRAP-269)  
- 高緯度、非正円による歪みから接線がずれている場合とみなし、線を描かない対応をした[サンプル](https://pt-wrap01.wni.co.jp/Earth/sample/typhoon_test3.html)
- layer config で、指定をしていなければ、デフォルト閾値:contact_angle_threshold=20 が適用される

### データ
| コンテンツ名 | WRAP DATA ID | tagID | データ設定 | レイヤー設定 |
|:------------------|:-------------:|:------------:|:------------:|:------------:|
| 台風3日予報 | [WX_JMA_Typhoon](https://goo.gl/df5Frm)      | [402100851](http://data-catalog.wni.co.jp/data_catalog/view.cgi?tagid=402100851) | [config](./pri/conf/data/WX_JMA_Typhoon.json) | [config](./pri/conf/layer/JMA_Typhoon.json) |
| 台風経路    | [WX_JMA_TyphoonRoute](https://goo.gl/df5Frm) | [402100852](http://data-catalog.wni.co.jp/data_catalog/view.cgi?tagid=402100852) |予報データ設定で参照 |
| 台風5日予報 | [WX_JMA_Typhoon_5days](https://goo.gl/df5Frm) | [402100933](http://data-catalog.wni.co.jp/data_catalog/view.cgi?tagid=402100933) | [config](./pri/conf/data/WX_JMA_Typhoon_5days.json) | [config](./pri/conf/layer/JMA_Typhoon_5days.json) |
| 3本の矢  | [WX_WNI_TropicalStorm_Relation](https://goo.gl/df5Frm) | [411022953](http://data-catalog.wni.co.jp/data_catalog/view.cgi?tagid=411022953) | [config](./pri/conf/data/WX_WNI_TropicalStorm_Relation_W.json) | [config](./pri/conf/layer/TS_Relation_WNI.json) |
| 類似台風（※） | [WX_WNI_AnalogousTropicalStorm](https://goo.gl/df5Frm) | [411022727](http://data-catalog.wni.co.jp/data_catalog/view.cgi?tagid=411022727) | [config](./pri/conf/data/WX_WNI_AnalogousTropicalStorm.json) | [config](./pri/conf/layer/AnalogousTropicalStorm_0.json) |

※類似台風は、台風DBの過去台風データを参照します。[台風DB API](https://goo.gl/PLF5ez)　
ex.) [2016年1号台風](https://wni-pdb.wni.com/tc/JMA_TYPHN/T201601)

### 設定
Typhoon描画の各種属性はコンフィグによりカストマイズ可能です。


```
{
    "Name" : "JMA_Typhoon",
    "Renderer" : "Typhoon",
    "Attributes" : {
        "icon_width": 16,                           // アイコンサイズ横
        "icon_height": 23,                          // アイコンサイズ縦
        "icon_offset_x": -8,                        // アイコンの表示位置をずらすXオフセット（ピクセル）
        "icon_offset_y": -12,                       // アイコンの表示位置をずらすYオフセット（ピクセル）
        "icon": {                                   // アイコン定義
            "track" : {                             // wrap_feature_typeに対応
                "icon": "img/TD.png",               // 本クラスにおけるアイコン
                "class_icon" : {                    // 当該typeにおいて classが一致する場合に用いるアイコン
                    "STS": "img/STS.png",
                    "TS": "img/TS.png",
                    "TD": "img/TD.png",
                    "TY": "img/TD.png",
                    "LOW": "img/TD.png"
                }
            },
            "analysis" : {
                ：
            },
            "estimate" : {
                ：
            },
            "forecast" : {
                ：
            },
            "custom_icon" : "img/custom.png"        // track上の任意位置に表示するカスタムアイコン
        },
        "track_history_line_color":"#202080",               // trackの線色
        "track_history_line_width":2,                       // trackの線幅
        "forecst_track_line_color":"#ffffff",               // forecastの線色
        "forecst_track_line_width":2,                       // forecastの線幅
        "forecst_track_line_dash":[4],                      // forecastの破線パターン（省略時は実線）
        "forecst_circle_line_color":"#ffffff",              // forecast circleの線色
        "forecst_circle_line_width":2,                      // forecast circleの線幅
        "forecst_circle_line_dash":[4],                     // forecast circleの破線パターン
        "forecst_area_line_color":"#ffffff",                // forecast circle接線の線色
        "forecst_area_line_width":2,                        // forecast circle接線の線色
        "forecst_area_line_dash":[],                        // forecast circle接線の破線パターン（省略時は実線）
        "wind_line_color_gale":"rgba(255,255,150,1.0)",     // galeの線色
        "wind_line_color_storm":"rgba(255,50,50,1.0)",      // storm、swcaの線色
        "wind_line_width":2,                                // gale、storm、swcaの線幅
        "wind_fill_color_gale":"rgba(255,255,100,0.2)",     // gale領域の塗色
        "wind_fill_color_storm":"rgba(255,50,50,0.2)",      // storm、swca領域の塗色
        "label_text_color":"#202020",                       // 時間テキストの文字色
        "label_edge_color":"#ffffff",                       // 時間テキストの文字の縁色
        "label_offset_x":10,                                // 時間テキストの表示位置調整 Xオフセット
        "label_offset_y":10,                                // 時間テキストの表示位置調整 Yオフセット
        "date_format":"%day% / %hour%Z",		    // 日時テキストフォーマット（UTC表記）（※）
        "_date_format": "%local_year%年%0local_month%月%local_day%日%local_hour%時", // local(JST表記）（※）
        "show_datetime": true                               // 日時表示のOn/Off
	
        "number_label":"台風%d%号",			// 台風番号テキストフォーマット（日本語表記例）%d%が号数に置換される
	"_number_label":"No.%d%",			// 台風番号テキストフォーマット（英語表記例）
        "number_label_text_color":"blue",		// 台風番号テキストの文字色
        "number_label_edge_color":"white",		// 台風番号テキストの文字の縁色
        "number_label_offset_x":5,			// 台風番号テキストの表示位置調整 Xオフセット
        "number_label_offset_y":-14,			// 台風番号テキストの表示位置調整 Yオフセット
        "number_label_font_size":20,			// 台風番号テキストのサイズ
        "show_number": true,                            // 台風番号表示のOn/Off

        "show_forecast_circle": true,                       // 予報円の表示On/Off
        "show_forecast_track": true,                        // 予報円の表示On/Off
        "show_track_history": true,                         // trackの表示On/Off
        "show_estimate": true,                              // estimateの表示On/Off
        "show_analysis_wind_radii": true,                   // analysisまたは estimate位置の風域表示On/Off
        "show_forecast_wind_radii": true,                   // forecastの風域表示表示On/Off
        "show_td_low": true,                                // TDまたはLOWクラスの表示On/Off
        "track_circle_time": "YYMMDDTThhmmss",              // 指定した時間の直近の Trackポイントの StormおよびGaleエリアを描画する。
        "custom_icon_time": "YYMMDDTThhmmss",               // 指定した時間のポイント位置のアイコンを icon.custom_iconの設定値に置き換える。
                                                            // 日時の代わりに ’ana;ysis’または'estimate'を指定することもできる
}
```

アイコンは、ポイントデータの wrap_feature_typeおよび class属性に応じて選択されます。

wrap_fearture_typeに対応するアイコンが定義されている場合はこれを優先し、typeアイコン未定義で当該typeにおける classアイコンが定義されている場合はそちらを優先します。

用意するアイコンは同じサイズである必要があります。　

show_forecast_wind_radiiを trueにした場合は、show_analysis_wind_radiiの設定に関わらず analysisまたは estimate位置の風域も表示されます。

track_circle_timeが指定された場合は、指定時間直近の Trackポイントに有効な Stromおよび Galeエリアがあった場合に円を描画します。

custom_icon_timeが指定された場合は、指定クラスまたは日時のポイントのアイコンを icon.custom_iconの設定値に置き換えます。

### 表示属性の動的更新について

レイヤーコンフィグの内容は、Layer.setAttributes()関数により動的に変更することができます。


```
        "show_forecast_circle": true,                       // 予報円の表示On/Off
        "show_forecast_track": true,                        // 予報円の表示On/Off
        "show_track_history": true,                         // trackの表示On/Off
        "show_estimate": true,                              // estimateの表示On/Off
        "show_analysis_wind_radii": true,                   // analysisまたは estimate位置の風域表示On/Off
        "show_forecast_wind_radii": true,                   // forecastの風域表示表示On/Off
        "show_td_low": true                                 // TDまたはLOWクラスの表示On/Off
        "track_circle_time": "YYMMDDTThhmmss"               // 指定した時間の直近の Trackポイントの StormおよびGaleエリアを描画する。
        "custom_icon_time": "YYMMDDTThhmmss"                // 指定した時間のポイント位置のアイコンを icon.custom_iconの設定値に置き換える。
        "show_datetime": true                               // 日時表示のOn/Off
```

本サンプルでは、画面上部のチェックボックス状態に応じて、以下を動的に更新しています。

「巻き戻し」がチェックされた場合は、予報円、SWCA円などの表示をOffにしています。

更新処理コード

```
            // チェック内容に応じて要素の表示状態をOn/Offする
            function updateContents() {
                var datetime = $('#datetime').prop('checked');
                if ( $('#rollback').prop('checked') ) {
                　// 巻き戻しモードの設定
                    var time = $('#time').val();
                    layer.setAttributes({
                        show_forecast_circle:false,
                        show_forecast_track:false,
                        show_track_history:true,
                        show_estimate:false,
                        show_analysis_wind_radii:false,
                        show_forecast_wind_radii:false,
                        show_td_low:true,
                        show_datetime:datetime,
                        track_circle_time:time,　　・・・リストから選択された時間に風域を表示
                        custom_icon_time:time　　・・・リストから選択された時間にカスタムアイコンを表示
                    });
                    
                    $('#forecast_circle').prop('disabled', true);
                    $('#forecast_track').prop('disabled', true);
                    $('#track').prop('disabled', true);
                    $('#estimate').prop('disabled', true);
                    $('#analysis_wind_radii').prop('disabled', true);
                    $('#forecast_wind_radii').prop('disabled', true);
                    $('#td_low').prop('disabled', true);
                }
                else {
                    var forecast_circle = $('#forecast_circle').prop('checked');
                    var forecast_track = $('#forecast_track').prop('checked');
                    var track = $('#track').prop('checked');
                    var estimate = $('#estimate').prop('checked');
                    var analysis_wind_radii = $('#analysis_wind_radii').prop('checked');
                    var forecast_wind_radii = $('#forecast_wind_radii').prop('checked');
                    
                    var td_low = $('#td_low').prop('checked');
                    layer.setAttributes({
                        show_forecast_circle:forecast_circle,
                        show_forecast_track:forecast_track,
                        show_track_history:track,
                        show_estimate:estimate,
                        show_analysis_wind_radii:analysis_wind_radii,
                        show_forecast_wind_radii:forecast_wind_radii,
                        show_datetime:datetime,
                        show_td_low:td_low,
                        custom_icon_time:estimate?'estimate':'analysis'　　・・・analyslsまたはestimate位置にカスタムアイコンを表示
                    });
                    
                    $('#forecast_circle').prop('disabled', false);
                    $('#forecast_track').prop('disabled', false);
                    $('#track').prop('disabled', false);
                    $('#estimate').prop('disabled', false);
                    $('#analysis_wind_radii').prop('disabled', false);
                    $('#forecast_wind_radii').prop('disabled', false);
                    $('#td_low').prop('disabled', false);
                }
            }
```
### 日時テキストフォーマットについて
フォーマット中の%%を以下に置き換えます。
```
|keyword|置換内容|
|---|---|
|%year%|UTC年|
|%month%|UTC月|
|%day%|UTC日|
|%hour%|UTC時|
|%min%|UTC分|
|%sec%|UTC秒|
|%0month%|UTC月 前ゼロパディング2桁|
|%0day%|UTC月 前ゼロパディング2桁|
|%0hour%|UTC時 前ゼロパディング2桁|
|%0min%|UTC分 前ゼロパディング2桁|
|%0sec%|UTC秒 前ゼロパディング2桁|
|%local_year%|ローカルタイム年|
|%local_month%|ローカルタイム月|
|%local_day%|ローカルタイム日|
|%local_hour%|ローカルタイム時|
|%local_min%|ローカルタイム分|
|%local_sec%|ローカルタイム秒|
|%0local_month%|ローカルタイム月 前ゼロパディング2桁|
|%0local_day%|ローカルタイム日 前ゼロパディング2桁|
|%0local_hour%|ローカルタイム時 前ゼロパディング2桁|
|%0local_min%|ローカルタイム分 前ゼロパディング2桁|
|%0local_sec%|ローカルタイム秒 前ゼロパディング2桁|
```
-------------------------------------------------------------------
## WNI_TropicalStorm , JTWC_Typhoon 表示レイヤー

### 機能

* TropicalStormの表示を行います。

* 画面上部のチェックボックスにより描画要素の表示OnOffを行います。

### データ
| コンテンツ名        | WRAP DATA ID | tagID | データ設定 | レイヤー設定 |
|:------------------|:-------------:|:------------:|:------------:|:------------:|
| WNI_TropicalStorm | [WX_WNI_TropicalStorm](https://goo.gl/df5Frm)      | [411900026](http://data-catalog.wni.co.jp/data_catalog/view.cgi?tagid=411900026) | [config](./pri/conf/data/WX_WNI_TropicalStorm.json) | [config](./pri/conf/layer/WNI_TropicalStorm.json) |
| JTWC_Typhoon      | [WX_JTWC_Typhoon](https://goo.gl/df5Frm) | [407000112](http://data-catalog.wni.co.jp/data_catalog/view.cgi?tagid=407000112) | [config](./pri/conf/data/WX_JTWC_Typhoon.json) | [config](./pri/conf/layer/JTWC_Typhoon.json) |

### 設定
TropicalStrom描画の各種属性はコンフィグによりカストマイズ可能です。

```
{
    "Name" : "TropicalStorm",
    "Renderer" : "TropicalStorm",
    "Attributes" : {
        "track_history_line_color":"#802020",               // Track Historyの線色
        "track_history_line_width":2,                       // Track Historyの線幅
        "forecst_track_line_color":"#2020ee",               // forecast Tracの線色
        "forecst_track_line_width":2,                       // forecast Tracの線幅
        "wind_line_color_35kt":"rgba(255,255,150,1.0)",     // gale風域扇型の線色
        "wind_line_color_50kt":"rgba(255,50,50,1.0)",       // storm風域扇型の線色
        "wind_line_color_hurricane":"rgba(200,0,0,1.0)",    // hurricane風域扇型の線色
        "wind_line_width":1,                                // 強風域扇型の線幅
        "wind_fill_color_35kt":"rgba(255,255,100,0.3)",     // gale風域扇型の塗り色
        "wind_fill_color_50kt":"rgba(255,50,50,0.3)",       // storm風域扇型の塗り色
        "wind_fill_color_hurricane":"rgba(200,0,0,0.3)",    // hurricane風域扇型の塗り色
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
        "show_forecast_track": true,                        // forecast Trackの表示On/Off
        "show_track_history": true,                         // Track Historyの表示On/Off
        "show_forecast_wind_radii": true,                   // forecast Trackの強風圏表示On/Off
        "show_analysis_wind_radii": true,                   // Analysisの強風圏表示On/Off
        "track_circle_time": "YYMMDDTThhmmss",              // 指定した時間の直近の Trackポイントの StormおよびGaleエリアを描画する。
        "custom_icon_time": "YYMMDDTThhmmss",               // 指定した時間のポイント位置のアイコンを icon.custom_iconの設定値に置き換える。
                                                            // 日時の代わりに ’ana;ysis’または'estimate'を指定することもできる
        "show_datetime": true                               // 日時表示のOn/Off
    }
}
```

アイコンは、TropicalStormのポイントデータの class属性に応じて選択されます。

用意するアイコンは同じサイズである必要があります。　


### 表示属性の動的更新について

レイヤーコンフィグの内容は、Layer.setAttributes()関数により動的に変更することができます。

本サンプルでは、画面上部のチェックボックス状態に応じて、以下を動的に更新しています。

```
        "show_forecast_track": true,                        // forecast Trackの表示On/Off
        "show_track_history": true,                         // Track Historyの表示On/Off
        "show_forecast_wind_radii": true,                   // forecast Trackの強風圏表示On/Off
        "show_analysis_wind_radii": true                    // Analysisの強風圏表示On/Off
        "track_circle_time": "YYMMDDTThhmmss"               // 指定した時間の直近の Trackポイントの StormおよびGaleエリアを描画する。
        "custom_icon_time": "YYMMDDTThhmmss"                // 指定した時間のポイント位置のアイコンを icon.custom_iconの設定値に置き換える。
        "show_datetime": true                               // 日時表示のOn/Off
```

更新処理


```
            // チェック内容に応じて要素の表示状態をOn/Offする
            function updateContents() {
                var datetime = $('#datetime').prop('checked');
                if ( $('#rollback').prop('checked') ) {
                    // 巻き戻しモードの表示設定
                    var time = $('#time').val();
                    layer.setAttributes({
                        show_forecast_track:false,
                        show_track_history:true,
                        show_analysis_wind_radii:false,
                        show_forecast_wind_radii:false,
                        show_datetime:datetime,
                        track_circle_time:time,
                        custom_icon_time:time
                    });
                    
                    $('#forecast_track').prop('disabled', true);
                    $('#track').prop('disabled', true);
                    $('#analysis_wind_radii').prop('disabled', true);
                    $('#forecast_wind_radii').prop('disabled', true);
                }
                else {
                    // 通常モードの表示設定（チェックボックスの状態を反映）
                    var forecast_track = $('#forecast_track').prop('checked');
                    var track = $('#track').prop('checked');
                    var analysis_wind_radii = $('#analysis_wind_radii').prop('checked');
                    var forecast_wind_radii = $('#forecast_wind_radii').prop('checked');
                    
                    var td_low = $('#td_low').prop('checked');
                    layer.setAttributes({
                        show_forecast_track:forecast_track,
                        show_track_history:track,
                        show_analysis_wind_radii:analysis_wind_radii,
                        show_forecast_wind_radii:forecast_wind_radii,
                        show_datetime:datetime
                    });
                    
                    $('#forecast_track').prop('disabled', false);
                    $('#track').prop('disabled', false);
                    $('#analysis_wind_radii').prop('disabled', false);
                    $('#forecast_wind_radii').prop('disabled', false);
                }
            }
```
