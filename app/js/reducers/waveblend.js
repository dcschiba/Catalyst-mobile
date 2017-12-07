import { handleActions } from 'redux-actions';
import {
  WAVE_BLEND_TIMELIST,
  WAVE_BLEND_BASETIME_CHANGE,
  WAVE_BLEND_VALIDTIME_CHANGE,
  WAVE_BLEND_CLICK,
  WAVE_BLEND_ARROW_CLICK,
  WAVE_BLEND_CONTOUR_CLICK,
  WAVE_BLEND_FLAT_CLICK,
  WAVE_BLEND_LOWRESO_CLICK,
  WAVE_BLEND_NPAC_CLICK,
  WAVE_BLEND_NATL_CLICK,
  WAVE_BLEND_SEASIA_CLICK,
  WAVE_BLEND_LOWTHRESHOLD_CHANGE,
  WAVE_BLEND_HIGHTHRESHOLD_CHANGE,
} from '../constants/waveblend/ActionTypes';

const initialState = {
  waveBlendChecked: true,
  waveBlendArrowChecked: true,
  waveBlendContourChecked: true,
  waveBlendFlatChecked: true,
  waveBlendLowresoChecked: true,
  waveBlendNpacChecked: true,
  waveBlendNatlChecked: false,
  waveBlendSeasiaChecked: false,
  data: {},
  subDisabled: { disabled: false },
  basetimeidx: 0,
  validtimeidx: 0,
  basetime: [],
  tsobj: {},
  lowthreshold: 2.0,
  highthreshold: 4.0,
};

export default handleActions({
  [WAVE_BLEND_CLICK]: (state, action) => ({
    ...state,
    waveBlendChecked: action.payload.checked,
    subDisabled: { disabled: !action.payload.checked },
  }),
  [WAVE_BLEND_ARROW_CLICK]: (state, action) => ({
    ...state,
    waveBlendArrowChecked: action.payload.checked,
  }),
  [WAVE_BLEND_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    waveBlendContourChecked: action.payload.checked,
  }),
  [WAVE_BLEND_FLAT_CLICK]: (state, action) => ({
    ...state,
    waveBlendFlatChecked: action.payload.checked,
  }),
  [WAVE_BLEND_LOWRESO_CLICK]: (state, action) => ({
    ...state,
    waveBlendLowresoChecked: action.payload.checked,
  }),
  [WAVE_BLEND_NPAC_CLICK]: (state, action) => ({
    ...state,
    waveBlendNpacChecked: action.payload.checked,
  }),
  [WAVE_BLEND_NATL_CLICK]: (state, action) => ({
    ...state,
    waveBlendNatlChecked: action.payload.checked,
  }),
  [WAVE_BLEND_SEASIA_CLICK]: (state, action) => ({
    ...state,
    waveBlendSeasiaChecked: action.payload.checked,
  }),
  [WAVE_BLEND_BASETIME_CHANGE]: (state, action) => ({
    ...state,
    basetimeidx: action.payload.value,
    validtimeidx: 0,
  }),
  [WAVE_BLEND_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    validtimeidx: action.payload.value,
  }),
  [WAVE_BLEND_LOWTHRESHOLD_CHANGE]: (state, action) => ({
    ...state,
    lowthreshold: action.payload.value,
  }),
  [WAVE_BLEND_HIGHTHRESHOLD_CHANGE]: (state, action) => ({
    ...state,
    highthreshold: action.payload.value,
  }),
  [WAVE_BLEND_TIMELIST]: (state, action) => ({
    ...state,
    ...action.payload.data,
  }),
}, initialState);
