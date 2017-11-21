import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_APCP_CLICK,
  COMPASS_HOUR_APCP_CONTOUR_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourApcpContourLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourApcpChecked,
            compassHourApcpContourChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourApcpChecked && compassHourApcpContourChecked;
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
      type === COMPASS_HOUR_APCP_CONTOUR_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourApcpContourLayer;
