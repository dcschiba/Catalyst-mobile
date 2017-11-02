import SigwxPastLayer from './SigwxPastLayer';
import {
  US_HIGH_CLICK,
  US_HIGH_BASETIME_CHANGE,
  US_HIGH_VALIDTIME_CHANGE,
  SIGWX_US_HIGHT_PAST_TIMELIST,
} from '../../constants/sigwx/ActionTypes';

class SigwxUsHighPastLayer extends SigwxPastLayer {
  ctrlLayer(type, state) {
    if (type !== US_HIGH_CLICK &&
      type !== US_HIGH_BASETIME_CHANGE &&
      type !== US_HIGH_VALIDTIME_CHANGE &&
      type !== SIGWX_US_HIGHT_PAST_TIMELIST) {
      return;
    }
    const { ushighchecked, basetimeidx, validtimeidx } = state.sigwx.ushighpast;
    if (ushighchecked) {
      this.setContent(
        basetimeidx,
        validtimeidx,
      );
    }
    if (type === US_HIGH_CLICK) {
      this.setVisible(ushighchecked);
    }
  }
}

export default SigwxUsHighPastLayer;
