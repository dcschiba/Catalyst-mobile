import { handleActions } from 'redux-actions';
import { LAYER_INITIALIZE } from '../constants/ActionTypes';

// 初期化未実装のコンテンツは、trueにしておく
const initialState = {
  gfs: false,
  radar: false,
  amedas: false,
  jp10ten: false,
  jmawarn: false,
  hilofront: false,
  lightning: false,
  waveblend: false,
  livecamera: false,
  compasshour: false,
  disasterreport: false,
};

export default handleActions({
  [LAYER_INITIALIZE]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
}, initialState);
