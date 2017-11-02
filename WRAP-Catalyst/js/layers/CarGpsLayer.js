import WrapLayer from 'WRAP/UI/WrapLayer';

class CarGpsLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.setTooltip((geo) => {
      const p = geo && geo.properties;
      if (p) {
        const t = p.valid_time;
        const time = `${t.substr(0, 4)}/${t.substr(4, 2)}/${t.substr(6, 2)}
                      ${t.substr(9, 2)}:${t.substr(11, 2)}:${t.substr(13, 2)}`;
        return `carid : ${p.carid}<br>
            event : ${p.event}<br>
            gps_num : ${p.gps_num}<br>
            gps_q : ${p.gps_q}<br>
            spd : ${p.spd}<br>
            time : ${time}`;
      }
      return null;
    });
  }

  ctrlLayer(type, state) {
    const { cargps } = state;
    this.setVisible(cargps.carGpsChecked);
  }
}

export default CarGpsLayer;
