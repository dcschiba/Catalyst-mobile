import { handleActions } from 'redux-actions';
import {
  AMEDAS_CLICK,
  AMEDAS_VALIDTIME_CHANGE,
  AMEDAS_WIND_CLICK,
  AMEDAS_CONTENT_CHANGE,
  AMEDAS_TIMELIST,
} from '../constants/amedas/ActionTypes';

const initialState = {
  data: {},
  showchecked: true,
  legendClosed: true,
  subDisabled: { disabled: false },
  validtimeidx: 0,
  windchecked: false,
  content: 'Temperature',
  tsarr: [],
};

export default handleActions({
  [AMEDAS_CLICK]: (state, action) => ({
    ...state,
    showchecked: action.payload.checked,
    subDisabled: { disabled: !action.payload.checked },
  }),
  [AMEDAS_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    validtimeidx: action.payload.value,
  }),
  [AMEDAS_WIND_CLICK]: (state, action) => ({
    ...state,
    windchecked: action.payload.checked,
  }),
  [AMEDAS_CONTENT_CHANGE]: (state, action) => ({
    ...state,
    content: action.payload.value,
  }),
  [AMEDAS_TIMELIST]: (state, action) => ({
    ...state,
    ...action.payload.data,
  }),
}, initialState);
