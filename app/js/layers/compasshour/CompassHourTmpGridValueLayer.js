import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_TMP_CLICK,
  COMPASS_HOUR_TMP_GRIDVALUE_CLICK,
  COMPASS_HOUR_TMP_GRIDVALUE_UNIT } from '../../constants/compasshour/ActionTypes';

class CompassHourTmpGridValueLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourTmpChecked,
            compassHourTmpGridValueChecked,
            compassHourTmpGridValueUnit,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourTmpChecked && compassHourTmpGridValueChecked;
    if (compassHourTmpGridValueUnit === 'C') {
      this.setAttributes({
        data_offset: -273.15,
        data_scale: 1,
      });
    } else {
      this.setAttributes({
        data_offset: -459.67,
        data_scale: 1.8,
      });
    }
    if (enabled) {
      this.setContent(
        {
          element: 'TMP',
          level: '000',
        },
        basetimeidx,
        validtimeidx,
      );
    }
    if (
      type === COMPASS_HOUR_CLICK ||
      type === COMPASS_HOUR_TMP_CLICK ||
      type === COMPASS_HOUR_TMP_GRIDVALUE_CLICK ||
      type === COMPASS_HOUR_TMP_GRIDVALUE_UNIT
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourTmpGridValueLayer;
