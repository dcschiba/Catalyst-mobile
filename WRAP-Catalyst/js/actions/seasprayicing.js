import { createActions } from 'redux-actions';
import {
  SEA_SPRAY_ICING_CLICK,
  SEA_SPRAY_ICING_FLAT_CLICK,
  SEA_SPRAY_ICING_CONTOUR_CLICK,
  SEA_SPRAY_ICING_BASETIME_CHANGE,
  SEA_SPRAY_ICING_VALIDTIME_CHANGE,
} from '../constants/seasprayicing/ActionTypes';
/* eslint-disable camelcase */
import {
  SeaSprayIcing_Flat,
  SeaSprayIcing_Contour } from '../layers/LayerConfig';

const targetLayer = [
  SeaSprayIcing_Flat.layerName,
  SeaSprayIcing_Contour.layerName,
];

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  seaSprayIcingClick,
  seaSprayIcingFlatClick,
  seaSprayIcingContourClick,
  seaSprayIcingBasetimeChange,
  seaSprayIcingValidtimeChange,
} = createActions({
  [SEA_SPRAY_ICING_CLICK]: checkAction,
  [SEA_SPRAY_ICING_FLAT_CLICK]: checkAction,
  [SEA_SPRAY_ICING_CONTOUR_CLICK]: checkAction,
  [SEA_SPRAY_ICING_BASETIME_CHANGE]: valueAction,
  [SEA_SPRAY_ICING_VALIDTIME_CHANGE]: valueAction,
});
