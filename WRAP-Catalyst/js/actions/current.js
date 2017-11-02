import { createActions } from 'redux-actions';
import {
  CURRENT_CLICK,
  CURRENT_BASETIME_CHANGE,
  CURRENT_VALIDTIME_CHANGE,
  CURRENT_THRESHOLD_CHANGE,
} from '../constants/current/ActionTypes';
import { Current } from '../layers/LayerConfig';

const targetLayer = Current.layerName;

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  currentClick,
  currentBasetimeChange,
  currentValidtimeChange,
  currentThresholdChange,
} = createActions({
  [CURRENT_CLICK]: checkAction,
  [CURRENT_BASETIME_CHANGE]: valueAction,
  [CURRENT_VALIDTIME_CHANGE]: valueAction,
  [CURRENT_THRESHOLD_CHANGE]: valueAction,
});
