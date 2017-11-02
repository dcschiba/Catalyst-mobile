import WrapLayer from 'WRAP/UI/WrapLayer';

class SatelliteLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.cloudTooltipChecked = false;
    this.dispathfunc = conf.dispatchAction;
    this.dhData.inspect((ref) => {
      const validtime = ref.query('validtime').value();
      this.satelliteDataInspect(validtime);
    });
    this.setSatelliteCloudTooltip();
  }
  satelliteDataInspect(validtime) {
    if (validtime && validtime.length) {
      /* eslint no-console: ["error", { allow: ["log"] }] */
      // console.log('SatelliteLayer satelliteDataInspect', `${this.layer.name()}_VALIDTIME`);
      this.dispathfunc(`${this.name()}_VALIDTIME`, { validtime }, this.name());
    }
  }
  setSatelliteCloudTooltip() {
    this.setTooltip((geo) => {
      if (!this.cloudTooltipChecked) {
        return null;
      }
      const p = geo && geo.properties;
      if (p) {
        const v = p.data[0];
        const val = v;
        if (v > 117) {
          // 160.57217 * (Val - 117) + 60.96で、階調値をmに変換
          let v1 = 160.57217 * (val - 117);
          v1 += 60.96;
          v1 *= 3.281;// mからftに変換
          return `${Math.round(v1)}ft`;
        }
      }
      return null;
    });
  }
  ctrlLayer(type, state) {
    const layername = this.name();
    const {
      satelliteChecked,
      cloudTooltipChecked,
      before,
      validtime,
      satidx,
      sat_arr,
    } = state.satellite.satellite;
    const targetlayer = sat_arr[satidx];
    if (layername === before) {
      this.setVisible(false);
    } else if (layername === targetlayer) {
      this.cloudTooltipChecked = cloudTooltipChecked;
      this.setVisible(satelliteChecked);
      if (satelliteChecked) {
        this.set({ validtime });
      }
    }
  }
}

export default SatelliteLayer;
