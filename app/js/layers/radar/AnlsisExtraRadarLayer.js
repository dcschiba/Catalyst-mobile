import _ from 'lodash';
import RadarLayer from './RadarLayer';
import WrapUtils from '../../common/utils/WrapUtils';

import {
  RADAR_CLICK,
  RADAR_COVERAGE_CLICK,
  JMA_PRCRIN_EXTRA_CLICK,
  JMA_PRCRIN_EXTRA_VALIDTIME_CHANGE,
  JMA_ANLSIS_PRCRIN_EXTRA_TIMELIST,
} from '../../constants/radar/ActionTypes';

class AnlsisExtraRadarLayer extends RadarLayer {
  constructor(conf) {
    super(conf);
    this.layerindex = 2;
    this.timeRange = [];
    this.dispatchAction = conf.dispatchAction;
    this.dhData.inspect((ref) => {
      const validtime = ref.query('validtime').value();
      const extravalidtime = ref.query('extravalidtime').value();
      this.gpvDataInspect(validtime, extravalidtime);
    });
  }
  gpvDataInspect(validtime, extravalidtime) {
    if (validtime && validtime.length) {
      const num = validtime.length;
      const tsarr = [];

      for (let i = 0; i < num; i += 1) {
        const tm = validtime[i];
        const origintm = extravalidtime[i];
        let ts = `${WrapUtils.dateFormat(tm, 'MM/DD hh:mmZ')}`;
        if (origintm.indexOf('NOWCAS') > -1) {
          ts += '(fcst)';
        }
        this.timeRange[i] = { validtime: tm, extravalidtime: origintm };
        tsarr[i] = { idx: i, ts, tm };
      }
      this.dispatchAction(`${this.name()}_TIMELIST`, { tsarr }, this.name());
    }
  }

  setContent(validtimeidx) {
    if (_.get(this.timeRange[validtimeidx], 'extravalidtime')) {
      this.set({
        extravalidtime: this.timeRange[validtimeidx].extravalidtime,
      });
    }
  }
  ctrlLayer(type, state) {
    if ([RADAR_CLICK,
      RADAR_COVERAGE_CLICK,
      JMA_PRCRIN_EXTRA_CLICK,
      JMA_PRCRIN_EXTRA_VALIDTIME_CHANGE,
      JMA_ANLSIS_PRCRIN_EXTRA_TIMELIST].indexOf(type) === -1) {
      return;
    }
    const { radar } = state.radar;
    const {
      radarChecked,
      coverageChecked,
      jmaprcrinextraChecked,
      jmaprcrinextravalidtimeidx,
    } = radar;
    const isChecked = radarChecked && jmaprcrinextraChecked;
    if (type === RADAR_CLICK ||
      type === JMA_PRCRIN_EXTRA_CLICK) {
      this.setVisible(isChecked);
    }
    if (type === RADAR_COVERAGE_CLICK) {
      this.setStyle(coverageChecked ? 'default' : 'clear_coverage');
    }
    if (isChecked) {
      this.setContent(jmaprcrinextravalidtimeidx);
    }
    this.mergeLayer(isChecked);
  }
}

export default AnlsisExtraRadarLayer;
