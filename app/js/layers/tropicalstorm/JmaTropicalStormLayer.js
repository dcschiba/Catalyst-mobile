import { Logger, Core } from 'WRAP';
import TropicalStormLayer from './TropicalStormLayer';
import {
  TS_CHANGE,
  TROPICALSTORM_CLICK,
  JMA_CLICK,
  WNI_CLICK,
  JTWC_CLICK,
  JMA_CHANGE,
  JMA_TYPHOON_LIST,
  JMA_TYPHOON_5DAYS_LIST,
  WNI_RELATION_TYPH_CHANGE,
  TS_RELATION_WNI_LIST,
  TS_RELATION_JTWC_LIST,
  JMA_TRACK_CLICK,
  JMA_LOW_CLICK,
  JMA_ESTIMATE_CLICK,
  JMA_F_TRACK_CLICK,
  JMA_F_CIRCLE_CLICK,
  JMA_WIND_CLICK,
  JMA_F_WIND_CLICK,
  JMA_HIST_CHANGE,
  JMA_TYPH_HISTORY,
  JMA_TYPH_INFO,
} from '../../constants/tropicalstorm/ActionTypes';

class JmaTropicalStormLayer extends TropicalStormLayer {
  setAction(jmaInfoChange) {
    this.jmaInfoChange = jmaInfoChange;
  }
  ctrlLayer(type, state) {
    const {
      tropChecked,
      tsContent,
      WX_JMA_Typhoon,
      jmatyphoonidx,
      jmaHistoryidx,
      jmaChecked,
      jmaTrackChecked,
      jmaLowChecked,
      jmaEstChecked,
      jmaFTrackChecked,
      jmaFCircleChecked,
      jmaWindChecked,
      jmaFWindChecked,
      wniRelationidx,
    } = state.tropicalstorm;
    const tsallChecked = (tsContent === 'tsAll');
    const tsHistoryChecked = (tsContent === 'tsHistory');
    const ts5daysChecked = (tsContent === 'ts5days');
    const ts3arrowChecked = (tsContent === 'ts3arrow');
    const tsAnalogousChecked = (tsContent === 'tsAnalogous');
    let tdNumber = wniRelationidx;
    if (wniRelationidx !== 'ALL') {
      for (let i = 0; i < WX_JMA_Typhoon.length; i += 1) {
        if (WX_JMA_Typhoon[i].tdNumber === wniRelationidx) {
          tdNumber = WX_JMA_Typhoon[i].typhid;
        }
      }
      if (tdNumber === wniRelationidx) { // 3Arrowsで表示してたものがJMAのリストにない
        tdNumber = 'NONE';
      }
    } else if (WX_JMA_Typhoon.length === 1) {  // 有効台風がない場合
      tdNumber = 'NONE';
    }
    switch (type) {
      case TS_CHANGE:
      case TROPICALSTORM_CLICK:
      case JMA_CLICK:
      case WNI_CLICK:
      case JTWC_CLICK: {
        if (tsallChecked) {
          this.setVisible(tropChecked && tsallChecked && jmaChecked);
          this.ctrlStormElements(jmaTrackChecked, jmaLowChecked, jmaLowChecked,
            jmaFTrackChecked, jmaFCircleChecked, jmaWindChecked, jmaFWindChecked);
          this.setLayerContent(jmatyphoonidx);
        } else if (tsHistoryChecked) {
          this.setVisible(true);
          this.ctrlStormElements(jmaTrackChecked, jmaLowChecked, jmaLowChecked,
            jmaFTrackChecked, jmaFCircleChecked, jmaWindChecked, jmaFWindChecked);
          this.setLayerContent(jmatyphoonidx);
        } else if (ts5daysChecked) {
          this.setVisible(false);
          this.setLayerContent(jmatyphoonidx);
        } else if (ts3arrowChecked) {
          this.setVisible(true);
          this.ctrlStormElements(true, jmaLowChecked, false,
            true, false, jmaWindChecked, false);
          this.setLayerContent(tdNumber);
        } else if (tsAnalogousChecked) {
          this.setVisible(true);
          this.setLayerContent(jmatyphoonidx);
        }
        break;
      }
      case JMA_CHANGE:
      case JMA_TYPHOON_LIST:
      case JMA_TYPHOON_5DAYS_LIST: {
        if (tsallChecked || tsHistoryChecked || ts5daysChecked || tsAnalogousChecked) {
          this.setLayerContent(jmatyphoonidx);
        }
        break;
      }
      case WNI_RELATION_TYPH_CHANGE:
      case TS_RELATION_WNI_LIST:
      case TS_RELATION_JTWC_LIST: {
        if (ts3arrowChecked) {
          this.setLayerContent(tdNumber);
        }
        break;
      }
      case JMA_TRACK_CLICK:
      case JMA_LOW_CLICK:
      case JMA_ESTIMATE_CLICK:
      case JMA_F_TRACK_CLICK:
      case JMA_F_CIRCLE_CLICK:
      case JMA_WIND_CLICK:
      case JMA_F_WIND_CLICK: {
        this.ctrlStormElements(jmaTrackChecked, jmaLowChecked, jmaEstChecked,
          jmaFTrackChecked, jmaFCircleChecked, jmaWindChecked, jmaFWindChecked);
        break;
      }
      case JMA_HIST_CHANGE: {
        this.ctrlStormElements(true, true, false,
          false, false, false, false, jmaHistoryidx);
        // WRAP.Logger.debug('TropicalStormLayer Main setHistoryidx');
        const histinfo = this.setHistoryidx(jmaHistoryidx);
        this.jmaInfoChange(histinfo);
        break;
      }
      case JMA_TYPH_HISTORY:
      case JMA_TYPH_INFO: {
        if (ts3arrowChecked) {
          this.setLayerContent(tdNumber);
        } else {
          this.setLayerContent(jmatyphoonidx);
        }
        break;
      }
      default:
        break;
    }
  }
  setHistoryidx(historyidx) {
    Logger.debug('TropicalStormLayer setHistoryidx');
    const index = this.dhData.query('index').value();
    const tylist = Object.keys(index.index);
    const data = this.dhData.query('data').value();
    const info = {};
    const at = new Core.DateTime(historyidx);
    for (let ty = 0; ty < tylist.length; ty += 1) {
      let infotxt = '';
      infotxt += at.text('YYYY年MM月DD日 hh時mm分(UTC)現在\n');
      const tydata = data[tylist[ty]];
      if (tydata) {
        for (let t = 0; t < tydata.features.length; t += 1) {
          if (tydata.features[t].properties.analyzed_date === historyidx) {
            infotxt += `●台風 ${tydata.index.no} 号\n`;
            const p = tydata.features[t].properties;
            infotxt += TropicalStormLayer.makePlaceText(p, tydata.features[t].geometry);
            info[tylist[ty]] = infotxt;
            break;
          }
        }
      }
    }
    return info;
    // this.dispatchfunc('JMA_TYPH_HIST_INFO', { info });
  }
}
export default JmaTropicalStormLayer;
