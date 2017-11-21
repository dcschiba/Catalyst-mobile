import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_VIS_CLICK,
  COMPASS_HOUR_VIS_FILL_CHANGE } from '../../constants/compasshour/ActionTypes';

class CompassHourVisFillLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourVisChecked,
            compassHourVisFillValue,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourVisChecked && compassHourVisFillValue !== 'none';
    if (enabled) {
      this.setStyle(compassHourVisFillValue);
    }
    if (enabled) {
      this.setContent(
        {
          element: 'VIS',
          level: '000',
        },
        basetimeidx,
        validtimeidx,
      );
    }
    if (
      type === COMPASS_HOUR_CLICK ||
      type === COMPASS_HOUR_VIS_CLICK ||
      type === COMPASS_HOUR_VIS_FILL_CHANGE
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourVisFillLayer;
