# データ有効範囲 サンプルコード

## URL	

* http://pt-wrap01.wni.co.jp/Mercury/sample/minmax.html


## 機能

* GPVデータの有効値範囲をデータコンフィグに指定しています。
範囲外データを含む Gridはデータ表示が行われません。

本サンプルでは、例として温度（TMP）の有効範囲を −5度〜25度、風速（Wind）の有効範囲を 40knot以下としています。

## データコンフィグ

データに有効範囲がある場合、Arrtibutes.DataGrid下の MinValue、MaxValueの両方またはどちらかを定義することができます。

```
{
    "Name" : "GSM",
    "DataHandler" : "GeoTiff",
    "Attributes" : {
        "TimeList" : "./pri/data/GSM/index.json",
        "File" : "./pri/data/GSM/data/%element%/%level%/%basetime%/%validtime%.tiff",
        "DataGrid" : {
            "MinValue" : 0,			・・・0以上、100以下の値が有効
            "MaxValue" : 100,
            　　：
```

Modelデータの場合、要素（element）毎に有効範囲が異なります。
このような場合は、DataGrid.elementタグ下に要素名のハッシュを定義して、上記のMinValue、MaxValueをオーバライドする個別の有効範囲を定義することができます。

下記例では、TMPの有効範囲を −5度〜25度（オリジナルデータの単位はKのため、268.15〜298.15で定義）、
WindSpeed（UおよびV成分）の有効範囲を 40KT以下（オリジナルデータの単位はm/sのため、20.58で定義）としています。

サンプルデータ・データコンフィグ
https://pt-wrap01.wni.co.jp/Mercury/sample/pri/conf/data/Model_GSM_MinMax.json

```
{
    "Name" : "GSM",
    "DataHandler" : "GeoTiff",
    "Attributes" : {
        "TimeList" : "./pri/data/GSM/index.json",
        "File" : "./pri/data/GSM/data/%element%/%level%/%basetime%/%validtime%.tiff",
        "DataGrid" : {
            "Width" : 720,
            "Height" : 361,
            "LatBase" : 90.0,
            "LonBase" : 0.0,
            "LatInterval" : 0.5,
            "LonInterval" : 0.5,
            "element" : {
                "TMP" : {
                    "MinValue" : 268.15,	・・・ −5度以上が有効
                    "MaxValue" : 298.15　・・・25度以下が有効
                },
                "UGRD" : {
                    "MaxValue" : 20.58		・・・40TK以下が有効
                },
                "VGRD" : {
                    "MaxValue" : 20.58		・・・40TK以下が有効
                }
            }
        },
        "UpdateInterval" : 3600
    }
}
```

