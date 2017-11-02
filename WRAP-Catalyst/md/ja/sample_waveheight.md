# Wave Height サンプルコード

## URL	

* http://pt-wrap01.wni.co.jp/Venus/sample/waveheight.html


## 機能

* WWIII 有義波高を2種類の閾値に対応した色でブロック状に塗り分け描画します


## GPVをブロック状に塗る方法について


レイヤーコンフィグにおいて block型の塗りつぶし指定およびパレットの定義を行います。

下記事例は、0〜2mを無色、2m〜4mを明るい青（34B1F0）、4m以上を濃い青（#1B34CB）で彩色する設定です。


```
{
    "Name" : "WaveHeight",
    "Renderer" : "Mesh",
    "Attributes" : {
        "style" : {
            "default" : {
                "fill_type" : "block",  　　　・・・彩色方法：blockを指定
                "palette_gradient": false,　　・・・パレットの補間はしない：falseを指定
                "palette_step": 0.1,　　　　　 ・・・パレットテーブルの量子化粒度：0.1 m単位で色を計算
                "palette" : [
                    {
                        "value" : 0.0,               ・・・0m以上の割り当て
                        "color" : "rgba(0,0,0,0)"    ・・・無色
                    },
                    {
                        "value" : 2.0,　　　　　　　　　・・・2m以上の割り当て
                        "color" : "#34B1F0"　　　　　　・・・明るい青
                    },
                    {
                        "value" : 4.0,　　　　　　　　　・・・4m以上の割り当て
                        "color" : "#1B34CB"　　　　　　・・・濃い青
                    }
                ]
            }
        }
    }
}
```

＊palette定義において value値はその値以上の定義を示します。palette配列は value値の小さい順に並べる必要があります。




## パレット閾値の動的変更

・色分けの閾値を動的に変更する場合は、Layer.setAttribute()関数により、レイヤーコンフィグの上記スタイル設定をオーバーライドします。


```
            // Model
            var data = WRAP.DH.addObject("WX_WNI_WWIII_LOWRESO_BLEND");
            
            var layer = new WRAP.Geo.Layer("HTSGW");
         
            // レイヤー登録
            WRAP.Geo.setLayer({upper_layers:[layer]});

            // Configure Layers
            var conf_dir = "./pri/conf";
            $.getJSON(conf_dir + '/layer/WaveHeight.json', function(conf) {
                layer.configure(data, conf);
            });
            
　　　　　　　　：
　　　　　　　（中略）
　　　　　　　　：
            
            function updateModelContent() {
                var time_index = parseInt($("#mdl_vt").val());
                var content = {
                    element:"HTSGW",   // ・・・有義波高 HTSGWを指定
                    basetime:time_range[time_index].basetime,
                    validtime:time_range[time_index].validtime
                };
                
                layer.set(content);

                // ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
                // 入力された二つの閾値からコンフィグのstyle部分を丸ごとオーバーライドする。
                // ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
                var t1 = parseFloat($('#threshold1').val());
                var t2 = parseFloat($('#threshold2').val());
                if ( !isNaN(t1) && !isNaN(t2) ) {
                    layer.setAttributes({
                        style : {
                            default : {
                                palette : [
                                    {
                                        value : 0.0,
                                        color : "rgba(0,0,0,0)"
                                    },
                                    {
                                        value : t1,     // 入力された閾値１
                                        color : "#34B1F0"
                                    },
                                    {
                                        value : t2,     // 入力された閾値１
                                        color : "#1B34CB"
                                    }
                                ]
                            }
                        }
                    });
                }
            }
            
　　　　　　　　：
　　　　　　　（中略）
　　　　　　　　：

            $('input').on('input', function () {　 // 閾値が変更されると、上記 updateModelContent()を呼び出し描画を更新
                var val = parseFloat($(this).val());
                if ( isNaN(val)) {
                    $(this).val(0);
                }
                updateModelContent();
            });
            

```
　
