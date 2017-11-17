import GPVLayer from './GPVLayer';

class GPVHgtFillLayer extends GPVLayer {
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
      hgtchecked,
      hgtflatchecked,
      hgtgradationchecked,
      basetimeidx,
      validtimeidx,
      level,
    } = gpv;
    const gpvhgtenable = gpvchecked && (!gpvDisabled.disabled) && hgtchecked;
    const hgtfilllayerVisible = gpvhgtenable && (hgtflatchecked || hgtgradationchecked);
    if (hgtfilllayerVisible) {
      this.setContent({ element: 'HGT', level }, basetimeidx, validtimeidx);
      this.setStyle(hgtflatchecked ? 'flat' : 'gradation');
    }
    this.setVisible(hgtfilllayerVisible);
  }
}

export default GPVHgtFillLayer;
