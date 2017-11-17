/* eslint-disable */
import React, { Component } from 'react';
import style from './styles/googlemap';

/**
 * GoogleMapを表示する
 * @class GoogleMap
 **/

/**
 * @method props
 * @param mapSetting {object} マップの設定
 * @param mapId {string} マップが表示されるdivタグのid
 * @param mapInitedCallback {function} マップ生成処理完了後のコールバック
 * @param isHide {boolean} マップの非表示フラグ
 **/
class GoogleMap extends Component {
  static initGoogleMap(initedCallback, mapSetting, mapId) {
    const {
      client,
      libs,
      lang,
      region,
      min_zoom,
      max_zoom,
      lat,
      lon,
      zoom,
      zoomControl = true,
    } = mapSetting;

    if (window.google) {
      const mapOption = {
        minZoom: min_zoom,
        maxZoom: max_zoom,
        zoomControl,
        mapTypeControl: false,
        scaleControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM,
        },
        streetViewControl: false,
        draggableCursor: 'default',
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
      const mapDiv = document.getElementById(mapId);
      const map = new google.maps.Map(mapDiv, mapOption);
      map.setCenter(new google.maps.LatLng(lat, lon));
      map.setZoom(zoom);
      initedCallback(map);
      return;
    }
    const key = 'AIzaSyDQwrXfzJ9UoIC8ZoPYPotaw2khNnpBDWc';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?\
key=${key}&\
libraries=${libs}&\
language=${lang}&\
region=${region}&\
callback=g_GOOGLE_MAP_INITIALIZE`;

    window.g_GOOGLE_MAP_INITIALIZE = () => {
      const mapOption = {
        minZoom: min_zoom,
        maxZoom: max_zoom,
        zoomControl,
        mapTypeControl: false,
        scaleControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM,
        },
        streetViewControl: false,
        draggableCursor: 'default',
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
      const mapDiv = document.getElementById(mapId);
      const map = new google.maps.Map(mapDiv, mapOption);
      map.setCenter(new google.maps.LatLng(lat, lon));
      map.setZoom(zoom);

      initedCallback(map);
    };
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  componentDidMount() {
    const { mapInitedCallback, mapSetting, mapId } = this.props;
    GoogleMap.initGoogleMap(mapInitedCallback, mapSetting, mapId);
  }

  render() {
    const { mapId, isHide } = this.props;
    return (
      <div style={!isHide ? style.map : { display: 'none' }} id={mapId} />
    );
  }
}

export default GoogleMap;
