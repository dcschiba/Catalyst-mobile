import GPVLayer from './GPVLayer';

class GPVRhGridValueLayer extends GPVLayer {
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
      rhgridvaluechecked,
      basetimeidx,
      validtimeidx,
      level,
    } = gpv;
    const gpvrhenable = gpvchecked && (!gpvDisabled.disabled) && rhchecked;
    const rhgridvaluelayerVisible = gpvrhenable && rhgridvaluechecked;
    if (rhgridvaluelayerVisible) {
      this.setContent({ element: 'RH', level }, basetimeidx, validtimeidx);
    }
    this.setVisible(rhgridvaluelayerVisible);
  }
}

export default GPVRhGridValueLayer;
