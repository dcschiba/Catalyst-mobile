import { handleActions } from 'redux-actions';
import {
  CURRENT_CLICK,
  CURRENT_BASETIME_CHANGE,
  CURRENT_VALIDTIME_CHANGE,
  CURRENT_THRESHOLD_CHANGE,
  CURRENT_TIMELIST,
} from '../constants/current/ActionTypes';

const initialState = {
  data: {},
  currentChecked: false,
  subDisabled: { disabled: true },
  basetimeidx: 0,
  validtimeidx: 0,
  threshold: 0.8,
  basetime: [],
  tsobj: {},
};

export default handleActions({
  [CURRENT_CLICK]: (state, action) => ({
    ...state,
    currentChecked: action.payload.checked,
    subDisabled: { disabled: !action.payload.checked },
  }),
  [CURRENT_BASETIME_CHANGE]: (state, action) => ({
    ...state,
    basetimeidx: action.payload.value,
    validtimeidx: 0,
  }),
  [CURRENT_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    validtimeidx: action.payload.value,
  }),
  [CURRENT_THRESHOLD_CHANGE]: (state, action) => ({
    ...state,
    threshold: action.payload.value,
  }),
  [CURRENT_TIMELIST]: (state, action) => ({
    ...state,
    ...action.payload.data,
  }),
}, initialState);
