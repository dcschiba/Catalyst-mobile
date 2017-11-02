import { handleActions } from 'redux-actions';
import {
  SURFACE_PRESSURE_CLICK,
  SURFACE_PRESSURE_BASETIME_CHANGE,
  SURFACE_PRESSURE_VALIDTIME_CHANGE,
  SURFACE_PRESSURE_TIMELIST,
} from '../constants/surfacepressure/ActionTypes';

const initialState = {
  surfacePressureChecked: false,
  data: {},
  subDisabled: { disabled: true },
  basetimeidx: 0,
  validtimeidx: 0,
  basetime: [],
  tsobj: {},
};

export default handleActions({
  [SURFACE_PRESSURE_CLICK]: (state, action) => ({
    ...state,
    surfacePressureChecked: action.payload.checked,
    subDisabled: { disabled: !action.payload.checked },
  }),
  [SURFACE_PRESSURE_BASETIME_CHANGE]: (state, action) => ({
    ...state,
    basetimeidx: action.payload.value,
    validtimeidx: 0,
  }),
  [SURFACE_PRESSURE_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    validtimeidx: action.payload.value,
  }),
  [SURFACE_PRESSURE_TIMELIST]: (state, action) => ({
    ...state,
    ...action.payload.data,
  }),
}, initialState);
