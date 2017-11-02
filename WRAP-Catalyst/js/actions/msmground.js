import { createAction } from 'redux-actions';
import {
  GPV_MSMGROUND_CLICK,
  GPV_MSMGROUND_WIND_CLICK,
  GPV_MSMGROUND_PRECIPITATION_CLICK,
  GPV_MSMGROUND_CONTOUR_CLICK,
  GPV_MSMGROUND_BASETIME_CHANGE,
  GPV_MSMGROUND_VALIDTIME_CHANGE,
} from '../constants/msmground/ActionTypes';
/* eslint-disable camelcase */
import {
  GPVWindLayer_MSM_Ground,
  GPVContourLayer_MSM_Ground,
  GPVPrecipitationLayer_MSM_Ground,
} from '../layers/LayerConfig';

const targetLayer = [
  GPVWindLayer_MSM_Ground.layerName,
  GPVPrecipitationLayer_MSM_Ground.layerName,
  GPVContourLayer_MSM_Ground.layerName,
];

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const gpvClick = createAction(GPV_MSMGROUND_CLICK, checkAction);
export const gpvWindClick = createAction(GPV_MSMGROUND_WIND_CLICK, checkAction);
export const gpvPrecipitationClick = createAction(GPV_MSMGROUND_PRECIPITATION_CLICK, checkAction);
export const gpvContourClick = createAction(GPV_MSMGROUND_CONTOUR_CLICK, checkAction);
export const gpvBasetimeChange = createAction(GPV_MSMGROUND_BASETIME_CHANGE, valueAction);
export const gpvValidtimeChange = createAction(GPV_MSMGROUND_VALIDTIME_CHANGE, valueAction);
