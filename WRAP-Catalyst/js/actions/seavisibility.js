import { createActions } from 'redux-actions';
import {
  SEA_VISIBILITY_CLICK,
  SEA_VISIBILITY_BASETIME_CHANGE,
  SEA_VISIBILITY_VALIDTIME_CHANGE,
} from '../constants/seavisibility/ActionTypes';
import { SeaVisibility } from '../layers/LayerConfig';

const targetLayer = SeaVisibility.layerName;

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  seaVisibilityClick,
  seaVisibilityBasetimeChange,
  seaVisibilityValidtimeChange,
} = createActions({
  [SEA_VISIBILITY_CLICK]: checkAction,
  [SEA_VISIBILITY_BASETIME_CHANGE]: valueAction,
  [SEA_VISIBILITY_VALIDTIME_CHANGE]: valueAction,
});
