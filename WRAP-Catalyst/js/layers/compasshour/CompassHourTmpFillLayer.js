import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_TMP_CLICK,
  COMPASS_HOUR_TMP_FILL_CHANGE } from '../../constants/compasshour/ActionTypes';

class CompassHourTmpFillLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourTmpChecked,
            compassHourTmpFillValue,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourTmpChecked && compassHourTmpFillValue !== 'none';
    if (compassHourTmpFillValue === 'flat') {
      this.setStyle('flat');
    } else {
      this.setStyle('gradation');
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
      type === COMPASS_HOUR_TMP_FILL_CHANGE
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourTmpFillLayer;
