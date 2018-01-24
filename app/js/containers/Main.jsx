import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WRAP from 'WRAP';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import WrapController from 'WRAP/UI/WrapController';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-back';
// import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import { FormattedMessage } from 'react-intl';
import LocationIcon from 'material-ui/svg-icons/maps/my-location';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import mapsetting from '../constants/map/mapsetting-newest.json';
import BaseTime from '../components/catalyst/BaseTime';
import MapConsole from '../components/catalyst/MapConsole';
import FooterButtons from '../components/catalyst/FooterButtons';
import Legend from '../components/catalyst/Legend';
import IconButton from '../components/catalyst/IconButton';
import Loading from '../components/catalyst/Loading';
import GoogleMap from '../WRAP-UI/GoogleMap';
import OpenLayers from '../WRAP-UI/OpenLayers';
import * as LayerConfig from '../layers/LayerConfig';
import * as LayerActions from '../actions/layer';
import * as RadarActions from '../actions/radar';
import * as InitActions from '../actions/layerInit';
import * as LoadingActions from '../actions/loading';
import * as selectFuncActions from '../actions/selectedFuncList';
import { OPEN_STREET_MAP } from '../constants/map/mapSource';
import css from '../../style/main.css';
import GPVLayer from '../layers/gpv/GPVLayer';
import {
  LIGHTNING,
  LIGHTNING_KMA,
  LIGHTNING_LIDEN,
} from '../constants/lightning/LabelText';

const propTypes = {
  actions: PropTypes.object,
  funcMasterObject: PropTypes.object.isRequired,
  selectedFuncList: PropTypes.array.isRequired,
  themeColor: PropTypes.object.isRequired,
  initflags: PropTypes.object.isRequired,
  showLayerFlags: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.object,
  locale: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired,
  networkInfo: PropTypes.object.isRequired,
  basetimeList: PropTypes.array.isRequired,
};

const styles = {
  refresh_icon: {
    fill: '#eeeeee',
  },
  back_button: {
    color: '#000000',
    float: 'left',
  },
  location_button: {
    position: 'absolute',
    bottom: '90px',
    right: '20px',
  },
  floating_button_icon: {
    fill: '#4285f4',
  },
};

const mapId = 'map';
const gmapId = 'gmap';

function locationSuccess(position) {
  window.navigator.vibrate(100);
  const layer = WrapController.getLayer(LayerConfig.Location.layerName);
  layer.clear();
  const point = new WRAP.Geo.Feature.Point({
    point: [position.coords.longitude, position.coords.latitude],
    strokeStyle: '#ffffff',
    lineWidth: 2,
    fillStyle: '#4285f4',
    pointSize: 18,
  });
  point.index = 0;
  layer.addFeature(point);
  WRAP.Geo.invalidate();
  WRAP.Geo.setCenterPoint(
    new WRAP.Geo.Point(
      position.coords.latitude * 60.0,
      position.coords.longitude * 60.0,
    ),
  );
}
function locationError(error, message) {
  alert(message);
  console.log(error);
}

