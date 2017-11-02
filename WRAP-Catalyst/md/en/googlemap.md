# Google Map

  Google Mapの呼び出しはSPA（React）アプリケーションと通常のアプリケーションで一部実装方法が異なる。  

## ①SPA（React）アプリケーションのMap設定

### GoogleMapコンポーネントの配置
1. WRAPが提供するGoogleMapコンポーネントをimportする
```js
import GoogleMap from '../../components/common/GoogleMap';
```

2. GoogleMapコンポーネントの配置
```js
<GoogleMap mapSetting={mapSetting} mapId={mapId} initMap={initMap} />
```

 - mapSetting : GoogleMap API呼び出し用のパラメータ　※詳細は後述
 - mapId : GoogleMap表示範囲のdivタグに設定されるid
 - initMap : GoogleMap APIロード後に実行される関数　※詳細は後述

3. GoogleMap API呼び出し用のパラメータを設定する
```js
    const mapSetting = {
        client: 'gme-weathernewsinc',
        libs: 'geometry',
        lang: 'ja',
        region: 'JP',
    };
```

 - client : GoogleMapAPIを使用するクライアントID
 - libs : ライブラリ
 - lang : 言語
 - region : 地域

4. GoogleMap APIロード後に実行される関数を設定する  
ここの関数内でGoogleMapの初期設定処理を実行する
```js
    const mapId = 'map';
    const initMap = () => {
      const { lat, lon, zoom } = { lat: 35.792621, lon: 139.806513, zoom: 6 };
      const defaultMapOption = {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.TOP_LEFT,
        },
        streetViewControl: false,
        draggableCursor: 'default',
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
      const map = new google.maps.Map(document.getElementById(mapId), defaultMapOption);
      map.setCenter(new google.maps.LatLng(lat, lon));
      map.setZoom(zoom);
      WRAP.Geo.setGoogleMap(map);
    };
```
#### GoogleMap表示用のパラメータ
```js
      const defaultMapOption = {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.TOP_LEFT,
        },
        streetViewControl: false,
        draggableCursor: 'default',
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
```
    - zoomControl : Mapのズーム機能。
    - mapTypeControl : 通常のMapと航空写真などを切り替える機能。
    - scaleControl : Mapの下部に縮尺を表示する機能。
    - zoomControlOptions : Mapのズームをする「+」と「    -」の機能。positionで表示位置を指定。
    - streetViewControl : ストリートビュー機能。
    - draggableCursor : Map上の、ドラッグ操作が可能な位置にホバーしている時のカーソルの形状を指定
    - MapTypeId : Mapのタイプを設定。SATELLITEやTERRAINなどがある。

その他のオプションについては、公式ページを参照。
https://developers.google.com/maps/documentation/javascript/controls?hl=ja  
#### mapIdパラメータ
GoogleMap表示箇所のidを指定する。  
GoogleMapコンポーネント配置時に「mapId」に指定した値と同じ。
``` js
    const map = new google.maps.Map(document.getElementById(mapId), defaultMapOption);
```
#### 初期表示の座標、zoomの設定

- lat, lon : Mapの初期表示時の中心を緯度、経度で指定。
- zoom : 初期表示時のズームレベルを指定。大きいほどズームする。

```js
    initMap = () => {
        const { lat, lon, zoom } = { zoom: 6, lat: 35.792621, lon: 139.806513 };
        ・・・
        map.setCenter(new google.maps.LatLng(lat, lon));
        map.setZoom(zoom);
    };
```

#### WRAP Geoへの登録
生成したmapオブジェクトをWRAP Geoに登録する。
```js
    WRAP.Geo.setGoogleMap(map);
```

## ②通常のアプリケーションのMap設定
### GoogleMapの配置
1. HTML(index.htmlなど)にgooglemapのライブラリを指定  
パラメータはReact版のmapSettingと同様。
 - client : クライアント
 - libraries : ライブラリ
 - language : 言語
 - region : 地域
```html
    <script src="https://maps.googleapis.com/maps/api/js?client=gme-weathernewsinc&libraries=geometry&language=ja&region=JP"></script>
```
  
2. Map出力先のdivタグを指定
```html
    <div id="map" style="width:100%; height:100%;"></div>
```

3. Map生成処理を記述する  
パラメータなどはReact版と同様

```js
    var defaultMapOption = {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        zoomControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT,
        },
        streetViewControl: false,
        draggableCursor: 'default',
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(document.getElementById('map'),defaultMapOption);
```
4. WRAP Geoへの登録
生成したmapオブジェクトをWRAP Geoに登録する。
```js
    WRAP.Geo.setGoogleMap(map);
```