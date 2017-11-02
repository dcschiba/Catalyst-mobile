import WrapLayer from 'WRAP/UI/WrapLayer';
import {
  SIGWX_CLICK,
  SIGWX_CHANGE,
} from '../../constants/sigwx/ActionTypes';

class SigwxLayer extends WrapLayer {
  ctrlLayer(type, state) {
    if (type !== SIGWX_CLICK && type !== SIGWX_CHANGE) {
      return;
    }
    const { sigwx } = state.sigwx;
    if (sigwx.sigwxChecked && this.name() === sigwx.beforeSigwxSelectValue) {
      this.setVisible(false);
    }
    if (this.name() === sigwx.sigwxSelectValue) {
      this.setVisible(sigwx.sigwxChecked);
    }
  }
}

export default SigwxLayer;
