import { createActions } from 'redux-actions';
import {
  DISASTER_REPORT_CLICK,
  DISASTER_REPORT_TYPE_CHANGE,
} from '../constants/disasterreport/ActionTypes';

import { DisasterReport } from '../layers/LayerConfig';

const targetLayer = DisasterReport.layerName;
const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  disasterReportClick,
  disasterReportTypeChange,
} = createActions({
  [DISASTER_REPORT_CLICK]: checkAction,
  [DISASTER_REPORT_TYPE_CHANGE]: valueAction,
});
