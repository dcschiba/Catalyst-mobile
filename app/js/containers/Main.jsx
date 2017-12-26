import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WRAP from 'WRAP';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import WrapController from 'WRAP/UI/WrapController';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-back';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
// import GoogleMap from 'WRAP/UI/GoogleMap';
// import OpenLayers from 'WRAP/UI/OpenLayers';
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

const propTypes = {
  actions: PropTypes.object,
  funcMasterObject: PropTypes.object.isRequired,
  selectedFuncList: PropTypes.array.isRequired,
  themeColor: PropTypes.object.isRequired,
  initflags: PropTypes.object.isRequired,
  showLayerFlags: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.object,
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

function getLocation() {
  window.navigator.geolocation.getCurrentPosition(
    (position) => {
      window.navigator.vibrate([10]);
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
    },
    (error) => {
      alert('sorry, could not find you..');
      console.log(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 3000,
      maximumAge: 0,
    },
  );
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowLegend: false,
      isSpreadBaseTime: false,
      isOnline: true,
    };
    // this.onOnline = this.onOnline.bind(this);
    // this.onOffline = this.onOffline.bind(this);
    this.mapInitedCallback = this.mapInitedCallback.bind(this);
    this.legendToggle = this.legendToggle.bind(this);
    this.baseTimeToggle = this.baseTimeToggle.bind(this);
  }
  componentWillMount() {
    if (navigator.connection.type === 'none') {
      this.setState({ isOnline: false });
    } else {
      this.setState({ isOnline: true });
    }
    const { actions } = this.props;
    const { contents } = this.props.location.query;
    if (contents) {
      actions.addFunction(contents);
    }
  }

  componentDidUpdate() {
    const { selectedFuncList, initflags, actions } = this.props;
    if (this.props.isLoading
      && selectedFuncList.filter(func => !initflags[func]).length === 0) {
      actions.stopLoading();
    }
  }

  componentWillUnmount() {
    // document.removeEventListener('online', this.onOnline);
    // document.removeEventListener('offline', this.onOffline);
    // storeのlayer情報を初期化
    this.props.actions.layerInitClear();
  }

  // onOnline() {
  //   const { actions } = this.props;
  //   actions.online();
  // }

  // onOffline() {
  //   const { actions } = this.props;
  //   actions.offline();
  // }

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
    const { selectedFuncList, actions } = this.props;
    const { isOnline } = this.state;
    const mapDiv = document.getElementById(mapId);
    WrapController.initWRAP(confDataPath, dhkeyoption);  // DHが参照するデータの設定ファイルの格納先をセット
    // TODO AMeDASの「MasterData」のみ、DH.setが効いていないようなのであとで調査
    if (isOnline) {
      map.setOptions({ passiveLogo: true });
      dhkeyoption.baseurl = 'https://pt-wrap01.wni.co.jp';
      WrapController.initGoogleMap(map); // Geoにmapオブジェクトをセット
    } else {
      dhkeyoption.baseurl = 'http://localhost:50000';
      WrapController.initOpenLayers(map); // Geoにmapオブジェクトをセット
    }
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
  }
  render() {
    const {
      selectedFuncList,
      themeColor,
      showLayerFlags,
      isLoading,
      funcMasterObject,
    } = this.props;
    const selectedFuncItemList = selectedFuncList.map(func => funcMasterObject[func]);
    const { isOnline } = this.state;
    return (
      <div className={css.wrapper}>
        {isLoading ? <Loading /> : null}
        <div id={mapId} style={{ height: 'calc(100% - 60px)', width: '100%', position: 'relative' }}>
          {isOnline ?
            <GoogleMap
              mapSetting={mapsetting.mapoption}
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
              label="Back"
              className={css.backh_button}
              Icon={ArrowIcon}
              style={styles.back_button}
              iconStyle={{ color: '#000000' }}
              onClick={() => hashHistory.push('app/top')}
            />
          </div>
          <div className={css.top_item_center}>
            <button className={css.refresh_button}>
              <RefreshIcon style={styles.refresh_icon} />
            </button>
          </div>
          <div className={css.top_item}>
            <BaseTime
              timeList={selectedFuncItemList.map(func => ({ name: func.name, baseTime: '09/13 09:30' }))}
              toggle={this.baseTimeToggle}
              flag={this.state.isSpreadBaseTime}
            />
          </div>
        </div>
        <Legend
          tabList={selectedFuncItemList}
          toggle={this.legendToggle}
          flag={this.state.isShowLegend}
          moreHidden={selectedFuncList.length > 3 && this.state.isSpreadBaseTime}
        />
        <FloatingActionButton
          backgroundColor="white"
          onClick={getLocation}
          mini
          style={styles.location_button}
        >
          <LocationIcon style={styles.floating_button_icon} />
        </FloatingActionButton>
        <FooterButtons
          tabList={selectedFuncItemList}
          themeColor={themeColor}
          showLayerFlags={showLayerFlags}
        />
        <MapConsole tabList={selectedFuncItemList} themeColor={themeColor} isLoading={isLoading} />
      </div>
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
  return {
    selectedFuncList,
    showLayerFlags: {
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
    initflags,
    isLoading,
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

