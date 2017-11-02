import SigwxPastLayer from './SigwxPastLayer';
import {
  UK_MIDDLE_CLICK,
  UK_MIDDLE_BASETIME_CHANGE,
  UK_MIDDLE_VALIDTIME_CHANGE,
  SIGWX_UK_MIDDLE_PAST_TIMELIST,
} from '../../constants/sigwx/ActionTypes';

class SigwxUkMiddlePastLayer extends SigwxPastLayer {
  ctrlLayer(type, state) {
    if (type !== UK_MIDDLE_CLICK &&
      type !== UK_MIDDLE_BASETIME_CHANGE &&
      type !== UK_MIDDLE_VALIDTIME_CHANGE &&
      type !== SIGWX_UK_MIDDLE_PAST_TIMELIST) {
      return;
    }
    const { ukmiddlechecked, basetimeidx, validtimeidx } = state.sigwx.ukmiddlepast;
    if (ukmiddlechecked) {
      this.setContent(
        basetimeidx,
        validtimeidx,
      );
    }
    if (type === UK_MIDDLE_CLICK) {
      this.setVisible(ukmiddlechecked);
    }
  }
}

export default SigwxUkMiddlePastLayer;
