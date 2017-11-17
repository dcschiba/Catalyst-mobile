import GPVLayer from './GPVLayer';

class GPVSnowdepthGridValueLayer extends GPVLayer {
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
      case 'Model_GFS_SnowDepth':
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
      snowdepthgridvaluechecked,
      basetimeidx,
      validtimeidx,
    } = gpv;
    const gpvsnowdepthenable = gpvchecked && (!gpvDisabled.disabled) && snowdepthchecked;
    const snowdepthgridvaluelayerVisible = gpvsnowdepthenable && snowdepthgridvaluechecked;
    if (snowdepthgridvaluelayerVisible) {
      this.setContent({ element: 'SNOD', level: '000' }, basetimeidx, validtimeidx);
    }
    this.setVisible(snowdepthgridvaluelayerVisible);
  }
}

export default GPVSnowdepthGridValueLayer;
