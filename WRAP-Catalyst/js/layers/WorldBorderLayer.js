import WrapLayer from 'WRAP/UI/WrapLayer';

class WorldBorderLayer extends WrapLayer {
  ctrlLayer(type, state) {
    const { tiledmap } = state;
    this.setVisible(tiledmap.worldborderChecked);
  }
}

export default WorldBorderLayer;
