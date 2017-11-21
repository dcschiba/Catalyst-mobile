import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-back';
import WrapController from 'WRAP/UI/WrapController';
// import GoogleMap from 'WRAP/UI/GoogleMap';
import { hashHistory } from 'react-router';
import mapsetting from '../constants/map/mapsetting-newest.json';
import MapConsole from '../components/catalyst/MapConsole';
import css from '../../style/main.css';
import GoogleMap from '../WRAP-UI/GoogleMap';
import * as LayerActions from '../actions/layer';
import * as RadarActions from '../actions/radar';
import * as LayerConfig from '../layers/LayerConfig';


const propTypes = {
  actions: PropTypes.object,
  checkedFunc: PropTypes.array.isRequired,
  themeColor: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};

const mapId = 'map';
const gmapId = 'gmap';

class Main extends Component {
  constructor(props) {
    super(props);
    this.mapInitedCallback = this.mapInitedCallback.bind(this);
  }

  mapInitedCallback(map) {
    const { confLayerPath, confDataPath, dhkeyoption, layers } = mapsetting;
    const { checkedFunc, actions } = this.props;
    const mapDiv = document.getElementById(mapId);
    WrapController.initWRAP(confDataPath, dhkeyoption);  // DHが参照するデータの設定ファイルの格納先をセット
    WrapController.initGoogleMap(map); // Geoにmapオブジェクトをセット
    WrapController.setMapdiv(mapDiv);
    WrapController.initLayer(
      layers, // レイヤー設定の定義
      LayerConfig, // レイヤー名とレイヤーファイルの紐づけ
      confLayerPath,  // レイヤー設定ファイルの格納先
      checkedFunc, // 表示する機能コンテンツリスト
      actions.wrapDispatchAction,  // inspect関数のコールバック等
    ); // レイヤーを初期化

    const JPRadarLayer = WrapController.getLayer(LayerConfig.WX_JP_Radar.layerName);
    if (JPRadarLayer) {
      JPRadarLayer.setAction(actions.loadJPRadarActivity);
    }
  }
  render() {
    if (!mapsetting) {
      return (
        <div>Map Loading...</div>
      );
    }
    const { checkedFunc, themeColor, locale } = this.props;
    /* eslint-disable global-require,import/no-dynamic-require */
    let messages;
    try {
      messages = require(`../locales/${locale}/messages.json`);
    } catch (error) {
      if (error.message.indexOf('Cannot find module') !== -1) {
        messages = require('../locales/en/messages.json');
      } else {
        throw error;
      }
    }
    return (
      <IntlProvider locale={locale} messages={messages}>
        <div className={css.wrapper}>
          <div id={mapId} style={{ height: 'calc(100% - 50px)', width: '100%', position: 'relative' }}>
            <GoogleMap
              mapSetting={mapsetting.mapoption}
              mapId={gmapId}
              isHide={false}
              mapInitedCallback={this.mapInitedCallback}
            />
          </div>
          <button className={css.back_button} onClick={() => hashHistory.push('app/top')}>
            <ArrowIcon />
            <div className={css.back_button_label}>Back</div>
          </button>
          <MapConsole tabList={checkedFunc} themeColor={themeColor} />
        </div>
      </IntlProvider>
    );
  }
}

function mapStateToProps(state) {
  const checkedFunc = state.functionList.list;
  return {
    checkedFunc,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, LayerActions, RadarActions), dispatch),
  };
}

Main.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

