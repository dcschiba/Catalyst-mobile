import { createAction } from 'redux-actions';
import {
  GPV_GFS_CLICK,
  GPV_GFS_TEMP_CLICK,
  GPV_GFS_WIND_CLICK,
  GPV_GFS_ISOTACH_CLICK,
  GPV_GFS_TMP_CONTOUR_CLICK,
  GPV_GFS_TMP_FLAT_CLICK,
  GPV_GFS_TMP_GRADATION_CLICK,
  GPV_GFS_TMP_GRIDVALUE_CLICK,
  GPV_GFS_VALIDTIME_CHANGE,
  GPV_GFS_LEVEL_CHANGE,
  GPV_GFS_HGT_CLICK,
  GPV_GFS_HGT_CONTOUR_CLICK,
  GPV_GFS_HGT_FLAT_CLICK,
  GPV_GFS_HGT_GRADATION_CLICK,
  GPV_GFS_HGT_GRIDVALUE_CLICK,
  GPV_GFS_RH_CLICK,
  GPV_GFS_RH_CONTOUR_CLICK,
  GPV_GFS_RH_FLAT_CLICK,
  GPV_GFS_RH_GRADATION_CLICK,
  GPV_GFS_RH_GRIDVALUE_CLICK,
  GPV_GFS_ICING_PROB_CLICK,
  GPV_GFS_PRECIPITATION_CLICK,
  GPV_GFS_PRECIPITATION_FLAT_CLICK,
  GPV_GFS_PRECIPITATION_GRADATION_CLICK,
  GPV_GFS_SNOWDEPTH_CLICK,
  GPV_GFS_SNOWDEPTH_CONTOUR_CLICK,
  GPV_GFS_SNOWDEPTH_GRADATION_CLICK,
  GPV_GFS_SNOWDEPTH_GRIDVALUE_CLICK,
  GPV_GFS_PRESSUREMSL_CLICK,
  GPV_GFS_PRESSUREMSL_CONTOUR_CLICK,
  GPV_GFS_PRESSUREMSL_GRADATION_CLICK,
  GPV_GFS_PRESSUREMSL_GRIDVALUE_CLICK,
} from '../constants/gpv/ActionTypes';
/* eslint-disable camelcase */
import {
  GPVTmpContourSample_GFS,
  TmpGridValue_GFS,
  GPVTmpFillStyleSamples_GFS,
  GPVRhContourSample_GFS,
  HgtGridValue_GFS,
  GPVHgtFillStyleSamples_GFS,
  GPVHgtContourSample_GFS,
  RhGridValue_GFS,
  GPVRhFillStyleSamples_GFS,
  GPVWindLayer_GFS,
  GPVIsotachLayer_GFS,
  GPVIcingprobLayer_GFS,
  GPVPrecipitationLayer_GFS,
  GPVSnowdepthContourLayer_GFS,
  GPVSnowdepthGridValueLayer_GFS,
  GPVSnowdepthGradationLayer_GFS,
  GPVPressuremslContourLayer_GFS,
  GPVPressuremslGridValueLayer_GFS,
  GPVPressuremslGradationLayer_GFS,
} from '../layers/LayerConfig';

