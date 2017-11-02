import { createActions } from 'redux-actions';
import {
  WIND_BARBS_CLICK,
  WIND_BARBS_BASETIME_CHANGE,
  WIND_BARBS_VALIDTIME_CHANGE,
  WIND_BARBS_THRESHOLD_CHANGE,
} from '../constants/windbarbs/ActionTypes';
import { WindBarbs } from '../layers/LayerConfig';

const targetLayer = WindBarbs.layerName;

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  windBarbsClick,
  windBarbsBasetimeChange,
  windBarbsValidtimeChange,
  windBarbsThresholdChange,
} = createActions({
  [WIND_BARBS_CLICK]: checkAction,
  [WIND_BARBS_BASETIME_CHANGE]: valueAction,
  [WIND_BARBS_VALIDTIME_CHANGE]: valueAction,
  [WIND_BARBS_THRESHOLD_CHANGE]: valueAction,
});
