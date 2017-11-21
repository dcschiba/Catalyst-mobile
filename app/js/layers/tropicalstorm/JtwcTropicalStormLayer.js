import TropicalStormLayer from './TropicalStormLayer';
import {
  TS_CHANGE,
  TROPICALSTORM_CLICK,
  JMA_CLICK,
  WNI_CLICK,
  JTWC_CLICK,
  JTWC_CHANGE,
  JTWC_TYPHOON_LIST,
  JTWC_TRACK_CLICK,
  JTWC_F_TRACK_CLICK,
  JTWC_WIND_CLICK,
  JTWC_F_WIND_CLICK,
} from '../../constants/tropicalstorm/ActionTypes';

class JtwcTropicalStormLayer extends TropicalStormLayer {
  ctrlLayer(type, state) {
    const {
      tropChecked,
      tsContent,
      jtwctyphoonidx,
      jtwcChecked,
      jtwcTrackChecked,
      jtwcFTrackChecked,
      jtwcWindChecked,
      jtwcFWindChecked,
    } = state.tropicalstorm;
    const tsallChecked = (tsContent === 'tsAll');
    switch (type) {
      case TS_CHANGE:
      case TROPICALSTORM_CLICK:
      case JMA_CLICK:
      case WNI_CLICK:
      case JTWC_CLICK: {
        if (tsallChecked) {
          this.setVisible(tropChecked && tsallChecked && jtwcChecked);
          this.ctrlStormElements(jtwcTrackChecked, false, false,
            jtwcFTrackChecked, false, jtwcWindChecked, jtwcFWindChecked);
        } else {
          this.setVisible(false);
        }
        break;
      }
      case JTWC_CHANGE:
      case JTWC_TYPHOON_LIST: {
        this.setLayerContent(jtwctyphoonidx);
        break;
      }
      case JTWC_TRACK_CLICK:
      case JTWC_F_TRACK_CLICK:
      case JTWC_WIND_CLICK:
      case JTWC_F_WIND_CLICK: {
        this.ctrlStormElements(jtwcTrackChecked, null, null,
          jtwcFTrackChecked, null, jtwcWindChecked, jtwcFWindChecked);
        break;
      }
      default:
        break;
    }
  }
}
export default JtwcTropicalStormLayer;
