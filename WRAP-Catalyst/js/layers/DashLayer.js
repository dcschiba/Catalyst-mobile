import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapUtils from '../common/utils/WrapUtils';
import {
  DASH_TIMELIST,
  DANGER_CLICK,
  SEVERE_CLICK,
  HEAVY_CLICK,
} from '../constants/dash/ActionTypes';

class DashLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.timeRange = {};
    this.dispathfunc = conf.dispatchAction;
    this.dhData.inspect((ref) => {
      const timelist = ref.query('timelist').value();
      this.dataInspect(timelist);
    });
  }

  dataInspect(timelist) {
    if (timelist && timelist.length) {
      const basetime = [];
      const tsobj = {};
      for (let j = 0; j < timelist.length; j += 1) {
        const bt = timelist[j].basetime;
        const btfmt = `${WrapUtils.dateFormat(bt)}Z`;
        basetime.push(btfmt);
        const num = timelist[j].validtime.length;
        const tsarr = [];
        for (let i = 0; i < num; i += 1) {
          const tm = timelist[j].validtime[i];
          const ts = `${WrapUtils.dateFormat(tm)}Z`;
          const timeIndex = num - i - 1;
          tsarr[timeIndex] = { idx: timeIndex, ts, basetime: bt, validtime: tm };
        }
        tsobj[btfmt] = tsarr;
      }
      this.timeRange = { basetime, tsobj };

      this.dispathfunc(DASH_TIMELIST, { basetime,
        tsobj,
        basetimeidx: 0,
        validtimeidx: 0 },
        this.name());
    }
  }

  setContent(basetimdidx, validtimeidx) {
    const basetime = this.timeRange.basetime[basetimdidx];
    const validtimelist = this.timeRange.tsobj[basetime];
    if (validtimelist && validtimeidx < validtimelist.length) {
      this.set({
        basetime: validtimelist[validtimeidx].basetime,
        validtime: validtimelist[validtimeidx].validtime,
      });
    }
  }

  ctrlLayer(type, state) {
    const { dash } = state;

    if (dash.dashChecked) {
      this.setContent(
        dash.basetimeidx,
        dash.validtimeidx,
      );
    }

    if (type === DANGER_CLICK || type === SEVERE_CLICK || type === HEAVY_CLICK) {
      const dhDataRoot = this.dhData.query('data').value();
      if (dhDataRoot && dhDataRoot.features) {
        const dhDataFeatures = dhDataRoot.features;
        dhDataFeatures.every((feature) => {
          const dashProp = feature.properties;
          if (dash.heavyChecked && dashProp.scale === 'H') {
            dashProp.display_flag = true;
          } else if (dash.severeChecked && dashProp.scale === 'S') {
            dashProp.display_flag = true;
          } else if (dash.dangerChecked && dashProp.scale === 'DA') {
            dashProp.display_flag = true;
          } else {
            dashProp.display_flag = false;
          }
          return feature;
        });
      }
      this.invalidate();
    } else {
      this.setVisible(dash.dashChecked);
    }
  }
}

export default DashLayer;
