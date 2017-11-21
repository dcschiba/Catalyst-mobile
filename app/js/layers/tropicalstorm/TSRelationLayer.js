import { Logger, Core } from 'WRAP';
import WrapLayer from 'WRAP/UI/WrapLayer';
import {
  TS_CHANGE,
  TROPICALSTORM_CLICK,
  JMA_CLICK,
  WNI_CLICK,
  JTWC_CLICK,
  WNI_RELATION_TYPH_CHANGE,
  TS_RELATION_WNI_LIST,
  TS_RELATION_JTWC_LIST,
  JMA3_WNI_CLICK,
  JMA3_JTWC_CLICK,
} from '../../constants/tropicalstorm/ActionTypes';
/* eslint-disable camelcase */
import {
  TS_Relation_WNI,
} from '../LayerConfig';

class TSRelationLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.dispatchfunc = conf.dispatchAction;
  }

  configureCompleted() {
    Logger.debug('TSRelationLayer configureCompleted');
    this.dhData.inspect((ref) => {
      const index = ref.query('index').value();
      // const data = ref.query('data').value();
      if (index && index.index) {
        this.TropicalStormDataInspect(index);
      }
    }, true);
  }

  // check valid TS
  TropicalStormDataInspect(index) {
    Logger.debug(`TSRelationLayer ${this.name()}`);
    const tsarr = [{ idx: 0, typhid: 'ALL', name: 'ALL' }];
    const tylist = Object.keys(index.link);
    let tcount = 0;
    for (let i = 0; i < tylist.length; i += 1) {
      const typhid = tylist[i];             // JMA1704
      tsarr[tcount + 1] = { idx: tcount, typhid };
      tcount += 1;
    }
    this.dispatchfunc(`${this.name()}_LIST`, { tsarr }, this.name());
  }

  // この台風は有効か返す(消滅してから1日経ったものを判定する予定)
  static checkValidData(index) {
    Logger.debug(`${index}`);
    const ff = index.final_flag;
    if (ff > 0) {
      const it = new Core.DateTime(index.issue_date);
      const nt = new Core.DateTime();
      const dt = it.diff(nt);
      if (dt > 60 * 60 * 24) {
        return false;
      }
    }
    return true;
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
      }
    });
    const worj = this.name() === TS_Relation_WNI.layerName ? 'WNI' : 'JTWC';
    const jmalist = Object.keys(index.link);
    for (let j = 0; j < jmalist.length; j += 1) {
      const jkey = jmalist[j];
      if (key === 'ALL' || key === jkey) {
        if (index.link[jkey][worj]) {
          const dispk = index.link[jkey][worj];
          if (data[dispk] && TSRelationLayer.checkValidData(index.index[dispk])) {
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
      jma3WniChecked,
      jma3JtwcChecked,
      wniRelationidx,
    } = state.tropicalstorm;
    const ts3arrowChecked = (tsContent === 'ts3arrow');
    const iswni = this.name() === TS_Relation_WNI.layerName;
    switch (type) {
      case TS_CHANGE:
      case TROPICALSTORM_CLICK:
      case JMA_CLICK:
      case WNI_CLICK:
      case JTWC_CLICK: {
        if (ts3arrowChecked) {
          if (iswni) {
            this.setVisible(jma3WniChecked);
          } else {
            this.setVisible(jma3JtwcChecked);
          }
        } else {
          this.setVisible(false);
        }
        break;
      }
      case WNI_RELATION_TYPH_CHANGE: {
        this.setLayerContent(wniRelationidx);
        break;
      }
      case TS_RELATION_WNI_LIST: {
        if (iswni) {
          this.setLayerContent(wniRelationidx);
        }
        break;
      }
      case TS_RELATION_JTWC_LIST: {
        if (!iswni) {
          this.setLayerContent(wniRelationidx);
        }
        break;
      }
      case JMA3_WNI_CLICK: {
        if (iswni) {
          this.setVisible(jma3WniChecked);
        }
        break;
      }
      case JMA3_JTWC_CLICK: {
        if (!iswni) {
          this.setVisible(jma3JtwcChecked);
        }
        break;
      }
      default:
        break;
    }
  }
}
export default TSRelationLayer;
