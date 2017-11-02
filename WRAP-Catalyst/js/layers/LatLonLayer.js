import WrapLayer from 'WRAP/UI/WrapLayer';

class LatLonLayer extends WrapLayer {
  ctrlLayer(type, state) {
    const { latlon } = state;
    this.setVisible(latlon.latlonChecked);
  }
}

export default LatLonLayer;
