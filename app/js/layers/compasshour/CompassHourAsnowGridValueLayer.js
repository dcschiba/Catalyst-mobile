import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_ASNOW_CLICK,
  COMPASS_HOUR_ASNOW_GRIDVALUE_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourAsnowGridValueLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourAsnowChecked,
            compassHourAsnowGridValueChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = (
      compassHourChecked && compassHourAsnowChecked && compassHourAsnowGridValueChecked
    );
    if (enabled) {
      this.setContent(
        {
          element: 'ASNOW',
          level: '000',
        },
        basetimeidx,
        validtimeidx,
      );
    }
    if (
      type === COMPASS_HOUR_CLICK ||
      type === COMPASS_HOUR_ASNOW_CLICK ||
      type === COMPASS_HOUR_ASNOW_GRIDVALUE_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourAsnowGridValueLayer;
