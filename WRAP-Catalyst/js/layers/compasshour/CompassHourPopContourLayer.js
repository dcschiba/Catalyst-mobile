import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_POP_CLICK,
  COMPASS_HOUR_POP_CONTOUR_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourPopContourLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourPopChecked,
            compassHourPopContourChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourPopChecked && compassHourPopContourChecked;
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
      type === COMPASS_HOUR_POP_CONTOUR_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourPopContourLayer;
