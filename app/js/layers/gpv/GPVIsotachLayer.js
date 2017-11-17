import GPVLayer from './GPVLayer';

class GPVIsotachLayer extends GPVLayer {
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
      isotachchecked,
      basetimeidx,
      validtimeidx,
      level,
    } = gpv;
    const gpvisotachenable = gpvchecked && (!gpvDisabled.disabled) && isotachchecked;

    if (gpvisotachenable) {
      this.setContent({ element: ['UGRD', 'VGRD'], level }, basetimeidx, validtimeidx);
    }
    this.setVisible(gpvisotachenable);
  }
}

export default GPVIsotachLayer;
