import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapUtils from '../common/utils/WrapUtils';
import { WIND_BARBS_TIMELIST } from '../constants/windbarbs/ActionTypes';

class WindBarbsLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.timeRange = {};
    this.dispathfunc = conf.dispatchAction;
    this.dhData.inspect((ref) => {
      const timelist = ref.query('timelist').value();
      this.dataInspect(timelist);
    });
    this.setWindBarbsTooltip();
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

      this.dispathfunc(WIND_BARBS_TIMELIST, { basetime,
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

  setWindBarbsTooltip() {
    this.setTooltip((geo) => {
      const p = geo && geo.properties;
      if (p) {
        return `${p.direction_text}/${p.speed_text}`;
      }
      return null;
    });
  }

  ctrlLayer(type, state) {
    const { windbarbs } = state;
    if (windbarbs.windBarbsChecked) {
      this.setContent(
        { element: ['UGRD', 'VGRD'] },
        windbarbs.basetimeidx,
        windbarbs.validtimeidx,
      );
      this.setAttributes({ threshold: windbarbs.threshold });
    }
    this.setVisible(windbarbs.windBarbsChecked);
  }
}

export default WindBarbsLayer;
