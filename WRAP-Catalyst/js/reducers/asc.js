import { handleActions } from 'redux-actions';
import {
  ASC_CLICK,
  ASC_VALIDTIME_CHANGE,
  ASC_LEVEL_START_CHANGE,
  ASC_LEVEL_END_CHANGE,
  ASC_TURBULENCE_CLICK,
  ASC_CONVECTION_CLICK,
  ASC_ICING_CLICK,
  ASC_TIMELIST,
  ASC_INITIALIZE,
} from '../constants/asc/ActionTypes';

const initialState = {
  data: {},
  asc: {
    ascDisabled: { disabled: true },
    basetimeidx: 0,
    validtimeidx: 0,
    levelstart: 850,
    levelend: 850,
    turbulenceChecked: true,
    convectionChecked: false,
    icingChecked: false,
    basetime: [],
    issuetime: [],
    tsarr: [],
  },
};

export default handleActions({
  [ASC_CLICK]: (state, action) => ({
    ...state,
    asc: {
      ...state.asc,
      ascDisabled: { disabled: !action.payload.checked },
    },
  }),
  [ASC_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    asc: {
      ...state.asc,
      validtimeidx: action.payload.value,
    },
  }),
  [ASC_LEVEL_START_CHANGE]: (state, action) => ({
    ...state,
    asc: {
      ...state.asc,
      levelstart: action.payload.value,
    },
  }),
  [ASC_LEVEL_END_CHANGE]: (state, action) => ({
    ...state,
    asc: {
      ...state.asc,
      levelend: action.payload.value,
    },
  }),
  [ASC_TURBULENCE_CLICK]: (state, action) => ({
    ...state,
    asc: {
      ...state.asc,
      turbulenceChecked: action.payload.checked,
    },
  }),
  [ASC_CONVECTION_CLICK]: (state, action) => ({
    ...state,
    asc: {
      ...state.asc,
      convectionChecked: action.payload.checked,
    },
  }),
  [ASC_ICING_CLICK]: (state, action) => ({
    ...state,
    asc: {
      ...state.asc,
      icingChecked: action.payload.checked,
    },
  }),
  [ASC_TIMELIST]: (state, action) => ({
    ...state,
    asc: {
      ...state.asc,
      ...action.payload.data,
    },
  }),
  [ASC_INITIALIZE]: state => ({
    ...state,
    ...initialState,
  }),
}, initialState);
