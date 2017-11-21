import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_VIS_CLICK,
  COMPASS_HOUR_VIS_CONTOUR_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourVisContourLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourVisChecked,
            compassHourVisContourChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourVisChecked && compassHourVisContourChecked;
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
      type === COMPASS_HOUR_VIS_CONTOUR_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourVisContourLayer;
