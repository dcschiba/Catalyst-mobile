import RadarLayer from './RadarLayer';
import {
  RADAR_CLICK,
  RADAR_COVERAGE_CLICK,
  US_GU_RADAR_CLICK,
  US_GU_RADAR_VALIDTIME_CHANGE,
  WX_US_GU_RADAR_TIMELIST,
} from '../../constants/radar/ActionTypes';

class UsguRadarLayer extends RadarLayer {
  constructor(conf) {
    super(conf);
    this.layerindex = 10;
  }
  ctrlLayer(type, state) {
    if ([RADAR_CLICK,
      RADAR_COVERAGE_CLICK,
      US_GU_RADAR_CLICK,
      US_GU_RADAR_VALIDTIME_CHANGE,
      WX_US_GU_RADAR_TIMELIST].indexOf(type) === -1) {
      return;
    }
    const { radar } = state.radar;
    const {
      radarChecked,
      coverageChecked,
      usGuChecked,
      usGuvalidtimeidx,
    } = radar;
    const isChecked = radarChecked && usGuChecked;
    if (type === RADAR_CLICK ||
        type === US_GU_RADAR_CLICK) {
      this.setVisible(isChecked);
    }
    if (type === RADAR_COVERAGE_CLICK) {
      this.setStyle(coverageChecked ? 'default' : 'clear_coverage');
    }
    if (isChecked) {
      this.setContent(usGuvalidtimeidx);
    }
    this.mergeLayer(isChecked);
  }
}

export default UsguRadarLayer;
