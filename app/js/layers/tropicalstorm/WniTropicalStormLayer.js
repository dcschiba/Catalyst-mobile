import TropicalStormLayer from './TropicalStormLayer';
import {
  TS_CHANGE,
  TROPICALSTORM_CLICK,
  JMA_CLICK,
  WNI_CLICK,
  JTWC_CLICK,
  WNI_CHANGE,
  WNI_TROPICALSTORM_LIST,
  WNI_TRACK_CLICK,
  WNI_F_TRACK_CLICK,
  WNI_WIND_CLICK,
  WNI_F_WIND_CLICK,
} from '../../constants/tropicalstorm/ActionTypes';

class WniTropicalStormLayer extends TropicalStormLayer {
  ctrlLayer(type, state) {
    const {
      tropChecked,
      tsContent,
      wnityphoonidx,
      wniChecked,
      wniTrackChecked,
      wniFTrackChecked,
      wniWindChecked,
      wniFWindChecked,
    } = state.tropicalstorm;
    const tsallChecked = (tsContent === 'tsAll');
    switch (type) {
      case TS_CHANGE:
      case TROPICALSTORM_CLICK:
      case JMA_CLICK:
      case WNI_CLICK:
      case JTWC_CLICK: {
        if (tsallChecked) {
          this.setVisible(tropChecked && tsallChecked && wniChecked);
          this.ctrlStormElements(wniTrackChecked, false, false,
            wniFTrackChecked, false, wniWindChecked, wniFWindChecked);
        } else {
          this.setVisible(false);
        }
        break;
      }
      case WNI_CHANGE:
      case WNI_TROPICALSTORM_LIST: {
        this.setLayerContent(wnityphoonidx);
        break;
      }
      case WNI_TRACK_CLICK:
      case WNI_F_TRACK_CLICK:
      case WNI_WIND_CLICK:
      case WNI_F_WIND_CLICK: {
        this.ctrlStormElements(wniTrackChecked, null, null,
          wniFTrackChecked, null, wniWindChecked, wniFWindChecked);
        break;
      }
      default:
        break;
    }
  }
}
export default WniTropicalStormLayer;
