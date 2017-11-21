import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_POP_CLICK,
  COMPASS_HOUR_POP_GRIDVALUE_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourPopGridValueLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourPopChecked,
            compassHourPopGridValueChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourPopChecked && compassHourPopGridValueChecked;
    if (enabled) {
      this.setContent(
        {
          element: 'POP',
          level: '000',
        },
        basetimeidx,
        validtimeidx,
      );
    }
    if (
      type === COMPASS_HOUR_CLICK ||
      type === COMPASS_HOUR_POP_CLICK ||
      type === COMPASS_HOUR_POP_GRIDVALUE_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourPopGridValueLayer;
