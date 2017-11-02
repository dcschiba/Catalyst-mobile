import { handleActions } from 'redux-actions';
import {
  ICE_CONCENTRATION_CLICK,
  ICE_CONCENTRATION_BASETIME_CHANGE,
  ICE_CONCENTRATION_VALIDTIME_CHANGE,
  ICE_CONCENTRATION_TIMELIST,
} from '../constants/iceconcentration/ActionTypes';

const initialState = {
  iceConcentrationChecked: false,
  data: {},
  subDisabled: { disabled: true },
  basetimeidx: 0,
  validtimeidx: 0,
  basetime: [],
  tsobj: {},
};

export default handleActions({
  [ICE_CONCENTRATION_CLICK]: (state, action) => ({
    ...state,
    iceConcentrationChecked: action.payload.checked,
    subDisabled: { disabled: !action.payload.checked },
  }),
  [ICE_CONCENTRATION_BASETIME_CHANGE]: (state, action) => ({
    ...state,
    basetimeidx: action.payload.value,
    validtimeidx: 0,
  }),
  [ICE_CONCENTRATION_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    validtimeidx: action.payload.value,
  }),
  [ICE_CONCENTRATION_TIMELIST]: (state, action) => ({
    ...state,
    ...action.payload.data,
  }),
}, initialState);
