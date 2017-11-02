import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_RH_CLICK,
  COMPASS_HOUR_RH_GRIDVALUE_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourRhGridValueLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourRhChecked,
            compassHourRhGridValueChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourRhChecked && compassHourRhGridValueChecked;
    if (enabled) {
      this.setContent(
        {
          element: 'RH',
          level: '000',
        },
        basetimeidx,
        validtimeidx,
      );
    }
    if (
      type === COMPASS_HOUR_CLICK ||
      type === COMPASS_HOUR_RH_CLICK ||
      type === COMPASS_HOUR_RH_GRIDVALUE_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourRhGridValueLayer;
