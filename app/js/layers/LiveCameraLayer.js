import WrapLayer from 'WRAP/UI/WrapLayer';

class LiveCameraLayer extends WrapLayer {
  ctrlLayer(type, state) {
    const { livecamera } = state;
    this.setVisible(livecamera.liveCmChecked);
  }
}

export default LiveCameraLayer;
