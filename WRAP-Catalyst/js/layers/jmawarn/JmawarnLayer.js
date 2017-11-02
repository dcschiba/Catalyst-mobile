import WRAP from 'WRAP';
import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapController from 'WRAP/UI/WrapController';
import WrapUtils from '../../common/utils/WrapUtils';
import { JMAWARN_ANNOUNCED_DATE } from '../../constants/jmawarn/ActionTypes';

class JmawarnLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
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
    WRAP.Geo.addEventHandler('touch', JmawarnLayer.touchHandler);
    WrapController.setMapClickCallback(JmawarnLayer.mapClickHandler);
  }

  static touchHandler(layer, feature, sp) {
    if (layer && layer.name() === 'WX_JMA_Warn' && feature && feature.geo) {
      const tm = new Date().getTime();
      JmawarnLayer.clickInfo = { feature, sp, tm };
    }
  }

  static mapClickHandler() {
    if (!JmawarnLayer.clickInfo) {
      return;
    }
    const gtm = new Date().getTime();
    const { feature, tm } = JmawarnLayer.clickInfo;
    if (gtm - tm < 300) {
      JmawarnLayer.openwindow(feature);
    }
  }

  static openwindow(feature) {
    /* const elem = document.elementFromPoint(sp.x, sp.y);
    const event = document.createEvent('MouseEvents');
    event.initEvent('mouseup', true, true);
    elem.dispatchEvent(event);*/
    const code = feature.geo.properties.code;
    window.open(`https://www.yahoo.co.jp?code=${code}`, '_blank');
  }

  configureCompleted() {
    fetch(`${WrapController.dhkeyoption.apppath}/pri/conf/app/WarnRankMaster.json?t=${new Date().getTime()}`)
      .then(response => response.json())
      .then((json) => {
        this.warnrankmaster = json;
      });
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
          this.positionmaster[p.code] = p.name !== '' ? p.name : p.parent_name;
          // console.log('positiondata----', p.area_code, this.layer.positionmaster[p.area_code]);
        } else {
          console.log('positiondata has same code !!!!!!----', p.code);
        }
        return f;
      });
    }
  }
  dataInspect(data) {
    if (!data) {
      return;
    }
    const ann = data.announced_date;
    if (ann) {
      this.dispathfunc(JMAWARN_ANNOUNCED_DATE,
        { ann: WrapUtils.dateFormat(ann, 'YYYY/MM/DD hh:mm', 9 * 3600) });
    }
  }
  setLayerTooltip() {
    this.setTooltip((geo, data) => {
      const text = data.wrap_text;
      const ann = data.new_date;
      if (text && ann) {
        const annfmt = WrapUtils.dateFormat(ann, 'YYYY/MM/DD hh:mm', 9 * 3600);
        const areacode = text.area_code;
        const fukencode = text.fuken_code;
        let areaname = '-';
        const EWarnings = this.fmtinfo(text.emergency_warnings, '特別警報');
        const Warnings = this.fmtinfo(text.warnings, '警報');
        const Advisories = this.fmtinfo(text.advisories, '注意報');
        let info = '';
        if (EWarnings !== '') {
          info = EWarnings;
        }
        if (Warnings !== '') {
          info = (info === '' ? '' : `${info}<br/>`);
          info += Warnings;
        }
        if (Advisories !== '') {
          info = (info === '' ? '' : `${info}<br/>`);
          info += Advisories;
        }
        // console.log('areacode, fukencode', areacode, fukencode, geo);
        if (this.positionmaster[areacode]) {
          areaname = this.positionmaster[areacode];
        }
        if (fukencode !== areacode && this.positionmaster[fukencode]) {
          areaname = `${this.positionmaster[fukencode]} ${areaname}`;
        }
        return `${annfmt}<br/>${areaname}<br/>${info}`;
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
  ctrlLayer(type, state) {
    this.setVisible(state.jmawarn.jmawarnChecked);
  }
}

export default JmawarnLayer;
