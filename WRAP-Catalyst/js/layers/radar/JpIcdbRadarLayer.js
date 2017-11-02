import RadarLayer from './RadarLayer';
import {
  RADAR_CLICK,
  RADAR_COVERAGE_CLICK,
  JP_ICDB_RADAR_CLICK,
  JP_ICDB_RADAR_VALIDTIME_CHANGE,
  JMA_OBS_RADAR_ECHINT_JP_IMELIST,
} from '../../constants/radar/ActionTypes';

class JpIcdbRadarLayer extends RadarLayer {
  constructor(conf) {
    super(conf);
    this.layerindex = 1;
  }
  ctrlLayer(type, state) {
    if ([RADAR_CLICK,
      RADAR_COVERAGE_CLICK,
      JP_ICDB_RADAR_CLICK,
      JP_ICDB_RADAR_VALIDTIME_CHANGE,
      JMA_OBS_RADAR_ECHINT_JP_IMELIST].indexOf(type) === -1) {
      return;
    }
    const { radar } = state.radar;
    const {
      radarChecked,
      coverageChecked,
      jpicdbChecked,
      jpicdbvalidtimeidx,
    } = radar;
    const isChecked = radarChecked && jpicdbChecked;
    if (type === RADAR_CLICK ||
        type === JP_ICDB_RADAR_CLICK) {
      this.setVisible(isChecked);
    }
    if (type === RADAR_COVERAGE_CLICK) {
      this.setStyle(coverageChecked ? 'default' : 'clear_coverage');
    }
    if (isChecked) {
      this.setContent(jpicdbvalidtimeidx);
    }
    this.mergeLayer(isChecked);
  }
}

export default JpIcdbRadarLayer;
