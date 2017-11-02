import GPVMsmGroundLayer from './GPVMsmGroundLayer';

class GPVMsmGroundPrecipitationLayer extends GPVMsmGroundLayer {
  ctrlLayer(type, state) {
    const {
      gpvDisabled,
      gpvchecked,
      precipitationchecked,
      basetimeidx,
      validtimeidx,
    } = state.msmground.gpv;
    const precipitationenable = gpvchecked && (!gpvDisabled.disabled) && precipitationchecked;

    if (precipitationenable) {
      this.setContent({ element: 'APCP', level: '000' }, basetimeidx, validtimeidx);
    }
    this.setStyle('flat');
    this.setVisible(precipitationenable);
  }
}

export default GPVMsmGroundPrecipitationLayer;
