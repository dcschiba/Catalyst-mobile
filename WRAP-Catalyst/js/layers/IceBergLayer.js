import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapUtils from '../common/utils/WrapUtils';
import {
  ICE_BERG_THRESHOLD_CHANGE,
  ICE_BERG_TIMELIST,
} from '../constants/iceberg/ActionTypes';

class IceBergLayer extends WrapLayer {
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

      this.dispathfunc(ICE_BERG_TIMELIST, { basetime,
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
    const { iceberg } = state;

    if (iceberg.iceBergChecked) {
      this.setContent(
        {
          element: 'ICEBRG',
          level: '000',
        },
        iceberg.basetimeidx,
        iceberg.validtimeidx,
      );

      if (type === ICE_BERG_THRESHOLD_CHANGE) {
        const layerconf = this.layerConf;
        const Attributes = layerconf.Attributes;
        const palette = Attributes.style.default.palette;

        const newAttributes = {
          style: {
            default: {
              fill_type: 'block',
              palette: [],
            },
          },
        };

        palette.every((p) => {
          if (p.value >= iceberg.threshold) {
            newAttributes.style.default.palette.push(p);
          }
          return p;
        });

        this.setAttributes(newAttributes);
      }
    }
    this.setVisible(iceberg.iceBergChecked);
  }
}

export default IceBergLayer;
