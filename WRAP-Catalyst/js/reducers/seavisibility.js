import { handleActions } from 'redux-actions';
import {
  SEA_VISIBILITY_CLICK,
  SEA_VISIBILITY_BASETIME_CHANGE,
  SEA_VISIBILITY_VALIDTIME_CHANGE,
  SEA_VISIBILITY_TIMELIST,
} from '../constants/seavisibility/ActionTypes';

const initialState = {
  seaVisibilityChecked: false,
  data: {},
  subDisabled: { disabled: true },
  basetimeidx: 0,
  validtimeidx: 0,
  basetime: [],
  tsobj: {},
};

export default handleActions({
  [SEA_VISIBILITY_CLICK]: (state, action) => ({
    ...state,
    seaVisibilityChecked: action.payload.checked,
    subDisabled: { disabled: !action.payload.checked },
  }),
  [SEA_VISIBILITY_BASETIME_CHANGE]: (state, action) => ({
    ...state,
    basetimeidx: action.payload.value,
    validtimeidx: 0,
  }),
  [SEA_VISIBILITY_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    validtimeidx: action.payload.value,
  }),
  [SEA_VISIBILITY_TIMELIST]: (state, action) => ({
    ...state,
    ...action.payload.data,
  }),
}, initialState);
