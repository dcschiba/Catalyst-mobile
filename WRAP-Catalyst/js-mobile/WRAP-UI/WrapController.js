import WRAP from 'WRAP';

/**
 * WRAP連携クラス
 * @class WrapController
 **/
class WrapController {
  /**
   * WRAPControllerの初期化を行う
   * @method initWRAP
   * @param confPath {String} DHが使用する設定ファイルの格納先
   * @param dhkeyoption {Object} DHのset APIで置き換えるパラメータ
   * @return なし
  **/
  static initWRAP(confPath, dhkeyoption) {
    WrapController.layer = {
      upper_layers: [],
    };
    WrapController.mapClickCallback = [];
    WrapController.dhDataList = {};
    WrapController.dhkeyoption = dhkeyoption;
    if (WrapController.dhkeyoption) {
      WRAP.DH.set(WrapController.dhkeyoption);
    }
    WRAP.DH.conf_path = confPath;
  }

  /**
   * GoogleMapのMapオブジェクトをGeoにセットする
   * @method initGoogleMap
   * @param map {Object} GoogleMapのMapオブジェクト
   * @return なし
  **/
  static initGoogleMap(map) {
    WrapController.gmap = map;
    WrapController.gmap.addListener('click', () => WrapController.mapClickHandler('google'));
    WrapController.gmap_ins = WRAP.Geo.setGoogleMaps(map);
    WrapController.currentMap = WrapController.gmap_ins;
  }

  /**
   * OpenLayersのMapオブジェクトをGeoにセットする
   * @method initOpenLayers
   * @param map {Object} OpenLayersのMapオブジェクト
   * @return なし
  **/
  static initOpenLayers(map) {
    WrapController.olmap = map;
    WrapController.olmap.on('click', () => WrapController.mapClickHandler('ol'));
    WrapController.olmap_ins = WRAP.Geo.setOpenLayers(map);
    WrapController.currentMap = WrapController.olmap_ins;
  }

  /**
   * WebGLのMapを初期化し、オブジェクトをGeoにセットする
   * @method initWebGLMap
   * @param map {Object} WebGLMapを描画するHTMLElement
   * @param mapOption {Object} map初期options
   * @return なし
  **/
  static initWebGLMap(map, mapOption) {
    WrapController.webglmap_ins = WRAP.Geo.setWebGLMap(map);
    WrapController.currentMap = WrapController.webglmap_ins;
    const {
      zoom,
      lat,
      lon,
    } = mapOption;
    WrapController.webglmap_ins.setZoom(zoom);
    WrapController.webglmap_ins.setCenterPoint(new WRAP.Geo.Point(lat * 60.0, lon * 60.0));
  }

  /**
   * Mapクリック時のハンドラーを呼び出す
   * @method mapClickHandler
   * @param type {String} ハンドラー名
   * @return なし
  **/
  static mapClickHandler(type) {
    if (WrapController.mapClickCallback.length > 0) {
      WrapController.mapClickCallback.map(cb => cb(type));
    }
  }

    /**
   * Mapクリック時のハンドラーをセットする
   * @method setMapClickCallback
   * @param cb {Function} ハンドラーにセットするコールバック関数
   * @return なし
  **/
  static setMapClickCallback(cb) {
    WrapController.mapClickCallback.push(cb);
  }

  /**
   * Mapを描画する領域のHTMLElementをWRAPContorollerにセットする
   * @method setMapdiv
   * @param mapDiv {Object} HTMLElement
   * @return なし
  **/
  static setMapdiv(mapDiv) {
    WrapController.mapDiv = mapDiv;
  }
  /**
   * Mapの切り替えを行う
   * @method switchMap
   * @param map {Object} 切り替え先のmapオブジェクト
   * @return なし
  **/
  static switchMap(map) {
    WRAP.Geo.switchMap(map);
    WrapController.currentMap = map;
  }

  /**
   * Layerの初期帰化を行う
   * @method initLayer
   * @param layers {Array} layerの設定情報
   * @param layerConfig {Object} layerConfig.jsのオブジェクト
   * @param confLayerPath {Object} layer設定ファイルの格納先
   * @param showContents {Array} 対象の機能名リスト
   * @param dispatchAction {Function} DHのinspect時に呼ばれる関数
   * @return なし
  **/
  static initLayer(layers, layerConfig, confLayerPath, showContents, dispatchAction) {
    let cameradhdata;
    layers.forEach((conf) => {
      const { layerName, DHObjectName, contentName } = conf;
      if (showContents.indexOf(contentName) === -1) {
        return;
      }
      const config = layerConfig[layerName];
      if (!config) {
        return;
      }
      const Layer = config.layerClass;
      let dhData;
      if (DHObjectName) {
        dhData = WrapController.dhDataList[DHObjectName];
        if (!dhData) {
          dhData = WRAP.DH.addObject(DHObjectName);
          WrapController.dhDataList[DHObjectName] = dhData;
        }
      }
      const layer = new Layer(({ ...conf, confLayerPath, dispatchAction, dhData }));

      if (conf.livecamera) {
        cameradhdata = layer.dhData;
      }

      WrapController.layer.upper_layers.push(layer);
    });
    if (cameradhdata) {
      WRAP.Geo.setInteraction(WrapController.mapDiv, cameradhdata);
    } else {
      WRAP.Geo.setInteraction(WrapController.mapDiv);
    }
    WRAP.Geo.setLayer(WrapController.layer);
  }

  /**
   * 複数ツールチップをグループ化する
   * @method addTooltipGroup
   * @param layers {Array} Geoが生成するレイヤーオブジェクト
   * @return なし
  **/
  static addTooltipGroup(layers) {
    WRAP.Geo.addTooltipGroup(layers);
  }

  /**
   * Geoが生成するレイヤーオブジェクトを取得する
   * @method getLayer
   * @param layerName {String} 対象のレイヤー名
   * @return {WRAP.Geo.Layer} Geoが生成するレイヤーオブジェクト
  **/
  static getLayer(layerName) {
    const layer = WrapController.layer.upper_layers.find(
      element => element.name() === layerName);
    return layer;
  }

  /**
   * レイヤーのコントロール処理を呼び出す
   * @method ctrlLayer
   * @param type {String} ReduxのActionType
   * @param targetLayer {String} コントロール対象のレイヤー名
   * @param props {Object} Reduxののstoreデータ
   * @return なし
  **/
  static ctrlLayer(type, targetLayer, props) {
    if (Array.isArray(targetLayer)) {
      targetLayer.forEach((layerName) => {
        const layer = WrapController.getLayer(layerName);
        if (!layer) {
          WRAP.Logger.warn('No layer configs found');
          return;
        }
        layer.ctrlLayer(type, props);
      });
    } else {
      const layer = WrapController.getLayer(targetLayer);
      if (!layer) {
        WRAP.Logger.warn('No layer configs found');
        return;
      }
      layer.ctrlLayer(type, props);
    }
  }
}

export default WrapController;
