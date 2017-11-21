import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_WIWW_CLICK,
  COMPASS_HOUR_WIWW_CONTOUR_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourWiwwContourLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourWiwwChecked,
            compassHourWiwwContourChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourWiwwChecked && compassHourWiwwContourChecked;
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
      type === COMPASS_HOUR_WIWW_CONTOUR_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourWiwwContourLayer;
