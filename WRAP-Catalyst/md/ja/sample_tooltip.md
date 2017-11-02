# ツールチップ サンプルコード

## URL	

* http://pt-wrap01.wni.co.jp/Mercury/sample/tooltip.html


## 機能

* TAFおよびMETARポイントを表示し、マウスーバーでツールチップを表示します。
* TAFおよびMETARポイントが重なっているところではツールチップ内容がまとめられ一つのツールチップに表示されます。

## 処理概要

・ツールチップの表示

アイコン（Feature.Image）および ポイント（Feature.Point）型の描画要素にマウスオーバーされた場合にレイヤーの setTooltipで設定したハンドラがコールバックされます。

このハンドラには当該 Featureのソースとなる Geoオブジェクトと Dataオブジェクトが渡されます。

ハンドラでリターンした文字列（HTML）がツールチップに表示されます。

```
    // TAFのツールチップ内容設定
    taf_layer.setTooltip(function(geo, data) {
        var p = geo && geo.properties;
        if ( p && data ) {
            var bulletin = data.bulletin;
            if ( bulletin && bulletin.length > 32 )
                bulletin = bulletin.substr(0,32)+"...";
            return "TAF : "+p.icao+"<br>"
                + "bulletin : "+(bulletin||"-")+"<br>";
        }
    });

```
　

・ツールチップのグループ化

通常は、マウスオーバー位置にある最も上に表示されている Featureがツールチップ表示対象になります。

WRAP.Geo.setTooltipGroup()でレイヤー配列を登録しておくと、当該レイヤーのいずれかの Featureにマウスオーバーした場合に、マウス位置にある登録レイヤーの最上位 Featureのすべてについて setTooltipハンドラがコールバックされます。

グループ内の複数の Featureに対して setTooltipハンドラがコールバックされた場合はそれぞれが返す文字列がグループ登録順に統合され一つのツールチップとして表示されます。


```
    // metarとtafレイヤーの重なった Featureのツールチップをグループ化
    WRAP.Geo.addTooltipGroup([metar_layer, taf_layer]);

    // TAFのツールチップ内容設定
    taf_layer.setTooltip(function(geo, data) {
        var p = geo && geo.properties;
        if ( p && data ) {
            return （TAFのツールチップ内容）
        }
    });

    // METARのツールチップ内容設定
    metar_layer.setTooltip(function(geo, data) {
    var p = geo && geo.properties;
        if ( p && data ) {
            return （METARのツールチップ内容）
        }
    });

```


・マウスオーバー検知のセンサーサイズについて

ポイントに対するマウスオーバーはデフィルトでは描画されるポイントのサイズ領域へのマウスが入っているかどうかを判定します。

レイヤーコンフィグにてポイントに sensor_sizeオプションを定義するとマウスオーバーに反応する領域のサイズをポイントの描画サイズとは別の値に変更できます。

本サンプルでは、METARポイントのサイズを直径13pixel、TAFポイントのサイズを10pixelとしています。
同一地点に METARとTAFが重複した場合に、両ポイントにマウスオーバーを発生させるため、それぞれ sensor_sizeを13pixに設定しています。

TAFレイヤーコンフィグ

```
{
    "Name" : "TAF",
    "Renderer" : "DataJSON",
    "Attributes" : {
        "features" : [
            {
                "style" : {
                    "default" : {
                        "type" : "point",
                        "point_size" : 10,
                        "sensor_size" : 13, ・・・マウスオーバーの範囲（省略時はpoint_sizeが用いられる）
                        "line_color" : "#000000",
                        "point_color" : "#2288ff"
                    }
                }
            }
        ]
    }
}
```

METARレイヤーコンフィグ

```
{
    "Name" : "METAR",
    "Renderer" : "DataJSON",
    "Attributes" : {
        "features" : [
            {
                "style" : {
                    "default" : {
                        "type" : "point",
                        "point_size" : 13,
                        "sensor_size" : 13, ・・・マウスオーバーの範囲（point_sizeと同じなので省略可）
                        "line_color" : "#006000",
                        "point_color" : "#66CC66"
                    }
                }
            }
        ]
    }
}
```
