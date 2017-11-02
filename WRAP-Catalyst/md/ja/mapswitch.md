# Map切り替え

### 地図種類
今後、要望があり次第、OpenLayers / WebGL Map の地図種類は増やしていく予定。

- Google Maps API（メルカトル図法）  
  - [googleMap](https://www.google.co.jp/maps)  
    Google Maps API利用申請をCIC-Dへ出す必要があります。  

- OpenLayers（メルカトル図法）
  - [OpenStreetMap](https://www.openstreetmap.org/)
```
source: new ol.source.OSM()
```

  - [国土地理院](https://maps.gsi.go.jp/development/siyou.html)  
    OpenLayersなどで表示できるようWebMercatorプロジェクションでタイルを用意しています。  
    タイル形式は、TMSではなくXYZというものでyインデックスの方向が異なりますが、OpenLayersのXYZレイヤを使って表示できます。  
```
source: new ol.source.XYZ({url:"http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"})
```

  - 予定 [北海道地図](http://pt-mapgen01.wni.co.jp/work/test/MapTest.html)グローバル版
  - 予定 [現NEXTGENベースマップ](https://wni.backlog.jp/ViewAttachment.action?attachmentId=4823018)
  

- WebGL Map（正距円筒図法 / 等緯度経度図法ともいう）
  - WRAP DATA ID : [MAP_NASA_BlueMarble](https://goo.gl/df5Frm)  
    [NASA Blue Marble](https://earthobservatory.nasa.gov/Features/BlueMarble/)（解像度500m 地表彩色されたフリー地図）を使って、WebGL Map表示用のサンプル地図として用意したもの。  
    海が陸になっている所がある等（ex.サハリン島がロシアと陸続き）、製品版として扱うには課題あり。

  - WRAP DATA ID : [MAP_VMAP_CoastLine](https://goo.gl/df5Frm)  
    [VMAP](https://en.wikipedia.org/wiki/Vector_Map)を使って、海岸線の白地図として用意したもの。
  
  - 予定 [現NEXTGENベースマップ](https://wni.backlog.jp/ViewAttachment.action?attachmentId=4823018)

<hr>
### GoogleMapとOpenLayersの切り替え  

1. GoogleMap/OpenLayersコンポーネントの配置  
各マップの配置手順は個別の解説ページ参照  
[GoogleMap](./#/introduction/googlemap)  
[OpenLayers](./#/introduction/openlayers)  

2. マップ切り替え時の処理  
#### WRAP Geoのswitchmap関数呼び出し
WRAP Geoのswitchmap関数にmapオブジェクトを渡し、制御対象のmapを切り替える
```js
  if (this.o_map && isHideGoogleMap) {
    WRAP.Geo.switchMap(this.o_map);
  }
  if (this.g_map && isHideOlMap) {
    WRAP.Geo.switchMap(this.g_map);
  }
```
#### mapコンポーネントの表示/非表示切り替え  
各mapコンポーネントに「isHide」フラグを渡し、mapの切り替えに応じて非表示にする
```js
  <GoogleMap
    isHide={isHideGoogleMap}
    mapSetting={googleMapSetting}
    mapId={googleMapId}
    initMap={this.initGoogleMap}
  />
  <OpenLayers
    isHide={isHideOlMap}
    mapId={olMapId}
    initMap={this.initOlMap}
    mapSrc={olMapSrc}
  />
```
「isHide」フラグがtrueの場合、コンポーネント（map）が非表示となる
