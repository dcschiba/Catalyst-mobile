# OpenLayers

  OpenLayersの呼び出しはSPA（React）アプリケーションと通常のアプリケーションで一部実装方法が異なる。  

## ①SPA（React）アプリケーションのMap設定

### OpenLayersコンポーネントの配置
1. WRAPが提供するOpenLayersコンポーネントをimportする
```js
import OpenLayers from '../../components/common/OpenLayers';
```

2. OpenLayersコンポーネントの配置
```js
<OpenLayers mapId={mapId} initMap={initMap} mapSrc={mapSrc} />
```

 - mapId : OpenLayers表示範囲のdivタグに設定されるid
 - initMap : OpenLayers APIロード後に実行される関数　※詳細は後述
 - mapSrc : OpenLayersのAPI取得先のURLを指定

3. OpenLayers APIロード後に実行される関数を設定する  
ここの関数内でOpenLayersの初期設定処理を実行する
```js
    const mapId = 'map';
    const mapSrc = 'https://cdnjs.cloudflare.com/ajax/libs/ol3/3.20.1/ol.js';
    const initMap = () => {
      if (!window.readyState ||
        window.readyState === 'loaded' ||
        window.readyState === 'complete') {
        const map = new ol.Map({
          layers: [new ol.layer.Tile({
            source: new ol.source.OSM(),
          }),
          ],
          target: mapId,
          view: new ol.View({
            center: ol.proj.transform([139.806513, 35.792621], 'EPSG:4326', 'EPSG:3857'),
            zoom: 6,
            minZoom: 3,
            maxZoom: 12,
          }),
        });
        WRAP.Geo.setOpenLayers(map);
      }
    };
```
#### OpenLayers APIのロード判定  
グローバルオブジェクトの「readyState」を確認し、OpenLayers APIの読み込み完了を判定する。
```js
    if (!window.readyState || window.readyState === 'loaded' || window.readyState === 'complete')
```
#### OpenLayers表示用のパラメータ
```js
    const map = new ol.Map({
      layers: [new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
      ],
      target: mapId,
      view: new ol.View({
        center: ol.proj.transform([139.806513, 35.792621], 'EPSG:4326', 'EPSG:3857'),
        zoom: 6,
        minZoom: 3,
        maxZoom: 12,
      }),
    });
```
    - layers : レイヤーのタイプを指定。
    - source : 地図データを指定。
    - target : Mapを出力するdivタグのid。
    - center : Mapの初期表示の緯度経度。
    - zoom : Mapの初期ズーム。
    - minZoom : Mapの最小ズームの上限。
    - maxZoom : Mapの最大ズームの上限。

その他のオプションについては、公式ページを参照。
http://openlayers.org/en/v3.0.0/apidoc/
#### WRAP Geoへの登録
生成したmapオブジェクトをWRAP Geoに登録する。
```js
    WRAP.Geo.setOpenLayers(map);
```

## ②通常のアプリケーションのMap設定
### OpenLayersの配置
1. HTML(index.htmlなど)にOpenLayersのライブラリを指定  
```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ol3/3.4.0/ol.js"></script>
```
  
2. Map出力先のdivタグを指定
```html
    <div id="map" style="width:100%; height:100%;"></div>
```

3. Map生成処理を記述する  
パラメータなどはReact版と同様
```js
    var map = new ol.Map({
      layers: [new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
      ],
      target: 'map',
      view: new ol.View({
        center: ol.proj.transform([139.806513, 35.792621], 'EPSG:4326', 'EPSG:3857'),
        zoom: 6,
        minZoom: 3,
        maxZoom: 12,
      }),
    });
```
4. WRAP Geoへの登録  
生成したmapオブジェクトをWRAP Geoに登録する。
```js
    WRAP.Geo.setOpenLayers(map);
```