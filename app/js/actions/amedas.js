import { createActions } from 'redux-actions';
import {
  AMEDAS_CLICK,
  AMEDAS_VALIDTIME_CHANGE,
  AMEDAS_WIND_CLICK,
  AMEDAS_CONTENT_CHANGE,
} from '../constants/amedas/ActionTypes';
/* eslint-disable camelcase */
import { WX_JMA_Amedas } from '../layers/LayerConfig';

const checkAction = checked => ({ checked, targetLayer: WX_JMA_Amedas.layerName });
const valueAction = value => ({ value, targetLayer: WX_JMA_Amedas.layerName });

export const {
  amedasClick,
  amedasValidtimeChange,
  amedasWindClick,
  amedasContentChange,
} = createActions({
  [AMEDAS_CLICK]: checkAction,
  [AMEDAS_VALIDTIME_CHANGE]: valueAction,
  [AMEDAS_WIND_CLICK]: checkAction,
  [AMEDAS_CONTENT_CHANGE]: valueAction,
});

