import { handleActions } from 'redux-actions';
import {
  METAR_CLICK,
} from '../constants/metar/ActionTypes';
import {
  TAF_CLICK,
} from '../constants/taf/ActionTypes';

const initialState = {
};

export default handleActions({
  [METAR_CLICK]: state => ({
    ...state,
  }),
  [TAF_CLICK]: state => ({
    ...state,
  }),
}, initialState);
