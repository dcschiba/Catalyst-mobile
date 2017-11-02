import { handleActions } from 'redux-actions';
import { CHANGE_DATE, CHANGE_TIME, CHANGE_SCALE, CHANGE_PLAYMODE } from '../constants/playback/ActionTypes';

const initialState = {
  date: '',
  time: '',
  scale: 1.0,
  mode: 0, // 0:現在時刻モード 1:過去再現モード（再生中） 2:過去再現モード（停止中）
};

export default handleActions({
  [CHANGE_DATE]: (state, action) => ({
    ...state,
    date: action.payload.value,
  }),
  [CHANGE_TIME]: (state, action) => ({
    ...state,
    time: action.payload.value,
  }),
  [CHANGE_SCALE]: (state, action) => ({
    ...state,
    scale: action.payload.value,
  }),
  [CHANGE_PLAYMODE]: (state, action) => ({
    ...state,
    mode: action.payload.mode,
  }),
}, initialState);