const targetLayer = [
  GPVTmpContourSample_GFS.layerName,
  TmpGridValue_GFS.layerName,
  GPVTmpFillStyleSamples_GFS.layerName,
  GPVRhContourSample_GFS.layerName,
  HgtGridValue_GFS.layerName,
  GPVHgtFillStyleSamples_GFS.layerName,
  GPVHgtContourSample_GFS.layerName,
  RhGridValue_GFS.layerName,
  GPVRhFillStyleSamples_GFS.layerName,
  GPVWindLayer_GFS.layerName,
  GPVIsotachLayer_GFS.layerName,
  GPVIcingprobLayer_GFS.layerName,
  GPVPrecipitationLayer_GFS.layerName,
  GPVSnowdepthContourLayer_GFS.layerName,
  GPVSnowdepthGridValueLayer_GFS.layerName,
  GPVSnowdepthGradationLayer_GFS.layerName,
  GPVPressuremslContourLayer_GFS.layerName,
  GPVPressuremslGridValueLayer_GFS.layerName,
  GPVPressuremslGradationLayer_GFS.layerName,
];

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const gpvClick = createAction(GPV_GFS_CLICK, checkAction);
export const gpvTempClick = createAction(GPV_GFS_TEMP_CLICK, checkAction);
export const gpvWindClick = createAction(GPV_GFS_WIND_CLICK, checkAction);
export const gpvIsotachClick = createAction(GPV_GFS_ISOTACH_CLICK, checkAction);
export const gpvTmpContourClick = createAction(GPV_GFS_TMP_CONTOUR_CLICK, checkAction);
export const gpvTmpFlatClick = createAction(GPV_GFS_TMP_FLAT_CLICK, checkAction);
export const gpvTmpGradationClick = createAction(GPV_GFS_TMP_GRADATION_CLICK, checkAction);
export const gpvTmpGridvalueClick = createAction(GPV_GFS_TMP_GRIDVALUE_CLICK, checkAction);
export const gpvValidtimeChange = createAction(GPV_GFS_VALIDTIME_CHANGE, valueAction);
export const gpvLevelChange = createAction(GPV_GFS_LEVEL_CHANGE, valueAction);
export const gpvHgtClick = createAction(GPV_GFS_HGT_CLICK, checkAction);
export const gpvHgtContourClick = createAction(GPV_GFS_HGT_CONTOUR_CLICK, checkAction);
export const gpvHgtFlatClick = createAction(GPV_GFS_HGT_FLAT_CLICK, checkAction);
export const gpvHgtGradationClick = createAction(GPV_GFS_HGT_GRADATION_CLICK, checkAction);
export const gpvHgtGridvalueClick = createAction(GPV_GFS_HGT_GRIDVALUE_CLICK, checkAction);
export const gpvRhClick = createAction(GPV_GFS_RH_CLICK, checkAction);
export const gpvRhContourClick = createAction(GPV_GFS_RH_CONTOUR_CLICK, checkAction);
export const gpvRhFlatClick = createAction(GPV_GFS_RH_FLAT_CLICK, checkAction);
export const gpvRhGradationClick = createAction(GPV_GFS_RH_GRADATION_CLICK, checkAction);
export const gpvRhGridvalueClick = createAction(GPV_GFS_RH_GRIDVALUE_CLICK, checkAction);
export const gpvIcingProbClick = createAction(GPV_GFS_ICING_PROB_CLICK, checkAction);

export const gpvPrecipitationClick = createAction(
  GPV_GFS_PRECIPITATION_CLICK, checkAction);
export const gpvPrecipitationFlatClick = createAction(
  GPV_GFS_PRECIPITATION_FLAT_CLICK, checkAction);
export const gpvPrecipitationGradationClick = createAction(
  GPV_GFS_PRECIPITATION_GRADATION_CLICK, checkAction);

export const gpvSnowdepthClick = createAction(
  GPV_GFS_SNOWDEPTH_CLICK, checkAction);
export const gpvSnowdepthContourClick = createAction(
  GPV_GFS_SNOWDEPTH_CONTOUR_CLICK, checkAction);
export const gpvSnowdepthGradationClick = createAction(
  GPV_GFS_SNOWDEPTH_GRADATION_CLICK, checkAction);
export const gpvSnowdepthGridvalueClick = createAction(
  GPV_GFS_SNOWDEPTH_GRIDVALUE_CLICK, checkAction);

export const gpvPressuremslClick = createAction(
  GPV_GFS_PRESSUREMSL_CLICK, checkAction);
export const gpvPressuremslContourClick = createAction(
  GPV_GFS_PRESSUREMSL_CONTOUR_CLICK, checkAction);
export const gpvPressuremslGradationClick = createAction(
  GPV_GFS_PRESSUREMSL_GRADATION_CLICK, checkAction);
export const gpvPressuremslGridvalueClick = createAction(
  GPV_GFS_PRESSUREMSL_GRIDVALUE_CLICK, checkAction);
