import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapUtils from '../common/utils/WrapUtils';
import {
  SURFACE_PRESSURE_CLICK,
  SURFACE_PRESSURE_TIMELIST } from '../constants/surfacepressure/ActionTypes';

class SurfacePressureLayer extends WrapLayer {
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

      this.dispathfunc(SURFACE_PRESSURE_TIMELIST, { basetime,
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
    const { surfacepressure } = state;
    if (surfacepressure.surfacePressureChecked) {
      this.setContent(
        {
          element: 'PRMSL',
          level: '000',
        },
        surfacepressure.basetimeidx,
        surfacepressure.validtimeidx,
      );
    }
    if (type === SURFACE_PRESSURE_CLICK) {
      this.setVisible(surfacepressure.surfacePressureChecked);
    }
  }
}

export default SurfacePressureLayer;
