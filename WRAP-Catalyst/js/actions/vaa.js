import { createAction, createActions } from 'redux-actions';
import { VAA_CLICK, VAA_INITIALIZE } from '../constants/vaa/ActionTypes';
import { VAA } from '../layers/LayerConfig';

const checkAction = checked => ({ checked, targetLayer: VAA.layerName });

export const {
  vaaClick,
} = createActions({
  [VAA_CLICK]: checkAction,
});

export const initialize = createAction(
  VAA_INITIALIZE,
  () => ({}),
);

