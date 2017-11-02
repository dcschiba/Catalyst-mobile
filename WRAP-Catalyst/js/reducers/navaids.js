import { handleActions } from 'redux-actions';
import {
  NAVAIDS_CLICK,
  NAVAIDS_INITIALIZE,
} from '../constants/navaids/ActionTypes';

const initialState = {
  data: {},
  navaidsChecked: false,
};

export default handleActions({
  [NAVAIDS_CLICK]: (state, action) => ({
    ...state,
    navaidsChecked: action.payload.checked,
  }),
  [NAVAIDS_INITIALIZE]: state => ({
    ...state,
    ...initialState,
  }),
}, initialState);
