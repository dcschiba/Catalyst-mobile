import WrapLayer from 'WRAP/UI/WrapLayer';

class WorldCoastlineLayer extends WrapLayer {
  ctrlLayer(type, state) {
    const { tiledmap } = state;
    this.setVisible(tiledmap.worldcoastlineChecked);
  }
}

export default WorldCoastlineLayer;
