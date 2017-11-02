import WRAP from 'WRAP';
import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapController from 'WRAP/UI/WrapController';
import WrapUtils from '../../common/utils/WrapUtils';
import css from '../../../style/acos/layer.css';
import {
  ACOS_SHOW_CLICK,
  ACOS_TIMELIST,
  ACOS_BASETIME_CHANGE,
} from '../../constants/acos/ActionTypes';

/* eslint-disable camelcase */
import { VolcanicAsh_GPV } from '../LayerConfig';

class AcosRankLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.dispatchAction = conf.dispatchAction;

    this.windowdiv = null;
    this.shownames = [];
    this.wtmtextobj = {};
    this.pointcoordinates = {};
    this.configureLoadCompleted = false;
    this.baseUrlLoadCompleted = false;
    fetch(`./pri/conf/app/Acos.json?t=${new Date().getTime()}`)
    .then(response => response.json())
    .then((json) => {
      let VolcanicAshConcVectorUrl = json.VolcanicAshConcVector;
      VolcanicAshConcVectorUrl = VolcanicAshConcVectorUrl.replace('%baseurl%',
       WrapController.dhkeyoption.baseurl);
      this.VolcanicAshConcVectorURL = VolcanicAshConcVectorUrl;
      this.baseUrlLoadCompleted = true;
      if (this.configureLoadCompleted) {
        this.dataInspect();
      }
    });
    WRAP.Geo.addEventHandler('touch', AcosRankLayer.touchHandle);
    this.setAcosTooltip();
  }

  configureCompleted() {
    this.configureLoadCompleted = true;
    if (this.baseUrlLoadCompleted) {
      this.dataInspect();
    }
  }

  dataInspect() {
    const dhdata = this.dhData;
    let visible = false;
    if (dhdata) {
      // dhdata.inspect に、データ更新で行いたい処理を書く
      dhdata.inspect((ref) => {
        const data = ref.query('data').value();
        if (data && data.features) {
          data.features.sort((a, b) => {
            if (a.properties.index > b.properties.index) return 1;
            if (a.properties.index < b.properties.index) return -1;
            return 0;
          });
          visible = this.visible();
          this.wtextarr = [];
          data.features.map((feature) => {
            const text = feature.properties.name;
            const point = feature.geometry.coordinates;
            const wtext = new WRAP.Geo.Feature.Text({
              point,
              text,
              fillStyle: '#333',
              fontSize: 12,
              offsetY: 18,
              offsetX: 13,
              align: 'left',
            });
            if (!this.pointcoordinates[text]) {
              this.pointcoordinates[text] = point;
            }
            // console.log('wtext------', wtext);
            this.wtextarr.push(wtext);
            return feature;
          });
          if (visible) {
            this.drawFeathrueText(visible);
          }
        }
      }, true);
    }
  }

  loadAcosTextIndex() {
    fetch(`${this.VolcanicAshConcVectorURL}index.json?t=${new Date().getTime()}`)
      .then(response => response.json())
      .then((json) => {
        const index = json && json.index;
        this.shownames = Object.keys(index);
        if (this.windowdiv && this.windowdiv.visible) {
          this.loadAcosText();
        }
      });
  }

  drawFeathrueText(visible) {
    this.wtextarr.map((wxtext) => {
      if (visible) {
        this.addFeature(wxtext);
      } else {
        this.removeFeature(wxtext);
      }
      return wxtext;
    });

    if (this.wtmtextobj) {
      const ptnames = Object.keys(this.wtmtextobj);
      ptnames.map((ptname) => {
        if (this.wtmtextobj[ptname]) {
          const stf = this.wtmtextobj[ptname];
          if (visible) {
            this.addFeature(stf[0]);
            this.addFeature(stf[1]);
          } else {
            this.removeFeature(stf[0]);
            this.removeFeature(stf[1]);
          }
        }
        return ptname;
      });
    }

    WRAP.Geo.invalidate();
  }

  setAcosTooltip() {
    this.setTooltip((f) => {
      if (this.windowdiv && this.windowdiv.visible) {
        return null;
      }
      const p = f && f.properties;
      const g = f && f.geometry;
      let ft = ' --ft';
      if (g) {
        const v = g.coordinates[2];
        ft = ` ${Math.floor(v * 3.28084)}ft`;
      }
      if (p) {
        return p.name + ft;
      }
      return null;
    });
  }
  /* eslint no-param-reassign: ["error", { "props": false }]*/
  static touchHandle(layer, feature, sp) {
    if (layer && layer.name() === 'VolcanicRank') {
      const ptname = feature.geo && feature.geo.properties.name;
      if (layer.shownames.indexOf(ptname) > -1) {
        const elem = document.elementFromPoint(sp.x, sp.y);
        const event = document.createEvent('MouseEvents');
        event.initEvent('mouseup', true, true);
        elem.dispatchEvent(event);
        let wdiv = layer.windowdiv;
        if (!wdiv) {
          wdiv = layer.createPopupWindow();
          wdiv.layer = layer;
          layer.windowdiv = wdiv;
          WrapController.mapDiv.appendChild(wdiv);
        } else {
          wdiv.style.display = 'block';
        }
        wdiv.showptname = ptname;
        wdiv.visible = true;
        wdiv.style.top = `${(WrapController.mapDiv.clientHeight - 350) / 2}px`;
        wdiv.style.left = `${(WrapController.mapDiv.clientWidth - 500) / 2}px`;
        wdiv.style.display = 'block';
        layer.loadAcosText();
      }
    }
  }

  loadAcosText() {
    const wdiv = this.windowdiv;
    const ptname = wdiv.showptname;
    fetch(`${this.VolcanicAshConcVectorURL}2D/${ptname}.json?t=${new Date().getTime()}`)
    .then(response => response.json())
    .then((json) => {
      const features = json.features;
      const announcedates = [];
      const annvalidtext = {};
      features.map((f) => {
        // const issuedate = f.issued_date;
        const p = f.properties;
        const erupted = f.erupted_date;
        const loc = f.geometry.coordinates;
        const validdate = p && p.wrap_valid_date;
        if (announcedates.indexOf(erupted) === -1) {
          announcedates.push(erupted);
          annvalidtext[erupted] = { p, loc, ptname, erupted };
        }
        if (validdate) {
          if (!annvalidtext[erupted].validtimelist) {
            annvalidtext[erupted].validtimelist = [];
          }
          annvalidtext[erupted].validtimelist.push(
            { validdate, coordinates: f.geometry.coordinates },
          );
        }
        return f;
      });

      // console.log('annvalid---------', annvalidtext);
      announcedates.sort((a, b) => {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      });
      const selectann = announcedates[0];
      let selectoption = '';
      announcedates.map((ann) => {
        const datefmt = WrapUtils.dateFormat(ann, 'YYYY/MM/DD hh:mmZ');
        selectoption += `<option value=${ann}>${datefmt}</option>`;
        return ann;
      });
      wdiv.children[2].children[1].innerHTML = selectoption;
      wdiv.annvalidtext = annvalidtext;
      wdiv.children[3].innerHTML = AcosRankLayer.createText(annvalidtext[selectann], selectann);

      const point = annvalidtext[selectann].loc;
      const erupted = annvalidtext[selectann].erupted;

      this.setBaseTime(point, erupted, ptname, true);
    });
  }

  setBaseTime(pt, erupted, ptname, dispflag) {
    if (!this.gpvtimelist || !this.gpvtimelist[ptname]) {
      return;
    }
    const pttimelist = this.gpvtimelist[ptname];
    const targettm = pttimelist.filter(tobj => (tobj.erupted_date === erupted));
    if (!targettm || targettm.length < 1) {
      this.clearBasetime(ptname);
      return;
    }
    if (targettm[0].floating_ash_flag === 1) {
      this.clearBasetime(ptname);
      return;
    }

    if (dispflag) {
      this.dispatchAction(ACOS_BASETIME_CHANGE,
         { ptname, erupted }, VolcanicAsh_GPV.layerName);
    }
    let point = pt;
    if (!point) {
      point = this.pointcoordinates[ptname];
    }
    // console.log('pt, erupted, layer, ptname, dispflag', pt, erupted, ptname, dispflag);
    if (!point) {
      return;
    }
    const wymdtext = new WRAP.Geo.Feature.Text({
      point,
      text: WrapUtils.dateFormat(erupted, 'YYYY/MM/DD'),
      fillStyle: '#333',
      fontSize: 12,
      offsetY: 18,
      offsetX: -13,
      align: 'right',
    });
    const whdext = new WRAP.Geo.Feature.Text({
      point,
      text: WrapUtils.dateFormat(erupted, 'hh:mm'),
      fillStyle: '#333',
      fontSize: 12,
      offsetY: 30,
      offsetX: -35,
      align: 'right',
    });
    if (this.wtmtextobj[ptname]) {
      const stf = this.wtmtextobj[ptname];
      this.removeFeature(stf[0]);
      this.removeFeature(stf[1]);
    }

    // console.log('wtext------', wtext);
    this.addFeature(wymdtext);
    this.addFeature(whdext);
    WRAP.Geo.invalidate();
    this.wtmtextobj[ptname] = [wymdtext, whdext];
  }

  clearBasetime(ptname) {
    if (this.wtmtextobj[ptname]) {
      const stf = this.wtmtextobj[ptname];
      this.removeFeature(stf[0]);
      this.removeFeature(stf[1]);
    }
    WRAP.Geo.invalidate();
  }

  createPopupWindow() {
    console.log('createPopupWindow', this);
    const div = document.createElement('div');
    div.className = css.popupwindow;

    const titlediv = document.createElement('div');
    titlediv.className = css.titlebar;
    div.appendChild(titlediv);
    titlediv.innerHTML = 'ACOSforVA';

    const clsbt = document.createElement('button');
    clsbt.className = `${css.popupbutton} ${css.closebt}`;
    div.appendChild(clsbt);

    const selectdiv = document.createElement('div');
    selectdiv.className = css.selectdiv;
    div.appendChild(selectdiv);
    const span = document.createElement('span');
    selectdiv.appendChild(span);
    span.innerText = 'Select Announced Time ';
    const select = document.createElement('select');
    selectdiv.appendChild(select);

    const infodiv = document.createElement('div');
    infodiv.style.overflow = 'scroll';
    infodiv.style.fontSize = '9pt';
    infodiv.style.width = '493px';
    infodiv.style.height = '265px';
    div.appendChild(infodiv);

    clsbt.onclick = () => {
      div.style.display = 'none';
      div.visible = false;
    };
    let [dragging, dragx, dragy, offsetx, offsety] = [false, 0, 0, 0, 0];
    div.onmousedown = (evt) => {
      dragging = true;
      dragx = div.style.left.replace(/px/, '');
      dragy = div.style.top.replace(/px/, '');
      offsetx = evt.clientX - dragx;
      offsety = evt.clientY - dragy;
    };

    div.onmouseup = () => {
      dragging = false;
    };

    WRAP.Geo.addEventHandler('mousemove', (evt) => {
      if (dragging) {
        const x = evt.clientX - offsetx;
        const y = evt.clientY - offsety;
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
      }
      evt.preventDefault();
    });

    select.addEventListener('change', (e) => {
      const selectann = e.target.value;
      const selectobj = div.annvalidtext[selectann];
      if (selectobj) {
        infodiv.innerHTML = AcosRankLayer.createText(selectobj, selectann);
        this.setBaseTime(selectobj.loc,
         selectobj.erupted, selectobj.ptname, true);
      }
    });

    this.windowncreated = true;
    return div;
  }

  static createText(selectobj, selectann) {
    const { p, loc, ptname, erupted, validtimelist } = selectobj;
    const [lon, lat, height] = loc;

    const annwrapdate = new WRAP.Core.DateTime(selectann);

    validtimelist.sort((a, b) => {
      if (a.validdate < b.validdate) return -1;
      if (a.validdate > b.validdate) return 1;
      return 0;
    });
    // const { validdate, coordinates } = validtimelist;
    // console.log('lat, lon , height', lat, lon, height);
    const linewrap = 'margin: 0';
    let text = `Announced = ${WrapUtils.dateFormat(selectann, 'YYYY/MM/DD hhmmUTC')}`;
    text += `<p style="${linewrap}">Volcano = ${ptname}</p>`;
    text += `<p style="${linewrap}">Loc = ${WrapUtils.latlondir(lat, 'lat')}${WrapUtils.latlondir(lon, 'lon')}</p>`;
    text += `<p style="${linewrap}">Height = ${WrapUtils.metertoft(height)}</p>`;
    text += `<p style="${linewrap}">Status Code = ${p.index}</p>`;
    text += `<p style="${linewrap}">Erupted = ${WrapUtils.dateFormat(erupted, 'YYYY/MM/DD hhmmUTC')}</p>`;
    text += `<p style="${linewrap}">MAX VA Height = ${WrapUtils.metertoft(p.max_height)}</p>`;

    validtimelist.map((vt) => {
      const validdate = vt.validdate;
      const coordinate = vt.coordinates[0];
      const validwrapdate = new WRAP.Core.DateTime(validdate);
      const datediff = annwrapdate.diff(validwrapdate);
      let h = parseInt(datediff / (60 * 60), 10);
      if (h < 10) {
        h = `0${h}`;
      }
      text += `<p style="${linewrap}">FT${h}: ${WrapUtils.dateFormat(validdate, 'YYYY/MM/DD hhmmUTC')}</p><p style="${linewrap}">LVL_ALL</p><p style="${linewrap}">`;
      let i = 0;
      const clen = coordinate.length;
      coordinate.map((ll) => {
        const [vlon, vlat] = ll;
        if (i < clen - 1) {
          text += `${i === 0 ? ' ' : ' - '}${WrapUtils.latlondir(vlat, 'lat')}${WrapUtils.latlondir(vlon, 'lon')}`;
        }
        i += 1;
        return ll;
      });
      text += '</p><p> </p>';
      return vt;
    });
    return text;
  }
  ctrlLayer(type, state) {
    const {
      showchecked,
      gpvtimelist,
    } = state.acos;
    if (type === ACOS_SHOW_CLICK) {
      this.setVisible(showchecked);
      this.drawFeathrueText(showchecked);
    }
    if (type === ACOS_TIMELIST) {
      this.gpvtimelist = gpvtimelist;
      const points = Object.keys(gpvtimelist);
      points.map((pt) => {
        const ptimelist = gpvtimelist[pt];
        if (!ptimelist || ptimelist.length === 0) {
          return pt;
        }
        this.setBaseTime(null, ptimelist[0].erupted_date, pt, false);
        return pt;
      });
      this.loadAcosTextIndex();
    }
  }
}

export default AcosRankLayer;
