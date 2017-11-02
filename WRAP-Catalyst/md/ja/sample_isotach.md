# Isotach サンプルコード

## URL	

* http://pt-wrap01.wni.co.jp/Mercury/sample/isotach.html


## 機能

* Wind UVデータから風速コンター表現を描画します

## 処理概要

・レイヤーのコンテンツ設定

WindArrow（矢羽表現）、Contour（等風速線）ともに layer.ser()の引数の content.elementに["UGRD","VGRD"]の配列を指定します。

```
            // Model
            var gsm_data = WRAP.DH.addObject("Model_GSM");
            
            var wind_layer = new WRAP.Geo.Layer("Wind");
            var contour_layer = new WRAP.Geo.Layer("Isotach");
         
            // レイヤー登録
            WRAP.Geo.setLayer({upper_layers:[wind_layer, contour_layer]});

            // Configure Layers
            var conf_dir = "./pri/conf";
            $.when(
                $.getJSON(conf_dir + '/layer/Isotach.json'),
                $.getJSON(conf_dir + '/layer/WindArrowSample.json')
            ).done(function(contour_conf, wind_conf) {
                contour_layer.configure(gsm_data, contour_conf[0]);
                wind_layer.configure(gsm_data, wind_conf[0]);
            });
            
            // Wind Arrow ツールチップ
            WRAP.Geo.setInteraction(map_canvas);
            wind_layer.setTooltip(function(geo) {
                var p = geo && geo.properties;
                if ( p )
                    return p.direction_text+"/"+p.speed_text;
            });

　　　　　　　　：
　　　　　　　（中略）
　　　　　　　　：

            function updateModelContent() {
                var time_index = parseInt($("#mdl_vt").val());
                var content = {
                    element:["UGRD","VGRD"],	// ・・・["UGRD","VGRD"]の配列を指定
                    level:$("#mdl_lv").val(),
                    basetime:time_range.gsm[time_index].basetime,
                    validtime:time_range.gsm[time_index].validtime
                };
                
                wind_layer.set(content);
                contour_layer.set(content);
                
                wind_layer.setVisible($('#chk_w').prop('checked'));
                contour_layer.setVisible($('#chk_i').prop('checked'));
            }


```
　
・レイヤーコンフィグ

　サンプルの Isotachレイヤーのコンフィグではコンターラインと一部の区間のフラット彩色を定義しています。


```
{
    "Name" : "Isotach",
    "Renderer" : "Isotach",
    "Attributes" : {
        "style" : {
            "default": {
                "contour": [
                    {
                        "base":20,			・・・20ktから 20kt刻みで4ステップ分のコンターライン指定
                        "interval":20,
                        "num": 4,
                        "lineWidth": 2,
                        "strokeStyle": "rgba(10,120,120,0.7)",
                        "textColor": "rgb(10,70,70)"
                    },
                    {
                        "base":100,			・・・100ktから 20kt刻みで3ステップ分のコンターライン指定
                        "interval":20,
                        "num": 3,
                        "lineWidth": 2,
                        "strokeStyle": "rgba(20,100,40,0.7)",
                        "textColor": "rgb(20,70,30)"
                    },
                    {
                        "base":160,			・・・160ktから 20kt刻みで2ステップ分のコンターライン指定
                        "interval":20,
                        "num": 2,
                        "lineWidth": 2,
                        "strokeStyle": "rgba(50,50,50,0.7)",
                        "textColor": "rgb(50,50,50)"
                    }
                ],
                "fill_type" : "flat",			・・・ここから下が塗りつぶしの設定
                "palette_gradient": false,		・・・Flat彩色の指定
                "palette_step": 1,
                "palette" : [
                    {
                        "value" : 100.0,		・・・100〜160ktの塗りつぶし色指定
                        "color" : "rgba(20, 100, 250, 0.5)"
                    },
                    {
                        "value" : 160.0,		・・・160〜300ktの塗りつぶし色指定
                        "color" : "rgba(200,200,50, 0.5)"
                    },
                    {
                        "value" : 300.0,
                        "color" : "rgba(200,200,50, 0.5)"
                    }
                ]
            }
        }
    }
}

```
