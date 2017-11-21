import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_TMP_CLICK,
  COMPASS_HOUR_TMP_CONTOUR_CLICK,
  COMPASS_HOUR_TMP_CONTOUR_UNIT } from '../../constants/compasshour/ActionTypes';

class CompassHourTmpContourLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourTmpChecked,
            compassHourTmpContourChecked,
            compassHourTmpContourUnit,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourTmpChecked && compassHourTmpContourChecked;
    if (compassHourTmpContourUnit === 'C') {
      this.setAttributes({
        data_offset: -273.15,
        data_scale: 1,
      });
      this.setStyle('contour_celcius');
    } else {
      this.setAttributes({
        data_offset: -459.67,
        data_scale: 1.8,
      });
      this.setStyle('contour_farenheit');
    }
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
      type === COMPASS_HOUR_TMP_CONTOUR_CLICK ||
      COMPASS_HOUR_TMP_CONTOUR_UNIT
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourTmpContourLayer;
