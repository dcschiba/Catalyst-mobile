# Switch Map

GoogleMapとOpenLayersの切り替え  

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
