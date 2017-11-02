import WrapLayer from 'WRAP/UI/WrapLayer';
import { AIRPORT_ALL_CLICK, AIRPORT_CUM_CLICK } from '../constants/airport/ActionTypes';

class AirportLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.setTooltip((geo) => {
      const p = geo && geo.properties;
      if (p) {
        const airportArea = p.area1;
        const airportName = p.name;
        return `Area : ${airportArea}<br>
            Name : ${airportName}<br>`;
      }
      return null;
    });
  }

  ctrlLayer(type, state) {
    const { airport } = state.airport;
    if (type === AIRPORT_ALL_CLICK || type === AIRPORT_CUM_CLICK) {
      const dhDataRoot = this.dhData.query('data').value();
      if (dhDataRoot && dhDataRoot.features) {
        const dhDataFeatures = dhDataRoot.features;
        dhDataFeatures.every((feature) => {
          const airportProp = feature.properties;
          airportProp.display_flag =
            airport.airportAllChecked || (airport.airportCumChecked && airportProp.area1 === 'USA');
          return feature;
        });
      }
      this.invalidate();
    } else {
      this.setVisible(airport.airportChecked);
    }
  }
}

export default AirportLayer;
