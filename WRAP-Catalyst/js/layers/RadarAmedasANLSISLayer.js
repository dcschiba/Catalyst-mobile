import WRAP from 'WRAP';
import WrapLayer from 'WRAP/UI/WrapLayer';
import { RADARAMEDAS_VALIDTIME } from '../constants/radaramedas/ActionTypes';

class RadarAmedasANLSISLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.dispatchAction = conf.dispatchAction;
    this.dhData.inspect((ref) => {
      const validtime = ref.query('validtime').value();
      this.radaramedasDataInspect(validtime);
    });
  }
  radaramedasDataInspect(validtime) {
    if (validtime && validtime.length) {
      const selection = [];
      const latestt = validtime[0];
      for (let i = 6; i >= 1; i -= 1) {
        const vt = new WRAP.Core.DateTime(latestt);
        vt.add(i * 60 * 60);
        selection.push(vt.text());
      }
      validtime.forEach((at) => {
        selection.push(at);
      });
      this.dispatchAction(RADARAMEDAS_VALIDTIME, { validtime: selection }, ['RadarAmedas_ANLSIS', 'RadarAmedas_NOWCAST']);
    }
  }

  ctrlLayer(type, state) {
    const {
      radaramedasChecked,
      anlsisSelected,
      validtime,
    } = state.radaramedas.radaramedas;

    this.set({ validtime });
    this.setVisible(radaramedasChecked && anlsisSelected);
  }
}
export default RadarAmedasANLSISLayer;
