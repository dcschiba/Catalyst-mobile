import { Logger } from 'WRAP';
import WrapLayer from 'WRAP/UI/WrapLayer';
import {
  TS_CHANGE,
  TROPICALSTORM_CLICK,
  JMA_CLICK,
  WNI_CLICK,
  JTWC_CLICK,
  JMA_CHANGE,
  JMA_TYPHOON_LIST,
  JMA_TYPHOON_5DAYS_LIST,
  ANALOGOUSTROPICALSTORM_0_LIST,
  ANALOGOUSTROPICALSTORM_1_LIST,
  ANALOGOUSTROPICALSTORM_2_LIST,
} from '../../constants/tropicalstorm/ActionTypes';
/* eslint-disable camelcase */
import {
  AnalogousTropicalStorm_1,
  AnalogousTropicalStorm_2,
} from '../LayerConfig';

class AnalogousTropicalStormLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.dispatchfunc = conf.dispatchAction;
    this.setTropTooltip();
  }

  configureCompleted() {
    Logger.debug('AnalogousTropicalStormLayer configureCompleted');
    this.dhData.inspect((ref) => {
      const index = ref.query('index').value();
      if (index && index.index) {
        this.TropicalStormDataInspect();
      }
    }, true);
  }

  // check valid TS
  TropicalStormDataInspect() {
    Logger.debug(`AnalogousTropicalStormLayer ${this.name()}`);
    const tsarr = [{ idx: 0, typhid: 'ALL', name: 'ALL' }];
    this.dispatchfunc(`${this.name()}_LIST`, { tsarr }, this.name());
  }

  loadTyphData(index) {
    this.dhData.setIndex(index);
  }
  // この台風は有効か返す(消滅してから1日経ったものを判定する予定)
  static checkValidData(index) {
    Logger.debug(`${index}`);
    return true;
  }
  setTropTooltip() {
    this.setTooltip((geo) => {
      const p = geo && geo.properties;
      if (p) {
        return `${p.analysis_date}`;
      }
      return '';
    });
  }
  setLayerContent(key) {
    const index = this.dhData.query('index').value();
    const data = this.dhData.query('data').value();
    if (!index || !index.index) {
      return;
    }
    Object.keys(index.index).forEach((idx) => {
      if (data[idx]) {
        data[idx].display_flag = false;
        data[idx].tc_number = `${idx}`;
      }
    });
    let analogousnum = 0;
    if (this.name() === AnalogousTropicalStorm_1.layerName) {
      analogousnum = 1;
    } else if (this.name() === AnalogousTropicalStorm_2.layerName) {
      analogousnum = 2;
    }
    const jmalist = Object.keys(index.jmatyph_link);
    for (let j = 0; j < jmalist.length; j += 1) {
      const jkey = jmalist[j];
      if (key === 'ALL' || `${key}` === `${jkey}`) {
        if (index.jmatyph_link[jkey][analogousnum]) {
          const dispk = index.jmatyph_link[jkey][analogousnum];
          if (data[dispk]) {
            data[dispk].display_flag = true;
          }
        }
      }
    }
    this.invalidate();
  }
  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["ctrlLayer"] }] */
  ctrlLayer(type, state) {
    const {
      tsContent,
      jmatyphoonidx,
      WX_JMA_Typhoon,
    } = state.tropicalstorm;
    const tsAnalogousChecked = (tsContent === 'tsAnalogous');
    let wnijmano = jmatyphoonidx;
    if (jmatyphoonidx !== 'ALL') {
      for (let i = 0; i < WX_JMA_Typhoon.length; i += 1) {
        if (WX_JMA_Typhoon[i].typhid === jmatyphoonidx) {
          wnijmano = WX_JMA_Typhoon[i].wnijmano;
        }
      }
    } else if (WX_JMA_Typhoon.length === 1) {  // 有効台風がない場合
      wnijmano = 'NONE';
    }
    switch (type) {
      case TS_CHANGE:
      case TROPICALSTORM_CLICK:
      case JMA_CLICK:
      case WNI_CLICK:
      case JTWC_CLICK: {
        this.setVisible(tsAnalogousChecked);
        break;
      }
      case JMA_CHANGE:
      case JMA_TYPHOON_LIST:
      case JMA_TYPHOON_5DAYS_LIST:
      case ANALOGOUSTROPICALSTORM_0_LIST:
      case ANALOGOUSTROPICALSTORM_1_LIST:
      case ANALOGOUSTROPICALSTORM_2_LIST: {
        this.setLayerContent(wnijmano);
        break;
      }
      default:
        break;
    }
  }
}
export default AnalogousTropicalStormLayer;
