# Icing Probavility サンプルコード

## URL	

* http://pt-wrap01.wni.co.jp/Mercury/sample/icingprob.html


## 機能

* Icing Probavility表現を描画します

## 処理概要

・レイヤーのコンテンツ設定

layer.ser()の引数の content.elementに["TMP","RH"]の配列を指定します。

```
            // Model
            var gsm_data = WRAP.DH.addObject("WX_JMA_GSM");

            var layer = new WRAP.Geo.Layer("TMP");
         
            // レイヤー登録
            WRAP.Geo.setLayer({upper_layers:[layer]});

            // Configure Layers
            var conf_dir = "./pri/conf";
            $.when(
                $.getJSON(conf_dir + '/layer/IcingProbavility.json'),
            ).done(function(conf) {
                layer.configure(gsm_data, conf);
            });
            
　　　　　　　　：
　　　　　　　（中略）
　　　　　　　　：
        
            // モデルのタイムリスト取得＆UIセットアップ
            var time_range = { gsm:[] };
            var gsm_timelist;
            
            function updateModelContent() {
                var time_index = parseInt($("#mdl_vt").val());
                var content = {
                    element:["TMP","RH"],   // IcingProbデータは ["TMP","RH"] を設定。
                    level:$("#mdl_lv").val(),
                    basetime:time_range.gsm[time_index].basetime,
                    validtime:time_range.gsm[time_index].validtime
                };
                layer.set(content);
            }


```
　
・レイヤーコンフィグ

  「＊」マークの最小描画間隔および色を定義します。
  設定された最小描画間隔（pixel）より小さくならないようにデータの取得間隔が間引かれます。

```
{
    "Name" : "IcingProbavility",
    "Renderer" : "IcingProbavility",
    "Attributes" : {
        "style" : {
            "default" : {
                "min_blocksize":20,         ・・・最小描画間隔
                "icon_color":"#ffffff"      ・・・マークの色
            }
        }
    }
}

```
