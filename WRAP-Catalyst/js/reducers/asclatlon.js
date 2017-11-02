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
  WRAP_DISPATCH_ACTION,
  ASC_INITIALIZE,
} from '../constants/asc/ActionTypes';
import {
  LATLON_CLICK,
} from '../constants/latlon/ActionTypes';

const initialState = {
};

export default handleActions({
  [ASC_CLICK]: state => ({
    ...state,
    asc: {
      ...state.asc,
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
  [WRAP_DISPATCH_ACTION]: (state, action) => {
    const intype = action.payload.intype;
    if (intype === ASC_TIMELIST) {
      return {
        ...state,
        asc: {
          ...state.asc,
          ...action.payload.data,
        },
      };
    }
    return state;
  },
  [ASC_INITIALIZE]: state => ({
    ...state,
    ...initialState,
  }),
  [LATLON_CLICK]: state => ({
    ...state,
  }),
}, initialState);
