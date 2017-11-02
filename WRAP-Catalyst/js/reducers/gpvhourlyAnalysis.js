import { handleActions } from 'redux-actions';
import {
  HOURLYANALYSIS_CLICK,
  HOURLYANALYSIS_WIND_CLICK,
  HOURLYANALYSIS_TMP_CLICK,
  HOURLYANALYSIS_LEVEL_CHANGE,
  HOURLYANALYSIS_BASETIME_CHANGE,
  HOURLYANALYSIS_VALIDTIME_CHANGE,
  HOURLYANALYSIS_TIMELIST,
} from '../constants/gpvhourlyAnalysis/ActionTypes';

const initialState = {
  data: {},
  hourlyAnalysisChecked: false,
  subDisabled: { disabled: true },
  windChecked: true,
  tmpChecked: true,
  basetimeidx: 0,
  level: '500',
  validtimeidx: 0,
  basetime: [],
  tsobj: {},
};

export default handleActions({
  [HOURLYANALYSIS_CLICK]: (state, action) => ({
    ...state,
    hourlyAnalysisChecked: action.payload.checked,
    subDisabled: { disabled: !action.payload.checked },
  }),
  [HOURLYANALYSIS_WIND_CLICK]: (state, action) => ({
    ...state,
    windChecked: action.payload.checked,
  }),
  [HOURLYANALYSIS_TMP_CLICK]: (state, action) => ({
    ...state,
    tmpChecked: action.payload.checked,
  }),
  [HOURLYANALYSIS_LEVEL_CHANGE]: (state, action) => ({
    ...state,
    level: action.payload.value,
  }),
  [HOURLYANALYSIS_BASETIME_CHANGE]: (state, action) => ({
    ...state,
    basetimeidx: action.payload.value,
    validtimeidx: 0,
  }),
  [HOURLYANALYSIS_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    validtimeidx: action.payload.value,
  }),
  [HOURLYANALYSIS_TIMELIST]: (state, action) => ({
    ...state,
    ...action.payload.data,
  }),
}, initialState);
