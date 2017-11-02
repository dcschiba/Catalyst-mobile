import WrapController from 'WRAP/UI/WrapController';
import RadarLayer from './RadarLayer';
import {
  RADAR_CLICK,
  RADAR_COVERAGE_CLICK,
  JP_RADAR_CLICK,
  JP_RADAR_VALIDTIME_CHANGE,
  WX_JP_RADAR_TIMELIST,
} from '../../constants/radar/ActionTypes';

class JPRadarLayer extends RadarLayer {
  constructor(conf) {
    super(conf);
    this.layerindex = 0;
  }
  setAction(loadJPRadarActivity) {
    this.loadJPRadarActivity = loadJPRadarActivity;
  }
  ctrlLayer(type, state) {
    if ([RADAR_CLICK,
      RADAR_COVERAGE_CLICK,
      JP_RADAR_CLICK,
      JP_RADAR_VALIDTIME_CHANGE,
      WX_JP_RADAR_TIMELIST].indexOf(type) === -1) {
      return;
    }
    const { radar } = state.radar;
    const {
      radarChecked,
      coverageChecked,
      jpChecked,
      jpvalidtimeidx,
      WX_JP_Radar,
    } = radar;
    const isChecked = radarChecked && jpChecked;
    if (type === RADAR_CLICK || type === JP_RADAR_CLICK) {
      this.setVisible(isChecked);
    }
    if (isChecked) {
      this.setContent(jpvalidtimeidx);
    }
    if (type === RADAR_COVERAGE_CLICK) {
      this.setStyle(coverageChecked ? 'default' : 'clear_coverage');
    } else if (type === WX_JP_RADAR_TIMELIST) {
      this.loadJPRadarActivity(WrapController.dhkeyoption.baseurl, WX_JP_Radar[0].tm);
    }
    this.mergeLayer(isChecked);
  }
}

export default JPRadarLayer;
