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
      icingprobchecked,
      basetimeidx,
      validtimeidx,
      level,
    } = gpv;
    const gpvicingprobenable = gpvchecked && (!gpvDisabled.disabled) && icingprobchecked;

    if (gpvicingprobenable) {
      this.setContent({ element: ['TMP', 'RH'], level }, basetimeidx, validtimeidx);
    }
    this.setVisible(gpvicingprobenable);
  }
}

export default GPVTmpContourLayer;
