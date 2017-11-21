import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapController from 'WRAP/UI/WrapController';
import WrapUtils from '../../common/utils/WrapUtils';
import { HILOFRONT_CONTOUR_CLICK,
  HILOFRONT_HILO_CLICK,
  HILOFRONT_SHOW_CLICK,
  HILOFRONT_FRONT_CLICK,
} from '../../constants/hilofront/ActionTypes';

class SurfaceAnalysisFrontLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.timeRange = {};
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
    }
  }
  ctrlLayer(type, state) {
    if (type === HILOFRONT_CONTOUR_CLICK ||
       type === HILOFRONT_HILO_CLICK ||
       !this.timeRange.basetimelist) {
      return;
    }
    const {
      showchecked,
      basetimeidx,
      validtimeidx,
      frontchecked,
    } = state.hilofront;

    const frontvisible = showchecked && frontchecked;
    const hilolayer = WrapController.getLayer('SurfacePressureHiro');
    this.setContent(basetimeidx, validtimeidx, hilolayer.timeRange);

    if (type === HILOFRONT_SHOW_CLICK || type === HILOFRONT_FRONT_CLICK) {
      this.setVisible(frontvisible);
    }
  }
  setContent(basetimdidx, validtimeidx, dependtimeRange) {
    const basetime = dependtimeRange.basetimelist[basetimdidx];
    const validtimelist = dependtimeRange.bvtimeobj[basetime];
    if (validtimelist && validtimeidx < validtimelist.length) {
      const validtime = validtimelist[validtimeidx].validtime;

      const frontfilterbasetime = this.timeRange.basetimelist.filter(btime => btime === basetime);
      if (frontfilterbasetime && frontfilterbasetime.length > 0) {
        const frontbasetime = frontfilterbasetime[0];
        const frontvalidtimelist = this.timeRange.bvtimeobj[frontbasetime];
        const frontfiltervalidtime = frontvalidtimelist.filter(
            vitem => vitem.validtime === validtime);
        if (frontfiltervalidtime && frontfiltervalidtime.length > 0) {
          this.set({
            basetime: frontfiltervalidtime[0].basetime,
            validtime: frontfiltervalidtime[0].validtime,
          });
        }
      }
    }
  }
}

export default SurfaceAnalysisFrontLayer;
