import { createAction } from 'redux-actions';
import { FIX_CLICK, FIX_COMPULSORY_CLICK, FIXN_CLICK, FIX_RNAV_CLICK, FIX_INITIALIZE } from '../constants/fix/ActionTypes';
import { FIX_COMPULSORY, FIXN, FIX_RNAV } from '../layers/LayerConfig';
import {
  LEGEND_SHOW,
} from '../constants/ActionTypes';

export const fixClick = createAction(
  FIX_CLICK,
  checked => ({ checked,
    targetLayer: [FIXN.layerName, FIX_COMPULSORY.layerName, FIX_RNAV.layerName] }),
);
// Use the FIX_COMPULSORY layer for the "FIX" button

export const fixCompulsoryClick = createAction(
  FIX_COMPULSORY_CLICK,
  checked => ({ checked, targetLayer: FIX_COMPULSORY.layerName }),
);

export const fixNClick = createAction(
  FIXN_CLICK,
  checked => ({ checked, targetLayer: FIXN.layerName }),
);

export const fixRNAVClick = createAction(
  FIX_RNAV_CLICK,
  checked => ({ checked, targetLayer: FIX_RNAV.layerName }),
);

export const initialize = createAction(
  FIX_INITIALIZE,
  () => ({}),
);

export const legendShow = createAction(
  LEGEND_SHOW,
  checked => ({ checked, targetLayer: FIX_COMPULSORY.layerName }),
);

