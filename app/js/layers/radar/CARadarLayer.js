import RadarLayer from './RadarLayer';
import {
  RADAR_CLICK,
  RADAR_COVERAGE_CLICK,
  EC_OBS_RADAR_ECHINT_CA_CLICK,
  EC_OBS_RADAR_ECHINT_CA_VALIDTIME_CHANGE,
  EC_OBS_RADAR_ECHINT_CA_TIMELIST,
} from '../../constants/radar/ActionTypes';

class CARadarLayer extends RadarLayer {
  constructor(conf) {
    super(conf);
    this.layerindex = 7;
  }
  ctrlLayer(type, state) {
    if ([
      RADAR_CLICK,
      RADAR_COVERAGE_CLICK,
      EC_OBS_RADAR_ECHINT_CA_CLICK,
      EC_OBS_RADAR_ECHINT_CA_VALIDTIME_CHANGE,
      EC_OBS_RADAR_ECHINT_CA_TIMELIST].indexOf(type) === -1) {
      return;
    }
    const { radar } = state.radar;
    const {
      radarChecked,
      coverageChecked,
      ecobsradarechintcaChecked,
      ecobsradarechintcaidtimeidx,
    } = radar;

    const isChecked = radarChecked && ecobsradarechintcaChecked;
    if (type === EC_OBS_RADAR_ECHINT_CA_CLICK || type === RADAR_CLICK) {
      this.setVisible(isChecked);
    }

    if (type === RADAR_COVERAGE_CLICK) {
      this.setStyle(coverageChecked ? 'default' : 'clear_coverage');
    }

    if (isChecked) {
      this.setContent(ecobsradarechintcaidtimeidx);
    }

    this.mergeLayer(isChecked);
  }
}

export default CARadarLayer;
