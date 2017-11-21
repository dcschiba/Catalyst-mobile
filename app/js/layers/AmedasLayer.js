import WRAP from 'WRAP';
import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapController from 'WRAP/UI/WrapController';
import WrapUtils from '../common/utils/WrapUtils';
import WrapMessages from '../common/messages/WrapMessages';
import { AMEDAS_TIMELIST } from '../constants/amedas/ActionTypes';
import css from '../../style/common/tooltip.css';

class AmedasLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    fetch(`./pri/conf/app/Amedas.json?t=${new Date().getTime()}`)
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            const wind = json.wind;
            const { base, start, end, interval, non } = wind;
            this.wind = [];
            for (let i = start; i <= end; i += interval) {
              this.wind.push(`${base}${i}.png`);
            }
            this.wind.push(non);
            this.Sunshine = json.Sunshine;
            this.Temperature = json.Temperature;
            this.Precipitation = json.Precipitation;
            this.SnowDepth = json.SnowDepth;
            const MasterData = json.MasterData.replace('%baseurl%', WrapController.dhkeyoption.baseurl);
            AmedasLayer.getAmedasMaster(MasterData);
            this.timeRange = {};
            this.dispathfunc = conf.dispatchAction;
            this.dhData.inspect((ref) => {
              const timelist = ref.query('validtime').value();
              this.dataInspect(timelist);
            });
            WRAP.Geo.addEventHandler('mouseover', AmedasLayer.mouseoverHandle);
            WRAP.Geo.addEventHandler('mouseout', AmedasLayer.mouseoutHandle);
          });
        } else {
          WRAP.Logger.critical('Failed to get Amedas app config');
        }
      });
  }
  static getAmedasMaster(MasterData) {
    fetch(`${MasterData}?t=${new Date().getTime()}`)
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            const amedasmaster = {};
            const features = json.features;
            features.map((ft) => {
              const prop = ft.properties;
              const amssid = prop.amsid;
              const obsen = prop.obsen;
              amedasmaster[amssid] = obsen;
              return ft;
            });
            AmedasLayer.amedasmaster = amedasmaster;
          });
        } else {
          WRAP.Logger.critical('Failed to get Amedas master data');
        }
      });
  }

  static getAmedasObsen(amssid) {
    if (AmedasLayer.amedasmaster[amssid]) {
      return AmedasLayer.amedasmaster[amssid];
    }
    return amssid;
  }
  /* eslint no-param-reassign: ["error", { "props": false }]*/
  static showtooltip(tooltip, prax, pray) {
    const pw = tooltip.parentNode.clientWidth;
    const ph = tooltip.parentNode.clientHeight;
    if (prax < 0 || prax >= pw || pray < 0 || pray >= ph) {
      tooltip.style.display = 'none';
      return;
    }
    tooltip.style.display = 'block';
    let tw = tooltip.clientWidth;
    const th = tooltip.clientHeight;
    let x = prax;
    let y = pray;
    if (tw >= pw) {
      tw = 0;
    }
    const arrowoffset = 20;
    const ox = 26;
    const oy = 14;
    const ay = oy + arrowoffset;
    let xm;
    let ym;

    if (x + tw + (ox * 2) >= pw) {
      x -= (tw + ox);
      xm = ' r';
    } else {
      x += ox;
      xm = ' l';
    }

    if (y < ay) {
      y = oy;
    } else if (y >= ph - oy - arrowoffset) {
      y = ph - oy - th;
    } else if ((y + th) - arrowoffset >= ph - ay) {
      y -= th - arrowoffset - 2;
      if (y > oy) {
        ym = 'b-arrow';
      } else {
        y = oy;
      }
    } else {
      y -= arrowoffset;
      if (y > oy) {
        ym = 't-arrow';
      } else {
        y = oy;
      }
    }
    let c = 'tooltip';
    if (xm && ym) {
      c += (xm + ym);
    }
    tooltip.style.top = `${y}px`;
    tooltip.style.left = `${x}px`;
    tooltip.setAttribute('class', c);
  }

  static mouseoverHandle(layer, feature, point) {
    if (layer && layer.name() === 'WX_JMA_Amedas'
      && feature.image.indexOf('wind') === -1) {
      if (!layer.tooltip) {
        layer.tooltip = document.createElement('div');
        layer.tooltip.className = css.tooltip;
        const basediv = WrapController.mapDiv;
        basediv.appendChild(layer.tooltip);
      }
      const tooltipdata = feature.tooltipdata;
      const wind = tooltipdata.wind;
      let windknot = '-';
      if (wind !== '_missing_') {
        const windround = Math.round(wind / 0.514);
        windknot = `${windround} knot`;
      }
      const sunshinemes = WrapMessages.getMessage('common.sunshine');
      const precipitationmes = WrapMessages.getMessage('common.precipitation');
      const winddirmes = WrapMessages.getMessage('common.wind.direction');
      const windvelocitymes = WrapMessages.getMessage('common.wind.velocity');
      const temperaturemes = WrapMessages.getMessage('common.temperature');
      const snowdepthmes = WrapMessages.getMessage('common.snowdepth');

      layer.tooltip.innerHTML = `${AmedasLayer.getAmedasObsen(tooltipdata.amsid)} <br>
${sunshinemes}: ${AmedasLayer.checkmissing(tooltipdata.Sunshine, 'min')} <br>
${precipitationmes}: ${AmedasLayer.checkmissing(tooltipdata.Precipitation, 'mm')}<br>
${winddirmes}: ${AmedasLayer.checkmissing(tooltipdata.winddir, '')} <br>
${windvelocitymes}: ${AmedasLayer.checkmissing(tooltipdata.wind, 'm/s')}<br>
${windvelocitymes}(knot): ${windknot}<br>
${temperaturemes}: ${AmedasLayer.checkmissing(tooltipdata.Temperature, '℃')}<br>
${snowdepthmes}:  ${AmedasLayer.checkmissing(tooltipdata.SnowDepth, 'cm')}<br>`;

      AmedasLayer.showtooltip(layer.tooltip, point.x, point.y);
    }
  }

  /* eslint-disable no-unused-vars */
  static mouseoutHandle(layer, feature, point) {
    if (layer && layer.name() === 'WX_JMA_Amedas') {
      if (layer.tooltip) {
        layer.tooltip.style.top = '-1000px';
        layer.tooltip.style.left = '-1000px';
      }
    }
  }

  dataInspect(timelist) {
    if (timelist && timelist.length) {
      const num = timelist.length;
      const tsarr = [];
      for (let i = 0; i < num; i += 1) {
        const tm = timelist[i];
        const ts = `${WrapUtils.dateFormat(tm)}Z`;
        tsarr[i] = { idx: i, ts, validtime: tm };
      }
      this.timeRange = tsarr;

      this.dispathfunc(AMEDAS_TIMELIST,
         { tsarr, validtimeidx: 0 }, this.name());
    }
  }

  setContent(type, validtimeidx) {
    const validtimelist = this.timeRange;
    if (validtimelist && validtimeidx < validtimelist.length) {
      const content = { validtime: validtimelist[validtimeidx].validtime };
      const types = [];
      if (type.indexOf('wind') > 0) {
        types.push('wind');
        types.push(type.replace('wind', ''));
      } else {
        types.push(type);
      }
      this.dhData.getData(content, (gd) => {
        this.clear();
        const windfeatures = [];
        const otherfeatures = [];
        for (let i = 0; i < gd.length; i += 1) {
          const root = gd[i];
          for (let j = 0; j < root.features.length; j += 1) {
            const prop = root.features[j].properties;
            types.map((tp) => {
              const imgidx = AmedasLayer.getContentIdx(tp, prop, this[tp]);
              const img = imgidx.img;
              if (img !== '') {
                const geometry = root.features[j].geometry;
                const imgopt = {
                  point: geometry.coordinates,
                  image: img,
                  width: 10,
                  height: 10,
                  offsetX: -5,
                  offsetY: -5,
                };
                if (tp === 'wind') {
                  imgopt.width = 80;
                  imgopt.height = 80;
                  imgopt.offsetX = -40;
                  imgopt.offsetY = -40;
                  imgopt.rotation = prop.wind_dir['10m_mean'];
                }
                const feature = new WRAP.Geo.Feature.Image(imgopt);
                feature.val = imgidx.val;
                feature.tooltipdata = {
                  amsid: prop.amsid,
                  Sunshine: prop.sun_time_total['10m'],
                  Precipitation: prop.rain_amnt_total['10m'],
                  winddir: prop.wind_dir['10m_mean'],
                  wind: prop.wind_vel['10m_mean'],
                  Temperature: prop.air.temp,
                  SnowDepth: prop.snow.wrap_hgt,
                };
                if (tp === 'wind') {
                  windfeatures.push(feature);
                } else {
                  otherfeatures.push(feature);
                }
              }
              return tp;
            });
          }
        }
        windfeatures.map((wf) => {
          this.addFeature(wf);
          return wf;
        });
        otherfeatures.sort((a, b) => {
          if (a.val > b.val) return 1;
          if (a.val < b.val) return -1;
          return 0;
        });
        otherfeatures.map((of) => {
          this.addFeature(of);
          return of;
        });
        WRAP.Geo.invalidate();
      });
    }
  }

  static checkmissing(s, t) {
    if (s === '_missing_') {
      return '-';
    }
    return `${s} ${t}`;
  }

  static getContentIdx(type, properties, imgs) {
    if (!imgs) {
      return { img: '', val: -9999 };
    }
    let img = '';
    let idx = -9999;
    let val = -9999;
    if (type === 'wind') {
      const wind = parseFloat(properties.wind_vel['10m_mean']);
      if (wind > -1) {
        const windknot = Math.round(wind / 0.514);
        const remainder = windknot % 5;
        idx = parseInt(windknot / 5, 10);
        if (remainder >= 3) {
          idx += 1;
        }
        if (idx >= 40) {
          idx = 39;
        }
        if (idx > -9999 && idx < 40) { // 有効範囲は<=39 195knot
          img = imgs[idx];
        }
        if (windknot === 0) {
          img = imgs[40]; // windknot == 0
        }
        val = wind;
      }
    } else if (type === 'Sunshine') {
      const sun = parseInt(properties.sun_time_total['10m'], 10);
      if (sun !== -9999) {
        if (sun < 3) {
          idx = 0;
        } else if (sun < 6) {
          idx = 1;
        } else if (sun < 10) {
          idx = 2;
        } else if (sun === 10) {
          idx = 3;
        }
        if (idx > -9999) {
          img = imgs[idx];
        }
        val = sun;
      }
    } else if (type === 'Temperature') {
      const temp = parseFloat(properties.air.temp);
      if (temp !== -999) {
        if (temp >= 30) {
          idx = 9;
        } else if (temp >= 25) {
          idx = 8;
        } else if (temp >= 20) {
          idx = 7;
        } else if (temp >= 15) {
          idx = 6;
        } else if (temp >= 10) {
          idx = 5;
        } else if (temp >= 5) {
          idx = 4;
        } else if (temp >= 0) {
          idx = 3;
        } else if (temp >= -5) {
          idx = 2;
        } else if (temp >= -10) {
          idx = 1;
        } else if (temp < -10) {
          idx = 0;
        }
        if (idx > -9999) {
          img = imgs[idx];
        }
        val = temp;
      }
    } else if (type === 'Precipitation') {
      const rain = parseFloat(properties.rain_amnt_total['10m']);
      if (rain > 0) {
        if (rain >= 32) {
          idx = 6;
        } else if (rain >= 16) {
          idx = 5;
        } else if (rain >= 8) {
          idx = 4;
        } else if (rain >= 4) {
          idx = 3;
        } else if (rain >= 2) {
          idx = 2;
        } else if (rain >= 1) {
          idx = 1;
        } else if (rain < 1) {
          idx = 0;
        }
        if (idx > -9999) {
          img = imgs[idx];
        }
        val = rain;
      }
    } else if (type === 'SnowDepth') {
      const snow = parseFloat(properties.snow.wrap_hgt);
      if (snow > 0) {
        if (snow < 50) {
          idx = 0;
        } else if (snow < 100) {
          idx = 1;
        } else if (snow < 150) {
          idx = 2;
        } else if (snow < 200) {
          idx = 3;
        } else if (snow < 250) {
          idx = 4;
        } else if (snow >= 250) {
          idx = 5;
        }
        if (idx > -9999) {
          img = imgs[idx];
        }
        val = snow;
      }
    }

    return { img, val };
  }

  ctrlLayer(type, state) {
    const { amedas } = state;
    let content = amedas.content;
    if (amedas.windchecked) {
      content += 'wind';
    }

    this.setContent(
      content,
      amedas.validtimeidx,
    );
    this.setVisible(amedas.showchecked);
  }
}

export default AmedasLayer;
