import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapUtils from '../../common/utils/WrapUtils';
import {
  GPV_GSM_TIMELIST,
  GPV_UKMET_TIMELIST,
  GPV_GFS_TIMELIST,
  GPV_MSM_TIMELIST,
} from '../../constants/gpv/ActionTypes';

class GPVLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    /* eslint-disable dot-notation */
    const dhDataName = this.dhData['_string'];
    if (!GPVLayer.timeRange[dhDataName]) {
      GPVLayer.timeRange[dhDataName] = [];
      this.dispatchAction = conf.dispatchAction;
      this.dhData.inspect((ref) => {
        const timelist = ref.query('timelist').value();
        this.gpvDataInspect(timelist);
      });
    }
  }

  gpvDataInspect(timelist) {
    if (timelist && timelist.length) {
      const bt = timelist[0].basetime;
      const basetime = [`${WrapUtils.dateFormat(bt)}Z`];
      const num = timelist[0].validtime.length;
      const tsarr = [];
      const dhDataName = this.dhData['_string'];
      for (let i = 0; i < num; i += 1) {
        const tm = timelist[0].validtime[i];
        const ts = `${WrapUtils.dateFormat(tm)}Z`;
        const timeIndex = num - i - 1;
        GPVLayer.timeRange[dhDataName][timeIndex] = { basetime: bt, validtime: tm };
        tsarr[timeIndex] = { idx: timeIndex, ts };
      }
      let type;
      switch (dhDataName) {
        case 'Model_GSM':
          type = GPV_GSM_TIMELIST;
          break;
        case 'Model_UKMET':
          type = GPV_UKMET_TIMELIST;
          break;
        case 'Model_GFS':
          type = GPV_GFS_TIMELIST;
          break;
        case 'Model_MSM':
          type = GPV_MSM_TIMELIST;
          break;
        default:
      }
      this.dispatchAction(type, { basetime, tsarr });
    }
  }

  setContent(f, basetimdidx, validtimeidx) {
    const dhDataName = this.dhData['_string'];
    this.set({
      ...f,
      basetime: GPVLayer.timeRange[dhDataName][basetimdidx].basetime,
      validtime: GPVLayer.timeRange[dhDataName][validtimeidx].validtime,
    });
  }

}

GPVLayer.timeRange = {};

export default GPVLayer;
