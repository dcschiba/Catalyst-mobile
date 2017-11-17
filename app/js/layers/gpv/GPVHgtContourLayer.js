import GPVLayer from './GPVLayer';

class GPVHgtContourLayer extends GPVLayer {
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
      hgtcontourchecked,
      basetimeidx,
      validtimeidx,
      level,
    } = gpv;
    const gpvhgtenable = gpvchecked && (!gpvDisabled.disabled) && hgtchecked;
    const hgtcontourlayerVisible = gpvhgtenable && hgtcontourchecked;
    if (hgtcontourlayerVisible) {
      this.setContent({ element: 'HGT', level }, basetimeidx, validtimeidx);
    }
    this.setVisible(hgtcontourlayerVisible);
  }
}

export default GPVHgtContourLayer;
