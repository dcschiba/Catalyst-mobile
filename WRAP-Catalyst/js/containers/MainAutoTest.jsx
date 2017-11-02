import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WRAP from 'WRAP';
import WrapController from 'WRAP/UI/WrapController';
import GoogleMap from 'WRAP/UI/GoogleMap';
import OpenLayers from 'WRAP/UI/OpenLayers';
import OverMapDiv from './OverMapDiv';
import ZoomControl from '../components/webgl/ZoomControl';
import * as MapActions from '../actions/map';
import * as RadarActions from '../actions/radar';
import * as TropicalstormActions from '../actions/tropicalstorm';
import * as LayerActions from '../actions/layer';
import * as LayerConfig from '../layers/LayerConfig';
import WebglInitLayer from '../layers/WebglInitLayer';


const propTypes = {
  actions: PropTypes.object,
  mapOption: PropTypes.object,
  confDataPath: PropTypes.string,
  confHistDataPath: PropTypes.string,
  confLayerPath: PropTypes.string,
  dhkeyoption: PropTypes.object,
  layers: PropTypes.array,
  isShowGoogleMap: PropTypes.bool,
  isShowOlMap: PropTypes.bool,
  isShowWebGLMap: PropTypes.bool,
  showContents: PropTypes.array,
  testmap: PropTypes.string, // 自動テスト用
  eventid: PropTypes.string, // 自動テスト用
};

const mapId = 'map';
const gmapId = 'gmap';
const olmapId = 'olmap';
const webglmapId = 'webglmap';

class MainAutoTest extends Component {
  static getLayerstatus() {
    return MainAutoTest.layerstatus;
  }

  static startWaitLayerDraw() {
    // WRAP.Geo.invalidate(); // test
    /* eslint-disable no-unused-vars */

    MainAutoTest.layerstatus = { incompleted: -1, error: -1, completed: -1 };
    WRAP.Geo.waitLayerDraw((status) => {
      MainAutoTest.layerstatus = {
        incompleted: status.incompleted.length,
        error: status.error.length,
        completed: status.completed.length,
      };
    },
    1,  // 1秒後から監視開始（秒）
    5); // 監視タイムアウト（秒）
    return MainAutoTest.layerstatus;
  }

  constructor(props) {
    super(props);
    this.mapInitedCallback = this.mapInitedCallback.bind(this);
    this.olMapInitedCallback = this.olMapInitedCallback.bind(this);
    this.webGLMapInitedCallback = this.webGLMapInitedCallback.bind(this);
    window.getLayerstatus = MainAutoTest.getLayerstatus;
    window.startWaitLayerDraw = MainAutoTest.startWaitLayerDraw;
  }


  componentWillMount() {
    const { actions } = this.props;
    actions.loadMapSetting();
  }

  componentDidMount() {
    const { testmap } = this.props;
    if (testmap && testmap === webglmapId) {
      const interv = setInterval(() => {
        if (document.getElementById(webglmapId)) {
          this.initWrapLayer(null, testmap);
          clearInterval(interv);
        }
      }, 50);
    }
  }

  mapInitedCallback(map) {
    console.log('mapInitedCallback setgooglemap');
    this.initWrapLayer(map, gmapId);
  }

