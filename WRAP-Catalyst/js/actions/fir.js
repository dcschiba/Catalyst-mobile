import { createAction, createActions } from 'redux-actions';
import {
  FIR_CLICK,
  FIR_INITIALIZE,
} from '../constants/fir/ActionTypes';
import { FIR } from '../layers/LayerConfig';

const targetLayer = FIR.layerName;

const checkAction = checked => ({ checked, targetLayer });

export const {
  firClick,
} = createActions({
  [FIR_CLICK]: checkAction,
});

export const initialize = createAction(
  FIR_INITIALIZE,
  () => ({}),
);

