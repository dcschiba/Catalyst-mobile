import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_TMP_CLICK,
  COMPASS_HOUR_TMP_GRIDVALUE_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourTmpGridValueLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourTmpChecked,
            compassHourTmpGridValueChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourTmpChecked && compassHourTmpGridValueChecked;
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
      type === COMPASS_HOUR_TMP_GRIDVALUE_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourTmpGridValueLayer;
