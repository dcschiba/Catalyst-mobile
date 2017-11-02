import WrapLayer from 'WRAP/UI/WrapLayer';

class WebglInitLayer extends WrapLayer {
  configureCompleted() {
    this.set({ map: 'BlueMarble' });
    this.setVisible(true);
  }
}

export default WebglInitLayer;
