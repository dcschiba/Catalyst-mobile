import { handleActions } from 'redux-actions';
import {
  ICE_BERG_CLICK,
  ICE_BERG_BASETIME_CHANGE,
  ICE_BERG_VALIDTIME_CHANGE,
  ICE_BERG_THRESHOLD_CHANGE,
  ICE_BERG_TIMELIST,
} from '../constants/iceberg/ActionTypes';

const initialState = {
  data: {},
  iceBergChecked: false,
  subDisabled: { disabled: true },
  basetimeidx: 0,
  validtimeidx: 0,
  threshold: 1,
  basetime: [],
  tsobj: {},
};

export default handleActions({
  [ICE_BERG_CLICK]: (state, action) => ({
    ...state,
    iceBergChecked: action.payload.checked,
    subDisabled: { disabled: !action.payload.checked },
  }),
  [ICE_BERG_BASETIME_CHANGE]: (state, action) => ({
    ...state,
    basetimeidx: action.payload.value,
    validtimeidx: 0,
  }),
  [ICE_BERG_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    validtimeidx: action.payload.value,
  }),
  [ICE_BERG_THRESHOLD_CHANGE]: (state, action) => ({
    ...state,
    threshold: action.payload.value,
  }),
  [ICE_BERG_TIMELIST]: (state, action) => ({
    ...state,
    ...action.payload.data,
  }),
}, initialState);
