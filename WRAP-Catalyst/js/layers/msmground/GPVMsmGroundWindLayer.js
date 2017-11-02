import GPVMsmGroundLayer from './GPVMsmGroundLayer';

class GPVMsmGroundWindLayer extends GPVMsmGroundLayer {
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
  }

  ctrlLayer(type, state) {
    const {
      gpvDisabled,
      gpvchecked,
      windchecked,
      basetimeidx,
      validtimeidx,
    } = state.msmground.gpv;
    const gpvwindenable = gpvchecked && (!gpvDisabled.disabled) && windchecked;

    if (gpvwindenable) {
      this.setContent({ element: ['UGRD', 'VGRD'], level: '000' }, basetimeidx, validtimeidx);
    }
    this.setVisible(gpvwindenable);
  }
}

export default GPVMsmGroundWindLayer;
