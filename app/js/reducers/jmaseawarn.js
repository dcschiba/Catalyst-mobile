import { handleActions } from 'redux-actions';
import {
  JMASEAWARN_CLICK,
  JMASEAWARN_INITIALIZE,
  JMASEAWARN_ANNOUNCED_DATE,
  JMASEAWARNFORECAST_ANNOUNCED_DATE,
  JMASEAWARN_SHOWTYPE_CHANGE,
} from '../constants/jmaseawarn/ActionTypes';

const initialState = {
  data: {},
  jmaseawarnChecked: false,
  showtype: 'warning',
  announceddate: '',
  forecastannounceddate: '',
};

export default handleActions({
  [JMASEAWARN_CLICK]: (state, action) => ({
    ...state,
    jmaseawarnChecked: action.payload.checked,
  }),
  [JMASEAWARN_ANNOUNCED_DATE]: (state, action) => ({
    ...state,
    announceddate: action.payload.data.ann,
  }),
  [JMASEAWARNFORECAST_ANNOUNCED_DATE]: (state, action) => ({
    ...state,
    forecastannounceddate: action.payload.data.ann,
  }),
  [JMASEAWARN_SHOWTYPE_CHANGE]: (state, action) => ({
    ...state,
    showtype: action.payload.value,
  }),
  [JMASEAWARN_INITIALIZE]: state => ({
    ...state,
    ...initialState,
  }),
}, initialState);
