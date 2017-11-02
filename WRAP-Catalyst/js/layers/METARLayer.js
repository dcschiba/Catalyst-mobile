import 'isomorphic-fetch';
import WRAP from 'WRAP';
import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapController from 'WRAP/UI/WrapController';

class METARLayer extends WrapLayer {
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
        return `<div style='width:300px'>METAR: ${icao}<br>bulletin: ${bulletin}</div>`;
      }
      return null;
    });
  }
  configureCompleted() {
    WRAP.Logger.debug('METARLayer configureCompleted');
    // 外部設定ファイルの取得
    fetch(`${WrapController.dhkeyoption.apppath}pri/conf/app/METAR.json?t=${new Date().getTime()}`)
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            WRAP.Logger.debug('metar app config fetch success');
            this.appConfig = json;
            this.dhData.inspect((ref) => {
              // 閾値設定が取れなかったら何もしない(デフォルト表示)
              if (this.appConfig === null) {
                return;
              }
              const conf = this.appConfig.WindLevel;
              const list = ref.query('data').value();
              let i = 0;
              const keys = Object.keys(list.data.data);
              for (i = 0; i < keys.length; i += 1) {
                const key = keys[i];
                const metar = list.data.data[key];
                if (metar) {
                  let c = 0;
                  for (c = 0; c < conf.length; c += 1) {
                    if (metar[conf[c].value_key] >= conf[c].value) {
                      metar[conf[c].selector_key] = conf[c].color;
                      break;
                    }
                  }
                }
              }
              this.invalidate();
            });
          });
        } else {
          WRAP.Logger.critical('Failed to get metar app config');
        }
      });
  }

  ctrlLayer(type, state) {
    const { metar } = state;
    this.setVisible(metar.metarChecked);
  }
}

export default METARLayer;
