import GPVLayer from './GPVLayer';

class GPVPrecipitationLayer extends GPVLayer {
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
      precipitationchecked,
      precflatchecked,
      precgradationchecked,
      basetimeidx,
      validtimeidx,
    } = gpv;
    const gpvprecenable = gpvchecked && (!gpvDisabled.disabled) && precipitationchecked;
    const gpvprecvisible = gpvprecenable && (precflatchecked || precgradationchecked);
    if (gpvprecvisible) {
      this.setContent({ element: 'APCP', level: '000' }, basetimeidx, validtimeidx);
      this.setStyle(precflatchecked ? 'flat' : 'gradation');
    }
    this.setVisible(gpvprecvisible);
  }
}

export default GPVPrecipitationLayer;
