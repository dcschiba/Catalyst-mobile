import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapUtils from '../../common/utils/WrapUtils';
import {
  JMASEAWARN_CLICK,
  JMASEAWARN_SHOWTYPE_CHANGE,
  JMASEAWARNFORECAST_ANNOUNCED_DATE } from '../../constants/jmaseawarn/ActionTypes';

class JmaseaforecastLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.dispatchAction = conf.dispatchAction;
    this.dhData.inspect((ref) => {
      if (ref) {
        const data = ref.query('data.data').value();
        if (data && data.announced_date) {
          this.dispatchAction(JMASEAWARNFORECAST_ANNOUNCED_DATE,
            { ann: WrapUtils.dateFormat(data.announced_date, 'YYYY/MM/DD hh:mm', 9 * 3600) });
        }
      }
    }, true);
    this.setLayerTooltip();
  }
  setLayerTooltip() {
    this.setTooltip((geo) => {
      if (geo && geo.properties) {
        return geo.properties.name;
      }
      return null;
    });
  }
  ctrlLayer(type, state) {
    const { showtype, jmaseawarnChecked } = state.jmaseawarn;
    if (type === JMASEAWARN_CLICK ||
    type === JMASEAWARN_SHOWTYPE_CHANGE) {
      this.setVisible(jmaseawarnChecked && showtype === 'forecast');
    }
  }
}

export default JmaseaforecastLayer;
