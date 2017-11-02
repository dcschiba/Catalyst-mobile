import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_UGRD_CLICK,
  COMPASS_HOUR_UGRD_GRIDVALUE_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourUgrdGridValueLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourUgrdvgrdChecked,
            compassHourUgrdGridValueChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = (
      compassHourChecked && compassHourUgrdvgrdChecked && compassHourUgrdGridValueChecked
    );
    if (enabled) {
      this.setContent(
        {
          element: 'UGRD',
          level: '000',
        },
        basetimeidx,
        validtimeidx,
      );
    }
    if (
      type === COMPASS_HOUR_CLICK ||
      type === COMPASS_HOUR_UGRD_CLICK ||
      type === COMPASS_HOUR_UGRD_GRIDVALUE_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourUgrdGridValueLayer;
