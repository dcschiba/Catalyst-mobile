import { handleActions } from 'redux-actions';
import {
  WIND_BARBS_CLICK,
  WIND_BARBS_BASETIME_CHANGE,
  WIND_BARBS_VALIDTIME_CHANGE,
  WIND_BARBS_THRESHOLD_CHANGE,
  WIND_BARBS_TIMELIST,
} from '../constants/windbarbs/ActionTypes';

const initialState = {
  data: {},
  windBarbsChecked: false,
  subDisabled: { disabled: true },
  basetimeidx: 0,
  validtimeidx: 0,
  threshold: 15.0,
  basetime: [],
  tsobj: {},
};

export default handleActions({
  [WIND_BARBS_CLICK]: (state, action) => ({
    ...state,
    windBarbsChecked: action.payload.checked,
    subDisabled: { disabled: !action.payload.checked },
  }),
  [WIND_BARBS_BASETIME_CHANGE]: (state, action) => ({
    ...state,
    basetimeidx: action.payload.value,
    validtimeidx: 0,
  }),
  [WIND_BARBS_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    validtimeidx: action.payload.value,
  }),
  [WIND_BARBS_THRESHOLD_CHANGE]: (state, action) => ({
    ...state,
    threshold: action.payload.value,
  }),
  [WIND_BARBS_TIMELIST]: (state, action) => ({
    ...state,
    ...action.payload.data,
  }),
}, initialState);
