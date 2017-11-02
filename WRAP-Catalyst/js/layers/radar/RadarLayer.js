import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapUtils from '../../common/utils/WrapUtils';
import {
  JMA_ANLSIS_PRCRIN_EXTRA,
} from '../LayerConfig';

class RadarLayer extends WrapLayer {
  constructor(conf) {
    super(conf);

    if (this.name() !== JMA_ANLSIS_PRCRIN_EXTRA.layerName) {
      this.timeRange = [];
      this.dispatchAction = conf.dispatchAction;
      this.dhData.inspect((ref) => {
        const timelist = ref.query('validtime').value();
        this.gpvDataInspect(timelist);
      });
    }
  }
  gpvDataInspect(timelist) {
    if (timelist && timelist.length) {
      const num = timelist.length;
      const tsarr = [];

      for (let i = 0; i < num; i += 1) {
        const tm = timelist[i];
        const ts = `${WrapUtils.dateFormat(tm, 'MM/DD hh:mmZ')}`;
        this.timeRange[i] = { validtime: tm };
        tsarr[i] = { idx: i, ts, tm };
      }
      this.dispatchAction(`${this.name()}_TIMELIST`, { tsarr }, this.name());
    }
  }

  setContent(validtimeidx) {
    this.set({
      validtime: this.timeRange[validtimeidx].validtime,
    });
  }
  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["ctrlLayer"] }] */
  ctrlLayer() {
  }

  mergeLayer(isChecked) {
    const idx = RadarLayer.layers.indexOf(this);
    if (isChecked) {
      if (idx === -1) {
        RadarLayer.layers.push(this);
      }
    } else if (!isChecked && idx !== -1) {
      if (idx === 0) {
        RadarLayer.layers[0].merge(null);
      }
      RadarLayer.layers.splice(idx, 1);
    }
    if (RadarLayer.layers && RadarLayer.layers.length) {
      RadarLayer.layers.sort((al, bl) => {
        if (al.layerindex > bl.layerindex) return 1;
        if (al.layerindex < bl.layerindex) return -1;
        return 0;
      });
    }
    // console.log('RadarLayer.layers----', this.name(), RadarLayer.layers);
    if (RadarLayer.layers.length > 1) {
      RadarLayer.layers[0].merge(RadarLayer.layers.slice(1, RadarLayer.layers.length));
    } else if (RadarLayer.layers.length === 1) {
      // console.log('RadarLayer.layers---- merge !!!!');
      RadarLayer.layers[0].merge(null);
    }
  }
}

RadarLayer.layers = [];

export default RadarLayer;
