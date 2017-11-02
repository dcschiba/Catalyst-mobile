import WRAP from 'WRAP';
import WrapLayer from 'WRAP/UI/WrapLayer';
import { SIGMET_NOTREAD } from '../constants/sigmet/ActionTypes';

class SigmetLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.wtextarr = [];
    this.dispathfunc = conf.dispatchAction;
    // this.dhDataInspect();
    this.setSigmetTooltip();
  }
  configureCompleted() {
    /* eslint no-console: ["error", { allow: ["log"] }] */
    let visible = false;
    if (this.dhData) {
      let sigmetNotreadArr = [];
      this.dhData.inspect((ref) => {
        const nowt = WRAP.Core.currentTime().text();
        WRAP.Logger.debug(nowt);
        const data = ref.query('data').value();
        sigmetNotreadArr = [];
        visible = this.visible();
        const wtextarrcopy = this.wtextarr.slice();
        this.wtextarr = [];
        // const data = ref.value();
        // DataHandlerにデータ本体がまだロードされてないことがあるので存在チェック
        if (!data) {
          WRAP.Logger.debug('VAALayer data is undefined');
          return;
        }
        data.features.map((feature) => {
          if (!SigmetLayer.checkValid(feature.properties, nowt)) {
            /* eslint no-param-reassign: ["error", { "props": false }]*/
            feature.properties.display_flag = false;
          } else {
            feature.properties.display_flag = true;
            if (feature.geometry) {
              const type = feature.geometry.type;
              if (type === 'Point') {
                const point = feature.geometry.coordinates;

                const text = SigmetLayer.getText(feature.properties);
                const wtext = new WRAP.Geo.Feature.Text({
                  point,
                  text,
                  fillStyle: '#333',
                  fontSize: 12,
                  offsetY: 7,
                  offsetX: 0,
                  align: 'center',
                });
                wtext.data = feature.properties.bltin;
                this.wtextarr.push(wtext);
              }
            } else {
              const elmType = feature.properties.elm_type;
              if (elmType === 'Unanalysable') {
                sigmetNotreadArr.push({
                  text: SigmetLayer.getText(feature.properties),
                  bltin: feature.properties.bltin,
                });
              }
            }
          }
          return feature;
        });
        if (visible) {
          this.features = data.features;
          this.invalidate();
          wtextarrcopy.map((bfwxtext) => {
            this.removeFeature(bfwxtext);
            return bfwxtext;
          });
          this.drawFeathrueText(visible);
        }
        this.dispathfunc(SIGMET_NOTREAD, { sigmetNotreadArr });
      }, true);
    }
  }

  static checkValid(properties, nowt) {
    const { valid_beg: validBeg, valid_end: validEnd } = properties;
    return (validBeg < nowt && nowt < validEnd);
  }

  static getText(properties) {
    const { area_indicator: areaIndicator, sigmet_id: sigmetId } = properties;
    let [f, e] = ['', ''];
    if (sigmetId && sigmetId.length > 0) {
      if (sigmetId.charCodeAt(0) < 64) {
        e = sigmetId;
      } else {
        f = sigmetId.substr(0, 1);
        e = sigmetId.substr(1);
      }
    }
    return `${f}/${areaIndicator} ${e}`;
  }

  drawFeathrueText(visible) {
    /* eslint no-console: ["error", { allow: ["log"] }] */
    this.wtextarr.map((wxtext) => {
      if (visible) {
        this.addFeature(wxtext);
      } else {
        this.removeFeature(wxtext);
      }
      return wxtext;
    });
    WRAP.Geo.invalidate();
  }

  setSigmetTooltip() {
    this.setTooltip((geo, data) => {
      // const p = geo && geo.properties;
      /* eslint no-console: ["error", { allow: ["log"] }] */
      // console.log('setSigmetTooltip--------', data);
      if (data) {
        let bltin = data;

        if (bltin) {
          bltin = bltin.replace(/\n{1,}/g, '<br>');
        }
        return `<div style='width:300px'>${bltin}</div>`;
      }
      return '';
    });
  }
  ctrlLayer(type, state) {
    console.log(type);
    const { sigmet } = state;
    this.setVisible(sigmet.sigmetChecked);
    this.drawFeathrueText(sigmet.sigmetChecked);
  }
}

export default SigmetLayer;
