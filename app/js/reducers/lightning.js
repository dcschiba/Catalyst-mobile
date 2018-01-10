import { handleActions } from 'redux-actions';
import {
  LIGHTNING_JP_CLICK,
  LIGHTNING_KMA_CLICK,
  LIGHTNING_LIDEN_CLICK,
  LIGHTNING_SET_BASETIME,
} from '../constants/lightning/ActionTypes';

const initialState = {
  lightningJpChecked: false,
  lightningKmaChecked: true,
  lightningLidenChecked: true,
  lightningJpBasetime: '',
  lightningKmaBasetime: '',
  lightningLidenBasetime: '',
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
  [LIGHTNING_SET_BASETIME]: (state, action) => ({
    ...state,
    [action.payload.name]: action.payload.basetime,
  }),
}, initialState);
