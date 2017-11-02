# Wind サンプルコード

## URL	

* http://pt-wrap01.wni.co.jp/Venus/sample/wind.html


## 機能

* GrandMasterの風速UVデータから風の矢羽表示を行います。

* 描画する下限の風速を指定することができます。

## 処理概要

・レイヤーのコンテンツ設定

layer.ser()の引数の content.elementに["UGRD","VGRD"]の配列を指定します。

また、表示する下限の風速値を Layer.setAttribute()関数で指定し、レイヤーコンフィグを動的に更新します。

```
            // Model
            var data = WRAP.DH.addObject("WX_WNI_GrandMaster");
            
            var layer = new WRAP.Geo.Layer("Wind");
         
            // レイヤー登録
            WRAP.Geo.setLayer({upper_layers:[layer]});

            // Configure Layers
            var conf_dir = "./pri/conf";
            $.getJSON(conf_dir + '/layer/Wind.json', function(conf) {
                layer.configure(data, conf);
            });
            
　　　　　　　　：
　　　　　　　（中略）
　　　　　　　　：
            
            function updateModelContent() {
                var time_index = parseInt($("#mdl_vt").val());
                var content = {
                    element:["UGRD","VGRD"],
                    basetime:time_range[time_index].basetime,
                    validtime:time_range[time_index].validtime
                };
                
                layer.set(content);

                // ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
                // 入力された閾値でコンフィグの Attributes.thresholdを更新する
                // ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
                var val = parseFloat($('#threshold').val());
                if ( !isNaN(val))
                    layer.setAttributes({threshold:val});
            }
            
　　　　　　　　：
　　　　　　　（中略）
　　　　　　　　：
            
            // Tooltip
            WRAP.Geo.setInteraction(map_canvas);
            layer.setTooltip(function(geo) {
                var p = geo && geo.properties;
                if ( p )
                    return ""+p.speed.toFixed(2)+"kts";
            });
            

　　　　　　　　：
　　　　　　　（中略）
　　　　　　　　：

            $('#threshold').on('input', function () {
                var val = parseFloat($(this).val());
                if ( isNaN(val)) {
                    $(this).val(0);
                }
                updateModelContent();
            });


```
　
