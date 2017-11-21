import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapController from 'WRAP/UI/WrapController';
import { HILOFRONT_CONTOUR_CLICK,
  HILOFRONT_HILO_CLICK,
  HILOFRONT_SHOW_CLICK,
  HILOFRONT_FRONT_CLICK,
} from '../../constants/hilofront/ActionTypes';

class SurfacePressureContourLayer extends WrapLayer {
  ctrlLayer(type, state) {
    if (type === HILOFRONT_HILO_CLICK ||
       type === HILOFRONT_FRONT_CLICK) {
      return;
    }
    const {
      showchecked,
      basetimeidx,
      validtimeidx,
      contourchecked,
    } = state.hilofront;

    const contourvisible = showchecked && contourchecked;
    const hilolayer = WrapController.getLayer('SurfacePressureHiro');
    this.setContent({ element: 'PRMSL', level: '000' },
      basetimeidx, validtimeidx, hilolayer.timeRange);

    if (type === HILOFRONT_SHOW_CLICK || type === HILOFRONT_CONTOUR_CLICK) {
      this.setVisible(contourvisible);
    }
  }
  setContent(f, basetimdidx, validtimeidx, timeRange) {
    const basetime = timeRange.basetimelist[basetimdidx];
    const validtimelist = timeRange.bvtimeobj[basetime];
    if (validtimelist && validtimeidx < validtimelist.length) {
      this.set({
        ...f,
        basetime: validtimelist[basetimdidx].basetime,
        validtime: validtimelist[validtimeidx].validtime,
      });
    }
  }
}

export default SurfacePressureContourLayer;
