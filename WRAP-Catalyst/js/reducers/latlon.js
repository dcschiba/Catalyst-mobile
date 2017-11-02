import { handleActions } from 'redux-actions';
import {
  LATLON_CLICK,
  LATLON_INITIALIZE,
} from '../constants/latlon/ActionTypes';

const initialState = {
  data: {},
  latlonChecked: false,
};

export default handleActions({
  [LATLON_CLICK]: (state, action) => ({
    ...state,
    latlonChecked: action.payload.checked,
  }),
  [LATLON_INITIALIZE]: state => ({
    ...state,
    ...initialState,
  }),
}, initialState);
