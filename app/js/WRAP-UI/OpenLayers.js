/* eslint-disable */
import React, { Component } from 'react';
import style from './styles/openlayers';


/**
 * @class OpenLayers
 **/

/**
 * @method props
 * @param mapSetting {object} マップの設定
 * @param mapSource {String} 使用するマップ画像のURL（xyz）　※未指定の場合OpenStreetMapを表示
 * @param mapId {string} マップが表示されるdivタグのid
 * @param mapInitedCallback {function} マップ生成処理完了後のコールバック
 * @param isHide {boolean} マップの非表示フラグ
 **/
class OpenLayers extends Component {
  constructor(props) {
    super(props);
    this.initOpenStreetMap = this.initOpenStreetMap.bind(this);
  }

  componentDidMount() {
    const { mapInitedCallback, mapSetting, mapId } = this.props;
    this.initOpenLayers(mapInitedCallback, mapSetting, mapId);
  }
  
  componentWillReceiveProps(nextProps) {
    const { mapSource } = nextProps;
    if(mapSource && this.source) {
      this.source.setUrl(mapSource);
    }
  }

  initOpenLayers() {
    if(window.ol) {
      this.initOpenStreetMap();
      return;
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://localhost:50000/libs/ol/ol.js';

    document.getElementsByTagName('head')[0].appendChild(script);

    const ollink = document.createElement('link');
    ollink.rel = 'stylesheet';
    ollink.type = 'text/css';
    ollink.href = 'http://localhost:50000/libs/ol/ol.css';

    document.getElementsByTagName('head')[0].appendChild(script);
    document.getElementsByTagName('head')[0].appendChild(ollink);

    script.onload = script.onreadystatechange = this.initOpenStreetMap;
  }

  initOpenStreetMap() {
    const { mapInitedCallback, mapSetting, mapId, mapSource } = this.props;
    const {
      min_zoom,
      max_zoom,
      lat,
      lon,
      zoom,
    } = mapSetting;
    if (!window.readyState || window.readyState === 'loaded' || window.readyState === 'complete') {
      if (mapSource) {
        this.source = new ol.source.XYZ({ url: mapSource });
      } else {
        this.source = new ol.source.OSM();
      }
      const map = new ol.Map({
        layers: [new ol.layer.Tile({
          source: this.source,
        }),
        ],
        target: mapId,
        view: new ol.View({
          center: ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'),
          zoom,
          minZoom: min_zoom,
          maxZoom: max_zoom,
        }),
        controls: ol.control.defaults({
          attributionOptions: ({
            collapsible: false,
          }),
          zoom: false,
        }),
      });
      const olZoom = document.getElementsByClassName('ol-zoom');
      olZoom[0].style.left = 'auto';
      olZoom[0].style.top = 'auto';
      olZoom[0].style.bottom = '30px';
      olZoom[0].style.right = '8px';
      mapInitedCallback(map);
    }
  }

  render() {
    const { mapId, isHide } = this.props;
    return (
      <div style={!isHide ? style.map : { display: 'none' }} id={mapId} />
    );
  }
}

export default OpenLayers;