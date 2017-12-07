import { handleActions } from 'redux-actions';
import { LAYER_INITIALIZE } from '../constants/ActionTypes';

// 初期化未実装のコンテンツは、trueにしておく
const initialState = {
  gfs: true,
  radar: true,
  amedas: false,
  jp10ten: false,
  jmawarn: true,
  hilofront: true,
  lightning: false,
  waveblend: true,
  livecamera: true,
  compasshour: false,
  disasterreport: true,
};

export default handleActions({
  [LAYER_INITIALIZE]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
}, initialState);
