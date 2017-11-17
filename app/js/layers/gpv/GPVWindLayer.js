import GPVLayer from './GPVLayer';

class GPVWindLayer extends GPVLayer {
  constructor(conf) {
    super(conf);
    this.setTooltip((geo) => {
      const p = geo && geo.properties;
      if (p) {
        const dir = p.direction_text ? (`${p.direction_text}/`) : '';
        const spd = p.speed_text ? (p.speed_text) : '0KT';
        return `${dir}${spd}`;
      }
      return null;
    });
    this.setRespondable(true);
  }

  ctrlLayer(type, state) {
    /* eslint-disable dot-notation */
    let gpv;
    const dhDataName = this.dhData['_string'];
    switch (dhDataName) {
      case 'Model_GSM':
        gpv = state.gpvgsm.gpv;
        break;
      case 'Model_UKMET':
        gpv = state.gpvukmet.gpv;
        break;
      case 'Model_GFS':
        gpv = state.gpvgfs.gpv;
        break;
      case 'Model_MSM':
        gpv = state.gpvmsm.gpv;
        break;
      default:
    }
    const {
      gpvDisabled,
      gpvchecked,
      windchecked,
      basetimeidx,
      validtimeidx,
      level,
    } = gpv;
    const gpvwindenable = gpvchecked && (!gpvDisabled.disabled) && windchecked;

    if (gpvwindenable) {
      this.setContent({ element: ['UGRD', 'VGRD'], level }, basetimeidx, validtimeidx);
    }
    this.setVisible(gpvwindenable);
  }
}

export default GPVWindLayer;
