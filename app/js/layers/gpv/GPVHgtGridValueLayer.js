import GPVLayer from './GPVLayer';

class GPVHgtGridValueLayer extends GPVLayer {
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
      hgtgridvaluechecked,
      basetimeidx,
      validtimeidx,
      level,
    } = gpv;
    const gpvhgtenable = gpvchecked && (!gpvDisabled.disabled) && hgtchecked;
    const hgtgridvaluelayerVisible = gpvhgtenable && hgtgridvaluechecked;
    if (hgtgridvaluelayerVisible) {
      this.setContent({ element: 'HGT', level }, basetimeidx, validtimeidx);
    }
    this.setVisible(hgtgridvaluelayerVisible);
  }
}

export default GPVHgtGridValueLayer;
