import WRAP from 'WRAP';
import WrapLayer from 'WRAP/UI/WrapLayer';

class VAALayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    const nowt1 = new WRAP.Core.DateTime();
    WRAP.Logger.debug(`VAALayer configureCompleted now ${nowt1.text()}`);
    this.dhData.inspect((ref) => {
      WRAP.Logger.debug('VAALayer inspect in');
      const data = ref.query('data').value();
      // DataHandlerにデータ本体がまだロードされてないことがあるので存在チェック
      if (!data) {
        WRAP.Logger.debug('VAALayer data is undefined');
        return;
      }
      const latestTimes = {};
      let i = 0;
      for (i = 0; i < data.features.length; i += 1) {
        const feature = data.features[i];
        const smithonianNumber = feature.smithonian_number;
        if (!latestTimes[smithonianNumber]) {
          latestTimes[smithonianNumber] = feature.announced_date;
        } else if (latestTimes[smithonianNumber] < feature.announced_date) {
          latestTimes[smithonianNumber] = feature.announced_date;
        }
      }

      const anlsis = [];
      const tau6 = [];
      const tau12 = [];
      const tau18 = [];
      for (i = 0; i < data.features.length; i += 1) {
        const feature = data.features[i];
        const smithonianNumber = feature.smithonian_number;
        if (latestTimes[smithonianNumber] > feature.announced_date) {
          feature.properties.display_flag = false;
        } else {
          if (feature.properties.anlsis_layer_flag === '1' ||
            (feature.geometry && feature.geometry.type === 'Point')) {
            anlsis.push(feature);
          } else if (feature.properties.fcst_tau === '6') {
            tau6.push(feature);
          } else if (feature.properties.fcst_tau === '12') {
            tau12.push(feature);
          } else if (feature.properties.fcst_tau === '18') {
            tau18.push(feature);
          }
          feature.properties.display_flag = true;
        }
      }
      let newFeatures = tau18.concat(tau12);
      newFeatures = newFeatures.concat(tau6);
      newFeatures = newFeatures.concat(anlsis);
      data.features = newFeatures;
      this.invalidate();
    }, true);

    this.setTooltip((geo) => {
      const p = geo && geo.properties;
      if (p) {
        if (geo.geometry && geo.geometry.type === 'Point') {
          const bulletin = p.bulletin;

          let linedBulletin = '';
          if (bulletin) {
            linedBulletin = VAALayer.insertNewLineForTooltip(bulletin);
          }
          let tipstr = '';
          const ot = geo.announced_date;
          if (ot) {
            tipstr = `${tipstr} DTG: ${ot.substr(0, 4)}/${ot.substr(4, 2)}/${ot.substr(6, 2)} ${ot.substr(9, 2)}:${ot.substr(11, 2)}Z<br>`;
          } else {
            tipstr = `${tipstr} DTG: <br>`;
          }
          const name = p.name === null ? '' : p.name;
          tipstr = `${tipstr} VOLCANO: ${name}<br>`;
          const number = p.number === null ? '' : p.number;
          tipstr = `${tipstr} ADVISORY NR: ${number}<br>`;
          const colorCode = p.color_code === null ? '' : p.color_code;
          tipstr = `${tipstr} AVIATION COLOUR CODE: ${colorCode}<br>`;
          const detail = p.details === null ? '' : p.details;
          const eruption = VAALayer.insertNewLineForTooltip(`ERUPTION DETAILS: ${detail}`);
          tipstr = `${tipstr} ${eruption}<br>`;
          tipstr = `${tipstr} ------------------------<br>`;
          tipstr = `${tipstr} ${linedBulletin}`;
          return tipstr;
        } else if (p.fcst_tau === '6' || p.fcst_tau === '12' || p.fcst_tau === '18' ||
          p.anlsis_layer_flag === '1') {
          let tipstr = '';
          let fcasd = new WRAP.Core.DateTime(p.fcasd);
          if (!p.fcst_tau) {
            fcasd = new WRAP.Core.DateTime(p.anlsis_date);
          }
          if (fcasd) {
            const fstr = fcasd.text('YYYY/MM/DD hh:mmZ');
            tipstr = `${tipstr} VALID: ${fstr}<br>`;
          }
          let flLow = parseInt(p.layer_height_low, 10);
          let flHigh = parseInt(p.layer_height_high, 10);
          if (flLow < 0) {
            flLow = 0;
          }
          flLow /= 100;
          flHigh /= 100;
          tipstr = `${tipstr} FL: ${flLow}/${flHigh}`;
          return tipstr;
        }
      }
      return '';
    });
  }

  static insertNewLineForTooltip(text) {
    let linedText = '';
    const words = text.trim().split(' ');
    let linelength = 0;
    let w = 0;
    let wordlength = 0;
    for (w = 0; w < words.length; w += 1) {
      wordlength = words[w].length;
      if (linelength > 25) {
        linedText = `${linedText} <br>`;
        linelength = 0;
      }
      linedText = `${linedText} ${words[w]}`;
      linelength += wordlength;
    }
    return linedText;
  }

  ctrlLayer(type, state) {
    const { vaa } = state;
    this.setVisible(vaa.vaaChecked);
  }
}

export default VAALayer;
