import GPVLayer from './GPVLayer';

class GPVTmpFillLayer extends GPVLayer {
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
      tmpflatchecked,
      tmpgradationchecked,
      basetimeidx,
      validtimeidx,
      level,
    } = gpv;
    const gpvtempenable = gpvchecked && (!gpvDisabled.disabled) && tempchecked;
    const tmpfilllayerVisible = gpvtempenable && (tmpflatchecked || tmpgradationchecked);
    if (tmpfilllayerVisible) {
      this.setContent({ element: 'TMP', level }, basetimeidx, validtimeidx);
      this.setStyle(tmpflatchecked ? 'flat' : 'gradation');
    }
    this.setVisible(tmpfilllayerVisible);
  }
}

export default GPVTmpFillLayer;
