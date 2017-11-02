import { handleActions } from 'redux-actions';
import {
  SEA_SPRAY_ICING_CLICK,
  SEA_SPRAY_ICING_FLAT_CLICK,
  SEA_SPRAY_ICING_CONTOUR_CLICK,
  SEA_SPRAY_ICING_BASETIME_CHANGE,
  SEA_SPRAY_ICING_VALIDTIME_CHANGE,
  SEA_SPRAY_ICING_TIMELIST,
} from '../constants/seasprayicing/ActionTypes';

const initialState = {
  seaSprayIcingChecked: false,
  seaSprayIcingFlatChecked: true,
  seaSprayIcingContourChecked: true,
  data: {},
  subDisabled: { disabled: true },
  basetimeidx: 0,
  validtimeidx: 0,
  basetime: [],
  tsobj: {},
};

export default handleActions({
  [SEA_SPRAY_ICING_CLICK]: (state, action) => ({
    ...state,
    seaSprayIcingChecked: action.payload.checked,
    subDisabled: { disabled: !action.payload.checked },
  }),
  [SEA_SPRAY_ICING_FLAT_CLICK]: (state, action) => ({
    ...state,
    seaSprayIcingFlatChecked: action.payload.checked,
  }),
  [SEA_SPRAY_ICING_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    seaSprayIcingContourChecked: action.payload.checked,
  }),
  [SEA_SPRAY_ICING_BASETIME_CHANGE]: (state, action) => ({
    ...state,
    basetimeidx: action.payload.value,
    validtimeidx: 0,
  }),
  [SEA_SPRAY_ICING_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    validtimeidx: action.payload.value,
  }),
  [SEA_SPRAY_ICING_TIMELIST]: (state, action) => ({
    ...state,
    ...action.payload.data,
  }),
}, initialState);
