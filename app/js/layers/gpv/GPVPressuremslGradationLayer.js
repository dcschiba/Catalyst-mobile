import GPVLayer from './GPVLayer';

class GPVPressuremslFillLayer extends GPVLayer {
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
      pressuremslchecked,
      pressuremslflatchecked,
      pressuremslgradationchecked,
      basetimeidx,
      validtimeidx,
    } = gpv;
    const gpvpressuremslenable = gpvchecked && (!gpvDisabled.disabled) && pressuremslchecked;
    const pressuremslfilllayerVisible = (
      gpvpressuremslenable && (pressuremslflatchecked || pressuremslgradationchecked)
    );
    if (pressuremslfilllayerVisible) {
      this.setContent({ element: 'PRMSL', level: '000' }, basetimeidx, validtimeidx);
      this.setStyle('gradation');
    }
    this.setVisible(pressuremslfilllayerVisible);
  }
}

export default GPVPressuremslFillLayer;
