import { handleActions } from 'redux-actions';
import {
  GASS_CLICK,
  GASS_BASETIME_CHANGE,
  GASS_VALIDTIME_CHANGE,
  GASS_TIMELIST,
} from '../constants/gass/ActionTypes';

const initialState = {
  gassChecked: false,
  data: {},
  subDisabled: { disabled: true },
  basetimeidx: 0,
  validtimeidx: 0,
  basetime: [],
  tsobj: {},
};

export default handleActions({
  [GASS_CLICK]: (state, action) => ({
    ...state,
    gassChecked: action.payload.checked,
    subDisabled: { disabled: !action.payload.checked },
  }),
  [GASS_BASETIME_CHANGE]: (state, action) => ({
    ...state,
    basetimeidx: action.payload.value,
    validtimeidx: 0,
  }),
  [GASS_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    validtimeidx: action.payload.value,
  }),
  [GASS_TIMELIST]: (state, action) => ({
    ...state,
    ...action.payload.data,
  }),
}, initialState);
