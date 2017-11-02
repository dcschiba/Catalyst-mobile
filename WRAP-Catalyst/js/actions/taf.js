import { createAction } from 'redux-actions';
import { TAF_CLICK } from '../constants/taf/ActionTypes';
import { TAF } from '../layers/LayerConfig';

export const tafClick = createAction(
  TAF_CLICK,
  checked => ({ checked, targetLayer: TAF.layerName }),
);
