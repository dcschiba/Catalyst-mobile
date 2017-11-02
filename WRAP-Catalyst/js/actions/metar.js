import { createAction } from 'redux-actions';
import { METAR_CLICK } from '../constants/metar/ActionTypes';
import { METAR } from '../layers/LayerConfig';

export const metarClick = createAction(
  METAR_CLICK,
  checked => ({ checked, targetLayer: METAR.layerName }),
);
