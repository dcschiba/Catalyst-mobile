import WrapLayer from 'WRAP/UI/WrapLayer';

class TAFLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.setTooltip((geo, data) => {
      const p = geo && geo.properties;
      if (p && data) {
        let bulletin = data.bulletin;
        const icao = p.icao;
        if (bulletin) {
          bulletin = bulletin.replace(/\r/g, '');
          bulletin = bulletin.replace(/\n/g, '<br>');
        }
        return `<div style='width:300px'>TAF: ${icao}<br>bulletin: ${bulletin}</div>`;
      }
      return null;
    });
  }

  ctrlLayer(type, state) {
    const { taf } = state;
    this.setVisible(taf.tafChecked);
  }
}
export default TAFLayer;
