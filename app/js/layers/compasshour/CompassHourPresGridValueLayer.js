import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_PRES_CLICK,
  COMPASS_HOUR_PRES_GRIDVALUE_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourPresGridValueLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourPresChecked,
            compassHourPresGridValueChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourPresChecked && compassHourPresGridValueChecked;
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
      type === COMPASS_HOUR_PRES_GRIDVALUE_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourPresGridValueLayer;
