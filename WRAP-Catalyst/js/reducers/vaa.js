import { handleActions } from 'redux-actions';
import {
  VAA_CLICK,
  VAA_INITIALIZE,
} from '../constants/vaa/ActionTypes';

const initialState = {
  data: {},
  vaaChecked: false,
};

export default handleActions({
  [VAA_CLICK]: (state, action) => ({
    ...state,
    vaaChecked: action.payload.checked,
  }),
  [VAA_INITIALIZE]: state => ({
    ...state,
    ...initialState,
  }),
}, initialState);
