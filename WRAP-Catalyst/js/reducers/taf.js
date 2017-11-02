import { handleActions } from 'redux-actions';
import {
  TAF_CLICK,
} from '../constants/taf/ActionTypes';

const initialState = {
  data: {},
  tafChecked: false,
};

export default handleActions({
  [TAF_CLICK]: (state, action) => ({
    ...state,
    tafChecked: action.payload.checked,
  }),
}, initialState);
