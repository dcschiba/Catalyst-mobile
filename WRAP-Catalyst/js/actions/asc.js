import { createAction, createActions } from 'redux-actions';
import {
  ASC_CLICK,
  ASC_VALIDTIME_CHANGE,
  ASC_LEVEL_START_CHANGE,
  ASC_LEVEL_END_CHANGE,
  ASC_TURBULENCE_CLICK,
  ASC_CONVECTION_CLICK,
  ASC_ICING_CLICK,
  WRAP_DISPATCH_ACTION,
  ASC_INITIALIZE,
} from '../constants/asc/ActionTypes';
import { ASCLayer } from '../layers/LayerConfig';

const targetLayer = ASCLayer.layerName;

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value });

export const {
  ascClick,
  ascValidtimeChange,
  ascLevelStartChange,
  ascLevelEndChange,
  ascTurbulenceClick,
  ascConvectionClick,
  ascIcingClick,
} = createActions({
  [ASC_CLICK]: checkAction,
  [ASC_VALIDTIME_CHANGE]: valueAction,
  [ASC_LEVEL_START_CHANGE]: valueAction,
  [ASC_LEVEL_END_CHANGE]: valueAction,
  [ASC_TURBULENCE_CLICK]: checkAction,
  [ASC_CONVECTION_CLICK]: checkAction,
  [ASC_ICING_CLICK]: checkAction,
});

export const wrapLayerDispatchAction = createAction(
  WRAP_DISPATCH_ACTION,
  (intype, data) => ({ intype, data }),
);

export const initialize = createAction(
  ASC_INITIALIZE,
  () => ({}),
);

