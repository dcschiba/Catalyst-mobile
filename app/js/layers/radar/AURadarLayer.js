import RadarLayer from './RadarLayer';
import {
  RADAR_CLICK,
  RADAR_COVERAGE_CLICK,
  AU_RADAR_CLICK,
  AU_RADAR_VALIDTIME_CHANGE,
  WX_AU_RADAR_TIMELIST,
} from '../../constants/radar/ActionTypes';

class AURadarLayer extends RadarLayer {
  constructor(conf) {
    super(conf);
    this.layerindex = 5;
  }
  ctrlLayer(type, state) {
    if ([RADAR_CLICK,
      RADAR_COVERAGE_CLICK,
      AU_RADAR_CLICK,
      AU_RADAR_VALIDTIME_CHANGE,
      WX_AU_RADAR_TIMELIST].indexOf(type) === -1) {
      return;
    }
    const { radar } = state.radar;
    const {
      radarChecked,
      coverageChecked,
      auChecked,
      auvalidtimeidx,
    } = radar;
    const isChecked = radarChecked && auChecked;
    if (type === RADAR_CLICK ||
        type === AU_RADAR_CLICK) {
      this.setVisible(isChecked);
    }
    if (type === RADAR_COVERAGE_CLICK) {
      this.setStyle(coverageChecked ? 'default' : 'clear_coverage');
    }
    if (isChecked) {
      this.setContent(auvalidtimeidx);
    }
    this.mergeLayer(isChecked);
  }
}

export default AURadarLayer;
