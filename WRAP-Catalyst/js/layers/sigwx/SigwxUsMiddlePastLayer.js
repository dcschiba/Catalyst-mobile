import SigwxPastLayer from './SigwxPastLayer';
import {
  US_MIDDLE_CLICK,
  US_MIDDLE_BASETIME_CHANGE,
  US_MIDDLE_VALIDTIME_CHANGE,
  SIGWX_US_MIDDLE_PAST_TIMELIST,
} from '../../constants/sigwx/ActionTypes';

class SigwxUsMiddlePastLayer extends SigwxPastLayer {
  ctrlLayer(type, state) {
    if (type !== US_MIDDLE_CLICK &&
      type !== US_MIDDLE_BASETIME_CHANGE &&
      type !== US_MIDDLE_VALIDTIME_CHANGE &&
      type !== SIGWX_US_MIDDLE_PAST_TIMELIST) {
      return;
    }
    const { usmiddlechecked, basetimeidx, validtimeidx } = state.sigwx.usmiddlepast;
    if (usmiddlechecked) {
      this.setContent(
        basetimeidx,
        validtimeidx,
      );
    }
    if (type === US_MIDDLE_CLICK) {
      this.setVisible(usmiddlechecked);
    }
  }
}

export default SigwxUsMiddlePastLayer;
