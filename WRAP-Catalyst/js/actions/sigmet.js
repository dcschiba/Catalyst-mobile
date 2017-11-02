import { createAction, createActions } from 'redux-actions';
import {
  SIGMET_CLICK,
  SIGMET_INITIALIZE,
} from '../constants/sigmet/ActionTypes';
import { SIGMET } from '../layers/LayerConfig';

const targetLayer = SIGMET.layerName;

const checkAction = checked => ({ checked, targetLayer });

export const {
  sigmetClick,
} = createActions({
  [SIGMET_CLICK]: checkAction,
});

export const initialize = createAction(
  SIGMET_INITIALIZE,
  () => ({}),
);
