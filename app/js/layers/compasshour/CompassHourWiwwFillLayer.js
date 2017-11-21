import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_WIWW_CLICK,
  COMPASS_HOUR_WIWW_FILL_CHANGE } from '../../constants/compasshour/ActionTypes';

class CompassHourWiwwFillLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourWiwwChecked,
            compassHourWiwwFillValue,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourWiwwChecked && compassHourWiwwFillValue !== 'none';
    if (enabled) {
      this.setStyle(compassHourWiwwFillValue);
    }
    if (enabled) {
      this.setContent(
        {
          element: 'WIWW',
          level: '000',
        },
        basetimeidx,
        validtimeidx,
      );
    }
    if (
      type === COMPASS_HOUR_CLICK ||
      type === COMPASS_HOUR_WIWW_CLICK ||
      type === COMPASS_HOUR_WIWW_FILL_CHANGE
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourWiwwFillLayer;
