import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_ASNOW_CLICK,
  COMPASS_HOUR_ASNOW_FILL_CHANGE } from '../../constants/compasshour/ActionTypes';

class CompassHourAsnowFillLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourAsnowChecked,
            compassHourAsnowFillValue,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourAsnowChecked && compassHourAsnowFillValue !== 'none';
    if (compassHourAsnowFillValue === 'flat') {
      this.setStyle('flat');
    } else {
      this.setStyle('gradation');
    }

    if (enabled) {
      this.setContent(
        {
          element: 'ASNOW',
          level: '000',
        },
        basetimeidx,
        validtimeidx,
      );
    }
    if (
      type === COMPASS_HOUR_CLICK ||
      type === COMPASS_HOUR_ASNOW_CLICK ||
      type === COMPASS_HOUR_ASNOW_FILL_CHANGE
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourAsnowFillLayer;
