import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_ASNOW_CLICK,
  COMPASS_HOUR_ASNOW_CONTOUR_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourAsnowContourLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourAsnowChecked,
            compassHourAsnowContourChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourAsnowChecked && compassHourAsnowContourChecked;
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
      type === COMPASS_HOUR_ASNOW_CONTOUR_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourAsnowContourLayer;
