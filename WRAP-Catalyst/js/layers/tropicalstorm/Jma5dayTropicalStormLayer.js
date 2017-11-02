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
  JMA5_F_TRACK_CLICK,
  JMA5_F_CIRCLE_CLICK,
} from '../../constants/tropicalstorm/ActionTypes';

class Jma5dayTropicalStormLayer extends TropicalStormLayer {
  ctrlLayer(type, state) {
    const {
      tsContent,
      WX_JMA_Typhoon,
      jmatyphoonidx,
      jmaLowChecked,
      jma5FTrackChecked,
      jma5FCircleChecked,
      jma_History,
    } = state.tropicalstorm;
    const ts5daysChecked = (tsContent === 'ts5days');
    let num5days = jmatyphoonidx;
    if (WX_JMA_Typhoon.length === 1) {  // 有効台風がない場合
      num5days = 'NONE';
    }
    switch (type) {
      case TS_CHANGE:
      case TROPICALSTORM_CLICK:
      case JMA_CLICK:
      case WNI_CLICK:
      case JTWC_CLICK: {
        if (ts5daysChecked) {
          this.setVisible(true);
          this.setLayerContent(num5days, jma_History);
          this.ctrlStormElements(true, jmaLowChecked, true,
            jma5FTrackChecked, jma5FCircleChecked, false, false);
        } else {
          this.setVisible(false);
        }
        break;
      }
      case JMA_CHANGE:
      case JMA_TYPHOON_LIST:
      case JMA_TYPHOON_5DAYS_LIST: {
        if (ts5daysChecked) {
          this.setLayerContent(num5days, jma_History);
        }
        break;
      }
      case JMA5_F_TRACK_CLICK:
      case JMA5_F_CIRCLE_CLICK: {
        this.ctrlStormElements(true, false, true,
          jma5FTrackChecked, jma5FCircleChecked, false, false);
        break;
      }
      default:
        break;
    }
  }
}
export default Jma5dayTropicalStormLayer;
