import WrapLayer from 'WRAP/UI/WrapLayer';

class BlueMarbleLayer extends WrapLayer {
  ctrlLayer(type, state) {
    this.set({ map: 'BlueMarble' });
    const { tiledmap } = state;
    this.setVisible(tiledmap.bluemarbleChecked);
  }
}

export default BlueMarbleLayer;
