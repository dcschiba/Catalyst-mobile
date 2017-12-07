import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_WIND_FLOW_CLICK,
} from '../../constants/compasshour/ActionTypes';

class CompassHourWindFlowLayer extends CompassHourLayer {
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourWindflowcheckd,
            compassHourWindflowlines,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = (
      compassHourChecked && compassHourWindflowcheckd
    );
    if (enabled) {
      this.setContent(
        {
          element: ['UGRD', 'VGRD'],
          level: '000',
        },
        basetimeidx,
        validtimeidx,
      );
      this.setAttributes({ line_num: compassHourWindflowlines });
    }
    if (
      type === COMPASS_HOUR_CLICK ||
      type === COMPASS_HOUR_WIND_FLOW_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourWindFlowLayer;
