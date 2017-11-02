import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WrapController from 'WRAP/UI/WrapController';
import GoogleMap from 'WRAP/UI/GoogleMap';
import OpenLayers from 'WRAP/UI/OpenLayers';
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
  isShowGoogleMap: PropTypes.bool,
  isShowOlMap: PropTypes.bool,
  isShowWebGLMap: PropTypes.bool,
  mapSource: PropTypes.string,
  showContents: PropTypes.array,
};

const mapId = 'map';
const gmapId = 'gmap';
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

  mapInitedCallback(map) {
    console.log('mapInitedCallback setgooglemap');
    const { confLayerPath, confDataPath, dhkeyoption, layers, actions, showContents } = this.props;
    const mapDiv = document.getElementById(mapId);
    WrapController.initWRAP(confDataPath, dhkeyoption);  // DHが参照するデータの設定ファイルの格納先をセット
    WrapController.initGoogleMap(map); // Geoにmapオブジェクトをセット
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
    // setTimeout(() => {
    console.log('olMapInitedCallback setopenlayermap');
    const { actions } = this.props;
    WrapController.initOpenLayers(map);
    actions.switchOlMap(false);
    this.webGLMapInitedCallback();
    // }, 3000);
  }

  webGLMapInitedCallback() {
    const { actions, mapOption } = this.props;
    const mapDiv = document.getElementById(webglmapId);
    WrapController.initWebGLMap(mapDiv, mapOption); // WebGLMapを初期化
    actions.switchWebGLMap(false);
    // GoogleMapが先に初期化されている場合、mapを切り替える
    const gmap = WrapController.gmap_ins;
    if (gmap) {
      WrapController.switchMap(gmap);
      console.log('switchMap googlemap');
    }
  }

  render() {
    const { mapOption, isShowGoogleMap, isShowOlMap, isShowWebGLMap, mapSource } = this.props;
    if (!mapOption) {
      return (
        <div>Map Loading...</div>
      );
    }
    return (
      <div id={mapId} style={{ height: '100%', width: '100%', position: 'relative' }}>
        <GoogleMap
          mapSetting={mapOption}
          mapId={gmapId}
          isHide={!isShowGoogleMap}
          mapInitedCallback={this.mapInitedCallback}
        />
        <OpenLayers
          mapSetting={mapOption}
          mapSource={mapSource}
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
    isShowGoogleMap: map.isShowGoogleMap,
    isShowOlMap: map.isShowOlMap,
    isShowWebGLMap: map.isShowWebGLMap,
    mapSource: map.mapSource,
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
