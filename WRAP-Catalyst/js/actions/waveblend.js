import { createActions } from 'redux-actions';
import {
  WAVE_BLEND_BASETIME_CHANGE,
  WAVE_BLEND_VALIDTIME_CHANGE,
  WAVE_BLEND_CLICK,
  WAVE_BLEND_ARROW_CLICK,
  WAVE_BLEND_CONTOUR_CLICK,
  WAVE_BLEND_FLAT_CLICK,
  WAVE_BLEND_LOWRESO_CLICK,
  WAVE_BLEND_NPAC_CLICK,
  WAVE_BLEND_NATL_CLICK,
  WAVE_BLEND_SEASIA_CLICK,
} from '../constants/waveblend/ActionTypes';
/* eslint-disable camelcase */
import {
  WaveBlendLowreso_Arrow,
  WaveBlendLowreso_Contour,
  WaveBlendLowreso_Flat,
  WaveBlendNpac_Arrow,
  WaveBlendNpac_Contour,
  WaveBlendNpac_Flat,
  WaveBlendNatl_Arrow,
  WaveBlendNatl_Contour,
  WaveBlendNatl_Flat,
  WaveBlendSeasia_Arrow,
  WaveBlendSeasia_Contour,
  WaveBlendSeasia_Flat } from '../layers/LayerConfig';

const targetLayer = [
  WaveBlendLowreso_Arrow.layerName,
  WaveBlendLowreso_Contour.layerName,
  WaveBlendLowreso_Flat.layerName,
  WaveBlendNpac_Arrow.layerName,
  WaveBlendNpac_Contour.layerName,
  WaveBlendNpac_Flat.layerName,
  WaveBlendNatl_Arrow.layerName,
  WaveBlendNatl_Contour.layerName,
  WaveBlendNatl_Flat.layerName,
  WaveBlendSeasia_Arrow.layerName,
  WaveBlendSeasia_Contour.layerName,
  WaveBlendSeasia_Flat.layerName,
];

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  waveBlendClick,
  waveBlendBasetimeChange,
  waveBlendValidtimeChange,
  waveBlendArrowClick,
  waveBlendContourClick,
  waveBlendFlatClick,
  waveBlendLowresoClick,
  waveBlendNpacClick,
  waveBlendNatlClick,
  waveBlendSeasiaClick,
} = createActions({
  [WAVE_BLEND_BASETIME_CHANGE]: valueAction,
  [WAVE_BLEND_VALIDTIME_CHANGE]: valueAction,
  [WAVE_BLEND_CLICK]: checkAction,
  [WAVE_BLEND_ARROW_CLICK]: checkAction,
  [WAVE_BLEND_CONTOUR_CLICK]: checkAction,
  [WAVE_BLEND_FLAT_CLICK]: checkAction,
  [WAVE_BLEND_LOWRESO_CLICK]: checkAction,
  [WAVE_BLEND_NPAC_CLICK]: checkAction,
  [WAVE_BLEND_NATL_CLICK]: checkAction,
  [WAVE_BLEND_SEASIA_CLICK]: checkAction,
});
