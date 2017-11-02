import GPVLayer from './GPVLayer';

class GPVPressureMslLayer extends GPVLayer {
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
      pressuremslchecked,
      basetimeidx,
      validtimeidx,
    } = gpv;
    const gpvpressuremslenable = gpvchecked && (!gpvDisabled.disabled) && pressuremslchecked;

    if (gpvpressuremslenable) {
      this.setContent({ element: ['PRMSL'], level: '000' }, basetimeidx, validtimeidx);
    }
    this.setVisible(gpvpressuremslenable);
  }
}

export default GPVPressureMslLayer;
