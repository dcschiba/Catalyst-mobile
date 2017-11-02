import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_APCP_CLICK,
  COMPASS_HOUR_APCP_GRIDVALUE_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourApcpGridValueLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourApcpChecked,
            compassHourApcpGridValueChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourApcpChecked && compassHourApcpGridValueChecked;
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
      type === COMPASS_HOUR_APCP_GRIDVALUE_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourApcpGridValueLayer;
