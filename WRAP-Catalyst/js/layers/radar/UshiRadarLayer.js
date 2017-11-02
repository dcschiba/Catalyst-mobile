import RadarLayer from './RadarLayer';
import {
  RADAR_CLICK,
  RADAR_COVERAGE_CLICK,
  US_HI_RADAR_CLICK,
  US_HI_RADAR_VALIDTIME_CHANGE,
  WX_US_HI_RADAR_TIMELIST,
} from '../../constants/radar/ActionTypes';

class UshiRadarLayer extends RadarLayer {
  constructor(conf) {
    super(conf);
    this.layerindex = 11;
  }
  ctrlLayer(type, state) {
    if ([RADAR_CLICK,
      RADAR_COVERAGE_CLICK,
      US_HI_RADAR_CLICK,
      US_HI_RADAR_VALIDTIME_CHANGE,
      WX_US_HI_RADAR_TIMELIST].indexOf(type) === -1) {
      return;
    }
    const { radar } = state.radar;
    const {
      radarChecked,
      coverageChecked,
      usHiChecked,
      usHivalidtimeidx,
    } = radar;
    const isChecked = radarChecked && usHiChecked;
    if (type === RADAR_CLICK ||
        type === US_HI_RADAR_CLICK) {
      this.setVisible(isChecked);
    }
    if (type === RADAR_COVERAGE_CLICK) {
      this.setStyle(coverageChecked ? 'default' : 'clear_coverage');
    }
    if (isChecked) {
      this.setContent(usHivalidtimeidx);
    }
    this.mergeLayer(isChecked);
  }
}

export default UshiRadarLayer;
