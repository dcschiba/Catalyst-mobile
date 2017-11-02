import { createActions } from 'redux-actions';
import {
  ICE_CONCENTRATION_CLICK,
  ICE_CONCENTRATION_BASETIME_CHANGE,
  ICE_CONCENTRATION_VALIDTIME_CHANGE,
} from '../constants/iceconcentration/ActionTypes';
import { IceConcentration } from '../layers/LayerConfig';

const targetLayer = IceConcentration.layerName;

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  iceConcentrationClick,
  iceConcentrationBasetimeChange,
  iceConcentrationValidtimeChange,
} = createActions({
  [ICE_CONCENTRATION_CLICK]: checkAction,
  [ICE_CONCENTRATION_BASETIME_CHANGE]: valueAction,
  [ICE_CONCENTRATION_VALIDTIME_CHANGE]: valueAction,
});
