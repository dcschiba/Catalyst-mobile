import RadarLayer from './RadarLayer';
import {
  RADAR_CLICK,
  RADAR_COVERAGE_CLICK,
  US_AK_RADAR_CLICK,
  US_AK_RADAR_VALIDTIME_CHANGE,
  WX_US_AK_RADAR_TIMELIST,
} from '../../constants/radar/ActionTypes';

class UsakRadarLayer extends RadarLayer {
  constructor(conf) {
    super(conf);
    this.layerindex = 9;
  }
  ctrlLayer(type, state) {
    if ([RADAR_CLICK,
      RADAR_COVERAGE_CLICK,
      US_AK_RADAR_CLICK,
      US_AK_RADAR_VALIDTIME_CHANGE,
      WX_US_AK_RADAR_TIMELIST].indexOf(type) === -1) {
      return;
    }
    const { radar } = state.radar;
    const {
      radarChecked,
      coverageChecked,
      usAkChecked,
      usAkvalidtimeidx,
    } = radar;
    const isChecked = radarChecked && usAkChecked;
    if (type === RADAR_CLICK ||
        type === US_AK_RADAR_CLICK) {
      this.setVisible(isChecked);
    }
    if (type === RADAR_COVERAGE_CLICK) {
      this.setStyle(coverageChecked ? 'default' : 'clear_coverage');
    }
    if (isChecked) {
      this.setContent(usAkvalidtimeidx);
    }
    this.mergeLayer(isChecked);
  }
}

export default UsakRadarLayer;
