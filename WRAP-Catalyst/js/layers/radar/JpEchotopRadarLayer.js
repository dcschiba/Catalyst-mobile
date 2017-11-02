import RadarLayer from './RadarLayer';
import {
  RADAR_CLICK,
  JP_ICDB_RADAR_CLICK,
  JP_ICDB_RADAR_VALIDTIME_CHANGE,
  JP_ECHOTOP_CLICK,
  JMA_OBS_RADAR_ECHINT_JP_TIMELIST,
} from '../../constants/radar/ActionTypes';

class JpEchotopRadarLayer extends RadarLayer {
  ctrlLayer(type, state) {
    if ([RADAR_CLICK,
      JP_ICDB_RADAR_CLICK,
      JP_ECHOTOP_CLICK,
      JP_ICDB_RADAR_VALIDTIME_CHANGE,
      JMA_OBS_RADAR_ECHINT_JP_TIMELIST].indexOf(type) === -1) {
      return;
    }
    const { radar } = state.radar;
    const {
      radarChecked,
      jpicdbChecked,
      jpicdbvalidtimeidx,
      jpechotopChecked,
      JMA_OBS_RADAR_ECHINT_JP_5min,
    } = radar;
    const isChecked = radarChecked && jpicdbChecked && jpechotopChecked;
    if (type === RADAR_CLICK ||
        type === JP_ICDB_RADAR_CLICK ||
        type === JP_ECHOTOP_CLICK) {
      this.setVisible(isChecked);
    }
    if (isChecked) {
      this.set({ validtime: JMA_OBS_RADAR_ECHINT_JP_5min[jpicdbvalidtimeidx].tm });
    }
  }
}

export default JpEchotopRadarLayer;
