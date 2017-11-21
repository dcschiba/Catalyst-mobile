import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_VIS_CLICK,
  COMPASS_HOUR_VIS_GRIDVALUE_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourVisGridValueLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourVisChecked,
            compassHourVisGridValueChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourVisChecked && compassHourVisGridValueChecked;
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
      type === COMPASS_HOUR_VIS_GRIDVALUE_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourVisGridValueLayer;
