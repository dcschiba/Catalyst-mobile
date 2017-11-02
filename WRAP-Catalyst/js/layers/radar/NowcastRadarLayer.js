import WrapController from 'WRAP/UI/WrapController';
import RadarLayer from './RadarLayer';

import {
  RADAR_CLICK,
  JMA_PRCRIN_CLICK,
  RADAR_COVERAGE_CLICK,
  JMA_PRCRIN_VALIDTIME_CHANGE,
  JMA_NOWCAS_PRCRIN_TIMELIST,
} from '../../constants/radar/ActionTypes';

import { JMA_ANLSIS_PRCRIN } from '../LayerConfig';

class NowcastRadarLayer extends RadarLayer {
  constructor(conf) {
    super(conf);
    this.layerindex = 2;
  }
  ctrlLayer(type, state) {
    if ([
      RADAR_CLICK,
      RADAR_COVERAGE_CLICK,
      JMA_PRCRIN_CLICK,
      JMA_PRCRIN_VALIDTIME_CHANGE,
      JMA_NOWCAS_PRCRIN_TIMELIST].indexOf(type) === -1) {
      return;
    }
    const { radar } = state.radar;
    const {
      radarChecked,
      coverageChecked,
      jmaprcrinChecked,
      jmaprcrinvalidtimeidx,
      JMA_PRCRIN,
    } = radar;
    const anlsislayer = WrapController.getLayer(JMA_ANLSIS_PRCRIN.layerName);
    const isChecked = radarChecked && jmaprcrinChecked;
    if (type === JMA_PRCRIN_CLICK || type === RADAR_CLICK) {
      this.setVisible(isChecked);
      if (anlsislayer && !isChecked) {
        anlsislayer.setVisible(false);
      }
    }

    if (type === RADAR_COVERAGE_CLICK) {
      this.setStyle(coverageChecked ? 'default' : 'clear_coverage');
    }

    if (isChecked) {
      const slttm = JMA_PRCRIN[jmaprcrinvalidtimeidx];
      if (slttm) {
        if (slttm.ts.indexOf('fcst') > -1) {
          if (anlsislayer) {
            anlsislayer.setVisible(false);
            anlsislayer.mergeLayer(false);
          }
          this.setVisible(isChecked);
          this.set({ validtime: slttm.tm });
          this.mergeLayer(true);
        } else if (anlsislayer) {
          this.setVisible(false);
          anlsislayer.setVisible(isChecked);
          if (type === RADAR_COVERAGE_CLICK) {
            anlsislayer.setStyle(coverageChecked ? 'default' : 'clear_coverage');
          }
          anlsislayer.set({ validtime: slttm.tm });
          this.mergeLayer(false);
          anlsislayer.mergeLayer(isChecked);
        }
      }
    } else {
      this.mergeLayer(false);
      if (anlsislayer) {
        anlsislayer.mergeLayer(false);
      }
    }
  }
}

export default NowcastRadarLayer;
