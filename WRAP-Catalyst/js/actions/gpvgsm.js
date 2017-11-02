import { createAction } from 'redux-actions';
import {
  GPV_GSM_CLICK,
  GPV_GSM_TEMP_CLICK,
  GPV_GSM_WIND_CLICK,
  GPV_GSM_ISOTACH_CLICK,
  GPV_GSM_TMP_CONTOUR_CLICK,
  GPV_GSM_TMP_FLAT_CLICK,
  GPV_GSM_TMP_GRADATION_CLICK,
  GPV_GSM_TMP_GRIDVALUE_CLICK,
  GPV_GSM_VALIDTIME_CHANGE,
  GPV_GSM_LEVEL_CHANGE,
  GPV_GSM_HGT_CLICK,
  GPV_GSM_HGT_CONTOUR_CLICK,
  GPV_GSM_HGT_FLAT_CLICK,
  GPV_GSM_HGT_GRADATION_CLICK,
  GPV_GSM_HGT_GRIDVALUE_CLICK,
  GPV_GSM_RH_CLICK,
  GPV_GSM_RH_CONTOUR_CLICK,
  GPV_GSM_RH_FLAT_CLICK,
  GPV_GSM_RH_GRADATION_CLICK,
  GPV_GSM_RH_GRIDVALUE_CLICK,
  GPV_GSM_ICING_PROB_CLICK,
  GPV_GSM_PRECIPITATION_CLICK,
  GPV_GSM_PRECIPITATION_FLAT_CLICK,
  GPV_GSM_PRECIPITATION_GRADATION_CLICK,
} from '../constants/gpv/ActionTypes';
/* eslint-disable camelcase */
import {
  GPVTmpContourSample_GSM,
  TmpGridValue_GSM,
  GPVTmpFillStyleSamples_GSM,
  GPVRhContourSample_GSM,
  HgtGridValue_GSM,
  GPVHgtFillStyleSamples_GSM,
  GPVHgtContourSample_GSM,
  RhGridValue_GSM,
  GPVRhFillStyleSamples_GSM,
  GPVWindLayer_GSM,
  GPVIsotachLayer_GSM,
  GPVIcingprobLayer_GSM,
  GPVPrecipitationLayer_GSM,
} from '../layers/LayerConfig';

const targetLayer = [
  GPVTmpContourSample_GSM.layerName,
  TmpGridValue_GSM.layerName,
  GPVTmpFillStyleSamples_GSM.layerName,
  GPVRhContourSample_GSM.layerName,
  HgtGridValue_GSM.layerName,
  GPVHgtFillStyleSamples_GSM.layerName,
  GPVHgtContourSample_GSM.layerName,
  RhGridValue_GSM.layerName,
  GPVRhFillStyleSamples_GSM.layerName,
  GPVWindLayer_GSM.layerName,
  GPVIsotachLayer_GSM.layerName,
  GPVIcingprobLayer_GSM.layerName,
  GPVPrecipitationLayer_GSM.layerName,
];

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const gpvClick = createAction(GPV_GSM_CLICK, checkAction);
export const gpvTempClick = createAction(GPV_GSM_TEMP_CLICK, checkAction);
export const gpvWindClick = createAction(GPV_GSM_WIND_CLICK, checkAction);
export const gpvIsotachClick = createAction(GPV_GSM_ISOTACH_CLICK, checkAction);
export const gpvTmpContourClick = createAction(GPV_GSM_TMP_CONTOUR_CLICK, checkAction);
export const gpvTmpFlatClick = createAction(GPV_GSM_TMP_FLAT_CLICK, checkAction);
export const gpvTmpGradationClick = createAction(GPV_GSM_TMP_GRADATION_CLICK, checkAction);
export const gpvTmpGridvalueClick = createAction(GPV_GSM_TMP_GRIDVALUE_CLICK, checkAction);
export const gpvValidtimeChange = createAction(GPV_GSM_VALIDTIME_CHANGE, valueAction);
export const gpvLevelChange = createAction(GPV_GSM_LEVEL_CHANGE, valueAction);
export const gpvHgtClick = createAction(GPV_GSM_HGT_CLICK, checkAction);
export const gpvHgtContourClick = createAction(GPV_GSM_HGT_CONTOUR_CLICK, checkAction);
export const gpvHgtFlatClick = createAction(GPV_GSM_HGT_FLAT_CLICK, checkAction);
export const gpvHgtGradationClick = createAction(GPV_GSM_HGT_GRADATION_CLICK, checkAction);
export const gpvHgtGridvalueClick = createAction(GPV_GSM_HGT_GRIDVALUE_CLICK, checkAction);
export const gpvRhClick = createAction(GPV_GSM_RH_CLICK, checkAction);
export const gpvRhContourClick = createAction(GPV_GSM_RH_CONTOUR_CLICK, checkAction);
export const gpvRhFlatClick = createAction(GPV_GSM_RH_FLAT_CLICK, checkAction);
export const gpvRhGradationClick = createAction(GPV_GSM_RH_GRADATION_CLICK, checkAction);
export const gpvRhGridvalueClick = createAction(GPV_GSM_RH_GRIDVALUE_CLICK, checkAction);
export const gpvIcingProbClick = createAction(GPV_GSM_ICING_PROB_CLICK, checkAction);

export const gpvPrecipitationClick = createAction(GPV_GSM_PRECIPITATION_CLICK, checkAction);
export const gpvPrecipitationFlatClick = createAction(GPV_GSM_PRECIPITATION_FLAT_CLICK,
   checkAction);
export const gpvPrecipitationGradationClick = createAction(GPV_GSM_PRECIPITATION_GRADATION_CLICK,
   checkAction);
