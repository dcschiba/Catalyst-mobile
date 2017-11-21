import RadarLayer from './RadarLayer';
import {
  RADAR_CLICK,
  RADAR_COVERAGE_CLICK,
  US_PR_RADAR_CLICK,
  US_PR_RADAR_VALIDTIME_CHANGE,
  WX_US_PR_RADAR_TIMELIST,
} from '../../constants/radar/ActionTypes';

class UsprRadarLayer extends RadarLayer {
  constructor(conf) {
    super(conf);
    this.layerindex = 12;
  }
  ctrlLayer(type, state) {
    if ([RADAR_CLICK,
      RADAR_COVERAGE_CLICK,
      US_PR_RADAR_CLICK,
      US_PR_RADAR_VALIDTIME_CHANGE,
      WX_US_PR_RADAR_TIMELIST].indexOf(type) === -1) {
      return;
    }
    const { radar } = state.radar;
    const {
      radarChecked,
      coverageChecked,
      usPrChecked,
      usPrvalidtimeidx,
    } = radar;
    const isChecked = radarChecked && usPrChecked;
    if (type === RADAR_CLICK ||
        type === US_PR_RADAR_CLICK) {
      this.setVisible(isChecked);
    }
    if (type === RADAR_COVERAGE_CLICK) {
      this.setStyle(coverageChecked ? 'default' : 'clear_coverage');
    }
    if (isChecked) {
      this.setContent(usPrvalidtimeidx);
    }
    this.mergeLayer(isChecked);
  }
}

export default UsprRadarLayer;
