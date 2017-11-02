# AMeDAS

## 機能

* AmeDASデータ（Wind, Sunshine, Temperature, Precipitation, SnowDepth)をアイコンで表示する

## 処理概要

アプリケーション側に各要素を以下ように処理する
```
const fi = WRAP.Geo.Feature.Image //Image Featureを作って
layer.addFeature(fi);　//layerにadd
WRAP.Geo.invalidate(); //layer再描画
```

参照データ
```
Wind:properties.wind_vel['10m_max']
Wind_dir:properties.wind_dir['10m_max']
Sunshine:properties.sun_time_total['10m']
Temperature:properties.air.temp
Precipitation:properties.rain_amnt_total['10m']
SnowDepth:properties.snow.wrap_hgt
```

閾値
```
凡例を参照してください。（Chromeで表示できる。Safari,ie表示できない、調査対応中)
```

ツールチップ
```
各要素の▫️アイコンをmouse overする時、各要素の情報をツールチップで表示する
Windアイコンをmouse overする時、ツールチップが出ない（FOSTER NEXTGENと同じ）
```


