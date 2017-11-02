import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_RH_CLICK,
  COMPASS_HOUR_RH_CONTOUR_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourRhContourLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourRhChecked,
            compassHourRhContourChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourRhChecked && compassHourRhContourChecked;
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
      type === COMPASS_HOUR_RH_CONTOUR_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourRhContourLayer;
