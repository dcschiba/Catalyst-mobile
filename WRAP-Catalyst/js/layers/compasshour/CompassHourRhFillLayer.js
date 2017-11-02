import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_RH_CLICK,
  COMPASS_HOUR_RH_FILL_CHANGE } from '../../constants/compasshour/ActionTypes';

class CompassHourRhFillLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourRhChecked,
            compassHourRhFillValue,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = compassHourChecked && compassHourRhChecked && compassHourRhFillValue !== 'none';
    if (compassHourRhFillValue === 'flat') {
      this.setStyle('flat');
    } else {
      this.setStyle('gradation');
    }

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
      type === COMPASS_HOUR_RH_FILL_CHANGE
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourRhFillLayer;
