import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapUtils from '../../common/utils/WrapUtils';
import { HILOFRONT_CONTOUR_CLICK,
  HILOFRONT_HILO_CLICK,
  HILOFRONT_SHOW_CLICK,
  HILOFRONT_FRONT_CLICK,
  HILOFRONT_TIMELIST,
} from '../../constants/hilofront/ActionTypes';

import {
  SurfaceAnalysisFront,
  SurfacePressureContour,
  SurfacePressureHiro,
} from '../LayerConfig';

class SurfacePressureHiroLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.targetLayer = [
      SurfaceAnalysisFront.layerName,
      SurfacePressureContour.layerName,
      SurfacePressureHiro.layerName,
    ];
    this.timeRange = {};
    this.dispatchAction = conf.dispatchAction;
    this.dhData.inspect((ref) => {
      const timelist = ref.query('timelist').value();
      this.dataInspect(timelist);
    });
  }
  dataInspect(timelist) {
    if (timelist && timelist.length) {
      const basetimelist = [];
      const bvtimeobj = {};
      for (let j = 0; j < timelist.length; j += 1) {
        const bt = timelist[j].basetime;
        const btfmt = `${WrapUtils.dateFormat(bt)}Z`;
        basetimelist.push(btfmt);
        const num = timelist[j].validtime.length;
        const tsarr = [];
        for (let i = 0; i < num; i += 1) {
          const tm = timelist[j].validtime[i];
          const ts = `${WrapUtils.dateFormat(tm)}Z`;
          const timeIndex = num - i - 1;
          tsarr[timeIndex] = { idx: timeIndex, ts, basetime: bt, validtime: tm };
        }
        bvtimeobj[btfmt] = tsarr;
      }
      this.timeRange = { basetimelist, bvtimeobj };

      this.dispatchAction(HILOFRONT_TIMELIST,
       { basetimelist, bvtimeobj, basetimeidx: 0, validtimeidx: 0 }, this.targetLayer);
    }
  }

  ctrlLayer(type, state) {
    if (type === HILOFRONT_CONTOUR_CLICK ||
       type === HILOFRONT_FRONT_CLICK) {
      return;
    }
    const {
      showchecked,
      basetimeidx,
      validtimeidx,
      hilochecked,
    } = state.hilofront;

    const hilovisible = showchecked && hilochecked;
    this.setContent({ element: 'PRMSL', level: '000' }, basetimeidx, validtimeidx);

    if (type === HILOFRONT_SHOW_CLICK || type === HILOFRONT_HILO_CLICK) {
      this.setVisible(hilovisible);
    }
  }

  setContent(f, basetimdidx, validtimeidx) {
    const basetime = this.timeRange.basetimelist[basetimdidx];
    const validtimelist = this.timeRange.bvtimeobj[basetime];
    if (validtimelist && validtimeidx < validtimelist.length) {
      this.set({
        ...f,
        basetime: validtimelist[basetimdidx].basetime,
        validtime: validtimelist[validtimeidx].validtime,
      });
    }
  }
}

export default SurfacePressureHiroLayer;
