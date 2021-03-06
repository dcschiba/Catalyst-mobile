import WrapLayer from 'WRAP/UI/WrapLayer';
import { LIGHTNING_JP_CLICK, LIGHTNING_KMA_CLICK } from '../constants/lightning/ActionTypes';

class LightningLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.setVisible(true);
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
        const lat60 = LightningLayer.latlonfmt60(lat, 'N');
        const lon60 = LightningLayer.latlonfmt60(lon, 'E');
        const peakcurrent = p.peak_current;
        const kind = p.kind;

        let elccrt = '';
        if (!peakcurrent) {
          elccrt = String(p.elccrt).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
        }
        const ot = p.obs_time;
        const otText = `${ot.substr(4, 2)}/${ot.substr(6, 2)}
                      ${ot.substr(9, 2)}:${ot.substr(11, 2)}Z`;
        if (peakcurrent) {
          return `${otText}<br>
               ${lat60}${lon60}<br>
               kind: ${kind}<br>
               peak_current: ${peakcurrent}<br>`;
        }
        return `${otText}<br>
             ${lat60}${lon60}<br>
             ${elccrt}A`;
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
    switch (type) {
      case LIGHTNING_JP_CLICK:
        this.setVisible(lightning.lightningJpChecked);
        break;
      case LIGHTNING_KMA_CLICK:
        this.setVisible(lightning.lightningKmaChecked);
        break;
      default:
        break;
    }
  }
}

export default LightningLayer;
