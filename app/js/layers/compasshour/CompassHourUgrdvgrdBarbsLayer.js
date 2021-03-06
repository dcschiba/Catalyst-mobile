import CompassHourLayer from './CompassHourLayer';

import {
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_UGRDVGRD_CLICK,
  COMPASS_HOUR_UGRDVGRD_BARBS_CLICK } from '../../constants/compasshour/ActionTypes';

class CompassHourUgrdvgrdBarbsLayer extends CompassHourLayer {
  constructor(conf) {
    super(conf);
    this.setTooltip((geo) => {
      const p = geo && geo.properties;
      if (p) {
        return `${p.direction_text}/${p.speed_text}`;
      }
      return null;
    });
    this.setRespondable(true);
  }
  ctrlLayer(type, state) {
    const { compassHourChecked,
            compassHourUgrdvgrdChecked,
            compassHourUgrdvgrdBarbsChecked,
            basetimeidx,
            validtimeidx } = state.compasshour;
    const enabled = (
      compassHourChecked && compassHourUgrdvgrdChecked && compassHourUgrdvgrdBarbsChecked
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
    }
    if (
      type === COMPASS_HOUR_CLICK ||
      type === COMPASS_HOUR_UGRDVGRD_CLICK ||
      type === COMPASS_HOUR_UGRDVGRD_BARBS_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default CompassHourUgrdvgrdBarbsLayer;
