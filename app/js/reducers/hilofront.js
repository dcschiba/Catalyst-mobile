import { handleActions } from 'redux-actions';
import {
  HILOFRONT_SHOW_CLICK,
  HILOFRONT_BASETIME_CHANGE,
  HILOFRONT_VALIDTIME_CHANGE,
  HILOFRONT_CONTOUR_CLICK,
  HILOFRONT_HILO_CLICK,
  HILOFRONT_FRONT_CLICK,
  HILOFRONT_TIMELIST,
  HILOFRONT_INITIALIZE,
} from '../constants/hilofront/ActionTypes';


const initialState = {
  showchecked: false,
  subDisabled: { disabled: true },
  basetimeidx: 0,
  validtimeidx: 0,
  contourchecked: false,
  hilochecked: false,
  frontchecked: false,
  basetimelist: [],
  bvtimeobj: {},
};

export default handleActions({
  [HILOFRONT_SHOW_CLICK]: (state, action) => ({
    ...state,
    showchecked: action.payload.checked,
    subDisabled: { disabled: !action.payload.checked },
  }),
  [HILOFRONT_BASETIME_CHANGE]: (state, action) => ({
    ...state,
    basetimeidx: action.payload.value,
    validtimeidx: 0,
  }),
  [HILOFRONT_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    validtimeidx: action.payload.value,
  }),
  [HILOFRONT_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    contourchecked: action.payload.checked,
  }),
  [HILOFRONT_HILO_CLICK]: (state, action) => ({
    ...state,
    hilochecked: action.payload.checked,
  }),
  [HILOFRONT_FRONT_CLICK]: (state, action) => ({
    ...state,
    frontchecked: action.payload.checked,
  }),
  [HILOFRONT_TIMELIST]: (state, action) => ({
    ...state,
    ...action.payload.data,
  }),
  [HILOFRONT_INITIALIZE]: state => ({
    ...state,
    ...initialState,
  }),
}, initialState);
