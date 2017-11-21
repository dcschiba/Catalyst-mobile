import { handleActions } from 'redux-actions';
import {
  DISASTER_REPORT_CLICK,
  DISASTER_REPORT_TYPE_CHANGE,
} from '../constants/disasterreport/ActionTypes';

const initialState = {
  data: {},
  disasterReportChecked: false,
  showtype: '1',
};

export default handleActions({
  [DISASTER_REPORT_CLICK]: (state, action) => ({
    ...state,
    disasterReportChecked: action.payload.checked,
  }),
  [DISASTER_REPORT_TYPE_CHANGE]: (state, action) => ({
    ...state,
    showtype: action.payload.value,
  }),
}, initialState);
