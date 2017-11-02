import { handleActions } from 'redux-actions';
import {
  FIX_CLICK,
  FIX_COMPULSORY_CLICK,
  FIXN_CLICK,
  FIX_RNAV_CLICK,
  FIX_INITIALIZE,
} from '../constants/fix/ActionTypes';

const initialState = {
  data: {},
  fixClick: false,
  fixCompulsoryChecked: false,
  fixNChecked: false,
  fixRNAVChecked: false,
};

export default handleActions({
  [FIX_CLICK]: (state, action) => ({
    ...state,
    fixChecked: action.payload.checked,
  }),

  [FIX_COMPULSORY_CLICK]: (state, action) => ({
    ...state,
    fixCompulsoryChecked: action.payload.checked,
  }),

  [FIXN_CLICK]: (state, action) => ({
    ...state,
    fixNChecked: action.payload.checked,
  }),

  [FIX_RNAV_CLICK]: (state, action) => ({
    ...state,
    fixRNAVChecked: action.payload.checked,
  }),

  [FIX_INITIALIZE]: state => ({
    ...state,
    ...initialState,
  }),
}, initialState);
