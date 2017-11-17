import GPVLayer from './GPVLayer';

class GPVRhContourLayer extends GPVLayer {
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
      rhchecked,
      rhcontourchecked,
      basetimeidx,
      validtimeidx,
      level,
    } = gpv;
    const gpvrhenable = gpvchecked && (!gpvDisabled.disabled) && rhchecked;
    const rhcontourlayerVisible = gpvrhenable && rhcontourchecked;
    if (rhcontourlayerVisible) {
      this.setContent({ element: 'RH', level }, basetimeidx, validtimeidx);
    }
    this.setVisible(rhcontourlayerVisible);
  }
}

export default GPVRhContourLayer;
