import { handleActions } from 'redux-actions';
import {
  GPV_MSMGROUND_CLICK,
  GPV_MSMGROUND_WIND_CLICK,
  GPV_MSMGROUND_PRECIPITATION_CLICK,
  GPV_MSMGROUND_CONTOUR_CLICK,
  GPV_MSMGROUND_BASETIME_CHANGE,
  GPV_MSMGROUND_VALIDTIME_CHANGE,
  GPV_MSMGROUND_TIMELIST,
} from '../constants/msmground/ActionTypes';

const initialState = {
  data: {},
  gpv: {
    gpvchecked: false,
    basetimeidx: 0,
    validtimeidx: 0,
    gpvDisabled: { disabled: true },
    windchecked: true,
    contourchecked: false,
    precipitationchecked: false,
    basetime: [],
    tsobj: {},
  },
};

export default handleActions({
  [GPV_MSMGROUND_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      gpvchecked: action.payload.checked,
      gpvDisabled: { disabled: !action.payload.checked },
    },
  }),
  [GPV_MSMGROUND_WIND_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      windchecked: action.payload.checked,
    },
  }),
  [GPV_MSMGROUND_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      contourchecked: action.payload.checked,
    },
  }),
  [GPV_MSMGROUND_PRECIPITATION_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      precipitationchecked: action.payload.checked,
    },
  }),
  [GPV_MSMGROUND_BASETIME_CHANGE]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      basetimeidx: action.payload.value,
      validtimeidx: 0,
    },
  }),
  [GPV_MSMGROUND_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      validtimeidx: action.payload.value,
    },
  }),
  [GPV_MSMGROUND_TIMELIST]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      ...action.payload.data,
    },
  }),
}, initialState);
