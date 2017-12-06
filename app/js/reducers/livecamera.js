import { handleActions } from 'redux-actions';
import { LIVE_CAMERA_CLICK } from '../constants/livecamera/ActionTypes';

const initialState = {
  liveCmChecked: true,
};

export default handleActions({
  [LIVE_CAMERA_CLICK]: (state, action) => ({
    ...state,
    liveCmChecked: action.payload.checked,
  }),
}, initialState);
