import RadarLayer from './RadarLayer';
import {
  RADAR_CLICK,
  RADAR_COVERAGE_CLICK,
  KR_RADAR_CLICK,
  KR_RADAR_VALIDTIME_CHANGE,
  WX_KR_RADAR_TIMELIST,
} from '../../constants/radar/ActionTypes';

class KRRadarLayer extends RadarLayer {
  constructor(conf) {
    super(conf);
    this.layerindex = 3;
  }
  ctrlLayer(type, state) {
    if ([RADAR_CLICK,
      RADAR_COVERAGE_CLICK,
      KR_RADAR_CLICK,
      KR_RADAR_VALIDTIME_CHANGE,
      WX_KR_RADAR_TIMELIST].indexOf(type) === -1) {
      return;
    }
    const { radar } = state.radar;
    const {
      radarChecked,
      coverageChecked,
      krChecked,
      krvalidtimeidx,
    } = radar;
    const isChecked = radarChecked && krChecked;
    if (type === RADAR_CLICK ||
        type === KR_RADAR_CLICK) {
      this.setVisible(isChecked);
    }
    if (type === RADAR_COVERAGE_CLICK) {
      this.setStyle(coverageChecked ? 'default' : 'clear_coverage');
    }
    if (isChecked) {
      this.setContent(krvalidtimeidx);
    }
    this.mergeLayer(isChecked);
  }
}

export default KRRadarLayer;
