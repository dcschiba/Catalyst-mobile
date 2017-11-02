import React, { Component } from 'react';
import PropTypes from 'prop-types';
import proj4 from 'proj4';

const propTypes = {
  mapSetting: PropTypes.object.isRequired,
  mapId: PropTypes.string.isRequired,
  mapInitedCallback: PropTypes.func.isRequired,
  isHide: PropTypes.bool,
};

/**
 * @class OpenLayersPolar
 **/

/**
 * @method props
 * @param mapSetting {object} マップの設定
 * @param mapId {string} マップが表示されるdivタグのid
 * @param mapInitedCallback {function} マップ生成処理完了後のコールバック
 * @param isHide {boolean} マップの非表示フラグ
 **/
class OpenLayersPolar extends Component {
  /* eslint-disable camelcase */
  static getMaskLayer(south) {
    // マスクレイヤー（北半球の場合0〜−80度のマスク用ポリゴンを作成：南半球の場合は緯度の符号を反転させる）
    const projection = ol.proj.get('polar');
    const mask_source = new ol.source.Vector();
    for (let longitude = 0; longitude < 360; longitude += 10) {
      const points = [];
      points.push(ol.proj.transform([longitude, 0], 'EPSG:4326', projection));
      points.push(ol.proj.transform([longitude + 5, 0], 'EPSG:4326', projection));
      points.push(ol.proj.transform([longitude + 10.1, 0], 'EPSG:4326', projection));
      points.push(ol.proj.transform([longitude + 10.1, south ? 80 : -80], 'EPSG:4326', projection));
      points.push(ol.proj.transform([longitude, south ? 80 : -80], 'EPSG:4326', projection));
      points.push(ol.proj.transform([longitude, 0], 'EPSG:4326', projection));
      const polygon = new ol.geom.Polygon([points]);
      const feature = new ol.Feature();
      feature.setGeometry(polygon);
      feature.setStyle(new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(128,160,180,0.95)',
        }),
      }));
      mask_source.addFeature(feature);
    }
    const mask_layer = new ol.layer.Vector({
      source: mask_source,
    });
    return mask_layer;
  }

  constructor(props) {
    super(props);
    this.initOpenStreetMap = this.initOpenStreetMap.bind(this);
  }

  componentDidMount() {
    this.initOpenLayers();
  }

  initOpenLayers() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/ol3/3.20.1/ol.js';

    document.getElementsByTagName('head')[0].appendChild(script);
    script.onload = script.onreadystatechange = this.initOpenStreetMap;
  }

  initOpenStreetMap() {
    const { mapInitedCallback, mapSetting, mapId } = this.props;
    const {
      min_zoom,
      max_zoom,
      lon,
      zoom,
      base_lon,
      south,
    } = mapSetting;

    let {
      lat,
      base_lat,
      lat_ts,
    } = mapSetting;

    if (!window.readyState || window.readyState === 'loaded' || window.readyState === 'complete') {
      if (south) {
        lat = -lat;
        base_lat = -base_lat;
        lat_ts = -lat_ts;
      }

      // プロジェクション設定（proj4.jsを使用）
      /* eslint-disable prefer-template */
      window.proj4 = proj4;
      proj4.defs('polar', '+proj=stere +lat_0=' + base_lat + ' +lon_0=' + base_lon + ' +lat_ts=' + lat_ts + ' +x_0=0 +y_0=0 +units=m');

      const projection = ol.proj.get('polar');
      /* eslint-disable no-unused-vars */
      const view = new ol.View({
        center: ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'),
        projection,
        zoom,
        minZoom: min_zoom,
        maxZoom: max_zoom,
      });

      // ベースマップレイヤー
      const basemap_layer = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: 'pri/data/map/ne_50m_land_geo.json',
          format: new ol.format.GeoJSON(),
        }),
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: '#808080',
            width: 1,
          }),
          fill: new ol.style.Stroke({
            color: '#eff8c8',
          }),
        }),
      });

      // OpenLayersの生成
      const o_map = new ol.Map({
        layers: [basemap_layer],
        target: mapId,
        view: new ol.View({
          center: ol.proj.transform([lon, lat], 'EPSG:4326', projection),
          projection,
          zoom,
        }),
      });

      mapInitedCallback(o_map);
    }
  }

  render() {
    const { mapId, isHide } = this.props;
    return (
      <div style={!isHide ? { height: '100%', width: '100%' } : { display: 'none' }} id={mapId} />
    );
  }
}

OpenLayersPolar.propTypes = propTypes;

export default OpenLayersPolar;