function getLocation(message) {
  window.navigator.geolocation.getCurrentPosition(
    locationSuccess,
    error => locationError(error, message),
    {
      enableHighAccuracy: true,
      timeout: 5000,
    },
  );
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowLegend: false,
      isSpreadBaseTime: false,
      isReady: false,
      mapInitFlg: false,
    };
    this.mapInitedCallback = this.mapInitedCallback.bind(this);
    this.legendToggle = this.legendToggle.bind(this);
    this.baseTimeToggle = this.baseTimeToggle.bind(this);
    this.ready = this.ready.bind(this);
  }
  componentWillMount() {
    const { actions } = this.props;
    const { contents } = this.props.location.query;
    if (contents) {
      actions.addFunction(contents);
    }
  }

  /** 初回描画後 */
  componentDidMount() {
    setTimeout(() => {
      if (this.props.isLoading) {
        window.navigator.notification.alert(
          '地図の読み込みが失敗しました',
          () => hashHistory.push('app/top'),
          '',
        );
      }
    }, 30000);
  }

  componentDidUpdate() {
    const { selectedFuncList, initflags, actions } = this.props;
    if (this.props.isLoading && this.state.mapInitFlg
      && selectedFuncList.filter(func => !initflags[func]).length === 0) {
      actions.stopLoading();
      WRAP.Geo.waitLayerDraw(() => {
        console.log('ready');
        this.ready();
      }, 0, 60);
    }
  }

  componentWillUnmount() {
    mapsetting.layers.forEach((layer) => {
      WRAP.DH.removeObject(layer.DHObjectName);
    });
    GPVLayer.timeRange = {}; // Layerでtimelistを保持しているため、初期化
    this.props.actions.layerInitClear();
  }
  ready() {
    this.setState({ isReady: true });
  }
  legendToggle(flag) {
    this.setState({
      isShowLegend: flag,
    });
  }
  baseTimeToggle(flag) {
    this.setState({
      isSpreadBaseTime: flag,
      isShowLegend: this.props.selectedFuncList.length > 3 ? false : this.state.isShowLegend,
    });
  }
  mapInitedCallback(map) {
    const { confLayerPath, confDataPath, dhkeyoption, layers } = mapsetting;
    const { selectedFuncList, actions, networkInfo } = this.props;
    const mapDiv = document.getElementById(mapId);
    // TODO AMeDASの「MasterData」のみ、DH.setが効いていないようなのであとで調査
    if (networkInfo.isOnline) {
      dhkeyoption.baseurl = 'https://pt-wrap01.wni.co.jp';
      dhkeyoption.baseurl_ea = 'https://pt-wrap.wni.com';
      dhkeyoption.icdburl = 'https://wni-icdb.wni.com';
      dhkeyoption.pdburl = 'https://wni-pdb.wni.com';
      dhkeyoption.apppath = 'https://pt-wrap01.wni.co.jp/Catalyst';
      map.setOptions({ passiveLogo: true });
      WrapController.initGoogleMap(map); // Geoにmapオブジェクトをセット
    } else {
      dhkeyoption.baseurl = 'http://localhost:50000';
      dhkeyoption.baseurl_ea = 'http://localhost:50000';
      dhkeyoption.icdburl = 'http://localhost:50000';
      dhkeyoption.pdburl = 'http://localhost:50000';
      dhkeyoption.apppath = 'http://localhost:50000';
      WrapController.initOpenLayers(map); // Geoにmapオブジェクトをセット
    }
    WrapController.initWRAP(confDataPath, dhkeyoption);  // DHが参照するデータの設定ファイルの格納先をセット

    const pathList = [...selectedFuncList];
    pathList.push('location');
    WrapController.setMapdiv(mapDiv);
    WrapController.initLayer(
      layers, // レイヤー設定の定義
      LayerConfig, // レイヤー名とレイヤーファイルの紐づけ
      confLayerPath,  // レイヤー設定ファイルの格納先
      pathList, // 表示する機能コンテンツリスト
      actions.wrapDispatchAction,  // inspect関数のコールバック等
    ); // レイヤーを初期化
    const JPRadarLayer = WrapController.getLayer(LayerConfig.WX_JP_Radar.layerName);
    if (JPRadarLayer) {
      JPRadarLayer.setAction(actions.loadJPRadarActivity);
    }
    this.setState({ mapInitFlg: true });
  }

  render() {
    const {
      selectedFuncList,
      themeColor,
      showLayerFlags,
      funcMasterObject,
      basetimeList,
    } = this.props;
    const selectedFuncItemList = selectedFuncList.map(func => funcMasterObject[func]);
    const { networkInfo } = this.props;
    const mapoption = { ...mapsetting.mapoption, lang: this.props.locale };
    return (
      <div className={css.wrapper} >
        {!this.state.isReady ? <Loading /> : null}
        <div id={mapId} style={{ height: 'calc(100% - 60px)', width: '100%', position: 'relative' }}>
          {networkInfo.isOnline ?
            <GoogleMap
              mapSetting={mapoption}
              mapId={gmapId}
              isHide={false}
              mapInitedCallback={this.mapInitedCallback}
            /> :
            <OpenLayers
              mapSetting={mapsetting.mapoption}
              mapSource={OPEN_STREET_MAP}
              mapId={gmapId}
              mapInitedCallback={this.mapInitedCallback}
            />
          }
        </div>
        <div className={css.top_area}>
          <div className={css.top_item}>
            <IconButton
              label={<FormattedMessage id="back_button_label" />}
              className={css.backh_button}
              Icon={ArrowIcon}
              style={styles.back_button}
              iconStyle={{ color: '#000000' }}
              onClick={() => hashHistory.push('app/top')}
            />
          </div>
          {/* <div className={css.top_item_center}>
            <button className={css.refresh_button}>
              <RefreshIcon style={styles.refresh_icon} />
            </button>
          </div> */}
          <div className={css.top_item}>
            <BaseTime
              timeList={basetimeList}
              spreadtoggle={this.baseTimeToggle}
              spreadFlag={this.state.isSpreadBaseTime}
            />
          </div>
        </div>
        <Legend
          tabList={selectedFuncItemList}
          spreadtoggle={this.legendToggle}
          spreadFlag={this.state.isShowLegend}
          moreHidden={basetimeList.length > 3 && this.state.isSpreadBaseTime}
        />
        {networkInfo.isOnline ? <FloatingActionButton
          backgroundColor="white"
          onClick={() => getLocation(this.props.messages.getLocationFailed)}
          mini
          style={styles.location_button}
        >
          <LocationIcon style={styles.floating_button_icon} />
        </FloatingActionButton> : null}
        <FooterButtons
          tabList={selectedFuncItemList}
          themeColor={themeColor}
          showLayerFlags={showLayerFlags}
        />
        <MapConsole
          tabList={selectedFuncItemList}
          themeColor={themeColor}
          isLoading={!this.state.isReady}
        />
      </div >
    );
  }
}

