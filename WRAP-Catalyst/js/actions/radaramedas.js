import { createActions } from 'redux-actions';
import {
  RADARAMEDAS_CLICK,
  RADARAMEDAS_VALIDTIME_CHANGE,
} from '../constants/radaramedas/ActionTypes';
/* eslint-disable camelcase */
import { RadarAmedas_ANLSIS, RadarAmedas_NOWCAST } from '../layers/LayerConfig';

const targetLayer = [RadarAmedas_ANLSIS.layerName, RadarAmedas_NOWCAST.layerName];

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  radaramedasClick,
  radaramedasValidtimeChange,
} = createActions({
  [RADARAMEDAS_CLICK]: checkAction,
  [RADARAMEDAS_VALIDTIME_CHANGE]: valueAction,
});
