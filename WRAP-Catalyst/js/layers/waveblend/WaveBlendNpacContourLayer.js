import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapUtils from '../../common/utils/WrapUtils';
import {
  WAVE_BLEND_CLICK,
  WAVE_BLEND_LOWRESO_CLICK,
  WAVE_BLEND_NPAC_CLICK,
  WAVE_BLEND_NATL_CLICK,
  WAVE_BLEND_SEASIA_CLICK,
  WAVE_BLEND_ARROW_CLICK,
  WAVE_BLEND_CONTOUR_CLICK,
  WAVE_BLEND_FLAT_CLICK,
  WAVE_BLEND_TIMELIST } from '../../constants/waveblend/ActionTypes';

class WaveBlendNpacContourLayer extends WrapLayer {
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

      this.dispathfunc(WAVE_BLEND_TIMELIST, { basetime,
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
    if (
      type === WAVE_BLEND_ARROW_CLICK ||
      type === WAVE_BLEND_FLAT_CLICK ||
      type === WAVE_BLEND_LOWRESO_CLICK ||
      type === WAVE_BLEND_NATL_CLICK ||
      type === WAVE_BLEND_SEASIA_CLICK
    ) {
      return;
    }
    const { waveBlendChecked,
            waveBlendContourChecked,
            waveBlendNpacChecked,
            basetimeidx,
            validtimeidx } = state.waveblend;
    const enabled = waveBlendChecked && waveBlendContourChecked && waveBlendNpacChecked;
    if (enabled) {
      this.setContent(
        {
          element: 'HTSGW',
        },
        basetimeidx,
        validtimeidx,
      );
    }
    if (
      type === WAVE_BLEND_CLICK ||
      type === WAVE_BLEND_CONTOUR_CLICK ||
      type === WAVE_BLEND_NPAC_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default WaveBlendNpacContourLayer;
