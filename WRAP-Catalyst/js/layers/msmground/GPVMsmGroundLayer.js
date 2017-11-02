import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapUtils from '../../common/utils/WrapUtils';
import { GPV_MSMGROUND_TIMELIST } from '../../constants/msmground/ActionTypes';

class GPVMsmGroundLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    if (!this.timeRange) {
      this.timeRange = {};
      this.dispatchAction = conf.dispatchAction;
      this.dhData.inspect((ref) => {
        const timelist = ref.query('timelist').value();
        this.gpvDataInspect(timelist);
      });
    }
  }

  gpvDataInspect(timelist) {
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
    this.dispatchAction(GPV_MSMGROUND_TIMELIST,
      { basetime, tsobj, basetimeidx: 0, validtimeidx: 0 });
  }

  setContent(f, basetimdidx, validtimeidx) {
    const basetime = this.timeRange.basetime[basetimdidx];
    const validtimelist = this.timeRange.tsobj[basetime];
    this.set({
      ...f,
      basetime: validtimelist[basetimdidx].basetime,
      validtime: validtimelist[validtimeidx].validtime,
    });
  }
}

export default GPVMsmGroundLayer;
