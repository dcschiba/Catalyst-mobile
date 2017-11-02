import { createAction, createActions } from 'redux-actions';
import { AIRPORT_CLICK, AIRPORT_ALL_CLICK, AIRPORT_CUM_CLICK, AIRPORT_INITIALIZE } from '../constants/airport/ActionTypes';
import { Airport } from '../layers/LayerConfig';

const checkAction = checked => ({ checked, targetLayer: Airport.layerName });

export const {
  airportClick,
  airportAllClick,
  airportCumClick,
} = createActions({
  [AIRPORT_CLICK]: checkAction,
  [AIRPORT_ALL_CLICK]: checkAction,
  [AIRPORT_CUM_CLICK]: checkAction,
});

export const initialize = createAction(
  AIRPORT_INITIALIZE,
  () => ({}),
);

