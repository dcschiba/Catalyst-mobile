import WrapLayer from 'WRAP/UI/WrapLayer';
import GpvhourlyAnalysisWindLayer from './GpvhourlyAnalysisWindLayer';
import {
  HOURLYANALYSIS_CLICK,
  HOURLYANALYSIS_TMP_CLICK,
  HOURLYANALYSIS_WIND_CLICK,
 } from '../../constants/gpvhourlyAnalysis/ActionTypes';

class GpvhourlyAnalysisTmpLayer extends WrapLayer {
  setContent(f, basetimdidx, validtimeidx) {
    if (!GpvhourlyAnalysisWindLayer.timeRange) {
      return;
    }
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
    if (type === HOURLYANALYSIS_WIND_CLICK) {
      return;
    }
    const { hourlyAnalysisChecked,
            tmpChecked,
            level,
            basetimeidx,
            validtimeidx } = state.gpvhourlyAnalysis;
    const enabled = hourlyAnalysisChecked && tmpChecked;
    if (enabled) {
      this.setContent(
        { element: 'TMP', level },
        basetimeidx,
        validtimeidx,
      );
    }
    if (type === HOURLYANALYSIS_CLICK || type === HOURLYANALYSIS_TMP_CLICK) {
      this.setVisible(enabled);
      if (enabled) {
        this.setStyle('flat');
      }
    }
  }
}

export default GpvhourlyAnalysisTmpLayer;
