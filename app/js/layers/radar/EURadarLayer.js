import RadarLayer from './RadarLayer';
import {
  RADAR_CLICK,
  RADAR_COVERAGE_CLICK,
  EU_RADAR_CLICK,
  EU_RADAR_VALIDTIME_CHANGE,
  WX_EU_RADAR_TIMELIST,
} from '../../constants/radar/ActionTypes';

class EURadarLayer extends RadarLayer {
  constructor(conf) {
    super(conf);
    this.layerindex = 6;
  }
  ctrlLayer(type, state) {
    if ([RADAR_CLICK,
      RADAR_COVERAGE_CLICK,
      EU_RADAR_CLICK,
      EU_RADAR_VALIDTIME_CHANGE,
      WX_EU_RADAR_TIMELIST].indexOf(type) === -1) {
      return;
    }
    const { radar } = state.radar;
    const {
      radarChecked,
      coverageChecked,
      euChecked,
      euvalidtimeidx,
    } = radar;
    const isChecked = radarChecked && euChecked;
    if (type === RADAR_CLICK ||
        type === EU_RADAR_CLICK) {
      this.setVisible(isChecked);
    }
    if (type === RADAR_COVERAGE_CLICK) {
      this.setStyle(coverageChecked ? 'default' : 'clear_coverage');
    }
    if (isChecked) {
      this.setContent(euvalidtimeidx);
    }
    this.mergeLayer(isChecked);
  }
}

export default EURadarLayer;
