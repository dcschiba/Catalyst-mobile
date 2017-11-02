import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WRAP from 'WRAP';
import WrapController from 'WRAP/UI/WrapController';
import OpenLayersPolar from '../components/common/OpenLayersPolar';
import OverMapDiv from './OverMapDiv';
import * as MapActions from '../actions/map';
import * as RadarActions from '../actions/radar';
import * as TropicalstormActions from '../actions/tropicalstorm';
import * as LayerActions from '../actions/layer';
import * as LayerConfig from '../layers/LayerConfig';

const propTypes = {
  actions: PropTypes.object,
  mapOption: PropTypes.object,
  confDataPath: PropTypes.string,
  confLayerPath: PropTypes.string,
  dhkeyoption: PropTypes.object,
  layers: PropTypes.array,
  isShowOlMap: PropTypes.bool,
  isShowWebGLMap: PropTypes.bool,
  showContents: PropTypes.array,
};

const mapId = 'map';
const olmapId = 'olmap';
const webglmapId = 'webglmap';

class Main extends Component {
  constructor(props) {
    super(props);
    this.mapInitedCallback = this.mapInitedCallback.bind(this);
    this.olMapInitedCallback = this.olMapInitedCallback.bind(this);
    this.webGLMapInitedCallback = this.webGLMapInitedCallback.bind(this);
  }


  componentWillMount() {
    const { actions } = this.props;
    actions.loadMapSetting();
  }

  mapInitedCallback() {
    const { confLayerPath, confDataPath, dhkeyoption, layers, actions, showContents } = this.props;

    const mapDiv = document.getElementById(mapId);
    WrapController.initWRAP(confDataPath, dhkeyoption);  // DHが参照するデータの設定ファイルの格納先をセット
    WrapController.setMapdiv(mapDiv);
    WrapController.initLayer(
      layers, // レイヤー設定の定義
      LayerConfig, // レイヤー名とレイヤーファイルの紐づけ
      confLayerPath,  // レイヤー設定ファイルの格納先
      showContents, // 表示する機能コンテンツリスト
      actions.wrapDispatchAction,  // inspect関数のコールバック等
    ); // レイヤーを初期化

    // 特別レイヤーの制御
    // METARLayer TAFLayer addTooltipGroup
    const METARLayer = WrapController.getLayer(LayerConfig.METAR.layerName);
    const TAFLayer = WrapController.getLayer(LayerConfig.TAF.layerName);
    if (METARLayer && TAFLayer) {
      WrapController.addTooltipGroup([METARLayer, TAFLayer]);
    }
    // set JPRadar loadJPRadarActivity action
    const JPRadarLayer = WrapController.getLayer(LayerConfig.WX_JP_Radar.layerName);
    if (JPRadarLayer) {
      JPRadarLayer.setAction(actions.loadJPRadarActivity);
    }

    // set JmaTropicalStormLayer jmaInfoChange action
    const JmaTropicalStormLayer = WrapController.getLayer(LayerConfig.JMA_Typhoon.layerName);
    if (JmaTropicalStormLayer) {
      JmaTropicalStormLayer.setAction(actions.jmaInfoChange);
    }
  }

  olMapInitedCallback(map) {
    const { mapOption } = this.props;
    this.mapInitedCallback();
    this.webGLMapInitedCallback(); // webGLMapを先に初期化
    WrapController.initOpenLayers(map);

    const { base_lon, south } = mapOption;
    let { base_lat, lat_ts } = mapOption;
    /* eslint-disable camelcase */
    /* eslint-disable camelcase */
    const maskLayer = OpenLayersPolar.getMaskLayer(south);
    map.addLayer(maskLayer);
    if (south) {
      base_lat = -base_lat;
      lat_ts = -lat_ts;
    }
    WRAP.Geo.setView('PolarStereographics', { base_lat, base_lon, lat_ts });
  }

  webGLMapInitedCallback() {
    const { actions, mapOption } = this.props;
    const mapDiv = document.getElementById(webglmapId);
    WrapController.initWebGLMap(mapDiv, mapOption); // WebGLMapを初期化

    const { base_lon, south } = mapOption;
    let { base_lat, lat_ts } = mapOption;
    /* eslint-disable camelcase */
    if (south) {
      base_lat = -base_lat;
      lat_ts = -lat_ts;
    }
    WRAP.Geo.setView('PolarStereographics', { base_lat, base_lon, lat_ts });
    actions.switchWebGLMap(false);
  }

  render() {
    const { mapOption, isShowOlMap, isShowWebGLMap } = this.props;
    if (!mapOption) {
      return (
        <div>Map Loading...</div>
      );
    }
    return (
      <div id={mapId} style={{ height: '100%', width: '100%', position: 'relative' }}>
        <OpenLayersPolar
          mapSetting={mapOption}
          mapId={olmapId}
          isHide={!isShowOlMap}
          mapInitedCallback={this.olMapInitedCallback}
        />
        <div
          id={webglmapId}
          style={isShowWebGLMap ? { height: '100%', width: '100%' } : { display: 'none' }}
        />
        <OverMapDiv />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { map, catalyst } = state;
  return {
    mapOption: map.data.mapoption,
    confDataPath: map.data.confDataPath,
    confLayerPath: map.data.confLayerPath,
    dhkeyoption: map.data.dhkeyoption,
    layers: map.data.layers,
    isShowOlMap: map.isShowOlMap,
    isShowWebGLMap: map.isShowWebGLMap,
    showContents: catalyst.showContents,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign(
        {},
        MapActions,
        LayerActions,
        RadarActions,
        TropicalstormActions),
      dispatch),
  };
}

Main.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
