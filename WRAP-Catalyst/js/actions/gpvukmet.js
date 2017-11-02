import { createAction } from 'redux-actions';
import {
  GPV_UKMET_CLICK,
  GPV_UKMET_TEMP_CLICK,
  GPV_UKMET_WIND_CLICK,
  GPV_UKMET_ISOTACH_CLICK,
  GPV_UKMET_TMP_CONTOUR_CLICK,
  GPV_UKMET_TMP_FLAT_CLICK,
  GPV_UKMET_TMP_GRADATION_CLICK,
  GPV_UKMET_TMP_GRIDVALUE_CLICK,
  GPV_UKMET_VALIDTIME_CHANGE,
  GPV_UKMET_LEVEL_CHANGE,
  GPV_UKMET_HGT_CLICK,
  GPV_UKMET_HGT_CONTOUR_CLICK,
  GPV_UKMET_HGT_FLAT_CLICK,
  GPV_UKMET_HGT_GRADATION_CLICK,
  GPV_UKMET_HGT_GRIDVALUE_CLICK,
  GPV_UKMET_RH_CLICK,
  GPV_UKMET_RH_CONTOUR_CLICK,
  GPV_UKMET_RH_FLAT_CLICK,
  GPV_UKMET_RH_GRADATION_CLICK,
  GPV_UKMET_RH_GRIDVALUE_CLICK,
  GPV_UKMET_ICING_PROB_CLICK,
} from '../constants/gpv/ActionTypes';
/* eslint-disable camelcase */
import {
  GPVTmpContourSample_UKMET,
  TmpGridValue_UKMET,
  GPVTmpFillStyleSamples_UKMET,
  GPVRhContourSample_UKMET,
  HgtGridValue_UKMET,
  GPVHgtFillStyleSamples_UKMET,
  GPVHgtContourSample_UKMET,
  RhGridValue_UKMET,
  GPVRhFillStyleSamples_UKMET,
  GPVWindLayer_UKMET,
  GPVIsotachLayer_UKMET,
  GPVIcingprobLayer_UKMET,
} from '../layers/LayerConfig';

const targetLayer = [
  GPVTmpContourSample_UKMET.layerName,
  TmpGridValue_UKMET.layerName,
  GPVTmpFillStyleSamples_UKMET.layerName,
  GPVRhContourSample_UKMET.layerName,
  HgtGridValue_UKMET.layerName,
  GPVHgtFillStyleSamples_UKMET.layerName,
  GPVHgtContourSample_UKMET.layerName,
  RhGridValue_UKMET.layerName,
  GPVRhFillStyleSamples_UKMET.layerName,
  GPVWindLayer_UKMET.layerName,
  GPVIsotachLayer_UKMET.layerName,
  GPVIcingprobLayer_UKMET.layerName,
];

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const gpvClick = createAction(GPV_UKMET_CLICK, checkAction);
export const gpvTempClick = createAction(GPV_UKMET_TEMP_CLICK, checkAction);
export const gpvWindClick = createAction(GPV_UKMET_WIND_CLICK, checkAction);
export const gpvIsotachClick = createAction(GPV_UKMET_ISOTACH_CLICK, checkAction);
export const gpvTmpContourClick = createAction(GPV_UKMET_TMP_CONTOUR_CLICK, checkAction);
export const gpvTmpFlatClick = createAction(GPV_UKMET_TMP_FLAT_CLICK, checkAction);
export const gpvTmpGradationClick = createAction(GPV_UKMET_TMP_GRADATION_CLICK, checkAction);
export const gpvTmpGridvalueClick = createAction(GPV_UKMET_TMP_GRIDVALUE_CLICK, checkAction);
export const gpvValidtimeChange = createAction(GPV_UKMET_VALIDTIME_CHANGE, valueAction);
export const gpvLevelChange = createAction(GPV_UKMET_LEVEL_CHANGE, valueAction);
export const gpvHgtClick = createAction(GPV_UKMET_HGT_CLICK, checkAction);
export const gpvHgtContourClick = createAction(GPV_UKMET_HGT_CONTOUR_CLICK, checkAction);
export const gpvHgtFlatClick = createAction(GPV_UKMET_HGT_FLAT_CLICK, checkAction);
export const gpvHgtGradationClick = createAction(GPV_UKMET_HGT_GRADATION_CLICK, checkAction);
export const gpvHgtGridvalueClick = createAction(GPV_UKMET_HGT_GRIDVALUE_CLICK, checkAction);
export const gpvRhClick = createAction(GPV_UKMET_RH_CLICK, checkAction);
export const gpvRhContourClick = createAction(GPV_UKMET_RH_CONTOUR_CLICK, checkAction);
export const gpvRhFlatClick = createAction(GPV_UKMET_RH_FLAT_CLICK, checkAction);
export const gpvRhGradationClick = createAction(GPV_UKMET_RH_GRADATION_CLICK, checkAction);
export const gpvRhGridvalueClick = createAction(GPV_UKMET_RH_GRIDVALUE_CLICK, checkAction);
export const gpvIcingProbClick = createAction(GPV_UKMET_ICING_PROB_CLICK, checkAction);

