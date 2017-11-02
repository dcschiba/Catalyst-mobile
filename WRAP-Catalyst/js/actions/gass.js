import { createActions } from 'redux-actions';
import {
  GASS_CLICK,
  GASS_BASETIME_CHANGE,
  GASS_VALIDTIME_CHANGE,
} from '../constants/gass/ActionTypes';
import { GASS } from '../layers/LayerConfig';

const targetLayer = GASS.layerName;

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  gassClick,
  gassBasetimeChange,
  gassValidtimeChange,
} = createActions({
  [GASS_CLICK]: checkAction,
  [GASS_BASETIME_CHANGE]: valueAction,
  [GASS_VALIDTIME_CHANGE]: valueAction,
});
