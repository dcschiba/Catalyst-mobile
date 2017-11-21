import RadarLayer from './RadarLayer';
import {
  RADAR_CLICK,
  RADAR_COVERAGE_CLICK,
  US_NA_RADAR_CLICK,
  US_NA_RADAR_VALIDTIME_CHANGE,
  WX_US_NA_RADAR_TIMELIST,
} from '../../constants/radar/ActionTypes';

class UsnaRadarLayer extends RadarLayer {
  constructor(conf) {
    super(conf);
    this.layerindex = 8;
  }
  ctrlLayer(type, state) {
    if ([RADAR_CLICK,
      RADAR_COVERAGE_CLICK,
      US_NA_RADAR_CLICK,
      US_NA_RADAR_VALIDTIME_CHANGE,
      WX_US_NA_RADAR_TIMELIST].indexOf(type) === -1) {
      return;
    }
    const { radar } = state.radar;
    const {
      radarChecked,
      coverageChecked,
      usNaChecked,
      usNavalidtimeidx,
    } = radar;
    const isChecked = radarChecked && usNaChecked;
    if (type === RADAR_CLICK ||
        type === US_NA_RADAR_CLICK) {
      this.setVisible(isChecked);
    }
    if (type === RADAR_COVERAGE_CLICK) {
      this.setStyle(coverageChecked ? 'default' : 'clear_coverage');
    }
    if (isChecked) {
      this.setContent(usNavalidtimeidx);
    }
    this.mergeLayer(isChecked);
  }
}

export default UsnaRadarLayer;
