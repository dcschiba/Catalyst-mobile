import { handleActions } from 'redux-actions';
import {
  METAR_CLICK,
} from '../constants/metar/ActionTypes';

const initialState = {
  data: {},
  metarChecked: false,
};

export default handleActions({
  [METAR_CLICK]: (state, action) => ({
    ...state,
    metarChecked: action.payload.checked,
  }),
}, initialState);
