import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import WrapController from 'WRAP/UI/WrapController';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-back';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';

// import GoogleMap from 'WRAP/UI/GoogleMap';
import mapsetting from '../constants/map/mapsetting-newest.json';
import BaseTime from '../components/catalyst/BaseTime';
import MapConsole from '../components/catalyst/MapConsole';
import FooterButtons from '../components/catalyst/FooterButtons';
import Legend from '../components/catalyst/Legend';
import IconButton from '../components/catalyst/IconButton';
import Loading from '../components/catalyst/Loading';
import GoogleMap from '../WRAP-UI/GoogleMap';
import * as LayerConfig from '../layers/LayerConfig';
import * as LoadingActions from '../actions/loading';
import * as LayerActions from '../actions/layer';
import * as RadarActions from '../actions/radar';
import css from '../../style/main.css';

const propTypes = {
  actions: PropTypes.object,
  checkedFunc: PropTypes.array.isRequired,
  themeColor: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  activeFlags: PropTypes.object.isRequired,
};

const styles = {
  refresh_button: {
    backgroundColor: '#173588',
    margin: '0 auto',
    boxShadow: '2px 3px 6px #777777',
  },
  back_button: {
    color: '#000000',
    float: 'left',
  },
};

const mapId = 'map';
const gmapId = 'gmap';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowLegend: false,
      isSpreadBaseTime: false,
    };
    this.mapInitedCallback = this.mapInitedCallback.bind(this);
    this.legendToggle = this.legendToggle.bind(this);
    this.baseTimeToggle = this.baseTimeToggle.bind(this);
  }
  componentWillMount() {
    this.props.actions.startLoading();
  }
  legendToggle(flag) {
    this.setState({
      isShowLegend: flag,
    });
  }
  baseTimeToggle(flag) {
    this.setState({
      isSpreadBaseTime: flag,
      isShowLegend: this.props.checkedFunc.length > 3 ? false : this.state.isShowLegend,
    });
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
    actions.stopLoading();
  }
  render() {
    const { checkedFunc, themeColor, locale, isLoading, activeFlags } = this.props;
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
          <Loading show={isLoading} />
          <div id={mapId} style={{ height: 'calc(100% - 60px)', width: '100%', position: 'relative' }}>
            <GoogleMap
              mapSetting={mapsetting.mapoption}
              mapId={gmapId}
              isHide={false}
              mapInitedCallback={this.mapInitedCallback}
            />
          </div>
          <div className={css.top_area}>
            <div className={css.top_item}>
              <IconButton
                label="Back"
                className={css.backh_button}
                Icon={ArrowIcon}
                style={styles.back_button}
                iconStyle={{ color: '#000000' }}
                onClick={() => hashHistory.push('app/top')}
              />
            </div>
            <div className={css.top_item}>
              <IconButton
                label="refresh"
                className={css.refresh_button}
                Icon={RefreshIcon}
                style={styles.refresh_button}
              />
            </div>
            <div className={css.top_item}>
              <BaseTime
                timeList={checkedFunc.map(func => ({ name: func.name, baseTime: '09/13 09:30' }))}
                toggle={this.baseTimeToggle}
                flag={this.state.isSpreadBaseTime}
              />
            </div>
          </div>
          <Legend
            tabList={checkedFunc}
            toggle={this.legendToggle}
            flag={this.state.isShowLegend}
            moreHidden={checkedFunc.length > 3 && this.state.isSpreadBaseTime}
          />
          <FooterButtons tabList={checkedFunc} themeColor={themeColor} activeFlags={activeFlags} />
          <MapConsole tabList={checkedFunc} themeColor={themeColor} />
        </div>
      </IntlProvider>
    );
  }
}

function mapStateToProps(state) {
  const checkedFunc = state.functionList.list;
  const isLoading = state.loading.isLoading;

  const gfs = state.gpvgfs.gpv.gpvchecked;
  const radar = state.radar.radar.radarChecked;
  const amedas = state.amedas.showchecked;
  const jp10ten = state.jp10ten.showchecked;
  const jmawarn = state.jmawarn.jmawarnChecked;
  const hilofront = state.hilofront.showchecked;
  const lightning = state.lightning.lightningLidenChecked;
  const waveblend = state.waveblend.waveBlendChecked;
  const livecamera = state.livecamera.liveCmChecked;
  const compasshour = state.compasshour.compassHourChecked;
  const disasterreport = state.disasterreport.disasterReportChecked;

  return {
    checkedFunc,
    isLoading,
    activeFlags: {
      gfs,
      radar,
      amedas,
      jp10ten,
      jmawarn,
      hilofront,
      lightning,
      waveblend,
      livecamera,
      compasshour,
      disasterreport,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({},
      LayerActions,
      RadarActions,
      LoadingActions,
    ), dispatch),
  };
}

Main.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

