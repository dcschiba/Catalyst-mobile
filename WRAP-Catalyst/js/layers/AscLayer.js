import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapUtils from '../common/utils/WrapUtils';
import { ASC_CLICK, ASC_TIMELIST } from '../constants/asc/ActionTypes';

class AscLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.timeRange = {
      gsm: [],
    };
    this.dispatchAction = conf.dispatchAction;
    this.dhData.inspect((ref) => {
      const timelist = ref.query('timelist').value();
      this.gpvDataInspect(timelist);
    });
  }
  gpvDataInspect(timelist) {
    if (timelist && timelist.length) {
      const it = timelist[0].issuetime;
      const bt = timelist[0].basetime;
      const issuetime = [`${WrapUtils.dateFormat(it)}Z`];
      const num = timelist[0].validtime.length;
      const tsarr = [];
      for (let i = 0; i < num; i += 1) {
        const tm = timelist[0].validtime[i];
        const ts = `${WrapUtils.dateFormat(tm)}Z`;
        const timeIndex = num - i - 1;
        this.timeRange.gsm[timeIndex] = { basetime: bt, validtime: tm };
        tsarr[timeIndex] = { idx: timeIndex, ts };
      }
      this.dispatchAction(ASC_TIMELIST, { issuetime, tsarr });
    }
  }

  ctrlLayer(type, state) {
    const { asc } = state.asc;
    const {
      ascDisabled,
      basetimeidx,
      validtimeidx,
      levelstart,
      levelend,
      turbulenceChecked,
      convectionChecked,
      icingChecked,
    } = asc;
    const ascVisible = !ascDisabled.disabled;
    const element = [];
    const baselevels = [100, 150, 200, 250, 300, 400, 500, 700, 850];
    const level = [];
    // const level = [levelstart, levelend];
    const start = Math.min(levelstart, levelend);
    const end = Math.max(levelstart, levelend);
    for (let i = 0; i < baselevels.length; i += 1) {
      const ll = baselevels[i];
      if (ll >= start && ll <= end) {
        level.push(ll);
      }
    }

    level.sort((a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    });

    if (turbulenceChecked) {
      element.push('TURB');
    }
    if (convectionChecked) {
      element.push('CONV');
    }
    if (icingChecked) {
      element.push('ICING');
    }
    if (ascVisible) {
      this.setContent({ element, level }, basetimeidx, validtimeidx);
    }

    if (type === ASC_CLICK) {
      this.setVisible(ascVisible);
    }
  }

  setContent(f, basetimdidx, validtimeidx) {
    this.set({
      ...f,
      basetime: this.timeRange.gsm[basetimdidx].basetime,
      validtime: this.timeRange.gsm[validtimeidx].validtime,
    });
  }
}

export default AscLayer;
