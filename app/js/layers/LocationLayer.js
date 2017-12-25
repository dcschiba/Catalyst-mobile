import WRAP from 'WRAP';

class LocationLayer extends WRAP.Geo.Layer {
  constructor(props) {
    console.log(props.layerName);
    super(props.layerName);
    this.setVisible(true);
  }
}

export default LocationLayer;
