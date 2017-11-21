import WRAP from 'WRAP';
import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapController from 'WRAP/UI/WrapController';
import WrapUtils from '../../common/utils/WrapUtils';
import popupcss from '../../../style/jmaseawarn/layer.css';
import {
  JMASEAWARN_CLICK,
  JMASEAWARN_SHOWTYPE_CHANGE,
  JMASEAWARN_ANNOUNCED_DATE } from '../../constants/jmaseawarn/ActionTypes';

class JmaseawarnLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.icons = [];
    this.warniconlayer = new WRAP.Geo.Layer('JmaseawarnIconLayer');
    this.warniconlayer.setVisible(false);
    WrapController.layer.upper_layers.push(this.warniconlayer);
    WRAP.Geo.setLayer(WrapController.layer);
    this.dispathfunc = conf.dispatchAction;
    this.dhData.inspect((ref) => {
      const data = ref.query('data.data').value();
      const positiondata = ref.query('data.position').value();
      if (!this.positionmaster) {
        this.positionDataInspect(positiondata);
      }
      this.dataInspect(data);
    }, true);
    this.setLayerTooltip();
    WRAP.Geo.addEventHandler('touch', JmaseawarnLayer.touchHandler);
    WrapController.setMapClickCallback(JmaseawarnLayer.mapClickHandler);
  }

  positionDataInspect(positiondata) {
    if (!positiondata) {
      return;
    }
    this.positionmaster = {};
    // console.log('positiondata----', positiondata);
    const features = positiondata.features;
    if (features) {
      features.map((f) => {
        const p = f.properties;
        if (!this.positionmaster[p.code]) {
          const ptname = p.name !== '' ? p.name : p.fuken_name;
          const center = p.center;
          this.positionmaster[p.code] = { ptname, center };
          // console.log('positiondata----', p.area_code, this.layer.positionmaster[p.area_code]);
        } else {
          console.log('positiondata has same code !!!!!!----', p.code);
        }
        return f;
      });
    }
  }
  /* eslint no-param-reassign: ["error", { "props": false }]*/
  dataInspect(data) {
    if (!data) {
      return;
    }
    const ann = data.announced_date;
    if (ann) {
      this.dispathfunc(JMASEAWARN_ANNOUNCED_DATE,
        { ann: WrapUtils.dateFormat(ann, 'YYYY/MM/DD hh:mm', 9 * 3600) });
    }
    const datas = data.data;
    if (datas) {
      this.icons = [];
      const keys = Object.keys(datas);
      keys.map((code) => {
        const icons = datas[code].wrap_icons;
        const len = icons.length;
        if (icons && this.positionmaster[code]) {
          const center = this.positionmaster[code].center;
          let startxy = 0;
          if (len === 3) {
            startxy = -16;
          }
          for (let i = 0; i < len; i += 1) {
            const iconcode = icons[i];
            let imgurl = '';
            if (iconcode === 10) {
              imgurl = 'img/seawarn/ice.png';
            } else if (iconcode === 11) {
              imgurl = 'img/seawarn/mist.png';
            } else if (iconcode === 12) {
              imgurl = 'img/seawarn/uneri.png';
            }
            const feature = new WRAP.Geo.Feature.Image({
              point: center,
              image: imgurl,
              width: 20,
              height: 20,
              offsetX: -10 + startxy + (20 * i),
              offsetY: -10,
            });
            this.icons.push(feature);
          }
        }
        return code;
      });
      this.showWarnIcon();
    }
  }

  showWarnIcon() {
    this.warniconlayer.clear();
    if (this.visible()) {
      this.icons.map((f) => {
        this.warniconlayer.addFeature(f);
        return f;
      });
      WRAP.Geo.invalidate();
    }
  }

  setLayerTooltip() {
    this.setTooltip((geo) => {
      if (geo && geo.properties) {
        return geo.properties.name;
      }
      return null;
    });
  }
  fmtinfo(arr, tailstr) {
    let rst = '';
    if (this.warnrankmaster && arr && arr.length > 0) {
      arr.map((code) => {
        let codestr = code;
        if (parseInt(code, 10) < 10) {
          codestr = `0${code}`;
        }
        const info = this.warnrankmaster[codestr];
        rst += `${info}・`;
        return code;
      });
      rst = rst.substr(0, rst.length - 1);
      rst += tailstr;
    }
    return rst;
  }
  static mapClickHandler() {
    if (!JmaseawarnLayer.clickInfo) {
      return;
    }
    const gtm = new Date().getTime();
    const { feature, sp, tm, layername } = JmaseawarnLayer.clickInfo;
    if (gtm - tm < 300) {
      JmaseawarnLayer.openwindow(feature, sp, layername);
    }
  }

  /* eslint no-unused-vars: ["error", { "args": "none" }]*/
  static touchHandler(layer, feature, sp) {
    if (!layer) {
      return;
    }
    const layername = layer.name();
    if (layer && (layername === 'WX_JMA_SeaWarn' || layername === 'WX_JMA_SeaForecast')
      && feature && feature.geo) {
      const tm = new Date().getTime();
      JmaseawarnLayer.clickInfo = { feature, sp, tm, layername };
    }
  }
  static openwindow(feature, sp, layername) {
    const elem = document.elementFromPoint(sp.x, sp.y);
    const event = document.createEvent('MouseEvents');
    event.initEvent('mouseup', true, true);
    elem.dispatchEvent(event);
    let pcode = null;
    let baseurl;
    let type;
    const wraprank = feature.data.wrap_rank;
    const ptname = feature.geo.properties.name;
    const code = feature.geo.properties.code;
    if (!JmaseawarnLayer.warntextbaseurl) {
      JmaseawarnLayer.warntextbaseurl = `${WrapController.dhkeyoption.baseurl}/WRAP/wrap-pri/data/WX_JMA_SeaWarn/`;
      JmaseawarnLayer.warnforecasttextbaseurl = `${WrapController.dhkeyoption.baseurl}/WRAP/wrap-pri/data/WX_JMA_SeaForecast/`;
    }
    if (layername === 'WX_JMA_SeaWarn') {
      pcode = feature.data.parent_code;
      baseurl = JmaseawarnLayer.warntextbaseurl;
      type = 'warning';
    } else {
      pcode = feature.data.met_info_code;
      baseurl = JmaseawarnLayer.warnforecasttextbaseurl;
      type = 'forecast';
    }
    if (pcode && code) {
      JmaseawarnLayer.loadText(baseurl, code, pcode, ptname, wraprank, sp, type);
      JmaseawarnLayer.beforeLoadInfo = { baseurl, code, pcode, ptname, wraprank, sp, type };
    }
  }

  static loadText(baseurl, code, parentcode, ptname, wraprank, sp, type) {
    fetch(`${baseurl}${parentcode}/latest.json?t=${new Date().getTime()}`)
      .then(response => response.json())
      .then((json) => {
        JmaseawarnLayer.showText(json, code, parentcode, ptname, wraprank, sp, type);
      });
  }

  static showText(json, code, parentcode, ptname, wraprank, sp, type) {
    let div = JmaseawarnLayer.windowdiv;
    if (!div) {
      div = JmaseawarnLayer.createPopupWindow();
      div.style['z-index'] = 100;
      JmaseawarnLayer.windowdiv = div;
      WrapController.mapDiv.appendChild(div);
    } else {
      div.style.display = 'block';
    }
    div.visible = true;

    if (sp) {
      let spx = sp.x + 10;
      let spy = sp.y - 10;

      if (spx + div.clientWidth > div.parentNode.clientWidth) {
        spx = sp.x - div.clientWidth - 10;
      }

      if (spy + 397 > div.parentNode.clientHeight) {
        spy = (div.parentNode.clientHeight - 397);
      }

      div.style.top = `${spy}px`;
      div.style.left = `${spx}px`;
    }
    div.children[1].innerText = JmaseawarnLayer.createTitle(type, ptname);
    div.children[2].scrollTop = 0;
    div.children[2].innerHTML = JmaseawarnLayer.createShowInfo(type,
       code, parentcode, ptname, wraprank, json);
    div.style.display = 'block';
  }

  static createTitle(type, ptname) {
    const base = (type === 'forecast' ? '海上予報' : '海上警報');
    return `${base}：${ptname}`;
  }

  static createShowInfo(type, code, parentcode, ptname, wraprank, json) {
    if (type === 'warning') {
      return JmaseawarnLayer.createWarningInfo(parentcode, ptname, wraprank, json);
    }
    return JmaseawarnLayer.createForecastInfo(code, parentcode, wraprank, json);
  }

  static createWarningInfo(code, ptname, wraprank, json) {
    if (wraprank === -2) {
      return `<br/>現在、${ptname}に海上警報は発表していません。`;
    }

    let info = JmaseawarnLayer.createInfoHead(json);
    const space = '&nbsp;&nbsp;&nbsp;&nbsp;';

    if (wraprank === 0) {
      info += '<br/>';
      return `${info}海上警報解除${space}${ptname}`;
    }

    if (wraprank === -1) {
      info += '<br/>';
      return `${info}発表されていた警報の対象期間は過ぎました。`;
    }

    const headline = json.headline;
    const headlinekeys = Object.keys(headline);
    headlinekeys.map((hkey) => {
      if (hkey !== 'type') {
        const headlinearea = headline[hkey].area;
        info += `<div>${headlinearea}`;
        const headlinekinddata = headline[hkey].data;
        headlinekinddata.map((hdata) => {
          info += `${space}${hdata.kind}`;
          return hdata;
        });
        info += '</div>';
      }
      return hkey;
    });
    info += '<br/>';

    /* //WRAP_UIUX-175#comment-39057683
    let synopis = json.met_info[code].data[0].synopis[0].value;
    if (synopis) {
      synopis = synopis.replace(/\n/g, '<br/>');

      info += `<div>${synopis}</div>`;
      info += '<br/>';
    }*/

    const synopisdata = json.met_info[code].data[0].synopis;
    let synopissetflag = false;
    synopisdata.map((synopisd) => {
      let synopisvalue = synopisd.value;
      if (synopisvalue) {
        synopissetflag = true;
        synopisvalue = synopisvalue.replace(/\n/g, '<br/>');
        info += `<div>${synopisvalue}</div>`;
      }
      return synopisd;
    });
    if (synopissetflag) {
      info += '<br/>';
    }

    const warning = json.warning;
    const warningkeys = Object.keys(warning);

    warningkeys.map((wkey) => {
      if (wkey === 'type') {
        return wkey;
      }
      const wdatas = warning[wkey].data;
      let windsentence;
      let visibilitysentence;
      let wavesentence;
      let icingsentence;
      wdatas.map((wdata) => {
        const wdatacode = wdata.code;
        if (wdatacode === '10') {
          icingsentence = wdata.icing.sentence;
        } else if (wdatacode === '11') {
          visibilitysentence = wdata.visibility.sentence;
        } else if (wdatacode === '12') {
          wavesentence = wdata.wave_height.sentence;
        } else {
          windsentence = wdata.wind.sentence;
        }
        return wdata;
      });
      if (windsentence) {
        info += `<div>${windsentence}</div>`;
      }
      if (visibilitysentence) {
        info += `<div>${visibilitysentence}</div>`;
      }
      if (wavesentence) {
        info += `<div>${wavesentence}</div>`;
      }
      if (icingsentence) {
        info += `<div>${icingsentence}</div>`;
      }
      return wkey;
    });
    info += '<br/>';
    const { valid_date: validdate } = json.head;
    info += `<div>この警報の対象期間は${space}${WrapUtils.dateFormat(validdate, 'DD日hh時mm分', 9 * 3600)}までです</div>`;
    info += '<br/>';
    return info;
  }

  static createForecastInfo(code, parentcode, wraprank, json) {
    let info = JmaseawarnLayer.createInfoHead(json);

    if (wraprank && wraprank === -1) {
      info += '<br/>';
      return `${info}発表されていた予報の対象期間は過ぎました。`;
    }


    const { observation, forecast: forecastall, factor } = json.met_info;
    const synopsis = factor[parentcode].data[0].synopsis;

    let factorstr = '';
    synopsis.map((syobj) => {
      if (syobj.value) {
        factorstr += `<div>${syobj.value.replace(/\n/g, '<br/>')}</div>`;
      }
      return syobj;
    });
    if (factorstr !== '') {
      info += '<div>概況</div>';
      info += factorstr;
      info += '<br/>';
    }

    info += '<div>観測実況</div>';

    const observationkeys = Object.keys(observation);
    let title;
    const space = '&nbsp;&nbsp;&nbsp;&nbsp;';
    observationkeys.map((okey) => {
      const item = observation[okey];
      const { data, area } = item;
      let winddir = data[0].wind_direction.value;
      // "value" が "不定" の時と空の時は "description" を出す。
      if (!winddir || winddir === '不定') {
        winddir = data[0].wind_direction.description;
      }

      const windspd = data[0].wind_speed.description;
      // "value" に天気が入っている時はその天気を出す。天気が空の時は "description" を出す。
      let weather = data[0].weather.value;
      if (!weather) {
        weather = data[0].weather.description;
      }
      const pressure = data[0].pressure.description;
      const temperature = data[0].temperature.description;
      const visibility = data[0].visibility.description;
      if (!title) {
        title = data[0].title;
        info += `<div>${title}</div>`;
      }
      info += `<div>${area}${space}${winddir}${space}`;
      info += `${windspd}${space}${weather}${space}`;
      info += `${pressure}${space}${temperature}${space}${visibility}</div>`;
      return okey;
    });
    info += '<br/>';
    info += '<div>予報</div>';
    const warning = json.warning[code];
    const warningarea = warning.area;
    const warningdata = warning.data;

    info += `<div>${warningarea}</div>`;
    let warningkinds = '';
    warningdata.map((wd) => {
      let warningkind = wd.kind;
      if (!warningkind) {
        warningkind = wd.status;
      }
      if (warningkinds !== '') {
        warningkinds += space + warningkind;
      } else {
        warningkinds = warningkind;
      }
      return wd;
    });

    info += `<div>${warningkinds}</div>`;
    const forecast = forecastall[code];
    const forecastdata = forecast.data;
    let [
      tdwind,
      tdweather,
      tdice,
      tdvisibility,
      tdwave,
      tmwind,
      tmweather,
      tmice,
      tmvisibility,
      tmwave,
    ] = ['', '', '', '', '', '', '', ''];

    forecastdata.map((fd) => {
      const { visibility, sea_ice: ice, weather, wave_height: wave, wind } = fd;
      if (fd.title === '今日') {
        if (visibility) {
          tdvisibility = visibility.sentence;
        }
        if (weather) {
          tdweather = weather.sentence;
        }
        if (ice) {
          tdice = ice.sentence;
        }
        if (wave) {
          tdwave = wave.sentence;
        }
        if (wind) {
          tdwind = wind.sentence;
        }
      } else {
        if (visibility) {
          tmvisibility = visibility.sentence;
        }
        if (weather) {
          tmweather = weather.sentence;
        }
        if (ice) {
          tmice = ice.sentence;
        }
        if (wave) {
          tmwave = wave.sentence;
        }
        if (wind) {
          tmwind = wind.sentence;
        }
      }
      return fd;
    });
    info += JmaseawarnLayer.createForecastTT(tdwind, tdweather, tdice, tdvisibility, tdwave, '今日');
    info += JmaseawarnLayer.createForecastTT(tmwind, tmweather, tmice, tmvisibility, tmwave, '明日');
    return info;
  }

  static createForecastTT(wind, weather, ice, visibility, wave, type) {
    let info = '<br/>';
    const space = '&nbsp;&nbsp;&nbsp;&nbsp;';
    if (wind !== '' ||
      weather !== '' ||
      ice !== '' ||
      visibility !== '' ||
      wave !== '') {
      info += `<div>${type}</div>`;
    }
    if (wind !== '') {
      info += `<div>風${space}${wind}</div>`;
    }
    if (weather !== '') {
      info += `<div>天気${space}${weather}</div>`;
    }
    if (visibility !== '') {
      info += `<div>視程${space}${visibility}</div>`;
    }
    if (wave !== '') {
      info += `<div>波${space}${wave}</div>`;
    }
    if (ice !== '') {
      info += `<div>流氷${space}${ice}</div>`;
    }
    return info;
  }

  static createInfoHead(json) {
    let info = '';
    const {
      title,
      report_date: reportdate,
      info_type: infotype } = json.head;
    const datefmt = WrapUtils.dateFormat(reportdate, 'DD日hh時mm分', 9 * 3600);
    info = `<div>${title}</div>`;
    info += `<div>${datefmt}${infotype}</div>`;
    info += '<br/>';

    return info;
  }

  static createPopupWindow() {
    const div = document.createElement('div');
    div.className = popupcss.popupwindow;
    const clsbt = document.createElement('button');
    clsbt.className = `${popupcss.popupbutton} ${popupcss.camera_close}`;
    div.appendChild(clsbt);

    const titlediv = document.createElement('div');
    titlediv.className = popupcss.popuptitle;
    div.appendChild(titlediv);

    const infodiv = document.createElement('div');
    infodiv.className = popupcss.popupcontentbody;
    div.appendChild(infodiv);

    clsbt.onclick = () => {
      div.style.display = 'none';
      div.visible = false;
      JmaseawarnLayer.beforeLoadInfo = null;
    };
    let [dragging, dragx, dragy, offsetx, offsety] = [false, 0, 0, 0, 0];
    div.onmousedown = (evt) => {
      dragging = true;
      dragx = div.style.left.replace(/px/, '');
      dragy = div.style.top.replace(/px/, '');
      offsetx = evt.clientX - dragx;
      offsety = evt.clientY - dragy;
      evt.preventDefault();
      evt.stopPropagation();
    };

    div.onmouseup = (evt) => {
      dragging = false;
      evt.preventDefault();
      evt.stopPropagation();
    };

    WRAP.Geo.addEventHandler('mousemove', (evt) => {
      if (dragging) {
        const x = evt.clientX - offsetx;
        const y = evt.clientY - offsety;
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
      }
      evt.preventDefault();
      evt.stopPropagation();
    });
    return div;
  }
  ctrlLayer(type, state) {
    const { showtype, jmaseawarnChecked } = state.jmaseawarn;
    if (type === JMASEAWARN_CLICK ||
        type === JMASEAWARN_SHOWTYPE_CHANGE) {
      this.warniconlayer.setVisible(jmaseawarnChecked && showtype === 'warning');
      this.setVisible(jmaseawarnChecked && showtype === 'warning');
      if ((!jmaseawarnChecked || type === JMASEAWARN_SHOWTYPE_CHANGE) &&
          JmaseawarnLayer.windowdiv) {
        JmaseawarnLayer.windowdiv.style.display = 'none';
        JmaseawarnLayer.windowdiv.visible = false;
        JmaseawarnLayer.beforeLoadInfo = null;
      }
      this.showWarnIcon();
    }
  }
}

export default JmaseawarnLayer;
