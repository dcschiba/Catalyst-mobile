import { createAction } from 'redux-actions';
import { LIGHTNING_JP_CLICK, LIGHTNING_KMA_CLICK, LIGHTNING_LIDEN_CLICK, LIGHTNING_SET_BASETIME } from '../constants/lightning/ActionTypes';
import { LightningJapan, LightningKorea, LIDEN } from '../layers/LayerConfig';

export const lightningJpClick = createAction(
  LIGHTNING_JP_CLICK,
  checked => ({ checked, targetLayer: LightningJapan.layerName }),
);
export const lightningKmaClick = createAction(
  LIGHTNING_KMA_CLICK,
  checked => ({ checked, targetLayer: LightningKorea.layerName }),
);
export const lightningLidenClick = createAction(
  LIGHTNING_LIDEN_CLICK,
  checked => ({ checked, targetLayer: LIDEN.layerName }),
);
export const setLightningBasetime = createAction(
  LIGHTNING_SET_BASETIME,
  (name, basetime) => ({ name, basetime }),
);