  initWrapLayer(map, maptype) {
    const { confLayerPath, confDataPath, confHistDataPath, dhkeyoption, mapOption,
       layers, actions, showContents, testmap, eventid } = this.props;

    const mapDiv = document.getElementById(mapId);
    if (eventid) {
      // WRAP.DH.set({ event_id: eventid });
      WrapController.initWRAP(confHistDataPath, { ...dhkeyoption, event_id: eventid });
    } else {
      WrapController.initWRAP(confDataPath, dhkeyoption);  // DHが参照するデータの設定ファイルの格納先をセット
    }

    if (maptype === gmapId) {
      WrapController.initGoogleMap(map); // Geoにgooglemapオブジェクトをセット
    } else if (maptype === olmapId) {
      WrapController.initOpenLayers(map); // Geoにopenlayermapオブジェクトをセット
    } else if (maptype === webglmapId) {
      const webglmapDiv = document.getElementById(webglmapId);
      WrapController.initWebGLMap(webglmapDiv, mapOption); // WebGLMapを初期化
    }
    WrapController.setMapdiv(mapDiv);
    WrapController.initLayer(
      layers, // レイヤー設定の定義
      LayerConfig, // レイヤー名とレイヤーファイルの紐づけ
      confLayerPath,  // レイヤー設定ファイルの格納先
      showContents, // 表示する機能コンテンツリスト
      actions.wrapDispatchAction,  // inspect関数のコールバック等
    ); // レイヤーを初期化

    /* // WRAP 基本機能自動テストレイヤーをadd
    if (showContents && showContents.indexOf('basictest') > -1) {
      const { BasicFunctionTest } = LayerConfig;
      const basictestlayer = new BasicFunctionTestLayer(BasicFunctionTest.layerName);
      WrapController.layer.upper_layers.unshift(basictestlayer);
    }*/

    // 自動テストの時、webglmap BlueMarbleLayerをセットする
    if (testmap && testmap === webglmapId) {
      const dhData = WRAP.DH.addObject('Map_BlueMarble');
      const layerconf = layers.filter(lf => lf.contentName === 'webglinit');
      const blayerconf = layerconf[0];
      const blueMarblelayer = new WebglInitLayer(
        { ...blayerconf, confLayerPath, dhData });
      WrapController.layer.upper_layers.push(blueMarblelayer);
      WRAP.Geo.setLayer(WrapController.layer);
    }
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
    const { testmap } = this.props;
    if (testmap && testmap === olmapId) {
      this.initWrapLayer(map, testmap);
    } else {
      // setTimeout(() => {
      console.log('olMapInitedCallback setopenlayermap');
      const { actions } = this.props;
      WrapController.initOpenLayers(map);
      actions.switchOlMap(false);
      this.webGLMapInitedCallback();
      // }, 3000);
    }
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
    const { mapOption, testmap, isShowGoogleMap, isShowOlMap, isShowWebGLMap } = this.props;
    if (!mapOption) {
      return (
        <div>Map Loading...</div>
      );
    }
    const maplist = [];
    if (!testmap || testmap === gmapId) {
      maplist.push(<GoogleMap
        mapSetting={mapOption}
        mapId={gmapId}
        key={gmapId}
        isHide={!isShowGoogleMap}
        mapInitedCallback={this.mapInitedCallback}
      />);
    }
    if (!testmap || testmap === olmapId) {
      maplist.push(<OpenLayers
        mapSetting={mapOption}
        mapId={olmapId}
        key={olmapId}
        isHide={!isShowOlMap}
        mapInitedCallback={this.olMapInitedCallback}
      />);
    }
    if (!testmap || testmap === webglmapId) {
      maplist.push(<div
        id={webglmapId}
        key={webglmapId}
        style={isShowWebGLMap ? { height: '100%', width: '100%' } : { display: 'none' }}
      />);
      if (isShowWebGLMap) {
        maplist.push(<ZoomControl key="webglzoom" />);
      }
    }
    return (
      <div id={mapId} style={{ height: '100%', width: '100%', position: 'relative' }}>
        {maplist}
        {OverMapDiv}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { map, catalyst } = state;
  return {
    mapOption: map.data.mapoption,
    confDataPath: map.data.confDataPath,
    confHistDataPath: map.data.confHistDataPath,
    confLayerPath: map.data.confLayerPath,
    dhkeyoption: map.data.dhkeyoption,
    layers: map.data.layers,
    isShowGoogleMap: map.isShowGoogleMap,
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

MainAutoTest.propTypes = propTypes;
MainAutoTest.layerstatus = { incompleted: -1, error: -1, completed: -1 };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainAutoTest);
