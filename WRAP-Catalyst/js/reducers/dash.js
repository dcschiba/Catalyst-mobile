import { handleActions } from 'redux-actions';
import {
  DASH_CLICK,
  DANGER_CLICK,
  SEVERE_CLICK,
  HEAVY_CLICK,
  DASH_BASETIME_CHANGE,
  DASH_VALIDTIME_CHANGE,
  DASH_TIMELIST,
} from '../constants/dash/ActionTypes';

const initialState = {
  data: {},
  dashChecked: false,
  dangerChecked: true,
  severeChecked: true,
  heavyChecked: true,
  subDisabled: { disabled: true },
  basetimeidx: 0,
  validtimeidx: 0,
  basetime: [],
  tsobj: {},
};

export default handleActions({
  [DASH_CLICK]: (state, action) => ({
    ...state,
    dashChecked: action.payload.checked,
    subDisabled: { disabled: !action.payload.checked },
  }),
  [DANGER_CLICK]: (state, action) => ({
    ...state,
    dangerChecked: action.payload.checked,
  }),
  [SEVERE_CLICK]: (state, action) => ({
    ...state,
    severeChecked: action.payload.checked,
  }),
  [HEAVY_CLICK]: (state, action) => ({
    ...state,
    heavyChecked: action.payload.checked,
  }),
  [DASH_BASETIME_CHANGE]: (state, action) => ({
    ...state,
    basetimeidx: action.payload.value,
    validtimeidx: 0,
  }),
  [DASH_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    validtimeidx: action.payload.value,
  }),
  [DASH_TIMELIST]: (state, action) => ({
    ...state,
    ...action.payload.data,
  }),
}, initialState);
