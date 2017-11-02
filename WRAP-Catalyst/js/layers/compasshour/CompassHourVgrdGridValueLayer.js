import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_VGRD_CLICK,
  COMPASS_HOUR_VGRD_GRIDVALUE_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourVgrdGridValueLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourUgrdvgrdChecked,
            compassHourVgrdGridValueChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = (
      compassHourChecked && compassHourUgrdvgrdChecked && compassHourVgrdGridValueChecked
    );
    if (enabled) {
      this.setContent(
        {
          element: 'VGRD',
          level: '000',
        },
        basetimeidx,
        validtimeidx,
      );
    }
    if (
      type === COMPASS_HOUR_CLICK ||
      type === COMPASS_HOUR_VGRD_CLICK ||
      type === COMPASS_HOUR_VGRD_GRIDVALUE_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourVgrdGridValueLayer;
