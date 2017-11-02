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


### グラフ参考例
ローカルタイム表示のサンプル実装 → [WRAP_UIUX-325 backlog](https://wni.backlog.jp/view/WRAP_UIUX-325#comment-47685242)
```
WRAP-Catalyst/js/components/amedas/Graph.jsx

const date = new Date();
const timeZoneOffset = -date.getTimezoneOffset() * 60; // UTCからの時差（秒）
const localTime = WrapUtils.dateFormat(utcTime, 'hh:mm', timeZoneOffset));

上記のようにgetTimezoneOffsetを使うと、端末のタイムゾーン設定を元にUTCへの時差（分）が返ってきます。
※日本の例では「-540」が返ってきます。

返ってきた値の+-を反転させて秒に変換し、Catalystに組み込んでいるWrapUtils.dateFormatにUTC時刻と、時差を渡していただければローカルタイムに変換されて返ってきます。  
端末設定が夏時間も考慮された時刻になっていれば、夏時間分も合わせたoffsetで計算されます。  
夏時間設定をオフにしていると、夏時間は考慮されません。（macは見当たりませんでしたが、Windowsは設定をオフにできるようです。）
```



