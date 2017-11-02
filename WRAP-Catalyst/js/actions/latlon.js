import { createAction, createActions } from 'redux-actions';
import {
  LATLON_CLICK,
  LATLON_INITIALIZE,
} from '../constants/latlon/ActionTypes';
import { LatLon } from '../layers/LayerConfig';

const targetLayer = LatLon.layerName;
const checkAction = checked => ({ checked, targetLayer });

export const {
  latlonClick,
} = createActions({
  [LATLON_CLICK]: checkAction,
});

export const initialize = createAction(
  LATLON_INITIALIZE,
  () => ({}),
);

