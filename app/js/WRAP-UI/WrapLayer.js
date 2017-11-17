import 'isomorphic-fetch';
import WRAP from 'WRAP';

/**
 * 論理レイヤークラス
 * @class WrapLayer
 * @constructor
 * @param {string} conf レイヤー設定
 **/
class WrapLayer extends WRAP.Geo.Layer {
  constructor(conf) {
    const { layerName, dhData } = conf;
    super(layerName);
    this.getLayerConf(conf);
    this.dhData = dhData;
  }

/**
 * レイヤーの設定情報を取得する
 * @method getLayerConf
 * @param conf {object} レイヤーのコンフィグ情報
 * @return なし
 **/
  getLayerConf(conf) {
    const { confLayerPath, confName } = conf;

    fetch(`${confLayerPath}${confName}?t=${new Date().getTime()}`)
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            this.layerConf = json;
            this.configureLayer();
          });
        } else {
          WRAP.Logger.critical('Failed to get config file');
        }
      });
  }

/**
 * WRAP DHから取得した設定をレイヤーにセットする
 * @method configureLayer
 * @return なし
 **/
  configureLayer() {
    this.setVisible(false);
    this.configure(this.dhData, this.layerConf);
    this.configureCompleted();
  }
  /* eslint-disable class-methods-use-this */
  configureCompleted() {
    WRAP.Logger.debug('WrapLayer configureCompleted');
  }
}

export default WrapLayer;
