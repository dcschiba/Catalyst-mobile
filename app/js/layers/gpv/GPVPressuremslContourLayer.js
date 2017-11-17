import GPVLayer from './GPVLayer';

class GPVPressuremslContourLayer extends GPVLayer {
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
      pressuremslcontourchecked,
      basetimeidx,
      validtimeidx,
    } = gpv;
    const gpvpressuremslenable = gpvchecked && (!gpvDisabled.disabled) && pressuremslchecked;
    const pressuremslcontourlayerVisible = gpvpressuremslenable && pressuremslcontourchecked;
    if (pressuremslcontourlayerVisible) {
      this.setContent({ element: 'PRMSL', level: '000' }, basetimeidx, validtimeidx);
    }
    this.setVisible(pressuremslcontourlayerVisible);
  }
}

export default GPVPressuremslContourLayer;