function mapStateToProps(state) {
  const selectedFuncList = state.selectedFuncList.list;
  const initflags = state.layerInit;
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
  const isLoading = state.loading.isLoading;
  const networkInfo = state.online;
  const funcMasterObject = state.locale.funcMasterObject;
  const showLayerFlags = {
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
  };

  const basetimeList = [];
  const activefunc = selectedFuncList.filter(func => (
    !isLoading && showLayerFlags[func]
  ));
  activefunc.forEach((func) => {
    switch (func) {
      case 'gfs': {
        basetimeList.push({
          name: funcMasterObject.gfs.name,
          basetime: state.gpvgfs.gpv.basetime[state.gpvgfs.gpv.basetimeidx],
        });
        break;
      }
      case 'radar': {
        if (radar) {
          const {
            JMA_ANLSIS_PRCRIN_EXTRA,
            WX_US_AK_Radar,
            WX_US_GU_Radar,
            WX_US_HI_Radar,
            WX_US_NA_Radar,
            WX_US_PR_Radar,
            WX_EU_Radar,
            WX_AU_Radar,
            WX_KR_Radar,
            WX_TW_Radar,
            JMA_OBS_RADAR_ECHINT_JP_5min,
            EC_OBS_RADAR_ECHINT_CA,
            jmaprcrinextravalidtimeidx,
            usAkvalidtimeidx,
            usGuvalidtimeidx,
            usHivalidtimeidx,
            usNavalidtimeidx,
            usPrvalidtimeidx,
            euvalidtimeidx,
            auvalidtimeidx,
            krvalidtimeidx,
            twvalidtimeidx,
            jpicdbvalidtimeidx,
            jmaprcrinextraChecked,
            usAkChecked,
            usGuChecked,
            usHiChecked,
            usNaChecked,
            usPrChecked,
            euChecked,
            auChecked,
            krChecked,
            twChecked,
            jpicdbChecked,
            ecobsradarechintcaChecked,
          } = state.radar.radar;
          if (jmaprcrinextraChecked) {
            basetimeList.push({
              name: 'Radar JMA_PRCRIN',
              basetime: JMA_ANLSIS_PRCRIN_EXTRA[jmaprcrinextravalidtimeidx].tm,
            });
          }
          if (usAkChecked) {
            basetimeList.push({
              name: 'Radar US_AK',
              basetime: WX_US_AK_Radar[usAkvalidtimeidx].tm,
            });
          }
          if (usGuChecked) {
            basetimeList.push({
              name: 'Radar US_GU',
              basetime: WX_US_GU_Radar[usGuvalidtimeidx].tm,
            });
          }
          if (usHiChecked) {
            basetimeList.push({
              name: 'Radar US_HI',
              basetime: WX_US_HI_Radar[usHivalidtimeidx].tm,
            });
          }
          if (usNaChecked) {
            basetimeList.push({
              name: 'Radar US_NA',
              basetime: WX_US_NA_Radar[usNavalidtimeidx].tm,
            });
          }
          if (usPrChecked) {
            basetimeList.push({
              name: 'Radar US_PR',
              basetime: WX_US_PR_Radar[usPrvalidtimeidx].tm,
            });
          }
          if (euChecked) {
            basetimeList.push({
              name: 'Radar EU',
              basetime: WX_EU_Radar[euvalidtimeidx].tm,
            });
          }
          if (auChecked) {
            basetimeList.push({
              name: 'Radar AU',
              basetime: WX_AU_Radar[auvalidtimeidx].tm,
            });
          }
          if (krChecked) {
            basetimeList.push({
              name: 'Radar KR',
              basetime: WX_KR_Radar[krvalidtimeidx].tm,
            });
          }
          if (twChecked) {
            basetimeList.push({
              name: 'Radar TW',
              basetime: WX_TW_Radar[twvalidtimeidx].tm,
            });
          }
          if (jpicdbChecked) {
            basetimeList.push({
              name: 'Radar JP_ICDB',
              basetime: JMA_OBS_RADAR_ECHINT_JP_5min[jpicdbvalidtimeidx].tm,
            });
          }
          if (ecobsradarechintcaChecked) {
            basetimeList.push({
              name: 'Radar OBS_RADAR_CA',
              basetime: EC_OBS_RADAR_ECHINT_CA[jpicdbvalidtimeidx].tm,
            });
          }
        }
        break;
      }
      case 'jp10ten': {
        basetimeList.push({
          name: funcMasterObject.jp10ten.name,
          basetime: state.jp10ten.validtimelist[state.jp10ten.validtimeidx],
        });
        break;
      }
      case 'waveblend': {
        basetimeList.push({
          name: funcMasterObject.waveblend.name,
          basetime: state.waveblend.basetime[state.waveblend.basetimeidx],
        });
        break;
      }
      case 'hilofront': {
        basetimeList.push({
          name: funcMasterObject.hilofront.name,
          basetime: state.hilofront.basetimelist[state.hilofront.basetimeidx],
        });
        break;
      }
      case 'jmawarn': {
        basetimeList.push({
          name: funcMasterObject.jmawarn.name,
          basetime: state.jmawarn.announceddate,
        });
        break;
      }
      case 'lightning': {
        if (state.lightning.lightningJpChecked) {
          basetimeList.push({
            name: LIGHTNING,
            basetime: state.lightning.lightningJpBasetime,
          });
        }
        if (state.lightning.lightningKmaChecked) {
          basetimeList.push({
            name: LIGHTNING_KMA,
            basetime: state.lightning.lightningKmaBasetime,
          });
        }
        if (state.lightning.lightningLidenChecked) {
          basetimeList.push({
            name: LIGHTNING_LIDEN,
            basetime: state.lightning.lightningLidenBasetime,
          });
        }
        break;
      }
      case 'amedas': {
        basetimeList.push({
          name: funcMasterObject.amedas.name,
          basetime: state.amedas.tsarr[state.amedas.validtimeidx].validtime,
        });
        break;
      }
      case 'compasshour': {
        basetimeList.push({
          name: funcMasterObject.compasshour.name,
          basetime: state.compasshour.basetime[state.compasshour.basetimeidx],
        });
        break;
      }
      default:
    }
  });
  return {
    selectedFuncList,
    showLayerFlags,
    initflags,
    isLoading,
    networkInfo,
    basetimeList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({},
      LayerActions,
      RadarActions,
      InitActions,
      LoadingActions,
      selectFuncActions,
    ), dispatch),
  };
}

Main.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

