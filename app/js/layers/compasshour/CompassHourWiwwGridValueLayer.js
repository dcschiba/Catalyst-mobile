import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_WIWW_CLICK,
  COMPASS_HOUR_WIWW_GRIDVALUE_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourWiwwGridValueLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourWiwwChecked,
            compassHourWiwwGridValueChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourWiwwChecked && compassHourWiwwGridValueChecked;
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
      type === COMPASS_HOUR_WIWW_GRIDVALUE_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourWiwwGridValueLayer;
