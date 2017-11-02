import { createActions } from 'redux-actions';
import {
  HOURLYANALYSIS_CLICK,
  HOURLYANALYSIS_WIND_CLICK,
  HOURLYANALYSIS_TMP_CLICK,
  HOURLYANALYSIS_LEVEL_CHANGE,
  HOURLYANALYSIS_BASETIME_CHANGE,
  HOURLYANALYSIS_VALIDTIME_CHANGE,
} from '../constants/gpvhourlyAnalysis/ActionTypes';
/* eslint-disable camelcase */
import {
  JP_GPV_HourlyAnalysis_Wind,
  JP_GPV_HourlyAnalysis_Tmp } from '../layers/LayerConfig';

const targetLayer = [
  JP_GPV_HourlyAnalysis_Wind.layerName,
  JP_GPV_HourlyAnalysis_Tmp.layerName,
];

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  hourlyanalysisClick,
  hourlyanalysisWindClick,
  hourlyanalysisTmpClick,
  hourlyanalysisLevelChange,
  hourlyanalysisBasetimeChange,
  hourlyanalysisValidtimeChange,
} = createActions({
  [HOURLYANALYSIS_CLICK]: checkAction,
  [HOURLYANALYSIS_WIND_CLICK]: checkAction,
  [HOURLYANALYSIS_TMP_CLICK]: checkAction,
  [HOURLYANALYSIS_LEVEL_CHANGE]: valueAction,
  [HOURLYANALYSIS_BASETIME_CHANGE]: valueAction,
  [HOURLYANALYSIS_VALIDTIME_CHANGE]: valueAction,
});
