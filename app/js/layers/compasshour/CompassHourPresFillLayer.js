import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_PRES_CLICK,
  COMPASS_HOUR_PRES_FILL_CHANGE } from '../../constants/compasshour/ActionTypes';

class CompassHourPresFillLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourPresChecked,
            compassHourPresFillValue,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourPresChecked && compassHourPresFillValue !== 'none';
    if (enabled) {
      this.setStyle(compassHourPresFillValue);
    }
    if (enabled) {
      this.setContent(
        {
          element: 'PRES',
          level: '000',
        },
        basetimeidx,
        validtimeidx,
      );
    }
    if (
      type === COMPASS_HOUR_CLICK ||
      type === COMPASS_HOUR_PRES_CLICK ||
      type === COMPASS_HOUR_PRES_FILL_CHANGE
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourPresFillLayer;
