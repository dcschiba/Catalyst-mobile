import { handleActions } from 'redux-actions';
import {
  LIGHTNING_JP_CLICK,
  LIGHTNING_KMA_CLICK,
  LIGHTNING_LIDEN_CLICK,
} from '../constants/lightning/ActionTypes';

const initialState = {
  lightningJpChecked: false,
  lightningKmaChecked: false,
  lightningLidenChecked: false,
};

export default handleActions({
  [LIGHTNING_JP_CLICK]: (state, action) => ({
    ...state,
    lightningJpChecked: action.payload.checked,
  }),

  [LIGHTNING_KMA_CLICK]: (state, action) => ({
    ...state,
    lightningKmaChecked: action.payload.checked,
  }),

  [LIGHTNING_LIDEN_CLICK]: (state, action) => ({
    ...state,
    lightningLidenChecked: action.payload.checked,
  }),
}, initialState);
