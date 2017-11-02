# Current サンプルコード

## URL	

* https://pt-wrap01.wni.co.jp/Venus/uiux/wrap-catalyst.html#/introduction/current


## 機能

* 海流GPVデータの矢印表現を描画します

矢印について以下のカストマイズが可能です。

1. 速度値の単位変換

2. 矢印の色設定（速度値に対応付けたパレット定義）

3. 矢印の長さ設定（速度値に対応して長さを変えることが可能）

4. 矢印表示の間引き間隔の設定

5. 矢印の表示閾値の設定

## 処理概要

・レイヤーのコンテンツ設定

layer.ser()の引数の content.elementに["UOGRD","VOGRD"]の配列を指定します。

```
            // Model
            var data = WRAP.DH.addObject("WX_WNI_Current");
                     
            // レイヤー登録
            var layer = new WRAP.Geo.Layer("Current");
            WRAP.Geo.setLayer({upper_layers:[layer]});

            // Configure Layers
            var conf_dir = "./pri/conf";
            $.getJSON(conf_dir + '/layer/Current.json', function(conf) {
                layer.configure(data, conf);
            });
            
　　　　　　　　：
　　　　　　　（中略）
　　　　　　　　：
            
            function updateModelContent() {
                var time_index = parseInt($("#mdl_vt").val());
                var content = {
                    element:["UOGRD","VOGRD"],
                    basetime:time_range[time_index].basetime,
                    validtime:time_range[time_index].validtime
                };
                
                layer.set(content);
                var val = parseFloat($('#threshold').val());
                if ( !isNaN(val))
                    layer.setAttributes({threshold:val});
            }

```
　
・レイヤーコンフィグ


```
{
    "Name" : "Current",
    "Renderer" : "GridArrow",
    "Attributes" : {
        "data_scale" : 1.94384,         // 速度データの変換係数（m/s → knots）
        "data_offset" : 0,              
        "threshold" : 0,                // 表示する速度の下限値
        "style" : {
            "default" : {
                "min_blocksize": 10,    // 矢印の最低間隔（pixel）
                "base_length" : 10,     // 矢印の長さ
                "speed_length_racio" : 5,   // 矢印の長さに加算する速度値の係数
                "palette_gradient": true,   // 下記パレット定義を指定値の間を内挿補間する指定（falseの場合補間しない）
                "palette_step": 0.1,        // パレットの量子化粒度（0.1刻みで色を計算）
                "palette" : [               // パレット定義
                    {
                        "value" : 0.1,      // パレットの下限値
                        "color" : "rgba(32,128,255,0.0)"    // 下限値以上の値にアサインされる色
                    },
                    {
                        "value" : 1.0,      // 速度
                        "color" : "rgba(32,128,255,0.5)"    // 指定速度以上の値にアサインされる色
                    },
                    {                                       // 以下、同上
                        "value" : 1.0,
                        "color" : "rgba(32,200,255,0.7)"
                    },
                    {
                        "value" : 1.5,
                        "color" : "rgba(48,255,255,0.8)"
                    },
                    {
                        "value" : 2.0,
                        "color" : "rgba(48,255,48,0.8)"
                    },
                    {
                        "value" : 2.5,
                        "color" : "rgba(255,255,48,0.9)"
                    },
                    {
                        "value" : 3.0,
                        "color" : "rgba(255,48,48,0.9)"
                    }
                ]
            }
        }
    }
}

```

## 速度値の単位変換について

表示に用いる値をGPVのオリジナル値から変換するための係数を設定することができます。

        "data_scale" : 1.94384,         // 速度データの変換係数（m/s → knots）
        "data_offset" : 0,         

変換は以下計算式でおこなわれます。

表示上の値 ＝ GPV上の速度値 x data_scale + data_offset 

## 矢印の色設定（速度値に対応付けたパレット定義）

・色の補間方法の指定（Attributes.palette_gradient）

指定した速度の間の値について色の決定方法を指定します。

        "palette_gradient": false　・・・　直前の値の色で矢印を描きます。
        "palette_gradient": true　・・・　直前および直後の色から内挿した色で矢印を描きます。


・色の量子化ステップの指定

速度値に対応したカラーは事前に計算されパレットテーブルが構築されます。この値の刻み幅を定義します。

        "palette_step": 0.1,        // パレットの量子化粒度（0.1刻みで色を計算）


## 矢印の長さ設定（速度値に対応して長さを変えることが可能）

矢印の長さは。固定サイズ部分と速度値に応じた可変サイズ部分の合計で決まります。

        "base_length" : 10,  ・・・固定サイズの設定
        "speed_length_racio" : 5,  ・・・速度に応じた可変部分の係数設定

矢印の長さ ＝　固定サイズ部分の長さ ＋ 速度 x 可変部分係数

前記例では、2KTの矢印は、10＋2x10＝30 pixelのサイズで描かれます。

speed_length_racioを0（または省略）にすると、すべての矢印が速度によらず一定のサイズで描かれます。


## 矢印表示の間引き間隔の設定

グリッドの間引きは、設定した最低グリッドサイズより矢印描画位置の間隔が小さくならないようにオリジナルデータ解像度を1/2、1/4、1/8... と 解像度を1/2に間引く操作を繰り返して決定されます。

        "min_blocksize": 10,

上記例では、矢印の間隔が10 pixelより小さくならないようにデータが間引かれます。

設定値を小さくするとより密な表示となり、大きくすると粗い間隔での表示となります。

## 矢印の表示閾値の設定

設定閾値未満のデータを表示対象から省くことができます。

        "threshold" : 0.5,

上記は、0.5KT以上の矢印のみを表示する設定です。

レイヤー・コンフィグの Attribute直下の値は、Layer.setAttribute()関数により動的に変更することが可能です。

本サンプルでは、画面上部の入力フィールドで指定された閾値で動的に表示範囲を制御しています。


```
            function updateModelContent() {
                var time_index = parseInt($("#mdl_vt").val());
                var content = {
                    element:["UOGRD","VOGRD"],
                    basetime:time_range[time_index].basetime,
                    validtime:time_range[time_index].validtime
                };
                
                layer.set(content);
                var val = parseFloat($('#threshold').val());
                if ( !isNaN(val))
                    layer.setAttributes({threshold:val});・・・・ Attributes.thresholdが valによって更新される
```


