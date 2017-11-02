import { createActions } from 'redux-actions';
import {
  DASH_CLICK,
  DANGER_CLICK,
  SEVERE_CLICK,
  HEAVY_CLICK,
  DASH_BASETIME_CHANGE,
  DASH_VALIDTIME_CHANGE,
} from '../constants/dash/ActionTypes';
import { Dash } from '../layers/LayerConfig';

const targetLayer = Dash.layerName;

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  dashClick,
  dangerClick,
  severeClick,
  heavyClick,
  dashBasetimeChange,
  dashValidtimeChange,
} = createActions({
  [DASH_CLICK]: checkAction,
  [DANGER_CLICK]: checkAction,
  [SEVERE_CLICK]: checkAction,
  [HEAVY_CLICK]: checkAction,
  [DASH_BASETIME_CHANGE]: valueAction,
  [DASH_VALIDTIME_CHANGE]: valueAction,
});
