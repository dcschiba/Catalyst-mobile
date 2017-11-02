import { handleActions } from 'redux-actions';
import {
  FIR_CLICK,
  FIR_INITIALIZE,
} from '../constants/fir/ActionTypes';

const initialState = {
  data: {},
  firChecked: false,
};

export default handleActions({
  [FIR_CLICK]: (state, action) => ({
    ...state,
    firChecked: action.payload.checked,
  }),
  [FIR_INITIALIZE]: state => ({
    ...state,
    ...initialState,
  }),
}, initialState);
