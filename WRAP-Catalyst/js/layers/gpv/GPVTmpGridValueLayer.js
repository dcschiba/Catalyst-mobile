import GPVLayer from './GPVLayer';

class GPVTmpGridValueLayer extends GPVLayer {
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
      tempchecked,
      tmpgridvaluechecked,
      basetimeidx,
      validtimeidx,
      level,
    } = gpv;
    const gpvtempenable = gpvchecked && (!gpvDisabled.disabled) && tempchecked;
    const tmpgridvaluelayerVisible = gpvtempenable && tmpgridvaluechecked;
    if (tmpgridvaluelayerVisible) {
      this.setContent({ element: 'TMP', level }, basetimeidx, validtimeidx);
    }
    this.setVisible(tmpgridvaluelayerVisible);
  }
}

export default GPVTmpGridValueLayer;
