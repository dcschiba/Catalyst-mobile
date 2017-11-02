import { createAction } from 'redux-actions';
import {
  GPV_MSM_CLICK,
  GPV_MSM_TEMP_CLICK,
  GPV_MSM_WIND_CLICK,
  GPV_MSM_ISOTACH_CLICK,
  GPV_MSM_TMP_CONTOUR_CLICK,
  GPV_MSM_TMP_FLAT_CLICK,
  GPV_MSM_TMP_GRADATION_CLICK,
  GPV_MSM_TMP_GRIDVALUE_CLICK,
  GPV_MSM_VALIDTIME_CHANGE,
  GPV_MSM_LEVEL_CHANGE,
  GPV_MSM_HGT_CLICK,
  GPV_MSM_HGT_CONTOUR_CLICK,
  GPV_MSM_HGT_FLAT_CLICK,
  GPV_MSM_HGT_GRADATION_CLICK,
  GPV_MSM_HGT_GRIDVALUE_CLICK,
  GPV_MSM_RH_CLICK,
  GPV_MSM_RH_CONTOUR_CLICK,
  GPV_MSM_RH_FLAT_CLICK,
  GPV_MSM_RH_GRADATION_CLICK,
  GPV_MSM_RH_GRIDVALUE_CLICK,
  GPV_MSM_ICING_PROB_CLICK,
} from '../constants/gpv/ActionTypes';
/* eslint-disable camelcase */
import {
  GPVTmpContourSample_MSM,
  TmpGridValue_MSM,
  GPVTmpFillStyleSamples_MSM,
  GPVRhContourSample_MSM,
  HgtGridValue_MSM,
  GPVHgtFillStyleSamples_MSM,
  GPVHgtContourSample_MSM,
  RhGridValue_MSM,
  GPVRhFillStyleSamples_MSM,
  GPVWindLayer_MSM,
  GPVIsotachLayer_MSM,
  GPVIcingprobLayer_MSM,
} from '../layers/LayerConfig';

const targetLayer = [
  GPVTmpContourSample_MSM.layerName,
  TmpGridValue_MSM.layerName,
  GPVTmpFillStyleSamples_MSM.layerName,
  GPVRhContourSample_MSM.layerName,
  HgtGridValue_MSM.layerName,
  GPVHgtFillStyleSamples_MSM.layerName,
  GPVHgtContourSample_MSM.layerName,
  RhGridValue_MSM.layerName,
  GPVRhFillStyleSamples_MSM.layerName,
  GPVWindLayer_MSM.layerName,
  GPVIsotachLayer_MSM.layerName,
  GPVIcingprobLayer_MSM.layerName,
];

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const gpvClick = createAction(GPV_MSM_CLICK, checkAction);
export const gpvTempClick = createAction(GPV_MSM_TEMP_CLICK, checkAction);
export const gpvWindClick = createAction(GPV_MSM_WIND_CLICK, checkAction);
export const gpvIsotachClick = createAction(GPV_MSM_ISOTACH_CLICK, checkAction);
export const gpvTmpContourClick = createAction(GPV_MSM_TMP_CONTOUR_CLICK, checkAction);
export const gpvTmpFlatClick = createAction(GPV_MSM_TMP_FLAT_CLICK, checkAction);
export const gpvTmpGradationClick = createAction(GPV_MSM_TMP_GRADATION_CLICK, checkAction);
export const gpvTmpGridvalueClick = createAction(GPV_MSM_TMP_GRIDVALUE_CLICK, checkAction);
export const gpvValidtimeChange = createAction(GPV_MSM_VALIDTIME_CHANGE, valueAction);
export const gpvLevelChange = createAction(GPV_MSM_LEVEL_CHANGE, valueAction);
export const gpvHgtClick = createAction(GPV_MSM_HGT_CLICK, checkAction);
export const gpvHgtContourClick = createAction(GPV_MSM_HGT_CONTOUR_CLICK, checkAction);
export const gpvHgtFlatClick = createAction(GPV_MSM_HGT_FLAT_CLICK, checkAction);
export const gpvHgtGradationClick = createAction(GPV_MSM_HGT_GRADATION_CLICK, checkAction);
export const gpvHgtGridvalueClick = createAction(GPV_MSM_HGT_GRIDVALUE_CLICK, checkAction);
export const gpvRhClick = createAction(GPV_MSM_RH_CLICK, checkAction);
export const gpvRhContourClick = createAction(GPV_MSM_RH_CONTOUR_CLICK, checkAction);
export const gpvRhFlatClick = createAction(GPV_MSM_RH_FLAT_CLICK, checkAction);
export const gpvRhGradationClick = createAction(GPV_MSM_RH_GRADATION_CLICK, checkAction);
export const gpvRhGridvalueClick = createAction(GPV_MSM_RH_GRIDVALUE_CLICK, checkAction);
export const gpvIcingProbClick = createAction(GPV_MSM_ICING_PROB_CLICK, checkAction);

