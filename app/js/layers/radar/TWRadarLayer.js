import RadarLayer from './RadarLayer';
import {
  RADAR_CLICK,
  RADAR_COVERAGE_CLICK,
  TW_RADAR_CLICK,
  TW_RADAR_VALIDTIME_CHANGE,
  WX_TW_RADAR_TIMELIST,
} from '../../constants/radar/ActionTypes';

class TWRadarLayer extends RadarLayer {
  constructor(conf) {
    super(conf);
    this.layerindex = 4;
  }
  ctrlLayer(type, state) {
    if ([RADAR_CLICK,
      RADAR_COVERAGE_CLICK,
      TW_RADAR_CLICK,
      TW_RADAR_VALIDTIME_CHANGE,
      WX_TW_RADAR_TIMELIST].indexOf(type) === -1) {
      return;
    }
    const { radar } = state.radar;
    const {
      radarChecked,
      coverageChecked,
      twChecked,
      twvalidtimeidx,
    } = radar;
    const isChecked = radarChecked && twChecked;
    if (type === RADAR_CLICK ||
        type === TW_RADAR_CLICK) {
      this.setVisible(isChecked);
    }
    if (type === RADAR_COVERAGE_CLICK) {
      this.setStyle(coverageChecked ? 'default' : 'clear_coverage');
    }
    if (isChecked) {
      this.setContent(twvalidtimeidx);
    }
    this.mergeLayer(isChecked);
  }
}

export default TWRadarLayer;
