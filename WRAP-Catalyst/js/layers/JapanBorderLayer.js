import WrapLayer from 'WRAP/UI/WrapLayer';

class JapanBorderLayer extends WrapLayer {
  ctrlLayer(type, state) {
    const { tiledmap } = state;
    this.setVisible(tiledmap.japanborderChecked);
  }
}

export default JapanBorderLayer;
