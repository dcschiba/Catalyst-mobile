import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_POP_CLICK,
  COMPASS_HOUR_POP_FILL_CHANGE } from '../../constants/compasshour/ActionTypes';

class CompassHourPopFillLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourPopChecked,
            compassHourPopFillValue,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourPopChecked && compassHourPopFillValue !== 'none';
    if (compassHourPopFillValue === 'flat') {
      this.setStyle('flat');
    } else {
      this.setStyle('gradation');
    }

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
      type === COMPASS_HOUR_POP_FILL_CHANGE
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourPopFillLayer;
