import SigwxPastLayer from './SigwxPastLayer';
import {
  UK_HIGH_CLICK,
  UK_HIGH_BASETIME_CHANGE,
  UK_HIGH_VALIDTIME_CHANGE,
  SIGWX_UK_HIGHT_PAST_TIMELIST,
} from '../../constants/sigwx/ActionTypes';

class SigwxUkHighPastLayer extends SigwxPastLayer {
  ctrlLayer(type, state) {
    if (type !== UK_HIGH_CLICK &&
      type !== UK_HIGH_BASETIME_CHANGE &&
      type !== UK_HIGH_VALIDTIME_CHANGE &&
      type !== SIGWX_UK_HIGHT_PAST_TIMELIST) {
      return;
    }
    const { ukhighchecked, basetimeidx, validtimeidx } = state.sigwx.ukhighpast;
    if (ukhighchecked) {
      this.setContent(
        basetimeidx,
        validtimeidx,
      );
    }
    if (type === UK_HIGH_CLICK) {
      this.setVisible(ukhighchecked);
    }
  }
}

export default SigwxUkHighPastLayer;
