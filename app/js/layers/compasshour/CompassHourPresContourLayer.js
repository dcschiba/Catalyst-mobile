import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_PRES_CLICK,
  COMPASS_HOUR_PRES_CONTOUR_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourPresContourLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourPresChecked,
            compassHourPresContourChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourPresChecked && compassHourPresContourChecked;
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
      type === COMPASS_HOUR_PRES_CONTOUR_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourPresContourLayer;
