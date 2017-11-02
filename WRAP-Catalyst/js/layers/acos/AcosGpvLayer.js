import WRAP from 'WRAP';
import WrapLayer from 'WRAP/UI/WrapLayer';
import {
  ACOS_SHOW_CLICK,
  ACOS_TIMELIST,
} from '../../constants/acos/ActionTypes';
/* eslint-disable camelcase */
import {
  VolcanicRank,
  VolcanicAsh_GPV,
} from '../LayerConfig';

class AcosGpvLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.dispatchAction = conf.dispatchAction;
    const dhdata = this.dhData;
    const targetLayer = [VolcanicRank.layerName, VolcanicAsh_GPV.layerName];
    if (dhdata) {
      // dhdata.inspect に、データ更新で行いたい処理を書く
      dhdata.inspect((ref) => {
        const timelist = ref.query('index').value();
        if (timelist) {
          this.dispatchAction(ACOS_TIMELIST, { timelist }, targetLayer);
        }
      }, true);
    }
    this.setAcosGpvTooltip();
  }
  setAcosGpvTooltip() {
    this.setTooltip((geo) => {
      const prop = geo.properties;
      if (prop) {
        const ft = prop.ft;
        const fl = prop.fl.replace('FL', '');
        const vt = (new WRAP.Core.DateTime(prop.validtime)).text('(MM/DD hh:mmZ)');
        if (fl === 'ALL') {
          return `FT=${ft}<br/>${vt}`;
        }
        return `FT=${ft} FL=${fl}<br/>${vt}`;
      }
      return null;
    });
  }
  ctrlLayer(type, state) {
    const {
      showchecked,
      targetPoint,
      basetime,
      gpvtimelist,
      validtimelist,
      valididx,
      validall,
      fl,
    } = state.acos;
    if (showchecked && validtimelist && validtimelist.length > 0) {
      const basetimewrap = new WRAP.Core.DateTime(basetime);
      let ftarr = [];
      const allft = [3, 6, 9, 12, 18, 24];

      if (!validall) {
        const validtime = validtimelist[valididx];
        const validwrapdate = new WRAP.Core.DateTime(validtime);
        const datediff = basetimewrap.diff(validwrapdate);
        const h = parseInt(datediff / (60 * 60), 10);
        // if (allft.indexOf(h) > -1) {
        ftarr.push(h);
        // }
        // console.log('validtime h----------', validtime, h);
      } else {
        ftarr = allft;
      }
      const points = Object.keys(gpvtimelist);
      const contents = [];
      points.map((pt) => {
        const ptlist = gpvtimelist[pt];
        if (!ptlist || ptlist.length === 0) {
          return pt;
        }
        if (pt === targetPoint) {
          const targettm = ptlist.filter(tobj => (tobj.erupted_date === basetime));
          if (!targettm || targettm.length < 1) {
            // gpv timelist に対象erupted_dateない場合、clear処理
            contents.push({ id: targetPoint });
          } else if (ftarr.length > 0) {
            const content = {
              id: targetPoint,
              level: fl,
              ft: ftarr,
              basetime,
            };
            contents.push(content);
          }
        } else {
          const ptbasetime = ptlist[0].erupted_date;
          const content = {
            id: pt,
            level: fl,
            ft: ftarr,
            basetime: ptbasetime,
          };
          // console.log('content other------------  ', content);
          contents.push(content);
        }
        return pt;
      });
      // console.log('contents------------  ', contents);
      this.set(contents);
    }
    if (type === ACOS_SHOW_CLICK) {
      this.setVisible(showchecked);
    }
  }
}
export default AcosGpvLayer;
