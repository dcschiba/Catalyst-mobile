import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_TMP_CLICK,
  COMPASS_HOUR_TMP_CONTOUR_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourTmpContourLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourTmpChecked,
            compassHourTmpContourChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourTmpChecked && compassHourTmpContourChecked;
    if (enabled) {
      this.setContent(
        {
          element: 'TMP',
          level: '000',
        },
        basetimeidx,
        validtimeidx,
      );
    }
    if (
      type === COMPASS_HOUR_CLICK ||
      type === COMPASS_HOUR_TMP_CLICK ||
      type === COMPASS_HOUR_TMP_CONTOUR_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourTmpContourLayer;
