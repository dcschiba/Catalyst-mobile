import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapUtils from '../common/utils/WrapUtils';
import {
  SEA_VISIBILITY_CLICK,
  SEA_VISIBILITY_TIMELIST } from '../constants/seavisibility/ActionTypes';

class SeaVisibilityLayer extends WrapLayer {
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

      this.dispathfunc(SEA_VISIBILITY_TIMELIST, { basetime,
        tsobj,
        basetimeidx: 0,
        validtimeidx: 0 },
        this.name());
    }
  }

  setContent(f, basetimdidx, validtimeidx) {
    const basetime = this.timeRange.basetime[basetimdidx];
    const validtimelist = this.timeRange.tsobj[basetime];
    if (validtimelist && validtimeidx < validtimelist.length) {
      this.set({
        ...f,
        basetime: validtimelist[validtimeidx].basetime,
        validtime: validtimelist[validtimeidx].validtime,
      });
    }
  }

  ctrlLayer(type, state) {
    const { seavisibility } = state;
    if (seavisibility.seaVisibilityChecked) {
      this.setContent(
        {
          element: 'VIS',
          level: '000',
        },
        seavisibility.basetimeidx,
        seavisibility.validtimeidx,
      );
    }
    if (type === SEA_VISIBILITY_CLICK) {
      this.setVisible(seavisibility.seaVisibilityChecked);
    }
  }
}

export default SeaVisibilityLayer;
