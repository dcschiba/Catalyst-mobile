import GPVLayer from './GPVLayer';

class GPVSnowDepthLayer extends GPVLayer {
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
      snowdepthchecked,
      basetimeidx,
      validtimeidx,
      level,
    } = gpv;
    const gpvsnowdepthenable = gpvchecked && (!gpvDisabled.disabled) && snowdepthchecked;

    if (gpvsnowdepthenable) {
      this.setContent({ element: ['SNOD'], level }, basetimeidx, validtimeidx);
    }
    this.setVisible(gpvsnowdepthenable);
  }
}

export default GPVSnowDepthLayer;
