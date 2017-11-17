import GPVLayer from './GPVLayer';

class GPVTmpContourLayer extends GPVLayer {
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
      tmpcontourchecked,
      basetimeidx,
      validtimeidx,
      level,
    } = gpv;
    const gpvtempenable = gpvchecked && (!gpvDisabled.disabled) && tempchecked;
    const tmpcontourlayerVisible = gpvtempenable && tmpcontourchecked;
    if (tmpcontourlayerVisible) {
      this.setContent({ element: 'TMP', level }, basetimeidx, validtimeidx);
    }
    this.setVisible(tmpcontourlayerVisible);
  }
}

export default GPVTmpContourLayer;
