import GPVMsmGroundLayer from './GPVMsmGroundLayer';

class GPVMsmGroundContourLayer extends GPVMsmGroundLayer {
  ctrlLayer(type, state) {
    const {
      gpvDisabled,
      gpvchecked,
      contourchecked,
      basetimeidx,
      validtimeidx,
    } = state.msmground.gpv;

    const gpvcontourenable = gpvchecked && (!gpvDisabled.disabled) && contourchecked;
    if (gpvcontourenable) {
      this.setContent({ element: 'PRMSL', level: '000' }, basetimeidx, validtimeidx);
    }
    this.setVisible(gpvcontourenable);
  }
}

export default GPVMsmGroundContourLayer;
