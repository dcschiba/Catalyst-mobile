import { createActions } from 'redux-actions';
import {
  ICE_BERG_CLICK,
  ICE_BERG_BASETIME_CHANGE,
  ICE_BERG_VALIDTIME_CHANGE,
  ICE_BERG_THRESHOLD_CHANGE,
} from '../constants/iceberg/ActionTypes';
import { IceBerg } from '../layers/LayerConfig';

const targetLayer = IceBerg.layerName;

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  iceBergClick,
  iceBergBasetimeChange,
  iceBergValidtimeChange,
  iceBergThresholdChange,
} = createActions({
  [ICE_BERG_CLICK]: checkAction,
  [ICE_BERG_BASETIME_CHANGE]: valueAction,
  [ICE_BERG_VALIDTIME_CHANGE]: valueAction,
  [ICE_BERG_THRESHOLD_CHANGE]: valueAction,
});
