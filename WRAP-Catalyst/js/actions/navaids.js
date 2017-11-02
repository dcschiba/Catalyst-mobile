import { createAction, createActions } from 'redux-actions';
import {
  NAVAIDS_CLICK,
  NAVAIDS_INITIALIZE,
} from '../constants/navaids/ActionTypes';
import { Navaids } from '../layers/LayerConfig';

const targetLayer = Navaids.layerName;

const checkAction = checked => ({ checked, targetLayer });

export const {
  navaidsClick,
} = createActions({
  [NAVAIDS_CLICK]: checkAction,
});

export const initialize = createAction(
  NAVAIDS_INITIALIZE,
  () => ({}),
);

