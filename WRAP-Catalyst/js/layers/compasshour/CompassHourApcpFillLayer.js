import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_APCP_CLICK,
  COMPASS_HOUR_APCP_FILL_CHANGE } from '../../constants/compasshour/ActionTypes';

class CompassHourApcpFillLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourApcpChecked,
            compassHourApcpFillValue,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourApcpChecked && compassHourApcpFillValue !== 'none';
    if (compassHourApcpFillValue === 'flat') {
      this.setStyle('flat');
    } else {
      this.setStyle('gradation');
    }

    if (enabled) {
      this.setContent(
        {
          element: 'APCP',
          level: '000',
        },
        basetimeidx,
        validtimeidx,
      );
    }
    if (
      type === COMPASS_HOUR_CLICK ||
      type === COMPASS_HOUR_APCP_CLICK ||
      type === COMPASS_HOUR_APCP_FILL_CHANGE
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourApcpFillLayer;
