import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapUtils from '../../common/utils/WrapUtils';
import {
  HOURLYANALYSIS_CLICK,
  HOURLYANALYSIS_TMP_CLICK,
  HOURLYANALYSIS_WIND_CLICK,
  HOURLYANALYSIS_TIMELIST,
 } from '../../constants/gpvhourlyAnalysis/ActionTypes';

/* eslint-disable camelcase */
import {
  JP_GPV_HourlyAnalysis_Wind,
  JP_GPV_HourlyAnalysis_Tmp } from '../../layers/LayerConfig';

class GpvhourlyAnalysisWindLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    GpvhourlyAnalysisWindLayer.timeRange = {};
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
      GpvhourlyAnalysisWindLayer.timeRange = { basetime, tsobj };

      this.dispathfunc(HOURLYANALYSIS_TIMELIST, { basetime,
        tsobj,
        basetimeidx: 0,
        validtimeidx: 0 },
        [JP_GPV_HourlyAnalysis_Wind.layerName, JP_GPV_HourlyAnalysis_Tmp.layerName]);
    }
  }

  setContent(f, basetimdidx, validtimeidx) {
    const basetime = GpvhourlyAnalysisWindLayer.timeRange.basetime[basetimdidx];
    const validtimelist = GpvhourlyAnalysisWindLayer.timeRange.tsobj[basetime];
    if (validtimelist && validtimeidx < validtimelist.length) {
      this.set({
        ...f,
        basetime: validtimelist[validtimeidx].basetime,
        validtime: validtimelist[validtimeidx].validtime,
      });
    }
  }

  ctrlLayer(type, state) {
    if (type === HOURLYANALYSIS_TMP_CLICK) {
      return;
    }
    const { hourlyAnalysisChecked,
            windChecked,
            level,
            basetimeidx,
            validtimeidx } = state.gpvhourlyAnalysis;
    const enabled = hourlyAnalysisChecked && windChecked;
    if (enabled) {
      this.setContent(
        { element: ['UGRD', 'VGRD'], level },
        basetimeidx,
        validtimeidx,
      );
    }
    if (type === HOURLYANALYSIS_CLICK || type === HOURLYANALYSIS_WIND_CLICK) {
      this.setVisible(enabled);
    }
  }
}

export default GpvhourlyAnalysisWindLayer;
