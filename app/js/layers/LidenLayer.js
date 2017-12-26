import WrapLayer from 'WRAP/UI/WrapLayer';

class LidenLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.dhData.inspect((ref) => {
      const data = ref.query('data').value();
      if (data && data.features) {
        data.features.sort((a, b) => {
          if (a.properties.obs_time > b.properties.obs_time) return 1;
          if (a.properties.obs_time < b.properties.obs_time) return -1;
          return 0;
        });
        this.invalidate();
      }
    }, true);

    this.setTooltip((geo) => {
      const p = geo && geo.properties;
      if (p) {
        const lat = geo.geometry.coordinates[1];
        const lon = geo.geometry.coordinates[0];
        const lat60 = LidenLayer.latlonfmt60(lat, 'N');
        const lon60 = LidenLayer.latlonfmt60(lon, 'E');

        const ot = p.obs_time;
        const type = p.type;
        const mult = p.mult;
        const otText = `${ot.substr(4, 2)}/${ot.substr(6, 2)}
                      ${ot.substr(9, 2)}:${ot.substr(11, 2)}Z`;
        let typestr = '';
        const multstr = mult;

        if (type === '0' || type === '1') {
          typestr = '雲放電';
        } else if (type === '4') {
          typestr = '対地放電';
        }

        return `${otText}<br>
             ${lat60}${lon60}<br>
             type:${typestr}<br>
             mult:${multstr}`;
      }
      return null;
    });
  }

  static latlonfmt60(ll, f) {
    const d = parseInt(ll, 10);
    const m = (ll - d) * 60;
    const mi = parseInt(m, 10);
    const s = parseInt((m - mi) * 100, 10);
    return `${f}${d}-${mi}.${s}`;
  }

  ctrlLayer(type, state) {
    const { lightning } = state;
    this.setVisible(lightning.lightningLidenChecked);
  }
}

export default LidenLayer;
